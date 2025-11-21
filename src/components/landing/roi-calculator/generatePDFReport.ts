/**
 * PDF Report Generator for ROI Calculator
 * Uses jsPDF and html2canvas to create professional PDF reports with charts
 */

import { formatRupiah } from '../../../data';
import type { CalculationResult } from './types';

interface PDFReportInputs {
  kabupaten: string;
  plantName: string;
  plantEmoji: string;
  irrigationName: string;
  irrigationEmoji: string;
  deviceCount: number;
  packageName: string;
}

/**
 * Generate PDF report with charts
 * Dynamically imports jsPDF to avoid SSR issues
 */
export async function generatePDFReport(
  result: CalculationResult,
  inputs: PDFReportInputs
): Promise<void> {
  try {
    // Dynamic import to avoid SSR issues
    const { default: jsPDF } = await import('jspdf');
    
    const { 
      kabupaten, 
      plantName, 
      plantEmoji, 
      irrigationName, 
      irrigationEmoji,
      deviceCount,
      packageName
    } = inputs;

    // Create new PDF document (A4, portrait)
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let yPos = margin;

    // Helper function to add new page if needed
    const checkPageBreak = (neededSpace: number) => {
      if (yPos + neededSpace > pageHeight - margin) {
        doc.addPage();
        yPos = margin;
        return true;
      }
      return false;
    };

    // ===========================
    // HEADER & TITLE
    // ===========================
    
    // Background gradient (simulated with rectangles)
    doc.setFillColor(59, 148, 94); // #3B945E
    doc.rect(0, 0, pageWidth, 50, 'F');
    
    // Logo text
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('AGROGUARD IoT', margin, 20);
    
    doc.setFontSize(12);
    doc.text('Laporan ROI Calculator - Smart Farming System', margin, 30);
    
    // Date
    doc.setFontSize(9);
    doc.text(`Generated: ${new Date().toLocaleString('id-ID')}`, margin, 40);
    
    yPos = 60;

    // ===========================
    // SECTION 1: PARAMETER INPUT
    // ===========================
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text('Parameter Input', margin, yPos);
    yPos += 8;

    // Box for parameters
    doc.setDrawColor(59, 148, 94);
    doc.setLineWidth(0.5);
    doc.rect(margin, yPos, pageWidth - 2 * margin, 50, 'S');
    
    yPos += 8;
    doc.setFontSize(10);
    
    const params = [
      `Lokasi: ${kabupaten}`,
      `Tanaman: ${plantEmoji} ${plantName}`,
      `Luas Lahan: ${result.luasLahanDisplay}`,
      `Sistem Irigasi: ${irrigationEmoji} ${irrigationName}`,
      `Siklus Panen: ${result.harvestCycle} hari (${result.harvestPerYear}x/tahun)`,
      `Harga Jual: ${formatRupiah(result.hargaTanamanPerKg)}/kg`
    ];
    
    params.forEach(param => {
      doc.text(param, margin + 5, yPos);
      yPos += 6;
    });
    
    yPos += 10;

    // ===========================
    // SECTION 2: PERANGKAT IoT
    // ===========================
    
    checkPageBreak(40);
    
    doc.setFontSize(14);
    doc.text('Perangkat IoT', margin, yPos);
    yPos += 8;

    doc.setDrawColor(0, 119, 182);
    doc.rect(margin, yPos, pageWidth - 2 * margin, 30, 'S');
    
    yPos += 8;
    doc.setFontSize(10);
    
    const devices = [
      `Jumlah Device: ${deviceCount} unit`,
      `Biaya Hardware: ${formatRupiah(result.agroguardBiayaDevice)}`,
      `Paket: ${packageName}`,
      `Biaya Langganan: ${formatRupiah(result.agroguardBiayaSubscription)}/tahun`
    ];
    
    devices.forEach(device => {
      doc.text(device, margin + 5, yPos);
      yPos += 6;
    });
    
    yPos += 10;

    // ===========================
    // SECTION 3: PERBANDINGAN HASIL
    // ===========================
    
    checkPageBreak(70);
    
    doc.setFontSize(14);
    doc.text('Perbandingan Hasil', margin, yPos);
    yPos += 10;

    // Table header
    doc.setFillColor(59, 148, 94);
    doc.rect(margin, yPos, pageWidth - 2 * margin, 8, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text('Metrik', margin + 5, yPos + 5);
    doc.text('Tradisional', pageWidth / 2 - 20, yPos + 5);
    doc.text('AGROGUARD IoT', pageWidth / 2 + 30, yPos + 5);
    
    yPos += 8;
    doc.setTextColor(0, 0, 0);

    // Table rows
    const comparisonData = [
      {
        metric: 'Produktivitas',
        traditional: `${result.baselineProduktivitas.toFixed(2)} kg/m²/thn`,
        iot: `${result.agroguardProduktivitas.toFixed(2)} kg/m²/thn`,
        highlight: true
      },
      {
        metric: 'Total Produksi',
        traditional: `${result.baselineProduksi.toFixed(1)} kg/thn`,
        iot: `${result.agroguardProduksi.toFixed(1)} kg/thn`,
        highlight: false
      },
      {
        metric: 'Pendapatan',
        traditional: formatRupiah(result.baselinePendapatan),
        iot: formatRupiah(result.agroguardPendapatan),
        highlight: true
      },
      {
        metric: 'Biaya Operasional',
        traditional: formatRupiah(result.baselineTotalBiaya),
        iot: formatRupiah(result.agroguardBiayaOperasional),
        highlight: false
      }
    ];

    comparisonData.forEach((row, index) => {
      if (row.highlight) {
        doc.setFillColor(240, 253, 244);
        doc.rect(margin, yPos, pageWidth - 2 * margin, 7, 'F');
      }
      
      doc.setFontSize(9);
      doc.text(row.metric, margin + 5, yPos + 5);
      doc.text(row.traditional, pageWidth / 2 - 20, yPos + 5);
      doc.text(row.iot, pageWidth / 2 + 30, yPos + 5);
      
      yPos += 7;
    });

    // Peningkatan produktivitas highlight
    yPos += 5;
    doc.setFillColor(59, 148, 94);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.rect(margin, yPos, pageWidth - 2 * margin, 10, 'F');
    doc.text(`Peningkatan Produktivitas: +${result.peningkatanProduktivitas.toFixed(1)}%`, margin + 5, yPos + 7);
    
    yPos += 15;
    doc.setTextColor(0, 0, 0);

    // ===========================
    // SECTION 4: PENGHEMATAN BIAYA
    // ===========================
    
    checkPageBreak(60);
    
    doc.setFontSize(14);
    doc.text('Penghematan Biaya', margin, yPos);
    yPos += 10;

    const savings = [
      { name: 'Air', amount: result.penghematanAir, percent: '50%' },
      { name: 'Pupuk', amount: result.penghematanPupuk, percent: '35%' },
      { name: 'Tenaga Kerja', amount: result.penghematanLabor, percent: '40%' },
      { name: 'Pengurangan Gagal Panen', amount: result.penguranganGagalPanen, percent: '-' }
    ];

    doc.setFontSize(10);
    savings.forEach(saving => {
      doc.text(`• ${saving.name}: ${formatRupiah(saving.amount)}`, margin + 5, yPos);
      doc.text(`(${saving.percent})`, pageWidth - margin - 25, yPos);
      yPos += 7;
    });

    yPos += 5;
    doc.setDrawColor(59, 148, 94);
    doc.setLineWidth(1);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 7;

    doc.setFontSize(12);
    doc.text('Total Penghematan:', margin + 5, yPos);
    doc.text(formatRupiah(result.totalPenghematan), pageWidth - margin - 50, yPos);
    
    yPos += 15;

    // ===========================
    // SECTION 5: ANALISIS ROI
    // ===========================
    
    checkPageBreak(80);
    
    doc.setFontSize(14);
    doc.text('Analisis ROI', margin, yPos);
    yPos += 10;

    // Total Benefit Box
    doc.setFillColor(240, 253, 244);
    doc.rect(margin, yPos, (pageWidth - 2 * margin) / 2 - 5, 35, 'F');
    doc.setDrawColor(59, 148, 94);
    doc.rect(margin, yPos, (pageWidth - 2 * margin) / 2 - 5, 35, 'S');
    
    doc.setFontSize(10);
    doc.text('Total Manfaat Tahun 1:', margin + 5, yPos + 8);
    doc.setFontSize(9);
    doc.text(`Penghematan: ${formatRupiah(result.totalPenghematan)}`, margin + 5, yPos + 15);
    doc.text(`Tambahan Pendapatan: ${formatRupiah(result.additionalRevenue)}`, margin + 5, yPos + 22);
    doc.setFontSize(11);
    doc.text(`Total: ${formatRupiah(result.totalBenefit)}`, margin + 5, yPos + 30);

    // Total Investment Box
    const midX = pageWidth / 2 + 5;
    doc.setFillColor(240, 248, 255);
    doc.rect(midX, yPos, (pageWidth - 2 * margin) / 2 - 5, 35, 'F');
    doc.setDrawColor(0, 119, 182);
    doc.rect(midX, yPos, (pageWidth - 2 * margin) / 2 - 5, 35, 'S');
    
    doc.setFontSize(10);
    doc.text('Total Investasi:', midX + 5, yPos + 8);
    doc.setFontSize(9);
    doc.text(`Hardware: ${formatRupiah(result.agroguardBiayaDevice)}`, midX + 5, yPos + 15);
    doc.text(`Subscription: ${formatRupiah(result.agroguardBiayaSubscription)}`, midX + 5, yPos + 22);
    doc.setFontSize(11);
    doc.text(`Total: ${formatRupiah(result.agroguardBiayaDevice + result.agroguardBiayaSubscription)}`, midX + 5, yPos + 30);

    yPos += 45;

    // ROI Highlight Box
    doc.setFillColor(255, 183, 3);
    doc.rect(margin, yPos, pageWidth - 2 * margin, 20, 'F');
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.text(`ROI: ${result.roi.toFixed(1)}%`, margin + 10, yPos + 8);
    doc.text(`Break-Even: ${result.paybackPeriod} bulan`, pageWidth / 2 + 10, yPos + 8);
    
    doc.setFontSize(10);
    doc.text(`(${(result.paybackPeriod / 12).toFixed(1)} tahun)`, pageWidth / 2 + 10, yPos + 15);

    yPos += 30;

    // ===========================
    // SECTION 6: VISUALISASI PENGHEMATAN (PIE CHART)
    // ===========================
    
    if (checkPageBreak(80)) {
      // New page started
    }
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text('Visualisasi Penghematan', margin, yPos);
    yPos += 10;

    // Draw simple pie chart for savings
    const chartCenterX = pageWidth / 2;
    const chartCenterY = yPos + 40;
    const chartRadius = 30;

    const savingsData = [
      { name: 'Air', value: result.penghematanAir, color: [40, 167, 69] },
      { name: 'Pupuk', value: result.penghematanPupuk, color: [30, 144, 255] },
      { name: 'Tenaga Kerja', value: result.penghematanLabor, color: [255, 193, 7] },
      { name: 'Gagal Panen', value: result.penguranganGagalPanen, color: [231, 76, 60] }
    ];

    const totalSavings = savingsData.reduce((sum, item) => sum + item.value, 0);
    let startAngle = -Math.PI / 2; // Start from top

    // Draw pie slices
    savingsData.forEach(item => {
      const sliceAngle = (item.value / totalSavings) * 2 * Math.PI;
      const endAngle = startAngle + sliceAngle;

      doc.setFillColor(item.color[0], item.color[1], item.color[2]);
      
      // Draw pie slice using triangle fan approximation
      const steps = 50;
      const angleStep = sliceAngle / steps;
      
      for (let i = 0; i < steps; i++) {
        const a1 = startAngle + i * angleStep;
        const a2 = startAngle + (i + 1) * angleStep;
        
        const x1 = chartCenterX + chartRadius * Math.cos(a1);
        const y1 = chartCenterY + chartRadius * Math.sin(a1);
        const x2 = chartCenterX + chartRadius * Math.cos(a2);
        const y2 = chartCenterY + chartRadius * Math.sin(a2);
        
        doc.triangle(chartCenterX, chartCenterY, x1, y1, x2, y2, 'F');
      }

      startAngle = endAngle;
    });

    // Draw legend
    yPos = chartCenterY + chartRadius + 15;
    const legendX = margin + 10;
    
    savingsData.forEach((item, index) => {
      const percentage = ((item.value / totalSavings) * 100).toFixed(1);
      const col = index % 2 === 0 ? legendX : legendX + 85;
      const row = yPos + Math.floor(index / 2) * 8;
      
      // Color box
      doc.setFillColor(item.color[0], item.color[1], item.color[2]);
      doc.rect(col, row - 3, 4, 4, 'F');
      
      // Label
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      doc.text(`${item.name}: ${percentage}%`, col + 6, row);
    });

    yPos += 25;

    // ===========================
    // SECTION 7: GRAFIK PERBANDINGAN
    // ===========================
    
    if (checkPageBreak(70)) {
      // New page started
    }
    
    doc.setFontSize(14);
    doc.text('Grafik Perbandingan', margin, yPos);
    yPos += 10;

    // Bar chart data
    const barChartData = [
      {
        label: 'Produksi (kg)',
        traditional: result.baselineProduksi,
        iot: result.agroguardProduksi,
        max: result.agroguardProduksi * 1.1
      },
      {
        label: 'Pendapatan (jt)',
        traditional: result.baselinePendapatan / 1000000,
        iot: result.agroguardPendapatan / 1000000,
        max: (result.agroguardPendapatan / 1000000) * 1.1
      }
    ];

    const barWidth = 15;
    const barSpacing = 8;
    const chartWidth = 120;
    const chartHeight = 50;
    const chartStartX = margin + 25;

    barChartData.forEach((data, index) => {
      const barY = yPos + index * (chartHeight + 15);
      
      // Label
      doc.setFontSize(10);
      doc.text(data.label, margin, barY + 5);
      
      // Bars
      const traditionalBarLength = (data.traditional / data.max) * chartWidth;
      const iotBarLength = (data.iot / data.max) * chartWidth;
      
      // Traditional bar (gray)
      doc.setFillColor(150, 150, 150);
      doc.rect(chartStartX, barY, traditionalBarLength, barWidth, 'F');
      doc.setFontSize(8);
      doc.text(data.traditional.toFixed(1), chartStartX + traditionalBarLength + 2, barY + 10);
      
      // IoT bar (green)
      doc.setFillColor(59, 148, 94);
      doc.rect(chartStartX, barY + barWidth + barSpacing, iotBarLength, barWidth, 'F');
      doc.text(data.iot.toFixed(1), chartStartX + iotBarLength + 2, barY + barWidth + barSpacing + 10);
      
      // Legend
      doc.setFontSize(7);
      doc.setTextColor(100, 100, 100);
      doc.text('Tradisional', chartStartX, barY - 2);
      doc.setTextColor(59, 148, 94);
      doc.text('AGROGUARD IoT', chartStartX, barY + barWidth + barSpacing - 2);
      doc.setTextColor(0, 0, 0);
    });

    yPos += barChartData.length * (chartHeight + 15) + 10;

    // ===========================
    // SECTION 8: KESIMPULAN
    // ===========================
    
    checkPageBreak(60);
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text('Kesimpulan', margin, yPos);
    yPos += 10;

    doc.setFontSize(10);
    const conclusions = [
      result.roi > 100 ? '✓ Investasi SANGAT MENGUNTUNGKAN!' : result.roi > 50 ? '✓ Investasi Menguntungkan' : '○ Pertimbangkan lagi',
      result.paybackPeriod <= 12 ? '✓ Break-even kurang dari 1 tahun' : '○ Break-even lebih dari 1 tahun',
      '',
      'Dengan AGROGUARD IoT, Anda dapat:',
      `• Meningkatkan produktivitas ${result.peningkatanProduktivitas.toFixed(1)}%`,
      '• Menghemat biaya operasional',
      '• Mengurangi risiko gagal panen',
      '• Monitor lahan 24/7 via smartphone'
    ];

    conclusions.forEach(conclusion => {
      if (conclusion === '') {
        yPos += 5;
      } else {
        doc.text(conclusion, margin + 5, yPos);
        yPos += 7;
      }
    });

    // ===========================
    // FOOTER
    // ===========================
    
    // Footer box
    const footerY = pageHeight - 35;
    doc.setFillColor(59, 148, 94);
    doc.rect(0, footerY, pageWidth, 35, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text('Tertarik? Hubungi kami untuk konsultasi gratis!', margin, footerY + 10);
    
    doc.setFontSize(9);
    doc.text('Website: https://agroguard.id', margin, footerY + 18);
    doc.text('Email: info@agroguard.id', margin, footerY + 24);
    doc.text('WhatsApp: +62 812-3456-7890', pageWidth / 2, footerY + 18);
    doc.text('AGROGUARD IoT - Smart Farming for Better Harvest', pageWidth / 2, footerY + 24);

    // ===========================
    // SAVE PDF
    // ===========================
    
    const fileName = `AGROGUARD-ROI-${kabupaten}-${plantName}-${new Date().getTime()}.pdf`;
    doc.save(fileName);

  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Gagal membuat PDF. Silakan coba lagi.');
  }
}
