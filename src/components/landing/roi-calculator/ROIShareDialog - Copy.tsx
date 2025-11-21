/**
 * ROI Share Dialog Component - v2.1
 * Share and copy functionality for ROI results
 *
 * Updated: Link now points to dedicated /hasil-roi page
 * Design: Konsisten dengan LegalDialog.tsx
 * - Neo-Skeuo Glass Fusion styling
 * - Mobile-first responsive design
 * - Proper spacing dan hierarchy
 * - Border top/bottom untuk pemisahan section
 */

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { ScrollArea } from "../../ui/scroll-area";
import { Separator } from "../../ui/separator";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Share2, Copy, ExternalLink, CheckCircle2 } from "lucide-react";

interface ROIShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shareUrl: string;
  onCopyUrl: () => void;
  onShare: (
    platform: "whatsapp" | "twitter" | "facebook",
  ) => void;
}

export function ROIShareDialog({
  open,
  onOpenChange,
  shareUrl,
  onCopyUrl,
  onShare,
}: ROIShareDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full sm:w-auto max-w-full sm:max-w-2xl sm:max-h-[85vh] bg-white/98 dark:bg-[#0E172A]/98 sm:bg-white/95 sm:dark:bg-[#0E172A]/95 backdrop-blur-xl border-0 sm:border-2 sm:border-white/30 sm:dark:border-white/10 shadow-2xl p-0 gap-0 rounded-none sm:rounded-xl overflow-hidden">
        {/* Header - Konsisten dengan LegalDialog */}
        <DialogHeader className="p-6 pb-4 border-b border-white/20 dark:border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-gradient-to-br from-[#3B945E] to-[#0077B6] dark:from-[#4CAF6E] dark:to-[#0099E6]">
              <Share2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-foreground">
                Bagikan Hasil Kalkulasi
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-sm">
                Perhitungan ROI Anda telah disimpan. Bagikan
                link ke rekan atau keluarga.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Content - Scrollable */}
        <ScrollArea className="max-h-[calc(85vh-200px)] px-6">
          <div className="py-6 space-y-6">
            {/* Info Banner */}
            <div className="glass-card dark:glass-card-dark border-2 border-[#3B945E]/30 p-4 rounded-xl">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#3B945E] dark:text-[#4CAF6E] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm mb-1">
                    <span className="font-semibold text-foreground">Link Siap Dibagikan!</span>
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Link akan membuka halaman khusus dengan hasil perhitungan ROI lengkap, termasuk grafik dan rekomendasi device. Siapa saja dapat melihat hasil ini tanpa perlu login.
                  </p>
                </div>
              </div>
            </div>

            {/* Copy URL Section */}
            <section>
              <Label className="text-foreground mb-3 flex items-center gap-2">
                <Copy className="w-4 h-4 text-[#3B945E] dark:text-[#4CAF6E]" />
                Link Hasil ROI
              </Label>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                Salin link di bawah untuk membagikan hasil perhitungan. Link ini permanen dan dapat dibagikan melalui email, chat, atau media sosial.
              </p>
              <div className="flex gap-2">
                <Input
                  value={shareUrl}
                  readOnly
                  className="glass-card dark:glass-card-dark border-white/30 dark:border-white/10 focus:border-[#3B945E]/50 focus:ring-[#3B945E]/20 transition-smooth text-sm font-mono"
                />
                <Button
                  size="icon"
                  variant="outline"
                  className="glass-card dark:glass-card-dark border-white/30 dark:border-white/10 hover:bg-[#3B945E]/10 hover:border-[#3B945E] transition-smooth flex-shrink-0"
                  onClick={onCopyUrl}
                  aria-label="Salin link"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <Separator className="mt-6 bg-white/10 dark:bg-white/5" />
            </section>

            {/* Social Share Section */}
            <section>
              <Label className="text-foreground mb-3 flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-[#0077B6] dark:text-[#0099E6]" />
                Bagikan ke Media Sosial
              </Label>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Pilih platform media sosial untuk membagikan
                hasil kalkulasi ROI Anda secara langsung.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* WhatsApp */}
                <Button
                  variant="outline"
                  className="glass-card dark:glass-card-dark border-2 border-[#25D366]/30 hover:bg-[#25D366]/10 hover:border-[#25D366] transition-smooth group shadow-sm hover:shadow-md"
                  onClick={() => onShare("whatsapp")}
                >
                  <svg
                    className="w-5 h-5 mr-2 text-[#25D366] group-hover:scale-110 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span className="font-semibold">
                    WhatsApp
                  </span>
                </Button>

                {/* Twitter */}
                <Button
                  variant="outline"
                  className="glass-card dark:glass-card-dark border-2 border-[#1DA1F2]/30 hover:bg-[#1DA1F2]/10 hover:border-[#1DA1F2] transition-smooth group shadow-sm hover:shadow-md"
                  onClick={() => onShare("twitter")}
                >
                  <svg
                    className="w-5 h-5 mr-2 text-[#1DA1F2] group-hover:scale-110 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                  <span className="font-semibold">Twitter</span>
                </Button>

                {/* Facebook */}
                <Button
                  variant="outline"
                  className="glass-card dark:glass-card-dark border-2 border-[#4267B2]/30 hover:bg-[#4267B2]/10 hover:border-[#4267B2] transition-smooth group shadow-sm hover:shadow-md"
                  onClick={() => onShare("facebook")}
                >
                  <svg
                    className="w-5 h-5 mr-2 text-[#4267B2] group-hover:scale-110 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="font-semibold">
                    Facebook
                  </span>
                </Button>
              </div>
            </section>
          </div>
        </ScrollArea>

        {/* Footer - Konsisten dengan LegalDialog */}
        <div className="p-4 border-t border-white/20 dark:border-white/10 bg-white/50 dark:bg-black/20">
          <p className="text-xs text-center text-muted-foreground">
            Untuk informasi lebih lanjut tentang AGROGUARD IoT,
            hubungi kami di{" "}
            <a
              href="mailto:info@agroguard.id"
              className="text-[#3B945E] dark:text-[#4CAF6E] hover:underline transition-smooth"
            >
              info@agroguard.id
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
