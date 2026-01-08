import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Type for form data
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

// Validation helper
function validateInput(data: ContactFormData): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name is required and must be at least 2 characters');
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Valid email address is required');
  }

  if (!data.phone || data.phone.trim().length < 6) {
    errors.push('Phone number is required and must be at least 6 characters');
  }

  if (!data.service || data.service.trim().length === 0) {
    errors.push('Service selection is required');
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push('Message is required and must be at least 10 characters');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Sanitize input
function sanitizeInput(data: ContactFormData): ContactFormData {
  return {
    name: data.name?.trim() || '',
    email: data.email?.trim().toLowerCase() || '',
    phone: data.phone?.trim() || '',
    service: data.service?.trim() || '',
    message: data.message?.trim() || '',
  };
}

// Generate reference number
function generateReferenceNumber(): string {
  return `REF-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

// Create email templates
function createUserConfirmationEmail(name: string, referenceNumber: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Service Request Received</h2>
      <p>Dear ${name},</p>
      <p>Thank you for submitting your service request to <strong>A.B Maler Fassadenbau & Gipser GmbH</strong>. We have received your inquiry and will review it shortly.</p>
      
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Reference Number:</strong> <code>${referenceNumber}</code></p>
        <p style="font-size: 12px; color: #666;">Please save this reference number for your records.</p>
      </div>
      
      <p>Our team will contact you within 24 hours to discuss your project details and provide a personalized quote.</p>
      
      <p>Best regards,<br>
      <strong>A.B Maler Fassadenbau & Gipser GmbH</strong><br>
      Professional Painting & Construction Services</p>
      
      <hr style="border: none; border-top: 1px solid #ddd; margin-top: 30px;">
      <p style="font-size: 12px; color: #999; text-align: center;">This is an automated email. Please do not reply to this address.</p>
    </div>
  `;
}

function createOwnerNotificationEmail(data: ContactFormData, referenceNumber: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #d32f2f;">New Service Request - ${referenceNumber}</h2>
      
      <div style="background-color: #fff3e0; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #333;">Customer Information</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        <p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
      </div>
      
      <div style="background-color: #e8f5e9; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #333;">Service Details</h3>
        <p><strong>Service Type:</strong> ${data.service}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap; background-color: #fff; padding: 10px; border-radius: 3px;">${escapeHtml(data.message)}</p>
      </div>
      
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Reference Number:</strong> ${referenceNumber}</p>
        <p style="font-size: 12px; color: #666;">Timestamp: ${new Date().toLocaleString()}</p>
      </div>
      
      <p style="color: #d32f2f; font-weight: bold;">Action Required: Please contact the customer within 24 hours.</p>
    </div>
  `;
}

// Simple HTML escape
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const formData: ContactFormData = body;

    // Validate input
    const validation = validateInput(formData);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    // Sanitize input
    const sanitized = sanitizeInput(formData);

    // Generate reference number
    const referenceNumber = generateReferenceNumber();

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: sanitized.email,
      subject: `Service Request Confirmation - ${referenceNumber}`,
      html: createUserConfirmationEmail(sanitized.name, referenceNumber),
    });

    // Send notification email to owner
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.OWNER_EMAIL,
      subject: `New Service Request - ${referenceNumber} from ${sanitized.name}`,
      html: createOwnerNotificationEmail(sanitized, referenceNumber),
    });

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: 'Service request submitted successfully',
        referenceNumber,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);

    // Email service error
    if (error instanceof Error && error.message.includes('EAUTH')) {
      return NextResponse.json(
        { success: false, error: 'Email service authentication failed. Please check credentials.' },
        { status: 500 }
      );
    }

    // Generic error
    return NextResponse.json(
      { success: false, error: 'Failed to submit service request. Please try again later.' },
      { status: 500 }
    );
  }
}
