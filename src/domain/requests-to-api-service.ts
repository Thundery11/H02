import { RequestsToApi } from "../models/requests-to-api-types";
import { requestsToApiRepository } from "../repositories/requests-to-api-repository";

export const requestsToApiService = {
  async addRequestToApi(requestToApi: RequestsToApi) {
    await requestsToApiRepository.addRequestToApi(requestToApi);
  },
  async getRequestsToApi(
    IP: string | string[] | undefined,
    URL: string
  ): Promise<RequestsToApi[] | null> {
    return await requestsToApiRepository.getRequestsToApi(IP, URL);
  },
};
