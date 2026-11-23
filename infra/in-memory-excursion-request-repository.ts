import { ExcursionRequest } from "@/core/domain/excursion-request";
import { ExcursionRequestRepository } from "@/core/ports/excursion-request-repository";

export class InMemoryExcursionRequestRepository
  implements ExcursionRequestRepository
{
  private readonly items: ExcursionRequest[] = [];

  async save(request: ExcursionRequest): Promise<void> {
    this.items.push(request);
  }

  async findAll(): Promise<ExcursionRequest[]> {
    return [...this.items];
  }
}
