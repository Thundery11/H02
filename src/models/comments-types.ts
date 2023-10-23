export interface CommentsDbType {
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
