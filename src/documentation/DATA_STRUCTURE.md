# AGROGUARD IoT - Data Structure Documentation

## Overview
This document describes the centralized data management system for AGROGUARD IoT application, located in `/data/` directory.

---

## Table of Contents
- [Architecture](#architecture)
- [Data Files](#data-files)
- [Usage Examples](#usage-examples)
- [API Pattern](#api-pattern)
- [TypeScript Support](#typescript-support)

---

## Architecture

### Directory Structure
```
/data/
├── index.ts                    ← Centralized exports
├── demo-statistics.ts          ← Hero section statistics
├── demo-sdg-goals.ts           ← Sustainable Development Goals
├── demo-features.ts            ← Features section data
├── demo-use-cases.ts           ← Use cases with images
├── demo-benefits.ts            ← Benefits list
├── demo-how-it-works.ts        ← How it works steps
├── demo-testimonials.ts        ← Customer testimonials
├── demo-documentation.ts       ← Tutorial documentation
└── demo-faq.ts                 ← Frequently asked questions
```

### Design Principles
1. **Centralized Management** - Single source of truth for all data
2. **Async API Pattern** - All data fetched through async functions
3. **TypeScript Support** - Full type definitions exported
4. **Modular** - Easy to switch between mock and real API
5. **Scalable** - Easy to add new data sources

---

## Data Files

### 1. demo-statistics.ts
**Purpose**: Hero section statistics (devices, cities, efficiency, savings)

**Interface**:
```typescript
interface Statistic {
  value: string;
  label: string;
  icon: string; // Lucide icon name
}
```

**Functions**:
- `fetchStatistics(delay?: number): Promise<Statistic[]>`

**Data Count**: 4 statistics

---

### 2. demo-sdg-goals.ts
**Purpose**: UN Sustainable Development Goals alignment

**Interface**:
```typescript
interface SDGGoal {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string; // Figma asset import
}
```

**Functions**:
- `fetchSDGGoals(delay?: number): Promise<SDGGoal[]>`

**Data Count**: 4 SDG goals (2, 9, 11, 13)

---

### 3. demo-features.ts
**Purpose**: Main features of the application

**Interface**:
```typescript
interface Feature {
  icon: string; // Lucide icon name
  title: string;
  description: string;
  color: string; // Tailwind color classes
}
```

**Functions**:
- `fetchFeatures(delay?: number): Promise<Feature[]>`

**Data Count**: 6 features

---

### 4. demo-use-cases.ts
**Purpose**: Real-world use cases with statistics

**Interface**:
```typescript
interface UseCase {
  title: string;
  description: string;
  image: string; // Unsplash URL
  icon: string; // Lucide icon name
  stats: string[];
}
```

**Functions**:
- `fetchUseCases(delay?: number): Promise<UseCase[]>`

**Data Count**: 3 use cases (Smart Village, Urban Farming, Rice Field)

---

### 5. demo-benefits.ts
**Purpose**: Key benefits list

**Interface**:
```typescript
interface Benefit {
  text: string;
  icon: string; // Lucide icon name
}
```

**Functions**:
- `fetchBenefits(delay?: number): Promise<Benefit[]>`

**Data Count**: 6 benefits

---

### 6. demo-how-it-works.ts
**Purpose**: Step-by-step process

**Interface**:
```typescript
interface HowItWorksStep {
  step: string;
  title: string;
  description: string;
  color: string; // Tailwind background classes
  icon: string; // Lucide icon name
}
```

**Functions**:
- `fetchHowItWorks(delay?: number): Promise<HowItWorksStep[]>`

**Data Count**: 3 steps

---

### 7. demo-testimonials.ts
**Purpose**: Customer testimonials with results

**Interface**:
```typescript
interface TestimonialResult {
  label: string;
  value: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  rating: number;
  testimonial: string;
  results: TestimonialResult[];
}
```

**Functions**:
- `fetchTestimonials(delay?: number): Promise<Testimonial[]>`
- `fetchTestimonialById(id: string, delay?: number): Promise<Testimonial | null>`

**Data Count**: 6 testimonials

---

### 8. demo-documentation.ts
**Purpose**: Tutorial and documentation slides

**Interface**:
```typescript
interface DocumentationSlide {
  id: number;
  category: string;
  title: string;
  description: string;
  image: string; // Unsplash URL
  categoryColor: string;
  tutorialSteps?: string[];
  videoUrl?: string;
  pdfUrl?: string;
}
```

**Functions**:
- `fetchDocumentation(delay?: number): Promise<DocumentationSlide[]>`
- `fetchDocumentationById(id: number, delay?: number): Promise<DocumentationSlide | null>`
- `fetchDocumentationByCategory(category: string, delay?: number): Promise<DocumentationSlide[]>`

**Data Count**: 6 documentation slides

---

### 9. demo-faq.ts
**Purpose**: Frequently asked questions

**Interface**:
```typescript
interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
```

**Functions**:
- `fetchFAQ(delay?: number): Promise<FAQItem[]>`
- `fetchFAQByCategory(category: string, delay?: number): Promise<FAQItem[]>`
- `searchFAQ(keyword: string, delay?: number): Promise<FAQItem[]>`
- `getFAQCategories(): string[]`

**Data Count**: 14 FAQ items across 4 categories

---

## Usage Examples

### Basic Usage

```typescript
import { fetchStatistics, fetchFeatures } from '../data';

// In component
useEffect(() => {
  const loadData = async () => {
    try {
      const stats = await fetchStatistics();
      setStatistics(stats);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };
  
  loadData();
}, []);
```

### With Loading States

```typescript
import { fetchTestimonials, type Testimonial } from '../data';

const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const loadTestimonials = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTestimonials(500); // 500ms delay
      setTestimonials(data);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };
  
  loadTestimonials();
}, []);
```

### Centralized Import

```typescript
// Import from index.ts for cleaner code
import {
  fetchStatistics,
  fetchFeatures,
  fetchUseCases,
  fetchBenefits,
  type Statistic,
  type Feature,
  type UseCase,
  type Benefit
} from '../data';
```

---

## API Pattern

### Simulated Async Calls

All fetch functions simulate API calls using Promises:

```typescript
export async function fetchStatistics(delay: number = 300): Promise<Statistic[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(statisticsData);
    }, delay);
  });
}
```

### Benefits
1. **Realistic Loading States** - Simulate network delays
2. **Easy Testing** - Adjust delays for testing
3. **Future-Proof** - Easy to replace with real API calls
4. **Error Simulation** - Can add error scenarios

### Migrating to Real API

```typescript
// Before (mock)
export async function fetchStatistics(delay: number = 300): Promise<Statistic[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(statisticsData), delay);
  });
}

// After (real API)
export async function fetchStatistics(): Promise<Statistic[]> {
  const response = await fetch('/api/statistics');
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
}
```

---

## TypeScript Support

### Type Exports

All interfaces are exported for use in components:

```typescript
// Export types along with data
export { 
  default as statisticsData,
  fetchStatistics,
  type Statistic 
} from './demo-statistics';
```

### Type Safety in Components

```typescript
import { type Testimonial } from '../data';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  // TypeScript will enforce correct structure
  return (
    <div>
      <h3>{testimonial.name}</h3>
      <p>{testimonial.role} at {testimonial.company}</p>
      <p>{testimonial.testimonial}</p>
    </div>
  );
}
```

---

## Best Practices

### ✅ Do's
- Import from `/data/index.ts` for centralized access
- Use TypeScript interfaces for type safety
- Handle loading and error states
- Use appropriate delay values for testing
- Keep data structure consistent

### ❌ Don'ts
- Don't hardcode data in components
- Don't skip error handling
- Don't bypass the index.ts exports
- Don't modify data structure without updating types
- Don't forget to add new data files to index.ts

---

## Future Enhancements

### Planned Improvements
1. **Real API Integration** - Connect to backend API
2. **Caching Layer** - Add React Query or SWR
3. **Optimistic Updates** - Improve UX with optimistic UI
4. **Data Validation** - Add Zod/Yup validation
5. **Pagination** - Add pagination support
6. **Real-time Updates** - WebSocket integration
7. **Offline Support** - IndexedDB caching

---

## Migration History

### October 23, 2025 - Complete Data Migration
- ✅ Created `/data/` directory structure
- ✅ Migrated all landing page data
- ✅ Implemented async API pattern
- ✅ Added TypeScript interfaces
- ✅ Updated all components to use centralized data
- ✅ Added loading states and error handling
- ✅ Created centralized index.ts exports

**Migration Impact**:
- Landing page: 100% dynamic data ✓
- Dashboard: Mock data (expected) ✓
- Total data files: 9 ✓
- Components updated: 13 ✓

---

## Data Statistics

| Data File | Items | Categories | Functions |
|-----------|-------|------------|-----------|
| demo-statistics.ts | 4 | 1 | 1 |
| demo-sdg-goals.ts | 4 | 1 | 1 |
| demo-features.ts | 6 | 1 | 1 |
| demo-use-cases.ts | 3 | 1 | 1 |
| demo-benefits.ts | 6 | 1 | 1 |
| demo-how-it-works.ts | 3 | 1 | 1 |
| demo-testimonials.ts | 6 | 1 | 2 |
| demo-documentation.ts | 6 | 6 | 3 |
| demo-faq.ts | 14 | 4 | 4 |
| **Total** | **52** | **18** | **16** |

---

**Last Updated**: October 23, 2025  
**Version**: 1.0  
**Status**: Complete ✅  
**Maintained by**: AGROGUARD IoT Team
