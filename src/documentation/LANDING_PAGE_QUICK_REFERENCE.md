# Landing Page - Quick Reference

## 🎯 **Quick Overview**

**Status**: ✅ 100% Clean, Modular, Production-Ready  
**Data Integration**: ✅ All from `/data/` directory  
**Hardcoded Values**: ❌ ZERO  
**Duplicates**: ❌ ZERO  

---

## 📋 **Section Structure**

```
Landing Page Flow:
├── 1. Hero Section (Stats + CTA)
├── 2. SDG Goals (4 cards)
├── 3. Features (Grid layout)
├── 4. Use Cases (Grid layout)
├── 5. How It Works (3 steps)
├── 6. Benefits (List + image)
├── 7. Testimonials (Auto-carousel)
├── 8. Documentation (Interactive carousel)
├── 9. FAQ (Accordion + search)
├── 10. ROI Calculator ⭐ (Single, correct position)
├── 11. CTA (Final call-to-action)
└── 12. Footer
```

---

## 🆕 **New Component: SectionBackground**

### Quick Import
```tsx
import { SectionBackground } from './landing';
```

### Basic Usage
```tsx
<section className="relative overflow-hidden py-20">
  <SectionBackground variant="blue" position="top-right" />
  <div className="container mx-auto px-4 relative z-10">
    {/* Your content */}
  </div>
</section>
```

### Variants
| Variant | Color | Use Case |
|---------|-------|----------|
| `blue` | #0077B6 | Technology sections |
| `green` | #3B945E | Agriculture sections |
| `yellow` | #FFB703 | Accent sections |
| `dual-blue-green` | Blue + Green | Mixed content |
| `dual-green-blue` | Green + Blue | Mixed content |

### Positions
| Position | Description |
|----------|-------------|
| `top-right` | Blob in top-right corner |
| `top-left` | Blob in top-left corner |
| `bottom-right` | Blob in bottom-right corner |
| `bottom-left` | Blob in bottom-left corner |
| `center` | Centered blob |
| `dual` | Two blobs (used with dual variants) |

---

## 📊 **Data Sources**

### All Sections Use `/data/`

| Section | Data File | Fetch Function |
|---------|-----------|----------------|
| Hero | `demo-statistics.ts` | `fetchStatistics()` |
| SDG Goals | `demo-sdg-goals.ts` | `fetchSDGGoals()` |
| Features | `demo-features.ts` | `fetchFeatures()` |
| Use Cases | `demo-use-cases.ts` | `fetchUseCases()` |
| How It Works | `demo-how-it-works.ts` | `fetchHowItWorks()` |
| Benefits | `demo-benefits.ts` | `fetchBenefits()` |
| Testimonials | `demo-testimonials.ts` | `fetchTestimonials()` |
| Documentation | `demo-documentation.ts` | `fetchDocumentation()` |
| FAQ | `demo-faq.ts` | `fetchFAQ()` |
| ROI Calculator | 6 data files | Multiple functions |

---

## 🔧 **Adding New Section**

### Template
```tsx
// 1. Import SectionBackground
import { SectionBackground } from './landing';

// 2. Create section structure
<section 
  id="your-section" 
  className="py-20 bg-gradient-to-br from-white via-blue-50/30 to-emerald-50/30 dark:from-[#0E172A] dark:via-[#0B2F2B] dark:to-[#0E172A] relative overflow-hidden"
>
  {/* Background */}
  <SectionBackground variant="blue" position="top-right" />
  
  {/* Content Container */}
  <div className="container mx-auto px-4 relative z-10">
    <SectionHeader
      title="Your Section Title"
      description="Your description"
    />
    
    {/* Your content */}
  </div>
</section>
```

---

## 🎨 **Design Patterns**

### Section Wrapper
```tsx
className="py-20 bg-gradient-to-br from-white via-blue-50/30 to-emerald-50/30 dark:from-[#0E172A] dark:via-[#0B2F2B] dark:to-[#0E172A] relative overflow-hidden"
```

### Content Container
```tsx
className="container mx-auto px-4 relative z-10"
```

### Grid Layouts
```tsx
// 3 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

// 4 columns  
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
```

---

## 🚀 **Common Tasks**

### Change Background Color
```tsx
// Before: Multiple files to edit
<div className="absolute inset-0 opacity-20">
  <div className="absolute top-0 right-0 w-96 h-96 bg-[#0077B6] rounded-full filter blur-3xl" />
</div>

// After: One component, one prop
<SectionBackground variant="green" position="top-right" />
```

### Add Loading State
```tsx
// Already implemented pattern
{loading && <YourSkeleton />}

{error && !loading && (
  <ErrorState
    title="Failed to load"
    message={error}
    onRetry={loadFunction}
  />
)}

{!loading && !error && (
  // Your content
)}
```

### Icon Mapping
```tsx
// Import all icons
import * as Icons from 'lucide-react';

// Map icon name to component
const getIconComponent = (iconName: string) => {
  const Icon = Icons[iconName as keyof typeof Icons];
  return Icon ? <Icon className="w-6 h-6" /> : null;
};
```

---

## ✅ **Quality Checklist**

Before deploying section changes:

### Code Quality
- [ ] No hardcoded data (all from `/data/`)
- [ ] Uses SectionBackground component
- [ ] Proper TypeScript types
- [ ] Loading states implemented
- [ ] Error handling complete

### Visual
- [ ] Responsive (mobile/tablet/desktop)
- [ ] Dark mode compatible
- [ ] Animations smooth
- [ ] Proper spacing (py-20, gap-8)
- [ ] Icons from lucide-react

### Performance
- [ ] Async data loading
- [ ] No unnecessary re-renders
- [ ] Optimized images
- [ ] Lazy loading where appropriate

---

## 🐛 **Troubleshooting**

### Background not showing
```tsx
// ❌ Wrong - missing relative
<section className="py-20">
  <SectionBackground variant="blue" />
  
// ✅ Correct - has relative
<section className="py-20 relative overflow-hidden">
  <SectionBackground variant="blue" />
```

### Content behind background
```tsx
// ❌ Wrong - no z-index
<div className="container mx-auto px-4">

// ✅ Correct - has z-10
<div className="container mx-auto px-4 relative z-10">
```

### Data not loading
```tsx
// ✅ Check these:
1. Import from '../data' not './data'
2. Await the fetch function
3. Handle loading/error states
4. useEffect with empty deps []
```

---

## 📖 **Examples**

### Example 1: Simple Section
```tsx
<section className="py-20 relative overflow-hidden">
  <SectionBackground variant="green" position="top-left" />
  
  <div className="container mx-auto px-4 relative z-10">
    <SectionHeader title="My Title" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {items.map(item => (
        <Card key={item.id}>{item.content}</Card>
      ))}
    </div>
  </div>
</section>
```

### Example 2: Section with Data
```tsx
export default function MySection() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMyData()
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 relative overflow-hidden">
      <SectionBackground variant="blue" position="top-right" />
      
      <div className="container mx-auto px-4 relative z-10">
        {loading && <MySkeleton />}
        {error && <ErrorState message={error} />}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.map(item => <MyCard key={item.id} item={item} />)}
          </div>
        )}
      </div>
    </section>
  );
}
```

---

## 🎯 **Best Practices**

### Do's ✅
- Use SectionBackground for all section backgrounds
- Load all data from `/data/` directory
- Implement loading and error states
- Use proper TypeScript types
- Test on mobile/tablet/desktop
- Support dark mode

### Don'ts ❌
- Don't hardcode background patterns
- Don't hardcode data in components
- Don't skip loading/error states
- Don't use inline styles
- Don't forget responsive classes
- Don't override font sizes

---

## 📚 **Related Documentation**

- [Landing Page Cleanup Complete](./LANDING_PAGE_CLEANUP_COMPLETE.md) - Full cleanup documentation
- [Data Structure](./DATA_STRUCTURE.md) - Data management guide
- [Guidelines](./Guidelines.md) - Development guidelines
- [FAQ ROI Implementation](./FAQ_ROI_IMPLEMENTATION_COMPLETE.md) - ROI Calculator docs

---

**Last Updated**: November 2, 2025  
**Version**: 2.0.0  
**Status**: Production Ready ✅
