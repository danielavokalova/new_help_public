/* Shared data for the GOL IBE Help Portal */

export type Article = {
  title: string;
  href: string;
};

export type Category = {
  icon: string;
  name: string;
  desc: string;
  href: string;
  articles: Article[];
};

export type AppTab = {
  label: string;
  href: string;
  isActive: boolean;
};

export type ReleaseNote = {
  version: string;
  items: string[];
};

export type Walkthrough = {
  title: string;
  desc: string;
  steps: number;
  category: string;
  href: string;
};

export type HealthCheck = {
  label: string;
  desc: string;
  status: "ok" | "warning" | "pending";
  href: string;
};

export const CATEGORIES: Category[] = [
  {
    icon: "🏢", name: "Agency",
    desc: "Profile, e-mail settings, payment fees",
    href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-agency",
    articles: [
      { title: "Email notifications settings", href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-agency-what-is-section-e-mail-notifications-good-for" },
      { title: "Add fee for payment method", href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-agency-how-to-add-a-fee-for-payment-method" },
    ],
  },
  {
    icon: "🤝", name: "Dealers",
    desc: "Dealer accounts, commissions, multi-currency",
    href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-dealers",
    articles: [
      { title: "Create a Dealer Account", href: "/portal/getting-started/create-dealer" },
      { title: "Dealer Commission", href: "/portal/getting-started/commission" },
      { title: "Multi-currency setup", href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-dealers-customization-via-dealer-edit-how-to-set-up-a-multi-currency" },
      { title: "Calendar management", href: "/portal/getting-started/2-gol-ibe-step-by-step-dealers-customization-via-dealer-edit-how-to-manage-calendar-on-your-gol-ibe-web-e698fa" },
      { title: "Basic front-end customization", href: "/portal/getting-started/2-gol-ibe-step-by-step-gol-ibe-dealers-customization-via-dealer-front-end-settings-basic-fronted-customization" },
      { title: "Change background on front-end", href: "/portal/getting-started/2-gol-ibe-step-by-step-gol-ibe-dealers-customization-via-dealer-front-end-settings-how-to-change-background-on" },
    ],
  },
  {
    icon: "👤", name: "Customers",
    desc: "Passenger profiles, travel documents",
    href: "/portal/troubleshooting/gol-ibe-faqs",
    articles: [
      { title: "Create a Customer Profile", href: "/portal/getting-started/create-customer" },
      { title: "Manage travel documents", href: "/portal/troubleshooting/1-gol-ibe-5-gol-ibe-faqs-how-to-manage-travel-documents-in-gol-ibe" },
      { title: "Handle bookings with clients", href: "/portal/troubleshooting/1-gol-ibe-5-gol-ibe-faqs-how-to-handle-bookings-with-clients" },
      { title: "Handle bookings in GOL IBE", href: "/portal/troubleshooting/1-gol-ibe-5-gol-ibe-faqs-how-to-handle-bookings-in-gol-ibe" },
    ],
  },
  {
    icon: "🎫", name: "Reservations",
    desc: "Create, modify and cancel bookings",
    href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-reservations",
    articles: [
      { title: "Create a New Air Reservation", href: "/portal/getting-started/create-booking" },
      { title: "Modify a Booking", href: "/portal/getting-started/modify-booking" },
      { title: "Cancel a Booking", href: "/portal/getting-started/cancel-booking" },
      { title: "Issue a Ticket", href: "/portal/getting-started/issue-ticket" },
      { title: "Handle bookings in Admin Console", href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-reservations-gol-ibe-how-to-handle-bookings-in-admin-console" },
      { title: "Export list of bookings", href: "/portal/troubleshooting/1-gol-ibe-5-gol-ibe-faqs-how-to-export-the-list-of-bookings" },
      { title: "Stop fake bookings", href: "/portal/troubleshooting/1-gol-ibe-5-gol-ibe-faqs-how-to-stop-someone-from-sending-fake-booking" },
    ],
  },
  {
    icon: "💰", name: "Prices & Markup",
    desc: "Service fees, discounts, promo codes, special offers",
    href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-prices",
    articles: [
      { title: "Configure Markup Rules", href: "/portal/getting-started/markup-rules" },
      { title: "Service Fees", href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-prices-how-to-handle-service-fees" },
      { title: "Service fees for 2OWs", href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-prices-how-to-handle-service-fees-for-2ows" },
      { title: "Manage promo codes", href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-prices-how-to-manage-promocodes" },
      { title: "Commissions and discounts", href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-prices-what-is-section-commissions-and-discounts-good-for" },
      { title: "Handle special offers", href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-prices-how-to-handle-special-offers" },
      { title: "Discount for carrier / flight", href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-prices-how-to-create-discount-for-certain-carrier-and-certain-flight" },
    ],
  },
  {
    icon: "📋", name: "Code Lists",
    desc: "Carriers, destination filters, flush caches",
    href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-code-lists",
    articles: [
      { title: "Carriers", href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-code-lists-carriers" },
      { title: "Destination filters", href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-code-lists-destination-filters" },
      { title: "Blocked emails", href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-code-lists-how-about-section-blocked-e-mails" },
      { title: "Flush caches", href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-code-lists-what-is-section-flush-cashes-good-for" },
      { title: "Flush HTML caches", href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-code-lists-what-is-section-flush-html-cashes-good-for" },
    ],
  },
  {
    icon: "👥", name: "Users",
    desc: "Agents, roles, passwords, access rights",
    href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-users",
    articles: [
      { title: "Add a New User", href: "/portal/getting-started/add-user" },
      { title: "Roles and Permissions", href: "/portal/getting-started/roles" },
      { title: "Reset an Agent's Password", href: "/portal/getting-started/reset-password" },
      { title: "Deactivate a User", href: "/portal/getting-started/deactivate-user" },
      { title: "Create new user access", href: "/portal/troubleshooting/1-gol-ibe-5-gol-ibe-faqs-how-to-create-a-new-user-s-access" },
      { title: "Manage own user account", href: "/portal/troubleshooting/1-gol-ibe-5-gol-ibe-faqs-how-to-manage-own-gol-ibe-user-s-account" },
    ],
  },
  {
    icon: "🔔", name: "Notifications",
    desc: "Email templates and sent notifications",
    href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-notifications",
    articles: [
      { title: "Booking Confirmation Email", href: "/portal/getting-started/booking-confirmation" },
      { title: "Custom Email Templates", href: "/portal/getting-started/custom-templates" },
      { title: "Notification templates", href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-notifications-notification-templates" },
      { title: "Sent notifications", href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-notifications-sent-notifications" },
      { title: "Customize from-email section", href: "/portal/troubleshooting/1-gol-ibe-5-gol-ibe-faqs-how-to-customize-section-from-e-mail" },
      { title: "Most used notification types", href: "/portal/troubleshooting/1-gol-ibe-5-gol-ibe-faqs-what-types-of-notifications-are-the-most-used-ones-and-what-are-these-good-for" },
    ],
  },
  {
    icon: "📄", name: "Supporting Texts",
    desc: "Terms, footer, menu, ticket template, CSS",
    href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-supporting-texts",
    articles: [
      { title: "Terms and Conditions", href: "/portal/getting-started/terms" },
      { title: "Custom Content Blocks", href: "/portal/getting-started/custom-blocks" },
      { title: "CSS customization", href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-supporting-texts-css" },
      { title: "Create a footer", href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-supporting-texts-how-to-create-a-footer" },
      { title: "Create menu on front-end", href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-supporting-texts-how-to-create-menu-on-your-front-end" },
      { title: "Edit ticket itinerary template", href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-supporting-texts-how-to-edit-your-ticket-itinerary-template" },
      { title: "Manage terms and conditions", href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-supporting-texts-how-to-manage-terms-and-conditions" },
    ],
  },
  {
    icon: "📈", name: "Statistics",
    desc: "Reports, CSV/Excel export, column reference",
    href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-statistics",
    articles: [
      { title: "Sales Report", href: "/portal/getting-started/sales-report" },
      { title: "Export to Excel / CSV", href: "/portal/getting-started/export" },
      { title: "Download statistics (CSV / Excel)", href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-statistics" },
      { title: "Export list of bookings", href: "/portal/troubleshooting/1-gol-ibe-5-gol-ibe-faqs-how-to-export-the-list-of-bookings" },
    ],
  },
  {
    icon: "⚙️", name: "Basic Settings",
    desc: "Design, working hours, service fee, notifications",
    href: "/portal/configuration/gol-ibe-basic-settings",
    articles: [
      { title: "Auto-ticketing Setup", href: "/portal/configuration/basic-auto-ticketing" },
      { title: "Design your GOL IBE site", href: "/portal/configuration/1-gol-ibe-3-gol-ibe-basic-settings-how-to-design-your-gol-ibe-site" },
      { title: "Set up working hours", href: "/portal/configuration/1-gol-ibe-3-gol-ibe-basic-settings-how-to-set-up-working-hours-in-your-gol-ibe" },
      { title: "Set up service fee", href: "/portal/configuration/1-gol-ibe-3-gol-ibe-basic-settings-how-to-set-up-service-fee" },
      { title: "Customize notifications", href: "/portal/configuration/1-gol-ibe-3-gol-ibe-basic-settings-how-to-customize-notifications-in-your-gol-ibe" },
      { title: "Implement air ticket search form", href: "/portal/configuration/1-gol-ibe-3-gol-ibe-basic-settings-how-to-implement-the-air-ticket-search-form-into-your-agency-website" },
    ],
  },
  {
    icon: "🔬", name: "Advanced Settings",
    desc: "GDS connectors, multi-PCC, NDC, parallel queries",
    href: "/portal/configuration/gol-ibe-advanced-settings",
    articles: [
      { title: "GDS / NDC Connectors", href: "/portal/configuration/advanced-connectors" },
      { title: "API Access", href: "/portal/configuration/advanced-api" },
      { title: "MIR connector", href: "/portal/configuration/1-gol-ibe-4-gol-ibe-advanced-settings-mir" },
      { title: "Multi-PCC queries", href: "/portal/configuration/1-gol-ibe-4-gol-ibe-advanced-settings-multipcc-dotazovani" },
      { title: "Parallel queries", href: "/portal/configuration/1-gol-ibe-4-gol-ibe-advanced-settings-paraleleni-dotazovani" },
      { title: "Service fee from airline commission", href: "/portal/configuration/1-gol-ibe-4-gol-ibe-advanced-settings-servisni-poplatek-z-provize-letecke-spolecnosti" },
    ],
  },
];

export const APP_TABS: AppTab[] = [
  { label: "GOL IBE Help", href: "/portal", isActive: true },
  { label: "Admin Console", href: "https://bo.golibe.com/", isActive: false },
  { label: "TCP", href: "https://www.travelcloudpro.com/#/login?returnTo=%2Fcbt%2Fcorporates", isActive: false },
  { label: "My Travelport", href: "https://auth.travelport.com/", isActive: false },
  { label: "GOL IBE Web", href: "https://demo4.golibe.com/", isActive: false },
];

export const WALKTHROUGHS: Walkthrough[] = [
  {
    title: "Set up your agency from scratch",
    desc: "Configure profile, email, payment methods and first users",
    steps: 6,
    category: "Agency",
    href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-agency",
  },
  {
    title: "Create your first reservation",
    desc: "Book a flight, assign passenger details and confirm payment",
    steps: 5,
    category: "Reservations",
    href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-reservations",
  },
  {
    title: "Configure markup and service fees",
    desc: "Add markup rules, service fees and promo codes",
    steps: 4,
    category: "Prices & Markup",
    href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-prices",
  },
  {
    title: "Set up email notifications",
    desc: "Edit templates, test sends and manage delivery logs",
    steps: 4,
    category: "Notifications",
    href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-notifications",
  },
  {
    title: "Connect a GDS source",
    desc: "Enter credentials, test connectivity and verify live results",
    steps: 3,
    category: "Advanced Settings",
    href: "/portal/configuration/gol-ibe-advanced-settings",
  },
];

export const HEALTH_CHECKS: HealthCheck[] = [
  {
    label: "GDS connector configured",
    desc: "At least one active GDS or NDC source",
    status: "ok",
    href: "/portal/configuration/gol-ibe-advanced-settings",
  },
  {
    label: "Working hours set",
    desc: "Agency availability schedule defined",
    status: "ok",
    href: "/portal/configuration/1-gol-ibe-3-gol-ibe-basic-settings-how-to-set-up-working-hours-in-your-gol-ibe",
  },
  {
    label: "Email notifications active",
    desc: "Booking confirmation templates configured",
    status: "warning",
    href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-notifications",
  },
  {
    label: "Agent accounts created",
    desc: "At least one non-admin user exists",
    status: "ok",
    href: "/portal/troubleshooting/1-gol-ibe-5-gol-ibe-faqs-how-to-create-a-new-user-s-access",
  },
  {
    label: "Terms & conditions published",
    desc: "Custom terms visible on front-end",
    status: "pending",
    href: "/portal/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-supporting-texts-how-to-manage-terms-and-conditions",
  },
  {
    label: "Service fee configured",
    desc: "Default service fee rules in place",
    status: "warning",
    href: "/portal/configuration/1-gol-ibe-3-gol-ibe-basic-settings-how-to-set-up-service-fee",
  },
];

export const RELEASE_NOTES: ReleaseNote[] = [
  {
    version: "April 2026",
    items: [
      "New Help Portal prototype launched — full-screen layout",
      "Persistent sidebar navigation with expandable topics",
      "App switcher: Admin Console, TCP, My Travelport, GOL IBE Web",
      "Contact Help form (Zendesk) added",
    ],
  },
  {
    version: "March 2026",
    items: [
      "Baseline information architecture established",
      "Content organised: Getting Started, Configuration, Operations, Troubleshooting",
    ],
  },
];
