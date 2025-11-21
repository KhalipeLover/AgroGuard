# Lead Management System - Backend Migration Guide

**Guide untuk mengintegrasikan Lead Management dengan real backend API**

---

## 📋 Overview

Sistem Lead Management saat ini menggunakan localStorage untuk demo. Guide ini menjelaskan cara migrate ke real backend API dengan minimal code changes.

---

## 🎯 Migration Strategy

### Current Architecture (Demo)
```
Frontend Component
    ↓
Data Functions (demo-leads.ts)
    ↓
localStorage
```

### Target Architecture (Production)
```
Frontend Component
    ↓
Data Functions (demo-leads.ts) ← MODIFY HERE
    ↓
API Client (fetch/axios)
    ↓
Backend API
    ↓
Database (PostgreSQL/MongoDB)
```

**Key Advantage:** Only need to modify ONE file (`/data/demo-leads.ts`)!

---

## 🔧 Step-by-Step Migration

### Step 1: Create API Client

Create `/utils/apiClient.ts`:

```typescript
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3000/api';

export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}
```

### Step 2: Update Environment Variables

Create `.env`:

```env
VITE_API_URL=https://api.agroguard.com
VITE_API_KEY=your-api-key-here
```

### Step 3: Modify `/data/demo-leads.ts`

Replace localStorage code with API calls:

```typescript
// Before (localStorage)
export async function fetchLeads(delay: number = 300): Promise<Lead[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const saved = localStorage.getItem('agroguard-leads');
      const leads = saved ? JSON.parse(saved) : [];
      resolve(leads);
    }, delay);
  });
}

// After (API) ✅
import { apiRequest } from '../utils/apiClient';

export async function fetchLeads(): Promise<Lead[]> {
  try {
    const leads = await apiRequest<Lead[]>('/leads');
    return leads;
  } catch (error) {
    console.error('Error fetching leads:', error);
    throw error;
  }
}
```

### Step 4: Update All CRUD Functions

#### addLead()
```typescript
// Before (localStorage)
export async function addLead(lead: Omit<Lead, 'id' | 'timestamp' | 'status'>): Promise<Lead> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newLead: Lead = {
        ...lead,
        id: `lead-${Date.now()}`,
        timestamp: new Date().toISOString(),
        status: 'new'
      };
      
      const saved = localStorage.getItem('agroguard-leads');
      const leads = saved ? JSON.parse(saved) : [];
      leads.unshift(newLead);
      localStorage.setItem('agroguard-leads', JSON.stringify(leads));
      
      resolve(newLead);
    }, 500);
  });
}

// After (API) ✅
export async function addLead(lead: Omit<Lead, 'id' | 'timestamp' | 'status'>): Promise<Lead> {
  try {
    const newLead = await apiRequest<Lead>('/leads', {
      method: 'POST',
      body: JSON.stringify(lead),
    });
    return newLead;
  } catch (error) {
    console.error('Error adding lead:', error);
    throw error;
  }
}
```

#### updateLeadStatus()
```typescript
// Before (localStorage)
export async function updateLeadStatus(
  leadId: string, 
  status: Lead['status'],
  notes?: string,
  assignedTo?: string
): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const saved = localStorage.getItem('agroguard-leads');
      if (saved) {
        const leads: Lead[] = JSON.parse(saved);
        const leadIndex = leads.findIndex(l => l.id === leadId);
        if (leadIndex !== -1) {
          leads[leadIndex].status = status;
          if (notes) leads[leadIndex].notes = notes;
          if (assignedTo) leads[leadIndex].assignedTo = assignedTo;
          localStorage.setItem('agroguard-leads', JSON.stringify(leads));
        }
      }
      resolve();
    }, 300);
  });
}

// After (API) ✅
export async function updateLeadStatus(
  leadId: string, 
  status: Lead['status'],
  notes?: string,
  assignedTo?: string
): Promise<void> {
  try {
    await apiRequest(`/leads/${leadId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes, assignedTo }),
    });
  } catch (error) {
    console.error('Error updating lead:', error);
    throw error;
  }
}
```

#### getLeadsStats()
```typescript
// Before (localStorage)
export async function getLeadsStats(): Promise<{
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  converted: number;
}> {
  const leads = await fetchLeads(0);
  return {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    qualified: leads.filter(l => l.status === 'qualified').length,
    converted: leads.filter(l => l.status === 'converted').length
  };
}

// After (API) ✅
export async function getLeadsStats(): Promise<{
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  converted: number;
}> {
  try {
    const stats = await apiRequest<LeadStats>('/leads/stats');
    return stats;
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
}
```

---

## 🗄️ Backend API Specification

### Endpoints Required

#### 1. GET /api/leads
Fetch all leads (with pagination)

**Request:**
```http
GET /api/leads?page=1&limit=50&status=new&source=roi-calculator
Authorization: Bearer {token}
```

**Response:**
```json
{
  "data": [
    {
      "id": "lead-123",
      "timestamp": "2025-10-26T10:30:00.000Z",
      "name": "Budi Santoso",
      "email": "budi@example.com",
      "phone": "08123456789",
      "organization": "Kelompok Tani Makmur",
      "location": "Sidoarjo, Jawa Timur",
      "farmSize": "5",
      "farmType": "Padi",
      "message": "Tertarik dengan IoT",
      "status": "new",
      "source": "roi-calculator",
      "assignedTo": null,
      "notes": null
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 100,
    "totalPages": 2
  }
}
```

#### 2. POST /api/leads
Create new lead

**Request:**
```http
POST /api/leads
Content-Type: application/json

{
  "name": "Budi Santoso",
  "email": "budi@example.com",
  "phone": "08123456789",
  "location": "Sidoarjo",
  "farmType": "Padi",
  "farmSize": "5",
  "organization": "Kelompok Tani Makmur",
  "message": "Tertarik dengan IoT",
  "source": "roi-calculator"
}
```

**Response:**
```json
{
  "data": {
    "id": "lead-123",
    "timestamp": "2025-10-26T10:30:00.000Z",
    ...submitted data,
    "status": "new"
  }
}
```

#### 3. PATCH /api/leads/:id
Update lead status/notes

**Request:**
```http
PATCH /api/leads/lead-123
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "qualified",
  "notes": "Demo scheduled",
  "assignedTo": "admin@agroguard.com"
}
```

**Response:**
```json
{
  "data": {
    "id": "lead-123",
    ...updated lead data
  }
}
```

#### 4. GET /api/leads/stats
Get lead statistics

**Request:**
```http
GET /api/leads/stats
Authorization: Bearer {token}
```

**Response:**
```json
{
  "data": {
    "total": 100,
    "new": 35,
    "contacted": 25,
    "qualified": 20,
    "converted": 15,
    "rejected": 5
  }
}
```

#### 5. DELETE /api/leads/:id (Optional)
Delete a lead

**Request:**
```http
DELETE /api/leads/lead-123
Authorization: Bearer {token}
```

**Response:**
```json
{
  "message": "Lead deleted successfully"
}
```

---

## 🔐 Authentication

Add auth token to API requests:

```typescript
export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const token = localStorage.getItem('auth-token');
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options?.headers,
    },
  });

  if (response.status === 401) {
    // Redirect to login
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}
```

---

## 📧 Email Notifications

### Backend Implementation

When a new lead is created:

```typescript
// Backend: POST /api/leads handler
app.post('/api/leads', async (req, res) => {
  const lead = await Lead.create(req.body);
  
  // Send email to admin
  await sendEmail({
    to: 'admin@agroguard.com',
    subject: 'New Lead Submission',
    template: 'new-lead',
    data: {
      leadName: lead.name,
      leadEmail: lead.email,
      leadPhone: lead.phone,
      source: lead.source,
      dashboardLink: `https://admin.agroguard.com/leads/${lead.id}`
    }
  });
  
  // Send confirmation to lead
  await sendEmail({
    to: lead.email,
    subject: 'Terima kasih telah menghubungi AGROGUARD',
    template: 'lead-confirmation',
    data: {
      name: lead.name
    }
  });
  
  res.json({ data: lead });
});
```

### Email Templates

**Admin notification:**
```html
<!-- templates/new-lead.html -->
<h2>New Lead Submission</h2>
<p><strong>Name:</strong> {{leadName}}</p>
<p><strong>Email:</strong> {{leadEmail}}</p>
<p><strong>Phone:</strong> {{leadPhone}}</p>
<p><strong>Source:</strong> {{source}}</p>
<a href="{{dashboardLink}}">View in Dashboard</a>
```

**Lead confirmation:**
```html
<!-- templates/lead-confirmation.html -->
<h2>Terima kasih, {{name}}!</h2>
<p>Tim AGROGUARD akan menghubungi Anda dalam 1x24 jam.</p>
```

---

## 🗃️ Database Schema

### PostgreSQL

```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  organization VARCHAR(255),
  location VARCHAR(255) NOT NULL,
  farm_size DECIMAL(10, 2),
  farm_type VARCHAR(100) NOT NULL,
  message TEXT,
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'rejected')),
  source VARCHAR(50) NOT NULL CHECK (source IN ('roi-calculator', 'cta-button', 'contact-form')),
  assigned_to VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
```

### MongoDB

```javascript
const leadSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  organization: String,
  location: { type: String, required: true },
  farmSize: Number,
  farmType: { type: String, required: true },
  message: String,
  status: {
    type: String,
    enum: ['new', 'contacted', 'qualified', 'converted', 'rejected'],
    default: 'new'
  },
  source: {
    type: String,
    enum: ['roi-calculator', 'cta-button', 'contact-form'],
    required: true
  },
  assignedTo: String,
  notes: String
}, {
  timestamps: true
});

leadSchema.index({ status: 1 });
leadSchema.index({ source: 1 });
leadSchema.index({ createdAt: -1 });

const Lead = mongoose.model('Lead', leadSchema);
```

---

## 🔄 Gradual Migration Strategy

### Phase 1: Dual Mode (localStorage + API)
Keep both for testing:

```typescript
const USE_API = process.env.VITE_USE_API === 'true';

export async function fetchLeads(): Promise<Lead[]> {
  if (USE_API) {
    return apiRequest<Lead[]>('/leads');
  } else {
    // Existing localStorage code
    const saved = localStorage.getItem('agroguard-leads');
    return saved ? JSON.parse(saved) : [];
  }
}
```

### Phase 2: API with localStorage Fallback
Use API but fallback to localStorage if offline:

```typescript
export async function fetchLeads(): Promise<Lead[]> {
  try {
    const leads = await apiRequest<Lead[]>('/leads');
    // Cache in localStorage for offline access
    localStorage.setItem('leads-cache', JSON.stringify(leads));
    return leads;
  } catch (error) {
    console.warn('API unavailable, using cached data');
    const cached = localStorage.getItem('leads-cache');
    return cached ? JSON.parse(cached) : [];
  }
}
```

### Phase 3: Full API (Production)
Remove localStorage completely:

```typescript
export async function fetchLeads(): Promise<Lead[]> {
  return apiRequest<Lead[]>('/leads');
}
```

---

## 🚀 Deployment Checklist

### Frontend
- [ ] Update API_BASE_URL in .env
- [ ] Add authentication token handling
- [ ] Update demo-leads.ts with API calls
- [ ] Test all CRUD operations
- [ ] Verify error handling
- [ ] Check loading states
- [ ] Test offline behavior (if needed)

### Backend
- [ ] Implement all API endpoints
- [ ] Set up database schema
- [ ] Configure email service
- [ ] Add authentication middleware
- [ ] Implement rate limiting
- [ ] Add input validation
- [ ] Set up logging
- [ ] Configure CORS
- [ ] Add API documentation
- [ ] Deploy to production

---

## 🔒 Security Best Practices

### 1. Input Validation
```typescript
// Backend validation
const validateLeadInput = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[0-9]{10,13}$/).required(),
    location: Joi.string().required(),
    farmType: Joi.string().valid('Padi', 'Jagung', 'Kedelai', 'Hortikultura', 'Perkebunan', 'Lainnya').required(),
    // ... other fields
  });
  
  return schema.validate(data);
};
```

### 2. Rate Limiting
```typescript
// Backend: Prevent spam submissions
import rateLimit from 'express-rate-limit';

const leadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 submissions per 15 minutes
  message: 'Too many lead submissions, please try again later'
});

app.post('/api/leads', leadLimiter, handleLeadSubmission);
```

### 3. CAPTCHA (Optional)
```tsx
// Frontend: Add reCAPTCHA to LeadDialog
import ReCAPTCHA from "react-google-recaptcha";

const handleSubmit = async (data) => {
  const captchaToken = await recaptchaRef.current.getValue();
  
  await addLead({
    ...data,
    captchaToken
  });
};
```

### 4. Sanitization
```typescript
// Backend: Sanitize input to prevent XSS
import DOMPurify from 'isomorphic-dompurify';

const sanitizedLead = {
  ...lead,
  name: DOMPurify.sanitize(lead.name),
  message: DOMPurify.sanitize(lead.message)
};
```

---

## 📊 Analytics Integration

Track lead sources and conversions:

```typescript
// Frontend: Track lead submission
import { analytics } from './utils/analytics';

const onSubmit = async (data) => {
  const lead = await addLead(data);
  
  // Track event
  analytics.track('Lead Submitted', {
    leadId: lead.id,
    source: lead.source,
    farmType: lead.farmType,
    location: lead.location
  });
};

// Track status changes
const handleStatusChange = async (leadId, status) => {
  await updateLeadStatus(leadId, status);
  
  analytics.track('Lead Status Changed', {
    leadId,
    newStatus: status
  });
};
```

---

## 🧪 Testing

### Unit Tests
```typescript
// tests/leads.test.ts
import { fetchLeads, addLead } from '../data/demo-leads';

describe('Lead Management', () => {
  it('should fetch leads', async () => {
    const leads = await fetchLeads();
    expect(leads).toBeInstanceOf(Array);
  });
  
  it('should add new lead', async () => {
    const newLead = await addLead({
      name: 'Test User',
      email: 'test@example.com',
      phone: '08123456789',
      location: 'Test Location',
      farmType: 'Padi',
      source: 'cta-button'
    });
    
    expect(newLead).toHaveProperty('id');
    expect(newLead.status).toBe('new');
  });
});
```

### Integration Tests
```typescript
// tests/leads-api.test.ts
import request from 'supertest';
import app from '../app';

describe('Lead API', () => {
  it('POST /api/leads should create lead', async () => {
    const response = await request(app)
      .post('/api/leads')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        phone: '08123456789',
        location: 'Test',
        farmType: 'Padi',
        source: 'cta-button'
      });
    
    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty('id');
  });
});
```

---

## 📈 Monitoring

### Log Important Events
```typescript
// Backend logging
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

app.post('/api/leads', async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    
    logger.info('New lead created', {
      leadId: lead.id,
      source: lead.source,
      timestamp: new Date()
    });
    
    res.json({ data: lead });
  } catch (error) {
    logger.error('Error creating lead', {
      error: error.message,
      body: req.body
    });
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

---

## 🔄 Backup & Recovery

### Database Backup
```bash
# PostgreSQL
pg_dump -U postgres agroguard > backup.sql

# MongoDB
mongodump --db agroguard --out /backup

# Restore
psql -U postgres agroguard < backup.sql
mongorestore --db agroguard /backup/agroguard
```

### Data Export
```typescript
// Export leads to CSV
app.get('/api/leads/export', requireAdmin, async (req, res) => {
  const leads = await Lead.find();
  
  const csv = json2csv(leads, {
    fields: ['id', 'name', 'email', 'phone', 'status', 'createdAt']
  });
  
  res.header('Content-Type', 'text/csv');
  res.attachment('leads.csv');
  res.send(csv);
});
```

---

## 🎯 Performance Optimization

### 1. Pagination
```typescript
export async function fetchLeads(
  page: number = 1,
  limit: number = 50
): Promise<{ data: Lead[], pagination: Pagination }> {
  const response = await apiRequest<LeadsResponse>(
    `/leads?page=${page}&limit=${limit}`
  );
  return response;
}
```

### 2. Caching
```typescript
import { useQuery } from '@tanstack/react-query';

function LeadsManagement() {
  const { data, isLoading } = useQuery({
    queryKey: ['leads'],
    queryFn: fetchLeads,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

### 3. Debounced Search
```typescript
const debouncedSearch = useMemo(
  () => debounce((query) => {
    fetchLeads({ search: query });
  }, 300),
  []
);
```

---

## 📝 Summary

### Migration Checklist
- [ ] Create API client utility
- [ ] Set up environment variables
- [ ] Update demo-leads.ts with API calls
- [ ] Implement backend endpoints
- [ ] Set up database
- [ ] Configure email notifications
- [ ] Add authentication
- [ ] Implement rate limiting
- [ ] Test all functionality
- [ ] Deploy to production

### Key Points
✅ Only modify ONE file: `/data/demo-leads.ts`  
✅ Keep interface unchanged for components  
✅ Add proper error handling  
✅ Implement authentication  
✅ Set up email notifications  
✅ Monitor and log events  
✅ Backup data regularly

---

**Last Updated:** October 26, 2025  
**Version:** 1.0.0  
**Status:** Migration Guide Complete

**Need Help?** Contact the development team or refer to API documentation.
