import { WithId } from "mongodb";

export type CommentsDbType = WithId<{
  postId: string;
  id: string;
  content: string;
  commentatorInfo: {
    userId: string | undefined;
    userLogin: string;
  };
  createdAt: string;
}>;
export interface CommentsOutputType {
  id: string;
  content: string;
  commentatorInfo: {
    userId: string | undefined;
    userLogin: string;
  };
  createdAt: string;
}
export interface CommentsQueryParams {
  sortBy: string;
  sortDirection: string;
  pageSize: number;
  pageNumber: number;
  postId: string;
}
