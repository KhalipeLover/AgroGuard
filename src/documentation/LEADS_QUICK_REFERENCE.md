# Lead Management System - Quick Reference Card

🚀 **Quick start guide for developers**

---

## 📦 Import Components

```typescript
// Lead Dialog Form
import LeadDialog from './components/landing/LeadDialog';

// Admin Management View
import { LeadsManagement } from './components/dashboard';

// Data Functions
import { 
  fetchLeads, 
  addLead, 
  updateLeadStatus,
  getLeadsStats,
  type Lead 
} from './data';
```

---

## 🎯 Use LeadDialog in Your Component

```tsx
import { useState } from 'react';
import LeadDialog from './components/landing/LeadDialog';
import { Button } from './components/ui/button';

function MyComponent() {
  const [showLeadDialog, setShowLeadDialog] = useState(false);
  
  return (
    <>
      <Button onClick={() => setShowLeadDialog(true)}>
        Contact Us
      </Button>
      
      <LeadDialog
        open={showLeadDialog}
        onOpenChange={setShowLeadDialog}
        source="cta-button" // or "roi-calculator" or "contact-form"
      />
    </>
  );
}
```

---

## 📊 Fetch Leads (Admin View)

```tsx
import { useEffect, useState } from 'react';
import { fetchLeads, type Lead } from './data';

function AdminPanel() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchLeads()
      .then(setLeads)
      .finally(() => setLoading(false));
  }, []);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {leads.map(lead => (
        <div key={lead.id}>
          <h3>{lead.name}</h3>
          <p>{lead.email}</p>
          <span>Status: {lead.status}</span>
        </div>
      ))}
    </div>
  );
}
```

---

## ✍️ Add New Lead Programmatically

```tsx
import { addLead } from './data';
import { toast } from 'sonner@2.0.3';

const handleSubmit = async (formData) => {
  try {
    const newLead = await addLead({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      farmType: formData.farmType,
      farmSize: formData.farmSize,
      organization: formData.organization,
      message: formData.message,
      source: 'contact-form'
    });
    
    toast.success('Lead berhasil ditambahkan!');
    console.log('New lead:', newLead);
  } catch (error) {
    toast.error('Gagal menambahkan lead');
    console.error(error);
  }
};
```

---

## 🔄 Update Lead Status

```tsx
import { updateLeadStatus } from './data';
import { toast } from 'sonner@2.0.3';

const handleStatusChange = async (leadId: string, newStatus: string) => {
  try {
    await updateLeadStatus(
      leadId,
      newStatus as Lead['status'],
      'Follow-up notes here',  // optional
      'Admin Name'              // optional
    );
    
    toast.success('Status berhasil diupdate!');
  } catch (error) {
    toast.error('Gagal update status');
  }
};
```

---

## 📈 Get Lead Statistics

```tsx
import { useEffect, useState } from 'react';
import { getLeadsStats } from './data';

function StatsWidget() {
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    converted: 0
  });
  
  useEffect(() => {
    getLeadsStats().then(setStats);
  }, []);
  
  return (
    <div className="grid grid-cols-5 gap-4">
      <div>Total: {stats.total}</div>
      <div>New: {stats.new}</div>
      <div>Contacted: {stats.contacted}</div>
      <div>Qualified: {stats.qualified}</div>
      <div>Converted: {stats.converted}</div>
    </div>
  );
}
```

---

## 🎨 Status Colors Reference

```tsx
const statusColors = {
  new: 'text-blue-500 bg-blue-500/10 border-blue-500/30',
  contacted: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30',
  qualified: 'text-green-500 bg-green-500/10 border-green-500/30',
  converted: 'text-purple-500 bg-purple-500/10 border-purple-500/30',
  rejected: 'text-red-500 bg-red-500/10 border-red-500/30'
};

// Usage
<Badge className={statusColors[lead.status]}>
  {lead.status}
</Badge>
```

---

## 🔍 Filter Leads Example

```tsx
// Filter by status
const newLeads = leads.filter(l => l.status === 'new');

// Filter by source
const roiLeads = leads.filter(l => l.source === 'roi-calculator');

// Search by text
const searchResults = leads.filter(l => 
  l.name.toLowerCase().includes(query.toLowerCase()) ||
  l.email.toLowerCase().includes(query.toLowerCase())
);

// Combine filters
const filteredLeads = leads
  .filter(l => l.status === 'qualified')
  .filter(l => l.source === 'roi-calculator')
  .filter(l => l.location.includes('Sidoarjo'));
```

---

## 📱 Quick Actions

```tsx
// Email button
<Button 
  onClick={() => window.open(`mailto:${lead.email}`, '_blank')}
>
  <Mail className="w-4 h-4 mr-2" />
  Email
</Button>

// WhatsApp button
<Button 
  onClick={() => window.open(`https://wa.me/${lead.phone}`, '_blank')}
>
  <Phone className="w-4 h-4 mr-2" />
  WhatsApp
</Button>

// Call button
<Button 
  onClick={() => window.location.href = `tel:${lead.phone}`}
>
  <Phone className="w-4 h-4 mr-2" />
  Call
</Button>
```

---

## 🗂️ Lead Interface

```typescript
interface Lead {
  id: string;                    // Auto-generated
  timestamp: string;             // ISO format
  name: string;
  email: string;
  phone: string;
  organization?: string;
  location: string;
  farmSize?: string;             // Hectares
  farmType: string;              // Padi, Jagung, etc.
  message?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'rejected';
  source: 'roi-calculator' | 'cta-button' | 'contact-form';
  assignedTo?: string;
  notes?: string;
}
```

---

## 🎯 Farm Types

```typescript
const farmTypes = [
  'Padi',
  'Jagung',
  'Kedelai',
  'Hortikultura',
  'Perkebunan',
  'Lainnya'
];
```

---

## 💾 localStorage Key

```typescript
const STORAGE_KEY = 'agroguard-leads';

// Get leads
const leads = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

// Save leads
localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));

// Clear all leads (be careful!)
localStorage.removeItem(STORAGE_KEY);
```

---

## 🚨 Form Validation Rules

```typescript
{
  name: {
    required: 'Nama wajib diisi',
    minLength: { value: 3, message: 'Nama minimal 3 karakter' }
  },
  email: {
    required: 'Email wajib diisi',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Format email tidak valid'
    }
  },
  phone: {
    required: 'Nomor telepon wajib diisi',
    pattern: {
      value: /^[0-9]{10,13}$/,
      message: 'Nomor telepon harus 10-13 digit'
    }
  },
  location: {
    required: 'Lokasi wajib diisi'
  }
}
```

---

## 🎬 Toast Notifications

```tsx
import { toast } from 'sonner@2.0.3';

// Success
toast.success('Lead berhasil ditambahkan!', {
  description: 'Tim kami akan menghubungi Anda segera.',
  duration: 5000
});

// Error
toast.error('Gagal menambahkan lead', {
  description: 'Periksa koneksi internet Anda.',
  duration: 4000
});

// Info
toast.info('Lead sudah ada dalam sistem');

// Warning
toast.warning('Perhatian: Data tidak lengkap');
```

---

## 🔧 Common Patterns

### Pattern 1: Load leads with loading state
```tsx
const [leads, setLeads] = useState<Lead[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchLeads()
    .then(setLeads)
    .catch(error => console.error(error))
    .finally(() => setLoading(false));
}, []);
```

### Pattern 2: Add lead with feedback
```tsx
const [submitting, setSubmitting] = useState(false);

const handleSubmit = async (data) => {
  setSubmitting(true);
  try {
    await addLead(data);
    toast.success('Terima kasih!');
    reset(); // Clear form
  } catch (error) {
    toast.error('Gagal mengirim');
  } finally {
    setSubmitting(false);
  }
};
```

### Pattern 3: Update status with reload
```tsx
const handleStatusChange = async (id, status) => {
  await updateLeadStatus(id, status);
  toast.success('Status diupdate');
  
  // Reload data
  const updatedLeads = await fetchLeads();
  setLeads(updatedLeads);
  
  // Refresh stats
  const stats = await getLeadsStats();
  setStats(stats);
};
```

---

## 📐 Responsive Design

```tsx
// Desktop: Full layout
<div className="hidden md:block">
  <LeadsManagement />
</div>

// Mobile: Compact layout
<div className="md:hidden">
  <LeadsMobileView />
</div>

// Grid responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {leads.map(lead => <LeadCard key={lead.id} lead={lead} />)}
</div>
```

---

## 🎨 Design System Classes

```tsx
// Glass card
className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10"

// Neumorphic button
className="neumorphic-button bg-gradient-to-r from-[#3B945E] to-[#0077B6]"

// Input field
className="glass-card dark:glass-card-dark border-white/30 dark:border-white/10 
          focus:border-[#3B945E]/50 focus:ring-[#3B945E]/20 transition-smooth"

// Status badge
className="border bg-blue-500/10 text-blue-500 border-blue-500/30"
```

---

## 🐛 Troubleshooting

### Issue: Lead tidak tersimpan
```tsx
// Check localStorage quota
if (localStorage.getItem('agroguard-leads')) {
  console.log('Leads saved:', JSON.parse(localStorage.getItem('agroguard-leads')));
} else {
  console.log('No leads found');
}
```

### Issue: Form validation tidak jalan
```tsx
// Verify react-hook-form version
import { useForm } from 'react-hook-form@7.55.0';
```

### Issue: Toast tidak muncul
```tsx
// Import toast dengan version
import { toast } from 'sonner@2.0.3';
```

---

## ⚡ Performance Tips

1. **Use React.memo for lead cards**
```tsx
const LeadCard = React.memo(({ lead }) => {
  return <div>{lead.name}</div>;
});
```

2. **Debounce search input**
```tsx
const debouncedSearch = useMemo(
  () => debounce((query) => setSearchQuery(query), 300),
  []
);
```

3. **Paginate long lists**
```tsx
const displayedLeads = leads.slice(page * pageSize, (page + 1) * pageSize);
```

---

## 🔗 Related Documentation

- [Full Feature Documentation](./LEADS_MANAGEMENT_FEATURE.md)
- [Implementation Summary](./BUGFIX_AND_LEADS_SUMMARY.md)
- [Design Guidelines](./Guidelines.md)
- [Data Structure](./DATA_STRUCTURE.md)

---

## 📞 Need Help?

- **Component not working?** Check imports and props
- **Validation failing?** Verify react-hook-form@7.55.0
- **Styling issues?** Check design system classes
- **Data not saving?** Check localStorage quota

---

**Quick Reference Version:** 1.0.0  
**Last Updated:** October 26, 2025  
**Status:** Production Ready ✅

---

**Happy Coding! 🚀**
