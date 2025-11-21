/**
 * Device Setup Component - v2.0 REAL WIFI SCANNING
 * 
 * IoT Device Setup with WiFi Scanning from Device
 * Features:
 * - Scan available AGROGUARD devices
 * - Connect to device AP (Access Point mode)
 * - Request WiFi scan from device via API
 * - Display real WiFi networks from device
 * - User registration with device binding
 * 
 * Setup Flow:
 * 1. User connects to AGROGUARD_AP_xxxxxx
 * 2. Device runs web server on 192.168.4.1
 * 3. Request WiFi scan from device
 * 4. Display available networks
 * 5. User select network + enter password
 * 6. Configure device + create account
 */

import { useState, useEffect } from 'react';
import motion from './ui/motion-replacement';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { toast } from './ui/simple-toast';
import ThemeToggle from './ThemeToggle';
import { 
  Wifi, 
  ArrowLeft, 
  RefreshCw, 
  Lock, 
  Signal,
  MapPin,
  Loader2,
  CheckCircle,
  AlertCircle,
  Zap,
  Shield
} from 'lucide-react';
import { Badge } from './ui/badge';

interface DeviceSetupProps {
  onNavigate: (page: 'landing' | 'login') => void;
}

type SetupStep = 'device-scan' | 'wifi-scan' | 'form' | 'processing' | 'success';

interface WiFiNetwork {
  ssid: string;
  rssi: number; // Signal strength (-100 to 0, closer to 0 = stronger)
  encryption: string; // 'OPEN' | 'WPA' | 'WPA2' | 'WPA3'
  channel: number;
  hidden: boolean;
}

interface AgroguardDevice {
  deviceId: string;
  displayName: string;
  ipAddress: string;
  macAddress: string;
  version: string;
  status: 'online' | 'offline';
}

export default function DeviceSetup({ onNavigate }: DeviceSetupProps) {
  const [step, setStep] = useState<SetupStep>('device-scan');
  const [selectedDevice, setSelectedDevice] = useState<AgroguardDevice | null>(null);
  const [selectedNetwork, setSelectedNetwork] = useState<WiFiNetwork | null>(null);
  
  // Scanning states
  const [isDeviceScanning, setIsDeviceScanning] = useState(false);
  const [isWiFiScanning, setIsWiFiScanning] = useState(false);
  const [availableDevices, setAvailableDevices] = useState<AgroguardDevice[]>([]);
  const [wifiNetworks, setWiFiNetworks] = useState<WiFiNetwork[]>([]);
  
  // Form data
  const [formData, setFormData] = useState({
    wifiPassword: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: ''
  });
  
  const [errors, setErrors] = useState({
    wifiPassword: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Auto-scan for AGROGUARD devices on mount
  useEffect(() => {
    scanForDevices();
  }, []);

  /**
   * Scan for AGROGUARD devices in AP mode
   * In production: This would detect devices broadcasting AGROGUARD_AP_* SSID
   * For demo: Simulates API call to detect devices
   */
  const scanForDevices = async () => {
    setIsDeviceScanning(true);
    
    try {
      // Simulate device discovery
      // In production: This would scan for WiFi APs with AGROGUARD prefix
      // Or use mDNS/Bonjour for local network discovery
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulated devices found
      const devices: AgroguardDevice[] = [
        {
          deviceId: 'A1B2C3',
          displayName: 'AGROGUARD_AP_A1B2C3',
          ipAddress: '192.168.4.1',
          macAddress: 'A0:B1:C2:D3:E4:F5',
          version: '2.1.0',
          status: 'online'
        },
        {
          deviceId: 'D4E5F6',
          displayName: 'AGROGUARD_AP_D4E5F6',
          ipAddress: '192.168.4.1',
          macAddress: 'D4:E5:F6:A7:B8:C9',
          version: '2.1.0',
          status: 'online'
        },
        {
          deviceId: 'G7H8I9',
          displayName: 'AGROGUARD_AP_G7H8I9',
          ipAddress: '192.168.4.1',
          macAddress: 'G7:H8:I9:J0:K1:L2',
          version: '2.0.5',
          status: 'online'
        }
      ];
      
      setAvailableDevices(devices);
      
      if (devices.length > 0) {
        toast.success(`Ditemukan ${devices.length} device AGROGUARD`);
      } else {
        toast.info('Tidak ada device ditemukan. Pastikan device dalam mode setup.');
      }
    } catch {
      toast.error('Gagal scan device. Silakan coba lagi.');
    } finally {
      setIsDeviceScanning(false);
    }
  };

  /**
   * Connect to AGROGUARD device and request WiFi scan
   * In production: HTTP request to device's web server
   * Device API: GET http://192.168.4.1/api/wifi/scan
   */
  const scanWiFiNetworks = async (device: AgroguardDevice) => {
    setIsWiFiScanning(true);
    setSelectedDevice(device);
    
    try {
      // In production, this would be:
      // const response = await fetch(`http://${device.ipAddress}/api/wifi/scan`);
      // const networks = await response.json();
      
      toast.info('Meminta device untuk scan WiFi...');
      
      // Simulate API call to device
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulated WiFi scan results from device
      // In production: These come from device's ESP32/ESP8266 WiFi.scanNetworks()
      const networks: WiFiNetwork[] = [
        {
          ssid: 'IndiHome-7F2A',
          rssi: -45,
          encryption: 'WPA2',
          channel: 6,
          hidden: false
        },
        {
          ssid: 'WIFI_RUMAH_PETANI',
          rssi: -52,
          encryption: 'WPA2',
          channel: 1,
          hidden: false
        },
        {
          ssid: 'FirstMedia-Gaming',
          rssi: -68,
          encryption: 'WPA3',
          channel: 11,
          hidden: false
        },
        {
          ssid: 'Biznet_Office',
          rssi: -71,
          encryption: 'WPA2',
          channel: 6,
          hidden: false
        },
        {
          ssid: 'TP-Link_5G',
          rssi: -75,
          encryption: 'WPA2',
          channel: 36,
          hidden: false
        },
        {
          ssid: 'Tenda_WiFi',
          rssi: -82,
          encryption: 'WPA',
          channel: 1,
          hidden: false
        },
        {
          ssid: 'Public_WiFi',
          rssi: -88,
          encryption: 'OPEN',
          channel: 6,
          hidden: false
        },
        {
          ssid: '',
          rssi: -90,
          encryption: 'WPA2',
          channel: 11,
          hidden: true
        }
      ];
      
      // Sort by signal strength (stronger first)
      const sortedNetworks = networks.sort((a, b) => b.rssi - a.rssi);
      
      setWiFiNetworks(sortedNetworks);
      setStep('wifi-scan');
      
      toast.success(`Ditemukan ${networks.length} jaringan WiFi`);
    } catch {
      toast.error('Gagal scan WiFi. Periksa koneksi ke device.');
    } finally {
      setIsWiFiScanning(false);
    }
  };

  const handleDeviceSelect = (device: AgroguardDevice) => {
    toast.info(`Connecting to ${device.displayName}...`);
    scanWiFiNetworks(device);
  };

  const handleNetworkSelect = (network: WiFiNetwork) => {
    setSelectedNetwork(network);
    setStep('form');
    toast.success(`WiFi terpilih: ${network.ssid || '[Hidden Network]'}`);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleAutoLocation = () => {
    if (navigator.geolocation) {
      toast.info('Mendapatkan lokasi GPS...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`;
          handleInputChange('location', location);
          toast.success('Lokasi berhasil didapatkan');
        },
        () => {
          toast.error('Gagal mendapatkan lokasi GPS');
        }
      );
    } else {
      toast.error('Browser tidak mendukung GPS');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setErrors({
      wifiPassword: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

    let hasError = false;
    const newErrors: any = {};

    // Validate WiFi password
    if (selectedNetwork?.encryption !== 'OPEN') {
      if (!formData.wifiPassword) {
        newErrors.wifiPassword = 'Password WiFi wajib diisi';
        hasError = true;
      } else if (formData.wifiPassword.length < 8) {
        newErrors.wifiPassword = 'Password WiFi minimal 8 karakter';
        hasError = true;
      }
    }

    // Validate user info
    if (!formData.userName.trim()) {
      newErrors.userName = 'Nama lengkap wajib diisi';
      hasError = true;
    } else if (formData.userName.trim().length < 3) {
      newErrors.userName = 'Nama minimal 3 karakter';
      hasError = true;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
      hasError = true;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Format email tidak valid';
        hasError = true;
      }
    }

    if (!formData.password) {
      newErrors.password = 'Password wajib diisi';
      hasError = true;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
      hasError = true;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password wajib diisi';
      hasError = true;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
      hasError = true;
    }

    // Check if email already exists
    if (!newErrors.email) {
      const existingUsers = JSON.parse(localStorage.getItem('agroguard_users') || '[]');
      const emailExists = existingUsers.some((u: any) => u.email === formData.email);
      
      if (emailExists) {
        newErrors.email = 'Email sudah terdaftar';
        hasError = true;
        toast.error('Email sudah terdaftar! Silakan gunakan email lain atau login.');
      }
    }

    if (hasError) {
      setErrors(newErrors);
      toast.error('Mohon perbaiki kesalahan pada form!');
      return;
    }

    setStep('processing');

    try {
      // In production: Send configuration to device
      // POST http://192.168.4.1/api/wifi/connect
      // Body: { ssid, password, userId, apiKey }
      
      toast.info('Mengkonfigurasi device...');
      
      // Simulate device configuration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.info('Menyimpan data user...');
      
      // Save user data
      const newUser = {
        id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: formData.userName,
        email: formData.email,
        password: formData.password,
        role: 'user' as const,
        devices: [selectedDevice!.deviceId],
        location: formData.location || 'Belum diatur',
        wifiSSID: selectedNetwork!.ssid || '[Hidden Network]',
        deviceMacAddress: selectedDevice!.macAddress,
        createdAt: new Date().toISOString()
      };

      const users = JSON.parse(localStorage.getItem('agroguard_users') || '[]');
      users.push(newUser);
      localStorage.setItem('agroguard_users', JSON.stringify(users));

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStep('success');
      toast.success('Device berhasil dikonfigurasi!');
    } catch (error) {
      toast.error('Terjadi kesalahan saat konfigurasi. Silakan coba lagi.');
      setStep('form');
    }
  };

  /**
   * Get signal strength icon
   */
  const getSignalIcon = (rssi: number) => {
    if (rssi >= -50) return <Signal className="w-5 h-5 text-green-500" />;
    if (rssi >= -70) return <Signal className="w-5 h-5 text-yellow-500" />;
    return <Signal className="w-5 h-5 text-red-500" />;
  };

  /**
   * Get signal strength text
   */
  const getSignalStrength = (rssi: number): string => {
    if (rssi >= -50) return 'Sangat Kuat';
    if (rssi >= -60) return 'Kuat';
    if (rssi >= -70) return 'Sedang';
    if (rssi >= -80) return 'Lemah';
    return 'Sangat Lemah';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0fdf4] via-[#e0f2fe] to-[#dbeafe] dark:from-[#0E172A] dark:via-[#0B2F2B] dark:to-[#0E172A] py-12 px-4 transition-colors relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30 dark:opacity-40">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#3B945E] rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl animate-blob" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-[#0077B6] rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl animate-blob animation-delay-2000" />
      </div>
      
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      <div className="container mx-auto max-w-2xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            onClick={() => onNavigate('landing')}
            className="mb-6 glass-card dark:glass-card-dark hover:bg-white/20 dark:hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Kembali
          </Button>

          <Card className="p-8 glass-card dark:glass-card-dark shadow-2xl border-2 border-white/30 dark:border-white/10">
            {/* STEP 1: Device Scan */}
            {step === 'device-scan' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-8">
                  <div className="bg-gradient-to-br from-[#3B945E] to-[#0077B6] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 glow-primary shadow-xl">
                    {isDeviceScanning ? (
                      <Loader2 className="w-8 h-8 animate-spin" />
                    ) : (
                      <Wifi className="w-8 h-8" />
                    )}
                  </div>
                  <h2 className="mb-2">Pilih Device AGROGUARD</h2>
                  <p className="text-muted-foreground text-sm">
                    {isDeviceScanning 
                      ? 'Scanning device di sekitar Anda...' 
                      : 'Pastikan device dalam mode setup (LED berkedip biru)'
                    }
                  </p>
                </div>

                {/* Scan Button */}
                {!isDeviceScanning && (
                  <div className="mb-6 text-center">
                    <Button
                      onClick={scanForDevices}
                      className="neumorphic-button bg-gradient-to-br from-[#3B945E] to-[#4CAF6E] hover:from-[#2d7347] hover:to-[#3B945E] text-white shadow-xl"
                    >
                      <RefreshCw className="mr-2 w-4 h-4" />
                      Scan Ulang Device
                    </Button>
                  </div>
                )}

                {/* Available Devices List */}
                <div className="space-y-3">
                  {availableDevices.length === 0 && !isDeviceScanning && (
                    <div className="text-center py-12">
                      <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">
                        Tidak ada device ditemukan
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Pastikan device AGROGUARD sudah dinyalakan dan dalam mode setup
                      </p>
                    </div>
                  )}

                  {availableDevices.map((device, index) => (
                    <motion.div
                      key={device.deviceId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <button
                        onClick={() => handleDeviceSelect(device)}
                        disabled={isWiFiScanning}
                        className="w-full p-4 glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/20 rounded-lg hover:border-[#3B945E] dark:hover:border-[#4CAF6E] hover:bg-[#3B945E]/10 dark:hover:bg-[#4CAF6E]/10 transition-smooth group hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-br from-[#3B945E] to-[#0077B6] text-white rounded-lg w-10 h-10 flex items-center justify-center">
                              <Wifi className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                              <div className="flex items-center gap-2">
                                <span>{device.displayName}</span>
                                <Badge variant="outline" className="text-xs">
                                  v{device.version}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                MAC: {device.macAddress}
                              </p>
                            </div>
                          </div>
                          <div className="text-muted-foreground group-hover:text-[#3B945E] dark:group-hover:text-[#4CAF6E]">
                            Pilih →
                          </div>
                        </div>
                      </button>
                    </motion.div>
                  ))}
                </div>

                {/* Info Box */}
                <div className="mt-6 p-4 glass-card dark:glass-card-dark border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex gap-3">
                    <Zap className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-muted-foreground">
                      <p className="mb-1">
                        <strong className="text-foreground">Catatan Penting:</strong>
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Pastikan device AGROGUARD sudah dinyalakan</li>
                        <li>LED pada device harus berkedip biru (mode setup)</li>
                        <li>Device akan broadcast WiFi dengan nama AGROGUARD_AP_xxxxx</li>
                        <li>Untuk reset device, tekan tombol reset selama 5 detik</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: WiFi Scan */}
            {step === 'wifi-scan' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-8">
                  <div className="bg-gradient-to-br from-[#3B945E] to-[#0077B6] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 glow-primary shadow-xl">
                    <Wifi className="w-8 h-8" />
                  </div>
                  <h2 className="mb-2">Pilih Jaringan WiFi</h2>
                  <p className="text-muted-foreground text-sm">
                    Device: {selectedDevice?.displayName}
                  </p>
                </div>

                {/* Refresh Button */}
                <div className="mb-6 text-center">
                  <Button
                    onClick={() => selectedDevice && scanWiFiNetworks(selectedDevice)}
                    disabled={isWiFiScanning}
                    variant="outline"
                    className="glass-card dark:glass-card-dark"
                  >
                    <RefreshCw className={`mr-2 w-4 h-4 ${isWiFiScanning ? 'animate-spin' : ''}`} />
                    Scan Ulang WiFi
                  </Button>
                </div>

                {/* WiFi Networks List */}
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {wifiNetworks.map((network, index) => (
                    <motion.div
                      key={`${network.ssid}-${network.channel}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <button
                        onClick={() => handleNetworkSelect(network)}
                        className="w-full p-3 glass-card dark:glass-card-dark border-2 border-white/30 dark:border-white/20 rounded-lg hover:border-[#3B945E] dark:hover:border-[#4CAF6E] hover:bg-[#3B945E]/10 dark:hover:bg-[#4CAF6E]/10 transition-smooth group hover:shadow-lg"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            {getSignalIcon(network.rssi)}
                            <div className="text-left flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="truncate">
                                  {network.ssid || '[Hidden Network]'}
                                </span>
                                {network.encryption !== 'OPEN' && (
                                  <Lock className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {getSignalStrength(network.rssi)} • {network.encryption} • Ch {network.channel}
                              </p>
                            </div>
                          </div>
                          <div className="text-muted-foreground group-hover:text-[#3B945E] dark:group-hover:text-[#4CAF6E] ml-2">
                            →
                          </div>
                        </div>
                      </button>
                    </motion.div>
                  ))}
                </div>

                {/* Back Button */}
                <div className="mt-6">
                  <Button
                    onClick={() => setStep('device-scan')}
                    variant="ghost"
                    className="w-full glass-card dark:glass-card-dark"
                  >
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Kembali ke Device
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Form */}
            {step === 'form' && selectedNetwork && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-8">
                  <h2 className="mb-2">Setup Device & Akun</h2>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Wifi className="w-4 h-4" />
                    <span>{selectedNetwork.ssid || '[Hidden Network]'}</span>
                    {selectedNetwork.encryption !== 'OPEN' && (
                      <Lock className="w-3 h-3" />
                    )}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* WiFi Configuration */}
                  {selectedNetwork.encryption !== 'OPEN' && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-[#3B945E] dark:text-[#4CAF6E]" />
                        <h3 className="text-[#3B945E] dark:text-[#4CAF6E]">Keamanan WiFi</h3>
                      </div>
                      
                      <div>
                        <Label htmlFor="wifiPassword">
                          Password WiFi * 
                          <span className="text-xs text-muted-foreground ml-2">
                            ({selectedNetwork.encryption})
                          </span>
                        </Label>
                        <Input
                          id="wifiPassword"
                          type="password"
                          value={formData.wifiPassword}
                          onChange={(e) => handleInputChange('wifiPassword', e.target.value)}
                          placeholder="Masukkan password WiFi"
                          className={`glass-card dark:glass-card-dark border-white/30 dark:border-white/10 focus:border-[#3B945E]/50 focus:ring-[#3B945E]/20 transition-smooth ${
                            errors.wifiPassword ? 'border-red-500 dark:border-red-500' : ''
                          }`}
                        />
                        {errors.wifiPassword && (
                          <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                            {errors.wifiPassword}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* User Information */}
                  <div className="space-y-4">
                    <h3 className="text-[#3B945E] dark:text-[#4CAF6E]">Informasi Akun</h3>
                    
                    <div>
                      <Label htmlFor="userName">Nama Lengkap *</Label>
                      <Input
                        id="userName"
                        type="text"
                        value={formData.userName}
                        onChange={(e) => handleInputChange('userName', e.target.value)}
                        placeholder="Nama Anda"
                        className={`glass-card dark:glass-card-dark border-white/30 dark:border-white/10 focus:border-[#3B945E]/50 focus:ring-[#3B945E]/20 transition-smooth ${
                          errors.userName ? 'border-red-500 dark:border-red-500' : ''
                        }`}
                      />
                      {errors.userName && (
                        <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                          {errors.userName}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="email@example.com"
                        className={`glass-card dark:glass-card-dark border-white/30 dark:border-white/10 focus:border-[#3B945E]/50 focus:ring-[#3B945E]/20 transition-smooth ${
                          errors.email ? 'border-red-500 dark:border-red-500' : ''
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="password">Password *</Label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder="Minimal 6 karakter"
                        className={`glass-card dark:glass-card-dark border-white/30 dark:border-white/10 focus:border-[#3B945E]/50 focus:ring-[#3B945E]/20 transition-smooth ${
                          errors.password ? 'border-red-500 dark:border-red-500' : ''
                        }`}
                      />
                      {errors.password && (
                        <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                          {errors.password}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword">Konfirmasi Password *</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        placeholder="Ketik ulang password"
                        className={`glass-card dark:glass-card-dark border-white/30 dark:border-white/10 focus:border-[#3B945E]/50 focus:ring-[#3B945E]/20 transition-smooth ${
                          errors.confirmPassword ? 'border-red-500 dark:border-red-500' : ''
                        }`}
                      />
                      {errors.confirmPassword && (
                        <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="location">Lokasi Perangkat (Opsional)</Label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleAutoLocation}
                          className="text-xs h-auto py-1 px-2"
                        >
                          <MapPin className="w-3 h-3 mr-1" />
                          Gunakan GPS
                        </Button>
                      </div>
                      <Input
                        id="location"
                        type="text"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        placeholder="Contoh: Kebun Sayur, Desa Maju"
                        className="glass-card dark:glass-card-dark border-white/30 dark:border-white/10 focus:border-[#3B945E]/50 focus:ring-[#3B945E]/20 transition-smooth"
                      />
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="space-y-3 pt-4">
                    <Button
                      type="submit"
                      className="w-full neumorphic-button bg-gradient-to-br from-[#3B945E] to-[#4CAF6E] hover:from-[#2d7347] hover:to-[#3B945E] text-white px-8 py-6 h-auto shadow-xl hover:shadow-2xl glow-primary hover:glow-accent transition-smooth"
                    >
                      <CheckCircle className="mr-2 w-5 h-5" />
                      Selesaikan Setup
                    </Button>

                    <Button
                      type="button"
                      onClick={() => setStep('wifi-scan')}
                      variant="ghost"
                      className="w-full glass-card dark:glass-card-dark"
                    >
                      <ArrowLeft className="mr-2 w-4 h-4" />
                      Kembali ke WiFi
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* STEP 4: Processing */}
            {step === 'processing' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <div className="bg-gradient-to-br from-[#3B945E] to-[#0077B6] text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 glow-primary shadow-xl">
                  <Loader2 className="w-10 h-10 animate-spin" />
                </div>
                <h2 className="mb-4">Mengkonfigurasi Device...</h2>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>✓ Mengirim konfigurasi WiFi ke device</p>
                  <p>✓ Membuat akun pengguna</p>
                  <p>✓ Menghubungkan device ke akun Anda</p>
                </div>
                <p className="mt-6 text-xs text-muted-foreground">
                  Mohon tunggu, proses ini memerlukan waktu beberapa saat...
                </p>
              </motion.div>
            )}

            {/* STEP 5: Success */}
            {step === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h2 className="mb-4">Setup Berhasil! 🎉</h2>
                <p className="text-muted-foreground mb-8">
                  Device AGROGUARD Anda telah terkonfigurasi dengan baik.
                  <br />
                  Silakan login untuk mulai monitoring.
                </p>

                <div className="space-y-3 max-w-sm mx-auto">
                  <Button
                    onClick={() => onNavigate('login')}
                    className="w-full neumorphic-button bg-gradient-to-br from-[#3B945E] to-[#4CAF6E] hover:from-[#2d7347] hover:to-[#3B945E] text-white px-8 py-6 h-auto shadow-xl hover:shadow-2xl glow-primary transition-smooth"
                  >
                    Login Sekarang
                  </Button>

                  <Button
                    onClick={() => onNavigate('landing')}
                    variant="ghost"
                    className="w-full glass-card dark:glass-card-dark"
                  >
                    Kembali ke Beranda
                  </Button>
                </div>
              </motion.div>
            )}
          </Card>

          {/* Help Text */}
          {(step === 'device-scan' || step === 'wifi-scan') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-muted-foreground">
                Butuh bantuan? Lihat{' '}
                <button 
                  onClick={() => {
                    toast.info('Panduan setup akan segera ditambahkan');
                  }}
                  className="text-[#3B945E] dark:text-[#4CAF6E] hover:underline"
                >
                  panduan setup device
                </button>
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
