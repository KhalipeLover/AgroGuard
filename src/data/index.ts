/**
 * Centralized Data Exports
 * 
 * Single entry point for all demo data imports
 * Makes it easy to switch between mock data and real API calls
 */

// Data Synchronization (Master Constants)
export {
  MASTER_CONSTANTS,
  CALCULATED_VALUES,
  MONTHLY_GROWTH_TIMELINE,
  DATA_SYNC_SUMMARY,
  validateAllData,
  validateDeviceCounts,
  validateUserCounts,
  getSystemStatsSync,
  getDeviceStatusSync,
  getMonthlyGrowthSync
} from './demo-data-sync';

// Statistics
export { 
  default as statisticsData,
  fetchStatistics,
  type Statistic 
} from './demo-statistics';

// SDG Goals
export { 
  default as sdgGoalsData,
  fetchSDGGoals,
  type SDGGoal 
} from './demo-sdg-goals';

// Features
export { 
  default as featuresData,
  fetchFeatures,
  type Feature 
} from './demo-features';

// Use Cases
export { 
  default as useCasesData,
  fetchUseCases,
  type UseCase 
} from './demo-use-cases';

// Benefits
export { 
  default as benefitsData,
  fetchBenefits,
  type Benefit 
} from './demo-benefits';

// How It Works
export { 
  default as howItWorksData,
  fetchHowItWorks,
  type HowItWorksStep 
} from './demo-how-it-works';

// Testimonials
export { 
  default as testimonialsData,
  fetchTestimonials,
  fetchTestimonialById,
  type Testimonial,
  type TestimonialResult 
} from './demo-testimonials';

// Documentation
export { 
  default as documentationData,
  fetchDocumentation,
  fetchDocumentationById,
  fetchDocumentationByCategory,
  type DocumentationSlide 
} from './demo-documentation';

// FAQ
export { 
  default as faqData,
  fetchFAQ,
  fetchFAQByCategory,
  searchFAQ,
  getFAQCategories,
  type FAQItem 
} from './demo-faq';

// User Dashboard - Sensors
export {
  default as initialSensorData,
  fetchSensorData,
  generateUpdatedSensorData,
  fetchUserDevices,
  fetchDeviceSensorData,
  type SensorData
} from './demo-user-sensors';

// Plant Moisture Thresholds
export {
  default as plantThresholdsData,
  fetchPlantThresholds,
  fetchPlantThresholdById,
  getMoistureStatus,
  getPlantRecommendation,
  type PlantThreshold
} from './demo-plant-thresholds';

// User Dashboard - Notifications
export {
  default as notificationsData,
  fetchUserNotifications,
  type UserNotification
} from './demo-user-notifications';

// User Dashboard - Stats
export {
  defaultQuickStats,
  defaultDeviceInfo,
  defaultWeeklyTemperature,
  defaultWaterUsage,
  defaultSensorPerformance,
  fetchQuickStats,
  fetchDeviceInfo,
  fetchWeeklyTemperature,
  fetchWaterUsage,
  fetchSensorPerformance,
  fetchDeviceQuickStats,
  type QuickStat,
  type DeviceInfo,
  type WeeklyTemperature,
  type WaterUsage,
  type SensorPerformance
} from './demo-user-stats';

// Admin Dashboard - Users (50 users with 110 devices total)
export {
  default as adminUsersData,
  fetchAdminUsers,
  searchUsers,
  type AdminUser
} from './demo-admin-users-50-unique';

// Admin Dashboard - Devices (110 devices)
export {
  default as adminDevicesData,
  fetchAdminDevices,
  searchDevices,
  type AdminDevice
} from './demo-admin-devices-110';

// Admin Dashboard - Stats
export {
  defaultSystemStats,
  defaultRegionalStats,
  fetchSystemStats,
  fetchRegionalStats,
  calculateOnlinePercentage,
  type SystemStats,
  type RegionalStats
} from './demo-admin-stats';

// Admin Dashboard - Analytics
export {
  default as adminAnalytics,
  fetchAnalyticsData,
  fetchMonthlyGrowth,
  fetchDeviceStatus,
  fetchPerformanceSummary,
  type AnalyticsData,
  type MonthlyGrowthData,
  type DeviceStatusData,
  type PerformanceSummary
} from './demo-admin-analytics';

// Jawa Timur Real Data - Production (Tanaman Pangan)
export {
  default as jatimProductionData,
  fetchProductionData,
  getTopProducers,
  getTotalProduction,
  type ProductionData
} from './demo-jatim-production';

// Jawa Timur Real Data - Horticulture (Buah & Sayur)
// ⚠️ SYNCED WITH: demo-roi-calculator-config.ts (PlantType)
export {
  default as jatimHorticultureData,
  fetchHorticultureData,
  getAvailableKabupaten,
  getProductionByKabupaten,
  calculateSmallScalePotential,
  type HorticultureData,
  type HorticultureType,
  type PlantType // UNIFIED: Previously PlantCategory, now synced with ROI Calculator
} from './demo-jatim-horticulture';

// Jawa Timur Real Data - Irrigation
export {
  default as jatimIrrigationData,
  fetchIrrigationData,
  getIrrigationStats,
  getNetworksByCondition,
  type IrrigationData
} from './demo-jatim-irrigation';

// Jawa Timur Real Data - Rainfall
export {
  default as jatimRainfallData,
  rainfallStations,
  fetchRainfallData,
  fetchRainfallStations,
  getRainfallStatsByStation,
  getRainfallComparison,
  type RainfallData,
  type RainfallStation
} from './demo-jatim-rainfall';

// Jawa Timur Real Data - Renewable Energy
export {
  default as jatimRenewableEnergyData,
  fetchRenewableEnergyData,
  getTotalRenewableStats,
  getTopPotentialAreas,
  type RenewableEnergyData
} from './demo-jatim-renewable-energy';

// Jawa Timur Real Data - Water Quality
export {
  default as jatimWaterQualityData,
  waterQualityStations,
  fetchWaterQualityData,
  fetchWaterQualityStations,
  getWaterQualityStatsByStation,
  getWaterQualityComparison,
  type WaterQualityData,
  type WaterQualityStation
} from './demo-jatim-water-quality';

// Leads Management
export {
  default as leadsData,
  fetchLeads,
  addLead,
  updateLeadStatus,
  getLeadsStats,
  type Lead
} from './demo-leads';

// ROI Calculator Recommendations (Hortikultura)
export {
  default as roiRecommendations,
  fetchROIRecommendation,
  getAvailableKabupaten as getROIAvailableKabupaten,
  getRecommendationsByCrop,
  calculateEstimatedROI,
  type ROIRecommendation
} from './demo-roi-recommendations';

// ROI Calculator Configuration & Constants
export {
  default as roiCalculatorConfig,
  PLANT_CONFIGS,
  IRRIGATION_CONFIGS,
  COST_CONFIG,
  LAND_SIZE_EXAMPLES,
  LAND_SIZE_GUIDANCE,
  getPlantConfig,
  getIrrigationConfig,
  getLandSizeExample,
  getPlantsByType,
  formatLandAreaDisplay,
  type PlantType,
  type PlantConfig,
  type IrrigationSystem,
  type IrrigationConfig,
  type LandSizeExample
} from './demo-roi-calculator-config';

// Device Pricing & Recommendations (Updated for micro-scale)
export {
  default as devicePricingData,
  devicePackages,
  PRICING,
  calculateDeviceRecommendation,
  formatLandArea,
  formatRupiah,
  fetchDeviceRecommendation,
  type DevicePackage,
  type DeviceRecommendation
} from './demo-device-pricing';

// Legal Content
export {
  default as legalContents,
  getLegalContent,
  getAllLegalTypes,
  type LegalType,
  type LegalContentData,
  type LegalSection
} from './demo-legal-content';

// Footer Data
export {
  default as footerData,
  getFooterData,
  getSocialMediaLinks,
  getContactInfo,
  type FooterData,
  type FooterLink,
  type LegalLink,
  type SocialMedia,
  type ContactInfo
} from './demo-footer';

// Demo Login Users
export {
  default as demoUsers,
  seedDemoUsersToLocalStorage,
  getDemoUserByEmail,
  getDemoUserEmails,
  verifyDemoUser,
  getDemoCredentials,
  type DemoUser
} from './demo-login-users';
