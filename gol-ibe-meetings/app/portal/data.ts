/* Shared data for the GOL IBE Meetings Help Portal */

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
    icon: "📅", name: "Meetings",
    desc: "Create, manage, and track meeting requests",
    href: "/portal/getting-started/meetings-overview",
    articles: [
      { title: "What is GOL IBE Meetings?", href: "/portal/getting-started/intro" },
      { title: "Create a meeting request", href: "/portal/getting-started/create-meeting" },
      { title: "Edit a meeting request", href: "/portal/getting-started/edit-meeting" },
      { title: "Cancel a meeting request", href: "/portal/getting-started/cancel-meeting" },
      { title: "Meeting statuses explained", href: "/portal/getting-started/meeting-statuses" },
      { title: "Recurring meetings", href: "/portal/getting-started/recurring-meetings" },
    ],
  },
  {
    icon: "👥", name: "Attendees",
    desc: "Manage participants, invitations, and travel preferences",
    href: "/portal/getting-started/attendees-overview",
    articles: [
      { title: "Add attendees to a meeting", href: "/portal/getting-started/add-attendees" },
      { title: "Attendee travel preferences", href: "/portal/getting-started/attendee-preferences" },
      { title: "Invite external attendees", href: "/portal/getting-started/external-attendees" },
      { title: "Remove an attendee", href: "/portal/getting-started/remove-attendee" },
      { title: "Attendee profile overview", href: "/portal/getting-started/attendee-profile" },
    ],
  },
  {
    icon: "✅", name: "Approvals",
    desc: "Approval workflows, delegation, and escalation rules",
    href: "/portal/getting-started/approvals-overview",
    articles: [
      { title: "How the approval workflow works", href: "/portal/getting-started/approval-workflow" },
      { title: "Approve or reject a meeting request", href: "/portal/getting-started/approve-reject" },
      { title: "Set up approvers", href: "/portal/configuration/setup-approvers" },
      { title: "Delegate approval authority", href: "/portal/configuration/delegate-approvals" },
      { title: "Escalation rules", href: "/portal/configuration/escalation-rules" },
      { title: "Auto-approval conditions", href: "/portal/configuration/auto-approval" },
    ],
  },
  {
    icon: "🏨", name: "Bookings",
    desc: "Flights, hotels, and transfers linked to meetings",
    href: "/portal/operations/bookings-overview",
    articles: [
      { title: "Book travel for a meeting", href: "/portal/operations/book-travel" },
      { title: "Modify a travel booking", href: "/portal/operations/modify-booking" },
      { title: "Cancel a travel booking", href: "/portal/operations/cancel-booking" },
      { title: "Issue a ticket for a meeting", href: "/portal/operations/issue-ticket" },
      { title: "Hotel bookings", href: "/portal/operations/hotel-bookings" },
      { title: "Airport transfers", href: "/portal/operations/transfers" },
    ],
  },
  {
    icon: "🔔", name: "Notifications",
    desc: "Email and in-app notification settings and templates",
    href: "/portal/configuration/notifications-overview",
    articles: [
      { title: "Meeting invitation email", href: "/portal/configuration/invitation-email" },
      { title: "Approval request notification", href: "/portal/configuration/approval-notification" },
      { title: "Booking confirmation email", href: "/portal/configuration/booking-confirmation" },
      { title: "Cancellation notification", href: "/portal/configuration/cancellation-notification" },
      { title: "Customize email templates", href: "/portal/configuration/email-templates" },
      { title: "Notification delivery log", href: "/portal/operations/notification-log" },
    ],
  },
  {
    icon: "👤", name: "Users",
    desc: "Agents, roles, passwords, and access rights",
    href: "/portal/getting-started/users-overview",
    articles: [
      { title: "Add a new user", href: "/portal/getting-started/add-user" },
      { title: "Roles and permissions", href: "/portal/getting-started/roles" },
      { title: "Reset a user's password", href: "/portal/getting-started/reset-password" },
      { title: "Deactivate a user", href: "/portal/getting-started/deactivate-user" },
      { title: "Organizer vs. approver roles", href: "/portal/getting-started/organizer-approver-roles" },
    ],
  },
  {
    icon: "⚙️", name: "Configuration",
    desc: "Agency profile, working hours, service fees, GDS connectors",
    href: "/portal/configuration/basic-settings",
    articles: [
      { title: "Agency profile setup", href: "/portal/configuration/agency-profile" },
      { title: "Working hours", href: "/portal/configuration/working-hours" },
      { title: "Service fees", href: "/portal/configuration/service-fees" },
      { title: "GDS connector setup", href: "/portal/configuration/gds-connector" },
      { title: "Currency settings", href: "/portal/configuration/currency" },
      { title: "Cost centres and budgets", href: "/portal/configuration/cost-centres" },
    ],
  },
  {
    icon: "📈", name: "Reports",
    desc: "Meeting statistics, spending reports, and CSV exports",
    href: "/portal/operations/reports-overview",
    articles: [
      { title: "Meeting summary report", href: "/portal/operations/meeting-summary-report" },
      { title: "Travel spend report", href: "/portal/operations/travel-spend-report" },
      { title: "Export bookings to CSV", href: "/portal/operations/export-csv" },
      { title: "Attendee report", href: "/portal/operations/attendee-report" },
      { title: "Cost centre breakdown", href: "/portal/operations/cost-centre-report" },
    ],
  },
  {
    icon: "❓", name: "Troubleshooting",
    desc: "Common issues, FAQs, and known workarounds",
    href: "/portal/troubleshooting/overview",
    articles: [
      { title: "Meeting request not submitted", href: "/portal/troubleshooting/request-not-submitted" },
      { title: "Approver not receiving notifications", href: "/portal/troubleshooting/approver-no-email" },
      { title: "Booking confirmation not sent", href: "/portal/troubleshooting/confirmation-not-sent" },
      { title: "Cannot find a flight for the meeting", href: "/portal/troubleshooting/no-flight-found" },
      { title: "User cannot log in", href: "/portal/troubleshooting/login-issues" },
    ],
  },
];

export const APP_TABS: AppTab[] = [
  { label: "Meetings Help", href: "/portal", isActive: true },
  { label: "Meetings Console", href: "https://bo.golibe.com/", isActive: false },
  { label: "My Travelport", href: "https://auth.travelport.com/", isActive: false },
  { label: "TCP", href: "https://www.travelcloudpro.com/#/login?returnTo=%2Fcbt%2Fcorporates", isActive: false },
];

export const WALKTHROUGHS: Walkthrough[] = [
  {
    title: "Create your first meeting request",
    desc: "Set up a meeting, add attendees, and submit for approval",
    steps: 5,
    category: "Meetings",
    href: "/portal/getting-started/create-meeting",
  },
  {
    title: "Configure the approval workflow",
    desc: "Add approvers, set delegation rules and auto-approval thresholds",
    steps: 4,
    category: "Approvals",
    href: "/portal/configuration/setup-approvers",
  },
  {
    title: "Book travel for attendees",
    desc: "Search for flights and hotels, assign to meeting participants",
    steps: 5,
    category: "Bookings",
    href: "/portal/operations/book-travel",
  },
  {
    title: "Set up email notifications",
    desc: "Customize invitation, approval, and confirmation templates",
    steps: 3,
    category: "Notifications",
    href: "/portal/configuration/email-templates",
  },
  {
    title: "Run a travel spend report",
    desc: "Filter by date range, cost centre, and export to CSV",
    steps: 3,
    category: "Reports",
    href: "/portal/operations/travel-spend-report",
  },
];

export const HEALTH_CHECKS: HealthCheck[] = [
  {
    label: "GDS connector configured",
    desc: "At least one active GDS or NDC source",
    status: "ok",
    href: "/portal/configuration/gds-connector",
  },
  {
    label: "Approvers assigned",
    desc: "At least one approval workflow is active",
    status: "warning",
    href: "/portal/configuration/setup-approvers",
  },
  {
    label: "Email notifications active",
    desc: "Invitation and approval templates configured",
    status: "ok",
    href: "/portal/configuration/email-templates",
  },
  {
    label: "User accounts created",
    desc: "At least one organizer account exists",
    status: "ok",
    href: "/portal/getting-started/add-user",
  },
  {
    label: "Cost centres defined",
    desc: "Budget codes available for meeting bookings",
    status: "pending",
    href: "/portal/configuration/cost-centres",
  },
  {
    label: "Working hours set",
    desc: "Support availability schedule defined",
    status: "ok",
    href: "/portal/configuration/working-hours",
  },
];

export const RELEASE_NOTES: ReleaseNote[] = [
  {
    version: "May 2026",
    items: [
      "GOL IBE Meetings help portal launched",
      "Full-screen portal with sidebar navigation",
      "App switcher: Meetings Console, TCP, My Travelport",
      "Contact Help form added",
    ],
  },
  {
    version: "April 2026",
    items: [
      "Initial content architecture established",
      "Sections: Meetings, Attendees, Approvals, Bookings, Reports",
    ],
  },
];
