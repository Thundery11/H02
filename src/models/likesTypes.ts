export enum MyStatus {
  "None",
  "Like",
  "Dislike",
}

export class LikesType {
  constructor(
    public userId: string,
    public parentId: string,
    public createdAt: string,
    public myStatus: string
  ) {}
}
