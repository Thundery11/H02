export enum MyStatus {
  None = "None",
  Like = "Like",
  Dislike = "Dislike",
}

export class LikesType {
  constructor(
    public userId: string,
    public parentId: string,
    public createdAt: string,
    public myStatus: string
  ) {}
}
