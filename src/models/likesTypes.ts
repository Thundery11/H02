export enum MyStatus {
  "None",
  "Like",
  "Dislike",
}
export type MyStatusType = "None" | "Like" | "Dislike"; //napisat custom validation
export class LikesType {
  constructor(
    public userId: string,
    public parentId: string,
    public createdAt: string,
    public myStatus: string
  ) {}
}
