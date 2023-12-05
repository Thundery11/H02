import { RequestsToApi } from "../models/requests-to-api-types";
import { requestsToApiCollection } from "./dataBase/blogsDb";

export const requestsToApiRepository = {
  async addRequestToApi(requestToApi: RequestsToApi) {
    await requestsToApiCollection.insertOne({ ...requestToApi });
  },
  async getRequestsToApi(
    IP: string | string[] | undefined,
    URL: string
  ): Promise<RequestsToApi[] | null> {
    return await requestsToApiCollection
      .find(
        {
          $and: [{ IP: IP }, { URL: URL }],
        },
        { projection: { _id: 0 } }
      )
      .toArray();
  },
};
