export enum MyStatus {
  None = "None",
  Like = "Like",
  Dislike = "Dislike",
}
// export type MyStatusType = "None" | "Like" | "Dislike"; //napisat custom validation
export class LikesType {
  constructor(
    public userId: string,
    public parentId: string,
    public createdAt: string,
    public myStatus: MyStatus
  ) {}
}

export class LastLikedType {
  constructor(
    public addedAt: string,
    public userId: string,
    public login: string,
    public postId: string
  ) {}
}
export type LastLikedOutputType = {
  addedAt: string;
  userId: string;
  login: string;
};
