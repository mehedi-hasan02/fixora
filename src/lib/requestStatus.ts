import type { RequestStatus } from "../../generated/prisma/enums";

export type { RequestStatus };

export const REQUEST_STATUSES: RequestStatus[] = [
  "PENDING",
  "REVIEWING",
  "APPROVED",
  "SCHEDULED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
  "REJECTED",
];

export const STATUS_LABELS: Record<RequestStatus, string> = {
  PENDING: "Pending",
  REVIEWING: "Under Review",
  APPROVED: "Approved",
  SCHEDULED: "Scheduled",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  REJECTED: "Rejected",
};

export const STATUS_BADGE_CLASS: Record<RequestStatus, string> = {
  PENDING: "bg-warning/10 text-warning",
  REVIEWING: "bg-secondary/10 text-secondary",
  APPROVED: "bg-primary/10 text-primary",
  SCHEDULED: "bg-accent/10 text-accent",
  IN_PROGRESS: "bg-warning/10 text-warning",
  COMPLETED: "bg-success/10 text-success",
  CANCELLED: "bg-muted/10 text-muted",
  REJECTED: "bg-error/10 text-error",
};

// The main happy-path progression shown in the request timeline.
export const TIMELINE_STEPS: RequestStatus[] = [
  "PENDING",
  "REVIEWING",
  "APPROVED",
  "SCHEDULED",
  "IN_PROGRESS",
  "COMPLETED",
];

// Step labels for the timeline only — "Submitted" reads better than
// "Pending" as the first step of a progress tracker.
export const TIMELINE_STEP_LABELS: Record<RequestStatus, string> = {
  ...STATUS_LABELS,
  PENDING: "Submitted",
};

// Server-side guard against invalid transitions (e.g. PENDING -> COMPLETED).
export const ALLOWED_TRANSITIONS: Record<RequestStatus, RequestStatus[]> = {
  PENDING: ["REVIEWING", "CANCELLED"],
  REVIEWING: ["APPROVED", "REJECTED", "CANCELLED"],
  APPROVED: ["SCHEDULED", "CANCELLED"],
  SCHEDULED: ["IN_PROGRESS", "CANCELLED"],
  IN_PROGRESS: ["COMPLETED"],
  COMPLETED: [],
  CANCELLED: [],
  REJECTED: [],
};

export const canTransition = (from: RequestStatus, to: RequestStatus) =>
  ALLOWED_TRANSITIONS[from].includes(to);
