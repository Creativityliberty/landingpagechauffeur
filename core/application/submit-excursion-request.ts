import {
  assessCruiseSchedule,
  ExcursionRequest,
  ExcursionSlug,
  GuestCount,
  PreferredLanguage,
  ScheduleAssessment,
} from "../domain/excursion-request";
import { ExcursionRequestRepository } from "../ports/excursion-request-repository";

export interface SubmitExcursionRequestInput {
  fullName: string;
  email: string;
  phoneOrWhatsapp: string;
  cruiseShipName: string;
  arrivalDate: string;
  shipArrivalTime: string;
  allAboardTime: string;
  preferredExcursion: ExcursionSlug;
  guestsCount: GuestCount;
  preferredLanguage: PreferredLanguage;
  additionalRequests?: string;
}

export interface SubmitExcursionRequestOutput {
  requestId: string;
  scheduleAssessment: ScheduleAssessment;
  disclaimer: string;
  submittedAt: string;
}

export class SubmitExcursionRequestService {
  constructor(private readonly repository: ExcursionRequestRepository) {}

  async execute(
    input: SubmitExcursionRequestInput,
  ): Promise<SubmitExcursionRequestOutput> {
    const entity = ExcursionRequest.create(input);
    await this.repository.save(entity);

    const scheduleAssessment = assessCruiseSchedule(
      entity.props.shipArrivalTime,
      entity.props.allAboardTime,
      entity.props.preferredExcursion,
    );

    return {
      requestId: entity.props.id,
      scheduleAssessment,
      disclaimer:
        "Please note that all bookings are subject to availability and confirmation. We will contact you with a personalized quotation.",
      submittedAt: entity.props.createdAt.toISOString(),
    };
  }
}
