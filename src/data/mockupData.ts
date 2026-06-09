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