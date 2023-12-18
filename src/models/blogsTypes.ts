import { WithId } from "mongodb";
export class BlogType {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public websiteUrl: string,
    public createdAt: string,
    public isMembership: boolean
  ) {}
}
// export type BlogType = {
//   id: string;
//   name: string;
//   description: string;
//   websiteUrl: string;
//   createdAt: string;
//   isMembership: boolean;
// };

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
