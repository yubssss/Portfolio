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
  { src: '/assets/ojt/ojt.jpg', title: 'Mobile Developer Internship - Event Check-In System' },
];

export const weddingMockups: MockupItem[] = [
  {
    id: 1,
    title: 'Mobile Developer Internship',
    imageUrl: '/assets/ojt/ojt.jpg',
    description: 'Event Check-In System UI - QR Scanner & Attendee Management',
  },
];

// ─── FURNIVIEW ────────────────────────────────────────────────────────────────
export const furniViewScreens: ScreenItem[] = [
  { src: '/assets/furni/furni-1.jpg', title: 'Landing Page' },
  { src: '/assets/furni/furni-2.jpg', title: 'Category Navigation' },
  { src: '/assets/furni/furni-3.jpg', title: 'Product Catalog Grid' },
  { src: '/assets/furni/furni-4.jpg', title: 'Detailed Product Specs' },
  { src: '/assets/furni/furni-5.jpg', title: 'AR View Activation' },
  { src: '/assets/furni/furni-6.jpg', title: 'Placement & Interaction' },
  { src: '/assets/furni/furni-7.jpg', title: 'Welcome Page' },
];

export const furniViewMockups: MockupItem[] = [
  { id: 1, title: 'Landing Page', imageUrl: '/assets/furni/furni-1.jpg', description: 'Modern welcome screen with featured furniture collections.' },
  { id: 2, title: 'Category Navigation', imageUrl: '/assets/furni/furni-2.jpg', description: 'Intuitive filter system for tables, chairs, and lighting.' },
  { id: 3, title: 'Product Catalog Grid', imageUrl: '/assets/furni/furni-3.jpg', description: 'Responsive display of available furniture items with pricing.' },
  { id: 4, title: 'Detailed Product Specs', imageUrl: '/assets/furni/furni-4.jpg', description: 'In-depth view of dimensions, materials, and features.' },
  { id: 5, title: 'AR View Activation', imageUrl: '/assets/furni/furni-5.jpg', description: 'Interface for initiating the Augmented Reality scanner.' },
  { id: 6, title: 'Placement & Interaction', imageUrl: '/assets/furni/furni-6.jpg', description: 'Live interaction mode for scaling and rotating furniture in AR.' },
  { id: 7, title: 'Checkout/Cart Summary', imageUrl: '/assets/furni/furni-7.jpg', description: 'Streamlined purchase and cart management interface.' },
];

// ─── ECOTRACK MOBILE ─────────────────────────────────────────────────────────
export const ecoTrackScreens: ScreenItem[] = [
  { src: '/assets/ecotrack/Welcome Login Portal.jpg', title: 'Welcome Login Portal' },
  { src: '/assets/ecotrack/Service Portal Dashboard.jpg', title: 'Service Portal Dashboard' },
  { src: '/assets/ecotrack/Active Tickets Management Console.jpg', title: 'Active Tickets Management Console' },
  { src: '/assets/ecotrack/Resolved Ticket History.jpg', title: 'Resolved Support Ticket Logs' },
  { src: '/assets/ecotrack/Borrow Equipment Management.jpg', title: 'Borrow Equipment Management' },
  { src: '/assets/ecotrack/Return Assets Module.jpg', title: 'Return Assets Module' },
  { src: '/assets/ecotrack/Notifications & Updates Hub.jpg', title: 'Notifications & Updates Hub' },
  { src: '/assets/ecotrack/Profile Settings Panel.jpg', title: 'Profile Settings Panel' },
];

export const ecoTrackMockups: MockupItem[] = [
  { id: 1, title: 'Welcome Login Portal', imageUrl: '/assets/ecotrack/Welcome Login Portal.jpg', description: 'PhilEco Ticketing & Equipment Management Welcome Screen' },
  { id: 2, title: 'Service Portal Dashboard', imageUrl: '/assets/ecotrack/Service Portal Dashboard.jpg', description: 'Secure authentication interface for PhilEco employees' },
  { id: 3, title: 'Active Tickets Management Console', imageUrl: '/assets/ecotrack/Active Tickets Management Console.jpg', description: 'Main dashboard showing active tickets and service selection' },
  { id: 4, title: 'Resolved Support Ticket Logs', imageUrl: '/assets/ecotrack/Resolved Ticket History.jpg', description: 'Logs of all resolved support tickets with admin final remarks' },
  { id: 5, title: 'Borrow Equipment Management', imageUrl: '/assets/ecotrack/Borrow Equipment Management.jpg', description: 'Interface to request assets, tools, or hardware devices' },
  { id: 6, title: 'Return Assets Module', imageUrl: '/assets/ecotrack/Return Assets Module.jpg', description: 'Tracking current borrowed assets and initiating return requests' },
  { id: 7, title: 'Notifications & Updates Hub', imageUrl: '/assets/ecotrack/Notifications & Updates Hub.jpg', description: 'Real-time alerts on ticket status changes and admin messages' },
  { id: 8, title: 'Profile Settings Panel', imageUrl: '/assets/ecotrack/Profile Settings Panel.jpg', description: 'User profile configurations and mobile application local settings' },
];

// ─── ECOTRACK WEB ─────────────────────────────────────────────────────────────
export const ecoTrackWebScreens: ScreenItem[] = [
  { src: '/assets/ecoweb/eco1.png', title: 'HR Support Ticket Dashboard' },
  { src: '/assets/ecoweb/eco2.png', title: 'Employee Request Dashboard' },
  { src: '/assets/ecoweb/eco3.png', title: 'HR Analytics Dashboard' },
  { src: '/assets/ecoweb/eco4.png', title: 'Supabase Database – Tickets Table' },
];

export const ecoTrackWebMockups: MockupItem[] = [
  { id: 1, title: 'HR Support Ticket Dashboard', imageUrl: '/assets/ecoweb/eco1.png', description: 'Admin view: monitor, filter, and resolve employee HR tickets in real time.' },
  { id: 2, title: 'Employee Request Dashboard', imageUrl: '/assets/ecoweb/eco2.png', description: 'Live stats (Total: 108 | Pending: 25 | Resolved: 52) with recent activity feed.' },
  { id: 3, title: 'HR Analytics Dashboard', imageUrl: '/assets/ecoweb/eco3.png', description: 'Bar chart + pie chart breakdowns with AI-powered next-week ticket predictions.' },
  { id: 4, title: 'Supabase Database – Tickets Table', imageUrl: '/assets/ecoweb/eco4.png', description: 'PostgreSQL table editor showing ticket records: payroll, leave, and benefits.' },
];