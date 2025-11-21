# AGROGUARD IoT - Development Guidelines

## Design System: Neo-Skeuo Glass Fusion

### Overview
AGROGUARD IoT uses a unique design system that combines three modern design paradigms:
- **Glassmorphism**: Semi-transparent backgrounds with backdrop blur for depth
- **Neumorphism**: Soft shadows and subtle 3D effects for tactile feel
- **Skeuomorphism**: Realistic textures and depth for intuitive interaction

### Color Palette

#### Primary Colors
- **Agriculture Green**: `#3B945E` (Primary actions, nature theme)
- **Technology Blue**: `#0077B6` (Tech features, admin theme)
- **Accent Yellow**: `#FFB703` (Highlights, important info)

#### Light Mode
- Background: `#f0fdf4` (Light green tint)
- Foreground: `#0a0a0a` (Near black)
- Card: `#ffffff` with glassmorphic overlay

#### Dark Mode
- Background: Gradient from `#0E172A` to `#0B2F2B`
- Foreground: `#fafafa` (Off white)
- Card: Semi-transparent with backdrop blur

### Utility Classes

#### Glassmorphism
```css
.glass-card
/* Light mode: Semi-transparent white with blur */

.glass-card-dark
/* Dark mode: Semi-transparent with stronger blur */
```

#### Neumorphism
```css
.neumorphic-button
/* Soft 3D button effect with multiple shadows */
```

#### Effects
```css
.glow-primary
/* Green glow effect for primary elements */

.glow-accent
/* Multi-color glow for accents */

.transition-smooth
/* Consistent smooth transitions (300ms) */
```

#### Animations
```css
.pulse-online
/* Pulsing animation for online status indicators */

.shimmer
/* Loading shimmer effect */

.float
/* Floating animation for decorative elements */

.fade-in
/* Smooth fade in animation */

.scale-bounce
/* Scale bounce for interactive feedback */
```

### Component Guidelines

#### Cards
- Always use `glass-card dark:glass-card-dark` for base styling
- Add `border-2 border-white/30 dark:border-white/10` for subtle borders
- Include `shadow-xl` for depth
- Add `hover:shadow-2xl transition-smooth` for interactive cards

#### Buttons
- **Primary Actions**: Use `neumorphic-button` with gradient backgrounds
- **Secondary Actions**: Use `glass-card` with outline styling
- Include appropriate icon from `lucide-react`
- Always add hover effects and transitions

#### Input Fields
```tsx
<Input
  className="glass-card dark:glass-card-dark border-white/30 dark:border-white/10 focus:border-[#3B945E]/50 focus:ring-[#3B945E]/20 transition-smooth"
/>
```

#### Badges
- Online status: Green with `pulse-online` animation
- Warning: Yellow with shadow
- Info: Blue with `glow-accent`

#### Tables
- Header: `glass-card dark:glass-card-dark border-b-2`
- Rows: `hover:bg-white/30 dark:hover:bg-white/5 transition-smooth`
- Borders: `border-white/20 dark:border-white/5`

### Layout Principles

#### Responsive Design
- Mobile-first approach
- Bottom navigation for mobile (< 768px)
- Side navigation for desktop
- Consistent spacing using Tailwind's scale

#### Spacing
- Section padding: `py-20`
- Card padding: `p-6` or `p-8`
- Gap between elements: `gap-4` or `gap-6`

#### Typography
- Do NOT override font sizes unless specifically needed
- Use default typography from `globals.css`
- Hierarchy through color and weight, not size

### Animation Guidelines

#### Motion Library
- Use `motion/react` for complex animations
- Initial states: `{ opacity: 0, y: 20 }`
- Duration: `0.3s - 0.6s` for most animations
- Use `viewport={{ once: true }}` for scroll animations

#### Micro-interactions
- Hover: Scale 1.05 or subtle shadow increase
- Active: Scale 0.95 or depth decrease
- Focus: Ring with primary color
- Transitions: Always use `transition-smooth`

### Dialog Components (Consistency Pattern)

All dialog components must follow the **DocumentationSection.tsx** pattern for consistency:

#### Structure
```tsx
import { Dialog/AlertDialog, DialogContent, DialogHeader, ... } from '../ui/dialog';

<Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className="w-full h-full sm:w-auto max-w-full sm:max-w-4xl sm:h-auto sm:max-h-[95vh] bg-white/98 dark:bg-[#0E172A]/98 sm:bg-white/95 sm:dark:bg-[#0E172A]/95 backdrop-blur-xl border-0 sm:border-2 sm:border-white/30 sm:dark:border-white/10 shadow-2xl p-0 gap-0 rounded-none sm:rounded-xl">
    {/* Header */}
    <DialogHeader className="flex-shrink-0 px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b border-white/20 dark:border-white/10 bg-gradient-to-br from-[#3B945E]/10 to-[#0077B6]/10 dark:from-[#3B945E]/20 dark:to-[#0077B6]/20 backdrop-blur-md gap-3">
      {/* Icon + Title */}
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 p-2.5 sm:p-3 rounded-xl bg-gradient-to-br from-[color] to-[color] text-white shadow-lg">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <DialogTitle className="text-lg sm:text-xl text-foreground mb-0.5">
            Title
          </DialogTitle>
        </div>
      </div>
      
      {/* Description */}
      <DialogDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed pl-0">
        Description text
      </DialogDescription>
    </DialogHeader>
    
    {/* Scrollable Content */}
    <div className="overflow-y-auto h-[calc(100vh-180px)] sm:h-auto sm:max-h-[calc(95vh-240px)] px-4 sm:px-6 py-4 sm:py-6">
      {/* Your content here */}
    </div>
  </DialogContent>
</Dialog>
```

#### Required Elements
- **Mobile-First Responsive**: Full screen on mobile, modal on desktop
- **Glass Background**: `bg-white/98 dark:bg-[#0E172A]/98` (mobile), `sm:bg-white/95 sm:dark:bg-[#0E172A]/95` (desktop)
- **Backdrop Blur**: `backdrop-blur-xl`
- **Borders**: `border-0 sm:border-2` - no border mobile, border desktop
- **Shadow**: `shadow-2xl`
- **Header**: Fixed with gradient background and border-bottom
- **Icon**: Static (no animation) in rounded-xl container
- **Content**: Scrollable with responsive padding
- **Responsive Padding**: `px-4 sm:px-6` - smaller on mobile

#### Key Differences from Previous Pattern
- ❌ NO motion animations (cleaner, more professional)
- ✅ Mobile-first responsive (full screen on mobile)
- ✅ Different header for mobile vs desktop
- ✅ Scrollable content area
- ✅ Glass morphism without heavy effects

#### Examples
- **DocumentationSection.tsx**: Tutorial dialog (reference template)
- **LogoutConfirmationDialog**: Confirmation dialogs
- **LeadDialog**: Form dialogs with submission
- **LegalDialog**: Content/documentation dialogs

### Accessibility

#### Color Contrast
- All text must meet WCAG AA standards
- Use `text-foreground` and `text-muted-foreground`
- Never rely on color alone for information

#### Interactive Elements
- Always include `aria-label` for icon-only buttons
- Use semantic HTML (`<button>`, `<nav>`, etc.)
- Keyboard navigation support
- Focus indicators visible

### State Management

#### Loading States
- Use `Skeleton` component with shimmer effect
- Show `Loader2` with spin animation for processing
- Disable buttons and show loading text

#### Empty States
- Use illustrative icons
- Provide clear messaging
- Include call-to-action when appropriate

#### Error States
- Red color scheme with clear messaging
- Provide actionable solutions
- Use toast notifications for non-critical errors

### Performance

#### Images
- Use `ImageWithFallback` component
- Implement lazy loading
- Optimize with Unsplash parameters

#### Animations
- Use CSS transforms over position changes
- Implement `will-change` for complex animations
- Disable animations for `prefers-reduced-motion`

### Code Style

#### File Organization
```
/data - Centralized data management ⭐ NEW PATTERN
  - All application data files (demo-*.ts)
  - Async API pattern with TypeScript support
  - index.ts - Centralized exports

/documentation - All project documentation ⭐ NEW PATTERN
  - Guidelines, testing, implementation docs
  - Component documentation
  - Version history and changelogs
  - All .md files MUST be placed here

/components
  /dashboard - Dashboard-specific components
    - Modular components (BackgroundPattern, DashboardLayout, etc.)
    - Page-specific components (AdminStats, SensorChart, etc.)
    - index.ts - Centralized exports
  /landing - Landing page components
    - All landing page section components
    - index.ts - Centralized exports
  /ui - Shadcn UI components (don't modify)
  /figma - Figma integration components
  [Page].tsx - Main page components
  [Feature].tsx - Feature components

/styles - Global styles
  - globals.css - Design system CSS

/utils - Utility functions
  - Helper functions and shared logic
```

#### Modular Components

**Dashboard Components** (Available in /components/dashboard)
- **BackgroundPattern** - Animated blob background
- **DashboardLayout** - Wrapper with gradient background
- **DashboardHeader** - Unified header for dashboards
- **LogoutConfirmationDialog** - Reusable logout confirmation
- **AdminStats** - Admin statistics component
- **BottomNav** - Mobile bottom navigation
- **DeviceMap** - Device location map
- **SensorChart** - Sensor data visualization

**Landing Page Components** (Available in /components/landing)
- **HeroSection** - Hero with logo, CTA, statistics
- **SectionHeader** - Reusable section header with badge
- **SDGCard** - Sustainable Development Goals card
- **UseCaseCard** - Use case display card
- **FeatureCard** - Feature display card
- **HowItWorksCard** - Step-by-step process card
- **BenefitsSection** - Benefits list with image
- **CTASection** - Call-to-action section
- **Footer** - Footer with links and social media

Usage:
```tsx
// Dashboard components
import { 
  DashboardLayout, 
  DashboardHeader,
  LogoutConfirmationDialog 
} from './components/dashboard';

// Landing components
import {
  HeroSection,
  SectionHeader,
  SDGCard
} from './components/landing';
```

#### Naming Conventions
- Components: PascalCase (e.g., `UserDashboard`)
- Files: PascalCase matching component name
- CSS Classes: kebab-case (e.g., `glass-card`)
- Variables: camelCase
- Documentation: SCREAMING_SNAKE_CASE.md (e.g., `QUICK_REFERENCE.md`)

#### Component Structure
1. Imports
2. Type definitions
3. Component function
4. Sub-components (if any)
5. Export

### Data Management Guidelines ⭐ NEW

#### Location
- All data files must be placed in `/data/`
- Use `demo-*.ts` naming convention for mock data
- Export types and fetch functions from each file
- Update `/data/index.ts` with centralized exports

#### Pattern
```typescript
// Example: /data/demo-example.ts
export interface ExampleItem {
  id: string;
  name: string;
}

const exampleData: ExampleItem[] = [
  { id: '1', name: 'Example' }
];

export async function fetchExamples(delay: number = 300): Promise<ExampleItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(exampleData), delay);
  });
}

export { exampleData as default };
```

#### Usage in Components
```typescript
import { fetchExamples, type ExampleItem } from '../data';

// Use async loading with states
const [data, setData] = useState<ExampleItem[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchExamples().then(setData).finally(() => setLoading(false));
}, []);
```

### Documentation Guidelines

#### Location
- All `.md` files must be placed in `/documentation/`
- Update `/documentation/README.md` when adding new docs
- Follow markdown best practices
- Use SCREAMING_SNAKE_CASE.md naming

#### Structure
```markdown
# Title

## Overview
Brief description

## Content sections...

---
**Last Updated**: Date
**Version**: X.X.X
**Status**: Status
```

### Best Practices

#### Do's
✓ Use utility classes from globals.css
✓ Implement glassmorphism consistently
✓ Add smooth transitions to all interactive elements
✓ Use semantic color variables
✓ Implement proper TypeScript types
✓ Test in both light and dark modes
✓ Place all data files in `/data/`
✓ Place all documentation in `/documentation/`
✓ Use async API pattern for data fetching
✓ Update index.ts when adding new modules

#### Don'ts
✗ Don't use arbitrary values when utility exists
✗ Don't override Shadcn components unnecessarily
✗ Don't use inline styles (use Tailwind classes)
✗ Don't forget mobile responsiveness
✗ Don't use `font-bold` or `text-2xl` without reason
✗ Don't mix design paradigms inconsistently
✗ Don't create `.md` files outside `/documentation/`
✗ Don't hardcode data in components - use `/data/` files
✗ Don't skip loading/error states for async data

### Testing Checklist

Before committing changes:
- [ ] Works in light and dark mode
- [ ] Responsive on mobile, tablet, desktop
- [ ] All animations smooth (60fps)
- [ ] Glassmorphism effects visible
- [ ] Proper hover/focus states
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] No console errors
- [ ] Loading states implemented
- [ ] Error handling in place
- [ ] Documentation updated if needed

### Future Enhancements

Planned features to implement:
- Real-time WebSocket integration
- Advanced data visualization
- Export functionality
- Multi-language support
- Progressive Web App features
- Offline mode support
- Push notifications
- Advanced filtering and search

---

**Last Updated**: October 23, 2025
**Design System Version**: 1.0  
**Documentation Location**: `/documentation/`  
**Maintained by**: AGROGUARD IoT Team
