import { RequestsToApiType } from "../models/requests-to-api-types";
import { RequestsToApiModel } from "./dataBase/blogsDb";

export const requestsToApiRepository = {
  async addRequestToApi(requestToApi: RequestsToApiType) {
    await RequestsToApiModel.insertMany({ ...requestToApi });
  },
  async getRequestsToApi(
    IP: string | string[] | undefined,
    URL: string
  ): Promise<RequestsToApiType[] | null> {
    return await RequestsToApiModel.find(
      {
        $and: [{ IP: IP }, { URL: URL }],
      },
      { _id: 0, __v: 0 }
    ).lean();
  },
};
