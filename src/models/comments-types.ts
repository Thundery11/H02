import { WithId } from "mongodb";

enum MyStatus {
  None = "None",
  Like = "Like",
  Dislike = "Dislike",
}
export class CommentsType {
  constructor(
    public postId: string,
    public id: string,
    public content: string,
    public commentatorInfo: { userId: string; userLogin: string },
    public createdAt: string,
    public likesInfo: {
      likesCount: number;
      dislikesCount: number;
      myStatus: MyStatus[];
    }
  ) {}
}
export class CommentsOutputType {
  constructor(
    public id: string,
    public content: string,
    public commentatorInfo: { userId: string; userLogin: string },
    public createdAt: string,
    public likesInfo: {
      likesCount: number;
      dislikesCount: number;
      myStatus: MyStatus[];
    }
  ) {}
}

// export type CommentsDbType = {
//   postId: string;
//   id: string;
//   content: string;
//   commentatorInfo: {
//     userId: string | undefined;
//     userLogin: string;
//   };
//   createdAt: string;
// };
// };
// export interface CommentsOutputType {
//   id: string;
//   content: string;
//   commentatorInfo: {
//     userId: string | undefined;
//     userLogin: string;
//   };
//   createdAt: string;
// }
export interface CommentsQueryParams {
  sortBy: string;
  sortDirection: string;
  pageSize: number;
  pageNumber: number;
  postId: string;
}
