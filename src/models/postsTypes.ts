import { WithId } from "mongodb";
import { MyStatus } from "./likesTypes";

export class PostsType {
  constructor(
    public id: string,
    public title: string,
    public shortDescription: string,
    public content: string,
    public blogId: string,
    public blogName: string,
    public createdAt: string,
    public extendedLikesInfo: {
      likesCount: number;
      dislikesCount: number;
      myStatus: MyStatus;
      newestLikes: [
        {
          addetAt: string;
          userId: string;
          login: string;
        }
      ];
    }
  ) {}
}

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
  searchNameTerm?: string;
  sortBy: string;
  sortDirection: string;
  pageNumber: number;
  pageSize: number;
}
