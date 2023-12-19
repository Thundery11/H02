import { WithId } from "mongodb";
class CommentatorInfo {
  constructor(public userId: string, public userLogin: string) {}
}
export class CommentsType {
  constructor(
    public postId: string,
    public id: string,
    public content: string,
    public commentatorInfo: CommentatorInfo,
    public createdAt: string
  ) {}
}
export class CommentsOutputType {
  constructor(
    public id: string,
    public content: string,
    public commentatorInfo: CommentatorInfo,
    public createdAt: string
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
