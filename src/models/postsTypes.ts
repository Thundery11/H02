export type postsDbType = {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt: string;
};

export interface PostsQueryParams {
  desc: string;
  searchNameTerm?: string;
  sortBy: string;
  sortDirection: string;
  pageNumber: number;
  pageSize: number;
  createdAt: string;
}
