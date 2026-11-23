import { ExcursionRequest } from "../domain/excursion-request";

export interface ExcursionRequestRepository {
  save(request: ExcursionRequest): Promise<void>;
  findAll(): Promise<ExcursionRequest[]>;
}
