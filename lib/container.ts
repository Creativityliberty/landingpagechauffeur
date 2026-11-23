/**
 * Dependency Container (Composition Root)
 */

import {
  JoinWaitlistService,
  SubmitExcursionRequestService,
} from "@/core";
import {
  InMemoryWaitlistRepository,
  InMemoryExcursionRequestRepository,
} from "@/infra";

const waitlistRepository = new InMemoryWaitlistRepository();
const excursionRequestRepository = new InMemoryExcursionRequestRepository();

export const container = {
  services: {
    joinWaitlist: new JoinWaitlistService(waitlistRepository),
    submitExcursionRequest: new SubmitExcursionRequestService(
      excursionRequestRepository,
    ),
  },
  repositories: {
    waitlist: waitlistRepository,
    excursionRequests: excursionRequestRepository,
  },
} as const;

export type Container = typeof container;
