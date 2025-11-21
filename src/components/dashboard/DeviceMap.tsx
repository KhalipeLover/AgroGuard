/**
 * Device Map Component - OpenStreetMap + Indonesia GeoJSON
 * 
 * Features:
 * - OpenStreetMap base layer
 * - Indonesia GeoJSON province boundaries
 * - 110 devices with GPS coordinates
 * - Interactive zoom/pan
 * - Clustered markers
 * - Focus on Jawa Timur by default
 */

import { useEffect, useRef, useState } from 'react';
import { MapPin, Thermometer, Droplet, Server, Wifi, WifiOff, AlertTriangle, Layers, X } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface AdminDevice {
  id: string;
  deviceId: string;
  owner: string;
  ownerEmail: string;
  location: string;
  temperature: number;
  humidity: number;
  soilMoisture: number;
  status: 'online' | 'offline' | 'warning';
  lastSync: string;
  installDate: string;
  latitude: number;
  longitude: number;
}

interface DeviceMapProps {
  devices: AdminDevice[];
}

// Leaflet types
declare global {
  interface Window {
    L: any;
  }
}

export default function DeviceMap({ devices }: DeviceMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [selectedDevice, setSelectedDevice] = useState<AdminDevice | null>(null);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [geoJsonLoaded, setGeoJsonLoaded] = useState(false);

  // Stats
  const stats = {
    total: devices.length,
    online: devices.filter(d => d.status === 'online').length,
    offline: devices.filter(d => d.status === 'offline').length,
    warning: devices.filter(d => d.status === 'warning').length
  };

  // Load Leaflet CSS and JS
  useEffect(() => {
    // Check if already loaded
    if (window.L) {
      setLeafletLoaded(true);
      return;
    }

    // Add Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';
    document.head.appendChild(link);

    // Add Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    script.crossOrigin = '';
    script.onload = () => setLeafletLoaded(true);
    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (link.parentNode) link.parentNode.removeChild(link);
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  // Initialize map when Leaflet is loaded
  useEffect(() => {
    if (!leafletLoaded || !mapRef.current || mapInstance) return;

    const L = window.L;

    // Create map centered on Jawa Timur
    const map = L.map(mapRef.current, {
      center: [-7.5, 112.5], // Jawa Timur center
      zoom: 8,
      zoomControl: true,
      scrollWheelZoom: true
    });

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

    setMapInstance(map);

    // ✅ OPTIONAL: Load Indonesia GeoJSON (map works fine without it)
    const loadGeoJSON = async () => {
      try {
        // Try multiple reliable GeoJSON sources
        const sources = [
          'https://raw.githubusercontent.com/geo-indonesia/geojson/main/provinsi.json',
          'https://raw.githubusercontent.com/yusufsyaifudin/wilayah-indonesia/master/data/geojson/indonesia.geojson',
          'https://cdn.jsdelivr.net/gh/ans-4175/peta-indonesia/indonesia.json'
        ];

        let geoJsonData = null;

        for (const source of sources) {
          try {
            const response = await fetch(source, {
              headers: { 'Accept': 'application/json, text/plain, */*' }
            });
            
            // Check HTTP status
            if (!response.ok) {
              throw new Error(`HTTP ${response.status}`);
            }

            // Try to parse as JSON (GitHub raw returns text/plain but is valid JSON)
            const text = await response.text();
            const data = JSON.parse(text);
            
            // Validate GeoJSON structure
            if (data && (data.type === 'FeatureCollection' || data.type === 'Feature' || data.features)) {
              geoJsonData = data;
              // GeoJSON loaded successfully
              break;
            }
          } catch (err) {
            // Silently try next source
            continue;
          }
        }

        // If we got valid GeoJSON, add it to map
        if (geoJsonData) {
          L.geoJSON(geoJsonData, {
            style: (feature: any) => {
              // Highlight Java provinces
              const provinceName = feature.properties?.Propinsi || 
                                  feature.properties?.name || 
                                  feature.properties?.PROVINSI || '';
              const isJawa = provinceName.toLowerCase().includes('jawa') || 
                            provinceName.toLowerCase().includes('jakarta') ||
                            provinceName.toLowerCase().includes('yogyakarta') ||
                            provinceName.toLowerCase().includes('banten');
              
              return {
                fillColor: isJawa ? '#5dac81' : '#a7c7b8',
                weight: 1.5,
                opacity: 1,
                color: '#3B945E',
                fillOpacity: isJawa ? 0.3 : 0.15
              };
            },
            onEachFeature: (feature: any, layer: any) => {
              const provinceName = feature.properties?.Propinsi || 
                                  feature.properties?.name || 
                                  feature.properties?.PROVINSI || 
                                  'Unknown Province';
              layer.bindTooltip(provinceName, {
                permanent: false,
                direction: 'center',
                className: 'province-tooltip'
              });
            }
          }).addTo(map);
        }

        setGeoJsonLoaded(true);
      } catch (error) {
        // Province boundaries are optional - map works perfectly without them
        setGeoJsonLoaded(true);
      }
    };

    loadGeoJSON();

    // Cleanup on unmount
    return () => {
      map.remove();
    };
  }, [leafletLoaded]);

  // Add device markers
  useEffect(() => {
    if (!mapInstance || !leafletLoaded || devices.length === 0) return;

    const L = window.L;
    const markers: any[] = [];

    // Group devices by proximity for clustering
    const clusters = new Map<string, AdminDevice[]>();
    
    devices.forEach(device => {
      const key = `${Math.round(device.latitude * 20) / 20},${Math.round(device.longitude * 20) / 20}`;
      if (!clusters.has(key)) {
        clusters.set(key, []);
      }
      clusters.get(key)!.push(device);
    });

    // Create markers for each cluster
    clusters.forEach((clusterDevices, key) => {
      const device = clusterDevices[0]; // Use first device for position
      const count = clusterDevices.length;
      
      // Determine color based on status
      const onlineCount = clusterDevices.filter(d => d.status === 'online').length;
      const offlineCount = clusterDevices.filter(d => d.status === 'offline').length;
      const warningCount = clusterDevices.filter(d => d.status === 'warning').length;
      
      let markerColor = '#22c55e'; // green
      if (offlineCount > onlineCount) markerColor = '#ef4444'; // red
      else if (warningCount > 0) markerColor = '#eab308'; // yellow

      // Create custom icon
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: ${count === 1 ? 32 : Math.min(36 + count * 2, 52)}px;
            height: ${count === 1 ? 32 : Math.min(36 + count * 2, 52)}px;
            background-color: ${markerColor};
            border: 3px solid white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: ${count > 9 ? 14 : 16}px;
            font-weight: bold;
            color: white;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            cursor: pointer;
            transition: transform 0.2s;
          " 
          onmouseover="this.style.transform='scale(1.2)'"
          onmouseout="this.style.transform='scale(1)'"
          >
            ${count}
          </div>
        `,
        iconSize: [count === 1 ? 32 : Math.min(36 + count * 2, 52), count === 1 ? 32 : Math.min(36 + count * 2, 52)],
        iconAnchor: [count === 1 ? 16 : Math.min(18 + count, 26), count === 1 ? 16 : Math.min(18 + count, 26)]
      });

      // Create marker
      const marker = L.marker([device.latitude, device.longitude], { icon });
      
      // Create popup content
      const popupContent = `
        <div style="min-width: 250px; max-height: 300px; overflow-y: auto;">
          <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #0a0a0a;">
            ${count > 1 ? `${count} Devices at this location` : 'Device Details'}
          </h3>
          ${clusterDevices.map(d => `
            <div style="
              padding: 12px;
              margin-bottom: 8px;
              background: ${d.status === 'online' ? '#f0fdf4' : d.status === 'warning' ? '#fefce8' : '#fef2f2'};
              border-left: 3px solid ${d.status === 'online' ? '#22c55e' : d.status === 'warning' ? '#eab308' : '#ef4444'};
              border-radius: 4px;
            ">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                <code style="
                  background: rgba(0, 0, 0, 0.05);
                  padding: 2px 6px;
                  border-radius: 3px;
                  font-size: 12px;
                  font-family: monospace;
                ">${d.deviceId}</code>
                <span style="
                  padding: 2px 8px;
                  background: ${d.status === 'online' ? '#22c55e' : d.status === 'warning' ? '#eab308' : '#ef4444'};
                  color: white;
                  border-radius: 12px;
                  font-size: 11px;
                  text-transform: uppercase;
                ">${d.status}</span>
              </div>
              <div style="font-size: 13px; color: #0a0a0a; margin-bottom: 4px;">
                <strong>${d.owner}</strong>
              </div>
              <div style="font-size: 12px; color: #6b7280; margin-bottom: 8px;">
                📍 ${d.location}
              </div>
              <div style="display: flex; gap: 12px; font-size: 12px;">
                <span>🌡️ ${d.temperature}°C</span>
                <span>💧 ${d.soilMoisture}%</span>
              </div>
            </div>
          `).join('')}
        </div>
      `;

      marker.bindPopup(popupContent, {
        maxWidth: 350,
        className: 'custom-popup'
      });

      marker.addTo(mapInstance);
      markers.push(marker);
    });

    // Cleanup markers on unmount
    return () => {
      markers.forEach(marker => marker.remove());
    };
  }, [mapInstance, devices, leafletLoaded]);

  // Zoom to Jawa Timur
  const zoomToJatim = () => {
    if (!mapInstance) return;
    mapInstance.setView([-7.5, 112.5], 8);
  };

  // Zoom to all Indonesia
  const zoomToIndonesia = () => {
    if (!mapInstance) return;
    mapInstance.setView([-2.5, 118], 5);
  };

  // Fit bounds to all devices
  const fitToDevices = () => {
    if (!mapInstance || devices.length === 0) return;
    const L = window.L;
    const bounds = L.latLngBounds(devices.map(d => [d.latitude, d.longitude]));
    mapInstance.fitBounds(bounds, { padding: [50, 50] });
  };

  return (
    <div className="space-y-6">
      {/* Map Stats Header */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#3B945E]/10">
              <Server className="w-5 h-5 text-[#3B945E]" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Devices</p>
              <p className="text-2xl">{stats.total}</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card dark:glass-card-dark border-2 border-green-500/30 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/10">
              <Wifi className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Online</p>
              <p className="text-2xl text-green-500">{stats.online}</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card dark:glass-card-dark border-2 border-red-500/30 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500/10">
              <WifiOff className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Offline</p>
              <p className="text-2xl text-red-500">{stats.offline}</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card dark:glass-card-dark border-2 border-yellow-500/30 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-500/10">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Warning</p>
              <p className="text-2xl text-yellow-500">{stats.warning}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Map Container */}
      <Card className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 overflow-hidden">
        <div className="relative">
          {/* Loading overlay */}
          {!leafletLoaded && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#3B945E] mb-4"></div>
                <p className="text-muted-foreground">Loading OpenStreetMap...</p>
              </div>
            </div>
          )}

          {/* Map controls */}
          <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
            <Button
              size="sm"
              variant="outline"
              className="glass-card dark:glass-card-dark border-white/30 dark:border-white/10 shadow-lg hover:shadow-xl transition-all bg-white/90 dark:bg-gray-900/90 backdrop-blur"
              onClick={zoomToJatim}
              title="Fokus Jawa Timur"
            >
              📍 Jatim
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="glass-card dark:glass-card-dark border-white/30 dark:border-white/10 shadow-lg hover:shadow-xl transition-all bg-white/90 dark:bg-gray-900/90 backdrop-blur"
              onClick={zoomToIndonesia}
              title="Lihat Indonesia"
            >
              🗺️ Indonesia
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="glass-card dark:glass-card-dark border-white/30 dark:border-white/10 shadow-lg hover:shadow-xl transition-all bg-white/90 dark:bg-gray-900/90 backdrop-blur"
              onClick={fitToDevices}
              title="Fit to Devices"
            >
              <Layers className="w-4 h-4" />
            </Button>
          </div>

          {/* Legend */}
          <div className="absolute top-4 left-4 z-[1000] glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 rounded-lg p-4 shadow-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur">
            <h4 className="text-sm mb-3">Legenda</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500 shadow-lg" />
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500 shadow-lg" />
                <span className="text-xs text-muted-foreground">Offline</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-yellow-500 shadow-lg" />
                <span className="text-xs text-muted-foreground">Warning</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-2 py-0.5 text-xs border border-gray-300 dark:border-gray-600">N</Badge>
                <span className="text-xs text-muted-foreground">Jumlah</span>
              </div>
            </div>
          </div>

          {/* GeoJSON loading indicator */}
          {leafletLoaded && !geoJsonLoaded && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-[1000] glass-card dark:glass-card-dark border-white/30 dark:border-white/10 rounded-lg px-4 py-2 shadow-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur">
              <p className="text-xs text-muted-foreground">Loading province boundaries...</p>
            </div>
          )}

          {/* Map */}
          <div 
            ref={mapRef} 
            className="w-full"
            style={{ height: '600px' }}
          />
        </div>
      </Card>

      {/* Coverage Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 p-4">
          <h4 className="text-sm mb-2 text-muted-foreground">Map Technology</h4>
          <p className="text-xl">OpenStreetMap</p>
          <p className="text-xs text-muted-foreground mt-1">With Indonesia GeoJSON</p>
        </Card>

        <Card className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 p-4">
          <h4 className="text-sm mb-2 text-muted-foreground">Default Focus</h4>
          <p className="text-xl">Jawa Timur</p>
          <p className="text-xs text-muted-foreground mt-1">Province with most devices</p>
        </Card>

        <Card className="glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/10 p-4">
          <h4 className="text-sm mb-2 text-muted-foreground">Online Rate</h4>
          <p className="text-xl text-green-500">
            {((stats.online / stats.total) * 100).toFixed(0)}%
          </p>
          <p className="text-xs text-muted-foreground mt-1">System health</p>
        </Card>
      </div>

      {/* Add custom styles */}
      <style>{`
        .leaflet-container {
          font-family: inherit;
        }
        
        .custom-marker {
          background: transparent;
          border: none;
        }
        
        .custom-popup .leaflet-popup-content-wrapper {
          background: white;
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }
        
        .custom-popup .leaflet-popup-content {
          margin: 16px;
        }
        
        .custom-popup .leaflet-popup-tip {
          background: white;
        }
        
        .province-tooltip {
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid #3B945E;
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 12px;
          color: #0a0a0a;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }
        
        .dark .custom-popup .leaflet-popup-content-wrapper {
          background: #1a1a1a;
          color: #fafafa;
        }
        
        .dark .custom-popup .leaflet-popup-tip {
          background: #1a1a1a;
        }
        
        .dark .province-tooltip {
          background: rgba(26, 26, 26, 0.95);
          border-color: #4CAF6E;
          color: #fafafa;
        }
      `}</style>
    </div>
  );
}
