# Meeting invitation email

The meeting invitation email is sent to all attendees once a meeting request is approved.

## Default content

The invitation includes:
- Meeting title, date, time, and location
- Attendee's assigned role (Presenter / Participant / Optional)
- A link to confirm attendance and enter travel preferences
- Contact details for the organiser

## Customise the template

See [Customize email templates](/portal/configuration/email-templates).

## Available merge fields

| Field | Output |
|---|---|
| `{{attendee_name}}` | Attendee's full name |
| `{{meeting_title}}` | Name of the meeting |
| `{{meeting_date}}` | Start and end dates |
| `{{meeting_location}}` | City and venue |
| `{{confirm_link}}` | Attendance confirmation link |
| `{{organiser_name}}` | Name of the meeting organiser |
| `{{organiser_email}}` | Organiser's email |

## Related articles

- [Approval request notification](/portal/configuration/approval-notification)
- [Customize email templates](/portal/configuration/email-templates)
