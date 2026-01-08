# A.B Maler & Fassadenbau Website

A professional website for a painting and renovation business built with Next.js, Tailwind CSS, and Lucide React icons.

## Features

✨ **Modern Design** - Clean, professional layout with Tailwind CSS  
🌍 **Multi-Language Support** - English, German (Deutsch), and Albanian (Shqip)  
📱 **Responsive** - Mobile-first design that works on all devices  
🎨 **Professional Components**:
  - Sticky Navigation Bar with language switcher
  - Hero section with call-to-action
  - Services showcase
  - About section
  - Contact section
  - Professional footer with social links

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful SVG icons
- **Node.js** - Runtime environment

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Main layout with navbar, main content, footer
│   ├── page.tsx            # Home page with hero, services, about, contact
│   └── globals.css         # Global Tailwind styles
├── components/
│   ├── Navbar.tsx          # Sticky navigation with language switcher
│   └── Footer.tsx          # Footer with contact info and social links
├── i18n/
│   ├── config.ts           # Language configuration
│   └── translations.ts     # Translation strings for all languages
```

## Getting Started

### Installation

Dependencies are already installed. To verify and install any missing packages:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Building for Production

Build the project:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Multi-Language Support

The site supports three languages through the `i18n` configuration:

- **English** (en) - Default language
- **Deutsch** (de) - German
- **Shqip** (sq) - Albanian

Language switching is available in the sticky navbar. The selected language preference is stored in browser localStorage.

### Adding New Translations

1. Edit `src/i18n/translations.ts`
2. Add new translation keys under each language object
3. Reference translations in components using:
   ```typescript
   const t = translations[language];
   ```

## Key Components

### Navbar.tsx
- Sticky positioning (stays at top while scrolling)
- Desktop and mobile responsive menus
- Language dropdown selector with hover effect
- Mobile hamburger menu toggle
- A.B Maler & Fassadenbau branding

### Footer.tsx
- Contact information (phone, email, address)
- Social media links (Facebook, Instagram, LinkedIn)
- Company information section
- Copyright and legal links
- Dark theme styling

### Layout.tsx
- Manages global language state
- Flexbox layout for sticky footer
- Responsive container structure
- Persistent language preference in localStorage
- Wrapper for Navbar, main content, and Footer

## Customization

### Colors

The site uses Tailwind's blue color scheme. To change colors, update:
- `bg-blue-600`, `bg-blue-400`, `text-blue-600` in components
- Edit `tailwind.config.ts` for global color changes

### Contact Information

Update contact details in:
- `src/components/Footer.tsx` - Phone, email, address
- `src/i18n/translations.ts` - Translated contact labels

### Company Information

Update business name and description in:
- `src/components/Navbar.tsx` - Navbar branding (currently "A.B Maler")
- `src/app/page.tsx` - Hero section and about section text
- `src/i18n/translations.ts` - Translated company names and descriptions

## Icons Used

All icons are from [Lucide React](https://lucide.dev/). Icons in use:
- `Menu`, `X` - Navigation menu toggle
- `Globe` - Language selector
- `Paintbrush`, `HomeIcon`, `Hammer` - Service icons
- `Mail`, `Phone`, `MapPin` - Contact information
- `Facebook`, `Instagram`, `Linkedin` - Social media links

## Next Steps

1. **Replace Contact Info**: Update phone, email, and address in Footer.tsx
2. **Add Services Page**: Create `/src/app/services` with detailed service listings
3. **Add Contact Form**: Implement contact form with email integration
4. **Add Portfolio**: Create gallery/portfolio section with project images
5. **SEO Optimization**: Add meta tags, Open Graph tags, structured data
6. **Analytics**: Integrate Google Analytics or similar service
7. **CMS Integration**: Connect to headless CMS if needed
8. **Domain Setup**: Point custom domain to deployment
9. **SSL Certificate**: Enable HTTPS on production
10. **Performance**: Optimize images and implement lazy loading

## Deployment

Ready to deploy on Vercel, Netlify, or any Node.js hosting:

```bash
# Build for production
npm run build

# Test production build locally
npm start
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)

---

© 2025 A.B Maler & Fassadenbau. All rights reserved.
