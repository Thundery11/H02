export type blogsDbType = {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: string;
  isMembership: boolean;
};

export interface BlogQueryParams {
  desc: string;
  searchNameTerm?: string;
  sortBy: string;
  sortDirection: string;
  pageNumber: number;
  pageSize: number;
  createdAt: string;
}
