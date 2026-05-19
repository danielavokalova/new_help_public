# Approval request notification

This email is sent to the approver each time a meeting request is submitted for their review.

## Default content

The notification includes:
- Meeting title, date, and location
- Organiser's name
- Total estimated travel budget
- A direct **Approve** and **Reject** button (one-click action, no login required)
- A link to view the full request in the console

## Available merge fields

| Field | Output |
|---|---|
| `{{approver_name}}` | Approver's full name |
| `{{meeting_title}}` | Name of the meeting |
| `{{organiser_name}}` | Name of the organiser |
| `{{estimated_budget}}` | Total travel estimate |
| `{{approve_link}}` | One-click approve link |
| `{{reject_link}}` | One-click reject link |
| `{{request_link}}` | Full request in the console |

## Related articles

- [Customize email templates](/portal/configuration/email-templates)
- [Approve or reject a meeting request](/portal/getting-started/approve-reject)
