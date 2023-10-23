export interface CommentsDbType {
  id: string;
  content: string;
  commentatorInfo: {
    userId: string | undefined;
    userLogin: string;
  };
  createdAt: string;
}
