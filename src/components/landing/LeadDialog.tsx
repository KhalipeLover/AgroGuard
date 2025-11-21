/**
 * Lead Dialog Component
 * Form untuk capture prospective customers
 * 
 * Features:
 * - Mobile-first responsive design
 * - Glass morphism styling
 * - Native form validation
 * - Toast notifications
 * - Success state dengan feedback
 */

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from '../ui/simple-toast';
import { addLead } from '../../data';
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  MapPin, 
  Sprout, 
  Ruler,
  MessageSquare,
  Send,
  Loader2,
  CheckCircle
} from 'lucide-react';

interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  organization?: string;
  location: string;
  farmSize?: string;
  farmType: string;
  message?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
}

interface LeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source?: 'roi-calculator' | 'cta-button' | 'contact-form';
}

export default function LeadDialog({ open, onOpenChange, source = 'cta-button' }: LeadDialogProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    phone: '',
    organization: '',
    location: '',
    farmSize: '',
    farmType: 'Padi',
    message: ''
  });

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        location: '',
        farmSize: '',
        farmType: 'Padi',
        message: ''
      });
      setErrors({});
      setSubmitted(false);
    }
  }, [open]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Nama wajib diisi';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Nama minimal 3 karakter';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Nomor telepon wajib diisi';
    } else if (!/^[0-9]{10,13}$/.test(formData.phone)) {
      newErrors.phone = 'Nomor telepon harus 10-13 digit';
    }

    // Location validation
    if (!formData.location.trim()) {
      newErrors.location = 'Lokasi wajib diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Form tidak valid!', {
        description: 'Periksa kembali isian Anda.',
        duration: 3000
      });
      return;
    }

    setSubmitting(true);

    try {
      await addLead({
        ...formData,
        source
      });

      setSubmitted(true);
      toast.success('Terima kasih! Kami akan segera menghubungi Anda.', {
        description: 'Tim kami akan menindaklanjuti permintaan Anda dalam 1x24 jam.',
        duration: 5000
      });

      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          organization: '',
          location: '',
          farmSize: '',
          farmType: 'Padi',
          message: ''
        });
        setSubmitted(false);
        onOpenChange(false);
      }, 2000);
    } catch {
      toast.error('Gagal mengirim data. Silakan coba lagi.', {
        description: 'Periksa koneksi internet Anda dan coba lagi.',
        duration: 4000
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field: keyof LeadFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleClose = () => {
    if (!submitting) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        location: '',
        farmSize: '',
        farmType: 'Padi',
        message: ''
      });
      setErrors({});
      setSubmitted(false);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-full h-full sm:w-auto max-w-full sm:max-w-2xl sm:h-auto sm:max-h-[95vh] bg-white/98 dark:bg-[#0E172A]/98 sm:bg-white/95 sm:dark:bg-[#0E172A]/95 backdrop-blur-xl border-0 sm:border-2 sm:border-white/30 sm:dark:border-white/10 shadow-2xl p-0 gap-0 rounded-none sm:rounded-xl">
        <DialogHeader className="flex-shrink-0 px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b border-white/20 dark:border-white/10 bg-gradient-to-br from-[#3B945E]/10 to-[#0077B6]/10 dark:from-[#3B945E]/20 dark:to-[#0077B6]/20 backdrop-blur-md gap-3">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 p-2.5 sm:p-3 rounded-xl bg-gradient-to-br from-[#3B945E] to-[#0077B6] text-white shadow-lg">
              <Sprout className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-lg sm:text-xl text-foreground mb-0.5">
                Mulai Dengan AGROGUARD IoT
              </DialogTitle>
            </div>
          </div>
          
          <DialogDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed pl-0">
            Isi formulir di bawah ini dan tim kami akan menghubungi Anda untuk konsultasi gratis
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto h-[calc(100vh-140px)] sm:h-auto sm:max-h-[calc(95vh-180px)] px-4 sm:px-6 py-4 sm:py-6">
          {submitted ? (
            <div className="py-8 sm:py-12 text-center space-y-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gradient-to-br from-green-100 to-green-200 dark:from-green-950/50 dark:to-green-900/50 flex items-center justify-center shadow-lg">
                <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-[#3B945E] dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl text-foreground mb-2">Terima Kasih!</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Data Anda telah kami terima. Tim kami akan segera menghubungi Anda dalam 1x24 jam.
                </p>
              </div>
            </div>
          ) : (
            <form 
              onSubmit={handleSubmit}
              className="space-y-4"
              noValidate
            >
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#3B945E]" />
                  Nama Lengkap <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  autoComplete="off"
                  className="glass-card dark:glass-card-dark border-white/30 dark:border-white/10 focus:border-[#3B945E]/50 focus:ring-[#3B945E]/20 transition-smooth"
                  disabled={submitting}
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#3B945E]" />
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="contoh@email.com"
                  autoComplete="off"
                  className="glass-card dark:glass-card-dark border-white/30 dark:border-white/10 focus:border-[#3B945E]/50 focus:ring-[#3B945E]/20 transition-smooth"
                  disabled={submitting}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#3B945E]" />
                  Nomor Telepon <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="08123456789"
                  autoComplete="off"
                  className="glass-card dark:glass-card-dark border-white/30 dark:border-white/10 focus:border-[#3B945E]/50 focus:ring-[#3B945E]/20 transition-smooth"
                  disabled={submitting}
                />
                {errors.phone && (
                  <p className="text-xs text-red-500">{errors.phone}</p>
                )}
              </div>

              {/* Organization (Optional) */}
              <div className="space-y-2">
                <Label htmlFor="organization" className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#3B945E]" />
                  Organisasi/Perusahaan <span className="text-xs text-muted-foreground">(Opsional)</span>
                </Label>
                <Input
                  id="organization"
                  value={formData.organization}
                  onChange={(e) => handleChange('organization', e.target.value)}
                  placeholder="Contoh: Kelompok Tani Makmur"
                  autoComplete="off"
                  className="glass-card dark:glass-card-dark border-white/30 dark:border-white/10 focus:border-[#3B945E]/50 focus:ring-[#3B945E]/20 transition-smooth"
                  disabled={submitting}
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#3B945E]" />
                  Lokasi <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="Contoh: Sidoarjo, Jawa Timur"
                  autoComplete="off"
                  className="glass-card dark:glass-card-dark border-white/30 dark:border-white/10 focus:border-[#3B945E]/50 focus:ring-[#3B945E]/20 transition-smooth"
                  disabled={submitting}
                />
                {errors.location && (
                  <p className="text-xs text-red-500">{errors.location}</p>
                )}
              </div>

              {/* Farm Type */}
              <div className="space-y-2">
                <Label htmlFor="farmType" className="flex items-center gap-2">
                  <Sprout className="w-4 h-4 text-[#3B945E]" />
                  Jenis Pertanian <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.farmType}
                  onValueChange={(value) => handleChange('farmType', value)}
                  disabled={submitting}
                >
                  <SelectTrigger className="glass-card dark:glass-card-dark border-white/30 dark:border-white/10 focus:border-[#3B945E]/50 focus:ring-[#3B945E]/20 transition-smooth">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Padi">Padi</SelectItem>
                    <SelectItem value="Jagung">Jagung</SelectItem>
                    <SelectItem value="Kedelai">Kedelai</SelectItem>
                    <SelectItem value="Hortikultura">Hortikultura (Sayur/Buah)</SelectItem>
                    <SelectItem value="Perkebunan">Perkebunan</SelectItem>
                    <SelectItem value="Lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Farm Size (Optional) */}
              <div className="space-y-2">
                <Label htmlFor="farmSize" className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-[#3B945E]" />
                  Luas Lahan (Hektar) <span className="text-xs text-muted-foreground">(Opsional)</span>
                </Label>
                <Input
                  id="farmSize"
                  type="number"
                  step="0.1"
                  min="0"
                  value={formData.farmSize}
                  onChange={(e) => handleChange('farmSize', e.target.value)}
                  placeholder="Contoh: 2.5"
                  autoComplete="off"
                  className="glass-card dark:glass-card-dark border-white/30 dark:border-white/10 focus:border-[#3B945E]/50 focus:ring-[#3B945E]/20 transition-smooth"
                  disabled={submitting}
                />
              </div>

              {/* Message (Optional) */}
              <div className="space-y-2">
                <Label htmlFor="message" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#3B945E]" />
                  Pesan/Pertanyaan <span className="text-xs text-muted-foreground">(Opsional)</span>
                </Label>
                <Textarea
                  id="message"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Ceritakan kebutuhan Anda atau pertanyaan yang ingin Anda tanyakan..."
                  autoComplete="off"
                  className="glass-card dark:glass-card-dark border-white/30 dark:border-white/10 focus:border-[#3B945E]/50 focus:ring-[#3B945E]/20 transition-smooth resize-none"
                  disabled={submitting}
                />
              </div>

              {/* Info Badge */}
              <div className="p-3 rounded-lg glass-card dark:glass-card-dark border border-[#0077B6]/30">
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground">Privasi Anda terjaga.</strong> Data yang Anda berikan hanya digunakan untuk menghubungi Anda terkait produk AGROGUARD IoT.
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full neumorphic-button bg-gradient-to-r from-[#3B945E] to-[#0077B6] hover:shadow-xl transition-smooth"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Kirim Permintaan
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}