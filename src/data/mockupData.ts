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
  { src: '/src/assets/ojt/ojt.jpg', title: 'Mobile Developer Internship - Event Check-In System' },
];

export const weddingMockups: MockupItem[] = [
  {
    id: 1,
    title: 'Mobile Developer Internship',
    imageUrl: '/src/assets/ojt/ojt.jpg',
    description: 'Event Check-In System UI - QR Scanner & Attendee Management',
  },
];

// ─── FURNIVIEW ────────────────────────────────────────────────────────────────
export const furniViewScreens: ScreenItem[] = [
  { src: '/src/assets/furni/furni-1.jpg', title: 'Landing Page' },
  { src: '/src/assets/furni/furni-2.jpg', title: 'Category Navigation' },
  { src: '/src/assets/furni/furni-3.jpg', title: 'Product Catalog Grid' },
  { src: '/src/assets/furni/furni-4.jpg', title: 'Detailed Product Specs' },
  { src: '/src/assets/furni/furni-5.jpg', title: 'AR View Activation' },
  { src: '/src/assets/furni/furni-6.jpg', title: 'Placement & Interaction' },
  { src: '/src/assets/furni/furni-7.jpg', title: 'Welcome Page' },
];

export const furniViewMockups: MockupItem[] = [
  { id: 1, title: 'Landing Page', imageUrl: '/src/assets/furni/furni-1.jpg', description: 'Modern welcome screen with featured furniture collections.' },
  { id: 2, title: 'Category Navigation', imageUrl: '/src/assets/furni/furni-2.jpg', description: 'Intuitive filter system for tables, chairs, and lighting.' },
  { id: 3, title: 'Product Catalog Grid', imageUrl: '/src/assets/furni/furni-3.jpg', description: 'Responsive display of available furniture items with pricing.' },
  { id: 4, title: 'Detailed Product Specs', imageUrl: '/src/assets/furni/furni-4.jpg', description: 'In-depth view of dimensions, materials, and features.' },
  { id: 5, title: 'AR View Activation', imageUrl: '/src/assets/furni/furni-5.jpg', description: 'Interface for initiating the Augmented Reality scanner.' },
  { id: 6, title: 'Placement & Interaction', imageUrl: '/src/assets/furni/furni-6.jpg', description: 'Live interaction mode for scaling and rotating furniture in AR.' },
  { id: 7, title: 'Checkout/Cart Summary', imageUrl: '/src/assets/furni/furni-7.jpg', description: 'Streamlined purchase and cart management interface.' },
];

// ─── ECOTRACK MOBILE ─────────────────────────────────────────────────────────
export const ecoTrackScreens: ScreenItem[] = [
  { src: '/src/assets/ecotrack/Welcome Login Portal.jpg', title: 'Welcome Login Portal' },
  { src: '/src/assets/ecotrack/Service Portal Dashboard.jpg', title: 'Service Portal Dashboard' },
  { src: '/src/assets/ecotrack/Active Tickets Management Console.jpg', title: 'Active Tickets Management Console' },
  { src: '/src/assets/ecotrack/Resolved Ticket History.jpg', title: 'Resolved Support Ticket Logs' },
  { src: '/src/assets/ecotrack/Borrow Equipment Management.jpg', title: 'Borrow Equipment Management' },
  { src: '/src/assets/ecotrack/Return Assets Module.jpg', title: 'Return Assets Module' },
  { src: '/src/assets/ecotrack/Notifications & Updates Hub.jpg', title: 'Notifications & Updates Hub' },
  { src: '/src/assets/ecotrack/Profile Settings Panel.jpg', title: 'Profile Settings Panel' },
];

export const ecoTrackMockups: MockupItem[] = [
  { id: 1, title: 'Welcome Login Portal', imageUrl: '/src/assets/ecotrack/Welcome Login Portal.jpg', description: 'PhilEco Ticketing & Equipment Management Welcome Screen' },
  { id: 2, title: 'Service Portal Dashboard', imageUrl: '/src/assets/ecotrack/Service Portal Dashboard.jpg', description: 'Secure authentication interface for PhilEco employees' },
  { id: 3, title: 'Active Tickets Management Console', imageUrl: '/src/assets/ecotrack/Active Tickets Management Console.jpg', description: 'Main dashboard showing active tickets and service selection' },
  { id: 4, title: 'Resolved Support Ticket Logs', imageUrl: '/src/assets/ecotrack/Resolved Ticket History.jpg', description: 'Logs of all resolved support tickets with admin final remarks' },
  { id: 5, title: 'Borrow Equipment Management', imageUrl: '/src/assets/ecotrack/Borrow Equipment Management.jpg', description: 'Interface to request assets, tools, or hardware devices' },
  { id: 6, title: 'Return Assets Module', imageUrl: '/src/assets/ecotrack/Return Assets Module.jpg', description: 'Tracking current borrowed assets and initiating return requests' },
  { id: 7, title: 'Notifications & Updates Hub', imageUrl: '/src/assets/ecotrack/Notifications & Updates Hub.jpg', description: 'Real-time alerts on ticket status changes and admin messages' },
  { id: 8, title: 'Profile Settings Panel', imageUrl: '/src/assets/ecotrack/Profile Settings Panel.jpg', description: 'User profile configurations and mobile application local settings' },
];

// ─── ECOTRACK WEB ─────────────────────────────────────────────────────────────
export const ecoTrackWebScreens: ScreenItem[] = [
  { src: '/src/assets/ecoweb/eco1.png', title: 'HR Support Ticket Dashboard' },
  { src: '/src/assets/ecoweb/eco2.png', title: 'Employee Request Dashboard' },
  { src: '/src/assets/ecoweb/eco3.png', title: 'HR Analytics Dashboard' },
  { src: '/src/assets/ecoweb/eco4.png', title: 'Supabase Database – Tickets Table' },
];

export const ecoTrackWebMockups: MockupItem[] = [
  { id: 1, title: 'HR Support Ticket Dashboard', imageUrl: '/src/assets/ecoweb/eco1.png', description: 'Admin view: monitor, filter, and resolve employee HR tickets in real time.' },
  { id: 2, title: 'Employee Request Dashboard', imageUrl: '/src/assets/ecoweb/eco2.png', description: 'Live stats (Total: 108 | Pending: 25 | Resolved: 52) with recent activity feed.' },
  { id: 3, title: 'HR Analytics Dashboard', imageUrl: '/src/assets/ecoweb/eco3.png', description: 'Bar chart + pie chart breakdowns with AI-powered next-week ticket predictions.' },
  { id: 4, title: 'Supabase Database – Tickets Table', imageUrl: '/src/assets/ecoweb/eco4.png', description: 'PostgreSQL table editor showing ticket records: payroll, leave, and benefits.' },
];