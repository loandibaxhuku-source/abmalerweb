import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface TestimonialData {
  referenceCode: string;
  name: string;
  email: string;
  testimonial: string;
  rating: number;
  service?: string;
}

interface Testimonial {
  id: string;
  name: string;
  testimonial: string;
  rating: number;
  service?: string;
  createdAt: string;
}

// Validation helper
function validateTestimonial(data: TestimonialData): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.referenceCode || data.referenceCode.trim().length < 5) {
    errors.push('Valid reference code is required');
  }

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name is required and must be at least 2 characters');
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Valid email address is required');
  }

  if (!data.testimonial || data.testimonial.trim().length < 10) {
    errors.push('Testimonial is required and must be at least 10 characters');
  }

  if (!data.rating || data.rating < 1 || data.rating > 5) {
    errors.push('Rating must be between 1 and 5 stars');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Sanitize input
function sanitizeInput(data: TestimonialData): TestimonialData {
  return {
    referenceCode: data.referenceCode?.trim().toUpperCase() || '',
    name: data.name?.trim() || '',
    email: data.email?.trim().toLowerCase() || '',
    testimonial: data.testimonial?.trim() || '',
    rating: Math.round(data.rating) || 5,
    service: data.service?.trim().toLowerCase() || undefined,
  };
}

// Generate unique ID
function generateId(): string {
  return `testimonial-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data: TestimonialData = body;

    // Validate input
    const validation = validateTestimonial(data);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    // Sanitize input
    const sanitized = sanitizeInput(data);

    // Create testimonial object
    const testimonial: Testimonial = {
      id: generateId(),
      name: sanitized.name,
      testimonial: sanitized.testimonial,
      rating: sanitized.rating,
      service: sanitized.service,
      createdAt: new Date().toISOString().split('T')[0],
    };

    // Read existing testimonials
    const dataDir = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDir, 'testimonials.json');

    let existingData: { testimonials: Testimonial[] } = { testimonials: [] };
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      existingData = JSON.parse(fileContent);
    } catch (error) {
      // File doesn't exist yet, that's fine
      existingData = { testimonials: [] };
    }

    // Add new testimonial
    existingData.testimonials.push(testimonial);

    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(existingData, null, 2), 'utf-8');

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: 'Testimonial submitted successfully',
        testimonialId: testimonial.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Testimonial submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit testimonial. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDir, 'testimonials.json');

    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContent);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error reading testimonials:', error);
    return NextResponse.json(
      { testimonials: [] },
      { status: 200 }
    );
  }
}
