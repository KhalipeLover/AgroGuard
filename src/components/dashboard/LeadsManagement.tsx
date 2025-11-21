/**
 * Leads Management Component
 * Admin view untuk mengelola prospective customers
 * 
 * Features:
 * - Infinite scroll (10 items per load)
 * - Search & filter (status, source)
 * - Status management
 * - Contact actions (email, WhatsApp)
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { 
  fetchLeads, 
  updateLeadStatus,
  getLeadsStats,
  type Lead 
} from '../../data';
import {
  User,
  XIcon,
  Loader2,
  Search,
  Filter,
  ExternalLink,
  TrendingUp,
  Target,
  MessageSquare,
  Mail,
  Building2,
  Phone,
  MapPin,
  Sprout,
  Calendar
} from 'lucide-react';
import { toast } from '../ui/simple-toast';

const ITEMS_PER_PAGE = 10;

export default function LeadsManagement() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [displayedLeads, setDisplayedLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, qualified: 0, converted: 0 });
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');

  // Infinite scroll
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadLeads();
    loadStats();
  }, []);

  useEffect(() => {
    filterLeads();
  }, [leads, searchQuery, statusFilter, sourceFilter]);

  // Reset displayed items when filtered leads change
  useEffect(() => {
    setDisplayedLeads(filteredLeads.slice(0, ITEMS_PER_PAGE));
    setHasMore(filteredLeads.length > ITEMS_PER_PAGE);
  }, [filteredLeads]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loadingMore, displayedLeads.length, filteredLeads.length]);

  const loadLeads = async () => {
    try {
      setLoading(true);
      const data = await fetchLeads();
      setLeads(data);
    } catch {
      toast.error('Gagal memuat data leads');
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const data = await getLeadsStats();
      setStats(data);
    } catch {
      // Silent fail
    }
  };

  const filterLeads = () => {
    let filtered = [...leads];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        lead =>
          lead.name.toLowerCase().includes(query) ||
          lead.email.toLowerCase().includes(query) ||
          lead.phone.includes(query) ||
          lead.location.toLowerCase().includes(query) ||
          (lead.organization && lead.organization.toLowerCase().includes(query))
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }

    // Source filter
    if (sourceFilter !== 'all') {
      filtered = filtered.filter(lead => lead.source === sourceFilter);
    }

    setFilteredLeads(filtered);
  };

  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    
    setTimeout(() => {
      const currentLength = displayedLeads.length;
      const nextItems = filteredLeads.slice(currentLength, currentLength + ITEMS_PER_PAGE);
      
      if (nextItems.length > 0) {
        setDisplayedLeads(prev => [...prev, ...nextItems]);
        setHasMore(currentLength + nextItems.length < filteredLeads.length);
      } else {
        setHasMore(false);
      }
      
      setLoadingMore(false);
    }, 500);
  }, [displayedLeads.length, filteredLeads, loadingMore, hasMore]);

  const handleStatusChange = async (leadId: string, newStatus: Lead['status']) => {
    try {
      await updateLeadStatus(leadId, newStatus);
      toast.success('Status lead berhasil diupdate');
      loadLeads();
      loadStats();
    } catch {
      toast.error('Gagal mengupdate status');
    }
  };

  const getStatusBadge = (status: Lead['status']) => {
    const statusConfig = {
      new: { label: 'Baru', className: 'bg-blue-500/10 text-blue-500 border-blue-500/30' },
      contacted: { label: 'Dihubungi', className: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30' },
      qualified: { label: 'Qualified', className: 'bg-green-500/10 text-green-500 border-green-500/30' },
      converted: { label: 'Konversi', className: 'bg-purple-500/10 text-purple-500 border-purple-500/30' },
      rejected: { label: 'Ditolak', className: 'bg-red-500/10 text-red-500 border-red-500/30' }
    };

    const config = statusConfig[status];
    return (
      <Badge className={`border ${config.className}`}>
        {config.label}
      </Badge>
    );
  };

  const getSourceBadge = (source: Lead['source']) => {
    const sourceConfig = {
      'roi-calculator': { label: 'ROI Calculator', icon: TrendingUp },
      'cta-button': { label: 'CTA Button', icon: Target },
      'contact-form': { label: 'Contact Form', icon: MessageSquare }
    };

    const config = sourceConfig[source];
    const Icon = config.icon;

    return (
      <Badge variant="outline" className="gap-1">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#3B945E]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 p-4">
          <div className="text-sm text-muted-foreground mb-1">Total Leads</div>
          <div className="text-2xl">{stats.total}</div>
        </Card>
        <Card className="glass-card dark:glass-card-dark border-2 border-blue-500/30 p-4">
          <div className="text-sm text-muted-foreground mb-1">Baru</div>
          <div className="text-2xl text-blue-500">{stats.new}</div>
        </Card>
        <Card className="glass-card dark:glass-card-dark border-2 border-yellow-500/30 p-4">
          <div className="text-sm text-muted-foreground mb-1">Dihubungi</div>
          <div className="text-2xl text-yellow-500">{stats.contacted}</div>
        </Card>
        <Card className="glass-card dark:glass-card-dark border-2 border-green-500/30 p-4">
          <div className="text-sm text-muted-foreground mb-1">Qualified</div>
          <div className="text-2xl text-green-500">{stats.qualified}</div>
        </Card>
        <Card className="glass-card dark:glass-card-dark border-2 border-purple-500/30 p-4">
          <div className="text-sm text-muted-foreground mb-1">Konversi</div>
          <div className="text-2xl text-purple-500">{stats.converted}</div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama, email, telepon, lokasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 glass-card dark:glass-card-dark border-white/30 dark:border-white/10"
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48 glass-card dark:glass-card-dark border-white/30 dark:border-white/10">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="new">Baru</SelectItem>
              <SelectItem value="contacted">Dihubungi</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="converted">Konversi</SelectItem>
              <SelectItem value="rejected">Ditolak</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sourceFilter} onValueChange={setSourceFilter}>
            <SelectTrigger className="w-full md:w-48 glass-card dark:glass-card-dark border-white/30 dark:border-white/10">
              <ExternalLink className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Sumber</SelectItem>
              <SelectItem value="roi-calculator">ROI Calculator</SelectItem>
              <SelectItem value="cta-button">CTA Button</SelectItem>
              <SelectItem value="contact-form">Contact Form</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Results Count */}
      {filteredLeads.length > 0 && (
        <div className="text-sm text-muted-foreground">
          Menampilkan {displayedLeads.length} dari {filteredLeads.length} leads
        </div>
      )}

      {/* Leads List */}
      <div className="space-y-4">
        {filteredLeads.length === 0 ? (
          <Card className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 p-12 text-center">
            <p className="text-muted-foreground">Tidak ada leads yang ditemukan</p>
          </Card>
        ) : (
          <>
            {displayedLeads.map((lead) => (
              <Card key={lead.id} className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Lead Info */}
                  <div className="flex-1 space-y-4">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg flex items-center gap-2">
                          <User className="w-5 h-5 text-[#3B945E]" />
                          {lead.name}
                        </h3>
                        {lead.organization && (
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <Building2 className="w-3 h-3" />
                            {lead.organization}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {getStatusBadge(lead.status)}
                        {getSourceBadge(lead.source)}
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-4 h-4 text-[#0077B6]" />
                        <a href={`mailto:${lead.email}`} className="hover:text-[#0077B6] transition-colors">
                          {lead.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-4 h-4 text-[#0077B6]" />
                        <a href={`tel:${lead.phone}`} className="hover:text-[#0077B6] transition-colors">
                          {lead.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4 text-[#3B945E]" />
                        {lead.location}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Sprout className="w-4 h-4 text-[#3B945E]" />
                        {lead.farmType}
                        {lead.farmSize && ` • ${lead.farmSize} Ha`}
                      </div>
                    </div>

                    {/* Message */}
                    {lead.message && (
                      <div className="p-3 rounded-lg glass-card dark:glass-card-dark border border-white/20">
                        <p className="text-sm flex items-start gap-2">
                          <MessageSquare className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{lead.message}</span>
                        </p>
                      </div>
                    )}

                    {/* Notes */}
                    {lead.notes && (
                      <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                        <p className="text-sm text-yellow-700 dark:text-yellow-300">
                          <strong>Catatan:</strong> {lead.notes}
                        </p>
                      </div>
                    )}

                    {/* Metadata */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(lead.timestamp)}
                      </div>
                      {lead.assignedTo && (
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          Assigned to: {lead.assignedTo}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-row lg:flex-col gap-2 lg:w-40">
                    <Select
                      value={lead.status}
                      onValueChange={(value) => handleStatusChange(lead.id, value as Lead['status'])}
                    >
                      <SelectTrigger className="glass-card dark:glass-card-dark border-white/30 dark:border-white/10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">Baru</SelectItem>
                        <SelectItem value="contacted">Dihubungi</SelectItem>
                        <SelectItem value="qualified">Qualified</SelectItem>
                        <SelectItem value="converted">Konversi</SelectItem>
                        <SelectItem value="rejected">Ditolak</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="sm"
                      className="glass-card dark:glass-card-dark border-white/30 dark:border-white/10 hover:bg-[#3B945E]/10 hover:border-[#3B945E]"
                      onClick={() => window.open(`mailto:${lead.email}`, '_blank')}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="glass-card dark:glass-card-dark border-white/30 dark:border-white/10 hover:bg-[#0077B6]/10 hover:border-[#0077B6]"
                      onClick={() => window.open(`https://wa.me/${lead.phone}`, '_blank')}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                  </div>
                </div>
              </Card>
            ))}

            {/* Infinite Scroll Trigger & Loading */}
            {hasMore && (
              <div ref={observerTarget} className="flex justify-center py-8">
                {loadingMore && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="w-5 h-5 animate-spin text-[#3B945E]" />
                    <span>Memuat leads lainnya...</span>
                  </div>
                )}
              </div>
            )}

            {/* End of List */}
            {!hasMore && displayedLeads.length > 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm">
                Semua leads telah dimuat ({displayedLeads.length} leads)
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
