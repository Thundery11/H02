export type blogsDbType = {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: string;
  isMembership: boolean;
};

export interface BlogQueryParams {
  searchNameTerm?: string;
  sortBy: string;
  sortDirection: string;
  pageNumber: number;
  pageSize: number;
}

export interface PostsForBlogsQueryParams {
  sortBy: string;
  sortDirection: string;
  pageNumber: number;
  pageSize: number;
  blogId: string;
}
