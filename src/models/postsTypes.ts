import { WithId } from "mongodb";

export type postsDbType = WithId<{
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt: string;
}>;

export interface PostsQueryParams {
  searchNameTerm?: string;
  sortBy: string;
  sortDirection: string;
  pageNumber: number;
  pageSize: number;
}
