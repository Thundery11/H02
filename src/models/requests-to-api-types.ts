import { WithId } from "mongodb";

export type RequestsToApiType = WithId<{
  IP: string;
  URL: string;
  date: Date;
}>;
