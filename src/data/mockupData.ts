export interface MockupItem {
  id: number;
  title: string;
  imageUrl: string;
  description?: string;
}

export interface ScreenItem {
  src: string;
  title: string;
}

// Add this to your existing mockupData.tsx file

// ─── AI SCANNER (AI PANTRY SCANNER) ───────────────────────────────────────────
export const aiScannerScreens: ScreenItem[] = [
  { src: '/Portfolio/assets/recipe/1.jpg', title: 'Welcome to AI Pantry Scanner' },
  { src: '/Portfolio/assets/recipe/2.jpg', title: 'Gemini Recipe Intelligence' },
  { src: '/Portfolio/assets/recipe/3.jpg', title: 'Saved for Offline Cooking' },
  { src: '/Portfolio/assets/recipe/4.jpg', title: 'Scan Your Pantry - Camera Interface' },
  { src: '/Portfolio/assets/recipe/5.jpg', title: 'Analyzing Your Ingredients' },
  { src: '/Portfolio/assets/recipe/6.jpg', title: 'Recipe Analysis Result' },
  { src: '/Portfolio/assets/recipe/7.jpg', title: 'Full Recipe View - Ingredients & Instructions' },
  { src: '/Portfolio/assets/recipe/8.jpg', title: 'Pantry History - Recipe Card' },
  { src: '/Portfolio/assets/recipe/9.jpg', title: 'Pantry History - Expanded View' },
  { src: '/Portfolio/assets/recipe/10.jpg', title: 'Profile & Settings' },
];

export const aiScannerMockups: MockupItem[] = [
  { 
    id: 1, 
    title: 'Welcome to AI Pantry Scanner', 
    imageUrl: '/Portfolio/assets/recipe/1.jpg', 
    description: 'Welcome screen introducing the AI Pantry Scanner - scan ingredients and turn what you have into practical recipes.' 
  },
  { 
    id: 2, 
    title: 'Gemini Recipe Intelligence', 
    imageUrl: '/Portfolio/assets/recipe/2.jpg', 
    description: 'Powered by Google Gemini AI - photos become structured ingredients, cooking time, nutrition estimates, and guided steps.' 
  },
  { 
    id: 3, 
    title: 'Saved for Offline Cooking', 
    imageUrl: '/Portfolio/assets/recipe/3.jpg', 
    description: 'Scan history and generated recipes stay available locally for offline access.' 
  },
  { 
    id: 4, 
    title: 'Scan Your Pantry', 
    imageUrl: '/Portfolio/assets/recipe/4.jpg', 
    description: 'Camera interface with options to Take Photo or Choose from Gallery for ingredient scanning.' 
  },
  { 
    id: 5, 
    title: 'Analyzing Your Ingredients', 
    imageUrl: '/Portfolio/assets/recipe/5.jpg', 
    description: 'Real-time AI analysis of detected ingredients with loading state.' 
  },
  { 
    id: 6, 
    title: 'Recipe Analysis Result', 
    imageUrl: '/Portfolio/assets/recipe/6.jpg', 
    description: 'AI-generated recipe recommendation based on scanned ingredients - Spicy Tuna and Anchovy Spaghetti.' 
  },
  { 
    id: 7, 
    title: 'Full Recipe View', 
    imageUrl: '/Portfolio/assets/recipe/7.jpg', 
    description: 'Complete recipe details including ingredients list, cooking instructions, prep time, servings, and calories.' 
  },
  { 
    id: 8, 
    title: 'Pantry History - Recipe Card', 
    imageUrl: '/Portfolio/assets/recipe/8.jpg', 
    description: 'History view showing saved recipes with summary cards containing time, servings, calories, and difficulty.' 
  },
  { 
    id: 9, 
    title: 'Pantry History - Expanded View', 
    imageUrl: '/Portfolio/assets/recipe/9.jpg', 
    description: 'Expanded recipe history showing full ingredients list and detected items.' 
  },
  { 
    id: 10, 
    title: 'Profile & Settings', 
    imageUrl: '/Portfolio/assets/recipe/10.jpg', 
    description: 'User profile management with dark mode, voice guide, data management, clear history, and offline storage options.' 
  },
];
// ─── WEDDING / OJT ───────────────────────────────────────────────────────────
export const weddingScreens: ScreenItem[] = [
  { src: '/Portfolio/assets/ojt/ojt.jpg', title: 'Mobile Developer Internship - Event Check-In System' },
];

export const weddingMockups: MockupItem[] = [
  {
    id: 1,
    title: 'Mobile Developer Internship',
    imageUrl: '/Portfolio/assets/ojt/ojt.jpg',
    description: 'Event Check-In System UI - QR Scanner & Attendee Management',
  },
];

// ─── FURNIVIEW ────────────────────────────────────────────────────────────────
export const furniViewScreens: ScreenItem[] = [
  { src: '/Portfolio/assets/furni/furni-1.jpg', title: 'Landing Page' },
  { src: '/Portfolio/assets/furni/furni-2.jpg', title: 'Category Navigation' },
  { src: '/Portfolio/assets/furni/furni-3.jpg', title: 'Product Catalog Grid' },
  { src: '/Portfolio/assets/furni/furni-4.jpg', title: 'Detailed Product Specs' },
  { src: '/Portfolio/assets/furni/furni-5.jpg', title: 'AR View Activation' },
  { src: '/Portfolio/assets/furni/furni-6.jpg', title: 'Placement & Interaction' },
  { src: '/Portfolio/assets/furni/furni-7.jpg', title: 'Welcome Page' },
];

export const furniViewMockups: MockupItem[] = [
  { id: 1, title: 'Landing Page', imageUrl: '/Portfolio/assets/furni/furni-1.jpg', description: 'Modern welcome screen with featured furniture collections.' },
  { id: 2, title: 'Category Navigation', imageUrl: '/Portfolio/assets/furni/furni-2.jpg', description: 'Intuitive filter system for tables, chairs, and lighting.' },
  { id: 3, title: 'Product Catalog Grid', imageUrl: '/Portfolio/assets/furni/furni-3.jpg', description: 'Responsive display of available furniture items with pricing.' },
  { id: 4, title: 'Detailed Product Specs', imageUrl: '/Portfolio/assets/furni/furni-4.jpg', description: 'In-depth view of dimensions, materials, and features.' },
  { id: 5, title: 'AR View Activation', imageUrl: '/Portfolio/assets/furni/furni-5.jpg', description: 'Interface for initiating the Augmented Reality scanner.' },
  { id: 6, title: 'Placement & Interaction', imageUrl: '/Portfolio/assets/furni/furni-6.jpg', description: 'Live interaction mode for scaling and rotating furniture in AR.' },
  { id: 7, title: 'Checkout/Cart Summary', imageUrl: '/Portfolio/assets/furni/furni-7.jpg', description: 'Streamlined purchase and cart management interface.' },
];

// ─── ECOTRACK MOBILE ─────────────────────────────────────────────────────────
export const ecoTrackScreens: ScreenItem[] = [
  { src: '/Portfolio/assets/ecotrack/welcome-login-portal.jpg', title: 'Welcome Login Portal' },
  { src: '/Portfolio/assets/ecotrack/service-portal-dashboard.jpg', title: 'Service Portal Dashboard' },
  { src: '/Portfolio/assets/ecotrack/active-tickets-console.jpg', title: 'Active Tickets Management Console' },
  { src: '/Portfolio/assets/ecotrack/resolved-ticket-history.jpg', title: 'Resolved Support Ticket Logs' },
  { src: '/Portfolio/assets/ecotrack/borrow-equipment.jpg', title: 'Borrow Equipment Management' },
  { src: '/Portfolio/assets/ecotrack/return-assets.jpg', title: 'Return Assets Module' },
  { src: '/Portfolio/assets/ecotrack/notifications-hub.jpg', title: 'Notifications & Updates Hub' },
  { src: '/Portfolio/assets/ecotrack/profile-settings.jpg', title: 'Profile Settings Panel' },
];

export const ecoTrackMockups: MockupItem[] = [
  { id: 1, title: 'Welcome Login Portal', imageUrl: '/Portfolio/assets/ecotrack/welcome-login-portal.jpg', description: 'PhilEco Ticketing & Equipment Management Welcome Screen' },
  { id: 2, title: 'Service Portal Dashboard', imageUrl: '/Portfolio/assets/ecotrack/service-portal-dashboard.jpg', description: 'Secure authentication interface for PhilEco employees' },
  { id: 3, title: 'Active Tickets Management Console', imageUrl: '/Portfolio/assets/ecotrack/active-tickets-console.jpg', description: 'Main dashboard showing active tickets and service selection' },
  { id: 4, title: 'Resolved Support Ticket Logs', imageUrl: '/Portfolio/assets/ecotrack/resolved-ticket-history.jpg', description: 'Logs of all resolved support tickets with admin final remarks' },
  { id: 5, title: 'Borrow Equipment Management', imageUrl: '/Portfolio/assets/ecotrack/borrow-equipment.jpg', description: 'Interface to request assets, tools, or hardware devices' },
  { id: 6, title: 'Return Assets Module', imageUrl: '/Portfolio/assets/ecotrack/return-assets.jpg', description: 'Tracking current borrowed assets and initiating return requests' },
  { id: 7, title: 'Notifications & Updates Hub', imageUrl: '/Portfolio/assets/ecotrack/notifications-hub.jpg', description: 'Real-time alerts on ticket status changes and admin messages' },
  { id: 8, title: 'Profile Settings Panel', imageUrl: '/Portfolio/assets/ecotrack/profile-settings.jpg', description: 'User profile configurations and mobile application local settings' },
];

// ─── ECOTRACK WEB ─────────────────────────────────────────────────────────────
export const ecoTrackWebScreens: ScreenItem[] = [
  { src: '/Portfolio/assets/ecoweb/eco1.png', title: 'HR Support Ticket Dashboard' },
  { src: '/Portfolio/assets/ecoweb/eco2.png', title: 'Employee Request Dashboard' },
  { src: '/Portfolio/assets/ecoweb/eco3.png', title: 'HR Analytics Dashboard' },
  { src: '/Portfolio/assets/ecoweb/eco4.png', title: 'Supabase Database – Tickets Table' },
];

export const ecoTrackWebMockups: MockupItem[] = [
  { id: 1, title: 'HR Support Ticket Dashboard', imageUrl: '/Portfolio/assets/ecoweb/eco1.png', description: 'Admin view: monitor, filter, and resolve employee HR tickets in real time.' },
  { id: 2, title: 'Employee Request Dashboard', imageUrl: '/Portfolio/assets/ecoweb/eco2.png', description: 'Live stats (Total: 108 | Pending: 25 | Resolved: 52) with recent activity feed.' },
  { id: 3, title: 'HR Analytics Dashboard', imageUrl: '/Portfolio/assets/ecoweb/eco3.png', description: 'Bar chart + pie chart breakdowns with AI-powered next-week ticket predictions.' },
  { id: 4, title: 'Supabase Database – Tickets Table', imageUrl: '/Portfolio/assets/ecoweb/eco4.png', description: 'PostgreSQL table editor showing ticket records: payroll, leave, and benefits.' },
];