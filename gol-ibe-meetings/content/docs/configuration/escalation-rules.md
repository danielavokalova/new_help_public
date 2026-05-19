# Escalation rules

Escalation rules ensure that meeting requests are never blocked by an unresponsive approver.

## How escalation works

1. A meeting request is submitted and routed to the approver.
2. If the approver does not act within the **reminder deadline** (default: 24 hours), a reminder email is sent.
3. If the approver still does not act within the **escalation deadline** (default: 48 hours), the request is escalated to the **backup approver**.
4. If the backup approver also does not act, an Admin is notified.

## Configure escalation settings

1. Go to **Settings → Approvers → Escalation**.
2. Set the **reminder deadline** in hours.
3. Set the **escalation deadline** in hours.
4. Select the **escalation target**: backup approver or admin.
5. Click **Save**.

## Related articles

- [Set up approvers](/portal/configuration/setup-approvers)
- [Delegate approval authority](/portal/configuration/delegate-approvals)
