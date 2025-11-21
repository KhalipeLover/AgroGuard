# Footer Component - Documentation

## 📋 Overview

Footer component yang comprehensive untuk Landing Page dengan brand information, navigation links, contact info, dan social media links.

---

## ✨ Features

### Brand Section
- ✅ AGROGUARD IoT logo dengan gradient background
- ✅ Tagline "Smart Agriculture Solution"
- ✅ Company description
- ✅ Contact information (Address, Email, Phone)

### Navigation Links
Organized dalam 4 kategori:
- **Product**: Fitur, Use Cases, Harga, Demo
- **Company**: Tentang Kami, Blog, Karir, Press Kit
- **Support**: Dokumentasi, Tutorial, FAQ, Kontak
- **Legal**: Privacy Policy, Terms of Service, Cookie Policy, Licenses

### Social Media
- Facebook
- Twitter
- Instagram
- LinkedIn
- YouTube

### Design Features
- ✅ Dark gradient background (`#0E172A` to `#0B2F2B`)
- ✅ Animated blob decorations
- ✅ Glassmorphic styling
- ✅ Responsive grid layout
- ✅ Hover effects pada links dan social icons
- ✅ Separator line antara main content dan bottom section

---

## 🎨 Component Structure

```tsx
<Footer>
  {/* Background Decoration */}
  <div>Animated blobs</div>
  
  {/* Main Footer Content */}
  <div className="grid lg:grid-cols-6">
    {/* Brand Section (2 cols) */}
    <div>
      - Logo & Title
      - Description
      - Contact Info
    </div>
    
    {/* Product Links (1 col) */}
    {/* Company Links (1 col) */}
    {/* Support Links (1 col) */}
    {/* Legal Links (1 col) */}
  </div>
  
  <Separator />
  
  {/* Bottom Footer */}
  <div>
    - Copyright
    - Social Media Icons
    - Additional Info
  </div>
</Footer>
```

---

## 💻 Code Example

### Usage

```tsx
import { Footer } from './components/landing';

function LandingPage() {
  return (
    <div>
      {/* Page content */}
      <Footer />
    </div>
  );
}
```

### Props

Footer component tidak memerlukan props - semua data sudah defined di dalam component.

```typescript
export default function Footer() {
  // No props needed
}
```

---

## 🎨 Styling

### Background
```tsx
className="bg-gradient-to-br from-[#0E172A] via-[#0B2F2B] to-[#0E172A]"
```

### Animated Blobs
```tsx
{/* Top-left green blob */}
<div className="absolute top-0 left-0 w-96 h-96 bg-[#3B945E] rounded-full filter blur-3xl" />

{/* Bottom-right blue blob */}
<div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0077B6] rounded-full filter blur-3xl" />
```

### Link Styling
```tsx
className="text-white/70 hover:text-white transition-smooth text-sm"
```

### Social Icons
```tsx
className="w-10 h-10 rounded-full glass-card border border-white/20 
           hover:border-[#3B945E] hover:bg-[#3B945E]/20 transition-smooth"
```

---

## 📱 Responsive Design

### Mobile (< 768px)
- Single column layout
- Stacked sections
- Centered text for copyright and social
- Full-width brand section

### Tablet (768px - 1024px)
- 2-column grid
- Brand section takes full width
- Links in 2x2 grid

### Desktop (> 1024px)
- 6-column grid
- Brand takes 2 columns
- Each link category takes 1 column
- Optimal spacing and readability

---

## 🎯 Customization

### Updating Links

Edit the `footerLinks` object:

```tsx
const footerLinks = {
  product: [
    { label: 'Your Link', href: '#your-section' },
    // Add more...
  ],
  // ... other categories
};
```

### Updating Contact Info

Edit the `contactInfo` array:

```tsx
const contactInfo = [
  {
    icon: <MapPin className="w-5 h-5" />,
    label: 'Your Address'
  },
  // ... more contact info
];
```

### Updating Social Media

Edit the `socialMedia` array:

```tsx
const socialMedia = [
  { 
    icon: <Facebook className="w-5 h-5" />, 
    href: 'https://facebook.com/yourpage', 
    label: 'Facebook' 
  },
  // ... more social links
];
```

---

## ♿ Accessibility

### ARIA Labels
```tsx
<a
  href={social.href}
  aria-label={social.label}  // ✅ Screen reader friendly
>
  {social.icon}
</a>
```

### Semantic HTML
- ✅ `<footer>` element
- ✅ Proper heading hierarchy (`<h3>`, `<h4>`)
- ✅ List elements (`<ul>`, `<li>`)
- ✅ Meaningful link text

### Keyboard Navigation
- ✅ All links focusable
- ✅ Proper tab order
- ✅ Visible focus states

---

## 🎨 Design System Compliance

### Colors
- ✅ Primary Green: `#3B945E`
- ✅ Technology Blue: `#0077B6`
- ✅ Dark background gradient
- ✅ White text with opacity variations

### Effects
- ✅ `glass-card` for social icons
- ✅ `transition-smooth` for all hover states
- ✅ Blur effects for background blobs
- ✅ Consistent spacing using Tailwind scale

### Typography
- ✅ Using default typography from `globals.css`
- ✅ Text hierarchy through opacity
- ✅ Consistent text sizes

---

## 🧪 Testing Checklist

- [x] Footer renders correctly
- [x] All links present
- [x] Social icons display
- [x] Contact info visible
- [x] Responsive on mobile
- [x] Responsive on tablet
- [x] Responsive on desktop
- [x] Dark mode styling works
- [x] Hover effects functional
- [x] No console errors
- [x] Accessibility compliant
- [x] Keyboard navigation works
- [x] Copyright year auto-updates

---

## 📊 Component Metrics

### File Size
- **Lines of Code**: ~220 lines
- **File Size**: ~7KB
- **Dependencies**: lucide-react, ../ui/separator

### Performance
- ✅ No heavy computations
- ✅ Static content
- ✅ Optimized rendering
- ✅ No external API calls

### Maintainability
- ✅ Well-organized data structures
- ✅ Easy to update links
- ✅ Clear section separation
- ✅ Self-documenting code

---

## 🔄 Integration

### Added to LandingPage

```tsx
import { Footer } from './components/landing';

export default function LandingPage() {
  return (
    <div>
      <HeroSection {...} />
      {/* ... other sections */}
      <CTASection {...} />
      <Footer />  {/* ✅ Added */}
    </div>
  );
}
```

### Export from landing/index.ts

```tsx
export { default as Footer } from './Footer';
```

---

## 💡 Best Practices

### Do's
✓ Keep links organized by category
✓ Use meaningful link text
✓ Include ARIA labels for icons
✓ Update copyright year automatically
✓ Test all links before deployment

### Don'ts
✗ Don't hardcode the year
✗ Don't use vague link text like "Click here"
✗ Don't forget to test on mobile
✗ Don't use too many social media icons
✗ Don't skip accessibility attributes

---

## 🔮 Future Enhancements

### Potential Improvements
- [ ] Newsletter subscription form
- [ ] Language selector
- [ ] Live chat integration
- [ ] Certifications/badges display
- [ ] Recent blog posts
- [ ] Testimonials snippet
- [ ] Mobile app download links

### Data-Driven Approach
- [ ] Fetch links from CMS
- [ ] Dynamic copyright text
- [ ] A/B testing for link placement
- [ ] Analytics tracking
- [ ] Link click tracking

---

## 📚 Related Documentation

- [Landing Page Modularization](/LANDING_PAGE_MODULARIZATION.md)
- [Guidelines](/documentation/Guidelines.md)
- [Component Library](/MODULAR_COMPONENTS_DOCUMENTATION.md)

---

## 🎉 Summary

Footer component provides:
- ✅ Professional appearance
- ✅ Complete navigation structure
- ✅ Contact information
- ✅ Social media integration
- ✅ Fully responsive design
- ✅ Accessibility compliant
- ✅ Easy to customize
- ✅ Design system compliant

**Status**: ✅ Complete and Production Ready  
**Version**: 1.3.1  
**Last Updated**: October 23, 2025

---

**Component**: Footer  
**Location**: `/components/landing/Footer.tsx`  
**Type**: Section Component  
**Dependencies**: lucide-react, ../ui/separator  
**Props**: None  
**Responsive**: ✅ Yes  
**Accessibility**: ✅ Full Support
