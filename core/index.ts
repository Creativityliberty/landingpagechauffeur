/**
 * Core Module - Public API
 */

export * from "./domain/waitlist-entry";
export * from "./domain/excursion-request";

export type { WaitlistRepository } from "./ports/waitlist-repository";
export type { ExcursionRequestRepository } from "./ports/excursion-request-repository";

export { JoinWaitlistService } from "./application/join-waitlist";
export type {
  JoinWaitlistInput,
  JoinWaitlistOutput,
} from "./application/join-waitlist";
export { SubmitExcursionRequestService } from "./application/submit-excursion-request";
export type {
  SubmitExcursionRequestInput,
  SubmitExcursionRequestOutput,
} from "./application/submit-excursion-request";
