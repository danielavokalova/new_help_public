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

export const CATEGORIES: Category[] = [
  {
    icon: "🏢", name: "Agency",
    desc: "Profile, e-mail settings, payment fees",
    href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-agency",
    articles: [
      { title: "Email notifications settings", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-agency-what-is-section-e-mail-notifications-good-for" },
      { title: "Add fee for payment method", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-agency-how-to-add-a-fee-for-payment-method" },
    ],
  },
  {
    icon: "🤝", name: "Dealers",
    desc: "Dealer accounts, commissions, multi-currency",
    href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-dealers",
    articles: [
      { title: "Multi-currency setup", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-dealers-customization-via-dealer-edit-how-to-set-up-a-multi-currency" },
      { title: "Calendar management", href: "/getting-started/2-gol-ibe-step-by-step-dealers-customization-via-dealer-edit-how-to-manage-calendar-on-your-gol-ibe-web-e698fa" },
      { title: "Basic front-end customization", href: "/getting-started/2-gol-ibe-step-by-step-gol-ibe-dealers-customization-via-dealer-front-end-settings-basic-fronted-customization" },
      { title: "Change background on front-end", href: "/getting-started/2-gol-ibe-step-by-step-gol-ibe-dealers-customization-via-dealer-front-end-settings-how-to-change-background-on" },
    ],
  },
  {
    icon: "👤", name: "Customers",
    desc: "Passenger profiles, travel documents",
    href: "/troubleshooting/gol-ibe-faqs",
    articles: [
      { title: "Manage travel documents", href: "/troubleshooting/1-gol-ibe-5-gol-ibe-faqs-how-to-manage-travel-documents-in-gol-ibe" },
      { title: "Handle bookings with clients", href: "/troubleshooting/1-gol-ibe-5-gol-ibe-faqs-how-to-handle-bookings-with-clients" },
      { title: "Handle bookings in GOL IBE", href: "/troubleshooting/1-gol-ibe-5-gol-ibe-faqs-how-to-handle-bookings-in-gol-ibe" },
    ],
  },
  {
    icon: "🎫", name: "Reservations",
    desc: "Create, modify and cancel bookings",
    href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-reservations",
    articles: [
      { title: "Handle bookings in Admin Console", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-reservations-gol-ibe-how-to-handle-bookings-in-admin-console" },
      { title: "Export list of bookings", href: "/troubleshooting/1-gol-ibe-5-gol-ibe-faqs-how-to-export-the-list-of-bookings" },
      { title: "Stop fake bookings", href: "/troubleshooting/1-gol-ibe-5-gol-ibe-faqs-how-to-stop-someone-from-sending-fake-booking" },
    ],
  },
  {
    icon: "💰", name: "Prices & Markup",
    desc: "Service fees, discounts, promo codes, special offers",
    href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-prices",
    articles: [
      { title: "Handle service fees", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-prices-how-to-handle-service-fees" },
      { title: "Service fees for 2OWs", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-prices-how-to-handle-service-fees-for-2ows" },
      { title: "Manage promo codes", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-prices-how-to-manage-promocodes" },
      { title: "Commissions and discounts", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-prices-what-is-section-commissions-and-discounts-good-for" },
      { title: "Handle special offers", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-prices-how-to-handle-special-offers" },
      { title: "Discount for carrier / flight", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-prices-how-to-create-discount-for-certain-carrier-and-certain-flight" },
    ],
  },
  {
    icon: "📋", name: "Code Lists",
    desc: "Carriers, destination filters, flush caches",
    href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-code-lists",
    articles: [
      { title: "Carriers", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-code-lists-carriers" },
      { title: "Destination filters", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-code-lists-destination-filters" },
      { title: "Blocked emails", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-code-lists-how-about-section-blocked-e-mails" },
      { title: "Flush caches", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-code-lists-what-is-section-flush-cashes-good-for" },
      { title: "Flush HTML caches", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-code-lists-what-is-section-flush-html-cashes-good-for" },
    ],
  },
  {
    icon: "👥", name: "Users",
    desc: "Agents, roles, passwords, access rights",
    href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-users",
    articles: [
      { title: "Create new user access", href: "/troubleshooting/1-gol-ibe-5-gol-ibe-faqs-how-to-create-a-new-user-s-access" },
      { title: "Manage own user account", href: "/troubleshooting/1-gol-ibe-5-gol-ibe-faqs-how-to-manage-own-gol-ibe-user-s-account" },
    ],
  },
  {
    icon: "🔔", name: "Notifications",
    desc: "Email templates and sent notifications",
    href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-notifications",
    articles: [
      { title: "Notification templates", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-notifications-notification-templates" },
      { title: "Sent notifications", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-notifications-sent-notifications" },
      { title: "Customize from-email section", href: "/troubleshooting/1-gol-ibe-5-gol-ibe-faqs-how-to-customize-section-from-e-mail" },
      { title: "Most used notification types", href: "/troubleshooting/1-gol-ibe-5-gol-ibe-faqs-what-types-of-notifications-are-the-most-used-ones-and-what-are-these-good-for" },
    ],
  },
  {
    icon: "📄", name: "Supporting Texts",
    desc: "Terms, footer, menu, ticket template, CSS",
    href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-supporting-texts",
    articles: [
      { title: "CSS customization", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-supporting-texts-css" },
      { title: "Create a footer", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-supporting-texts-how-to-create-a-footer" },
      { title: "Create menu on front-end", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-supporting-texts-how-to-create-menu-on-your-front-end" },
      { title: "Edit ticket itinerary template", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-supporting-texts-how-to-edit-your-ticket-itinerary-template" },
      { title: "Manage terms and conditions", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-gol-ibe-supporting-texts-how-to-manage-terms-and-conditions" },
    ],
  },
  {
    icon: "📈", name: "Statistics",
    desc: "Reports, CSV/Excel export, column reference",
    href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-statistics",
    articles: [
      { title: "Download statistics (CSV / Excel)", href: "/getting-started/1-gol-ibe-2-gol-ibe-step-by-step-statistics" },
      { title: "Export list of bookings", href: "/troubleshooting/1-gol-ibe-5-gol-ibe-faqs-how-to-export-the-list-of-bookings" },
    ],
  },
  {
    icon: "⚙️", name: "Basic Settings",
    desc: "Design, working hours, service fee, notifications",
    href: "/configuration/gol-ibe-basic-settings",
    articles: [
      { title: "Design your GOL IBE site", href: "/configuration/1-gol-ibe-3-gol-ibe-basic-settings-how-to-design-your-gol-ibe-site" },
      { title: "Set up working hours", href: "/configuration/1-gol-ibe-3-gol-ibe-basic-settings-how-to-set-up-working-hours-in-your-gol-ibe" },
      { title: "Set up service fee", href: "/configuration/1-gol-ibe-3-gol-ibe-basic-settings-how-to-set-up-service-fee" },
      { title: "Customize notifications", href: "/configuration/1-gol-ibe-3-gol-ibe-basic-settings-how-to-customize-notifications-in-your-gol-ibe" },
      { title: "Implement air ticket search form", href: "/configuration/1-gol-ibe-3-gol-ibe-basic-settings-how-to-implement-the-air-ticket-search-form-into-your-agency-website" },
    ],
  },
  {
    icon: "🔬", name: "Advanced Settings",
    desc: "GDS connectors, multi-PCC, NDC, parallel queries",
    href: "/configuration/gol-ibe-advanced-settings",
    articles: [
      { title: "MIR connector", href: "/configuration/1-gol-ibe-4-gol-ibe-advanced-settings-mir" },
      { title: "Multi-PCC queries", href: "/configuration/1-gol-ibe-4-gol-ibe-advanced-settings-multipcc-dotazovani" },
      { title: "Parallel queries", href: "/configuration/1-gol-ibe-4-gol-ibe-advanced-settings-paraleleni-dotazovani" },
      { title: "Service fee from airline commission", href: "/configuration/1-gol-ibe-4-gol-ibe-advanced-settings-servisni-poplatek-z-provize-letecke-spolecnosti" },
    ],
  },
];

export const APP_TABS: AppTab[] = [
  { label: "✈️ GOL IBE Help", href: "/portal", isActive: true },
  { label: "⚙️ Admin Console", href: "https://bo.golibe.com/", isActive: false },
  { label: "🌐 TCP", href: "https://www.travelcloudpro.com/#/login?returnTo=%2Fcbt%2Fcorporates", isActive: false },
  { label: "👤 My Travelport", href: "https://auth.travelport.com/", isActive: false },
  { label: "🏠 Our GOL IBE Web", href: "https://demo4.golibe.com/", isActive: false },
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
