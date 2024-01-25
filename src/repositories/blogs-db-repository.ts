import { injectable } from "inversify";
import { BlogType } from "../models/blogsTypes";
import { PostsType } from "../models/postsTypes";

import { BlogModel, PostModel } from "./dataBase/blogsDb";
@injectable()
export class BlogsRepository {
  async getAllBlogs(
    query: object,
    sortBy: string,
    sortDirection: string,
    pageSize: number,
    skip: number
  ): Promise<BlogType[]> {
    return await BlogModel.find(query, { _id: 0, __v: 0 })
      .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(Number(pageSize))
      .lean();
  }

  async countDocuments(query: object): Promise<number> {
    return await BlogModel.countDocuments(query);
  }
  async countAllDocuments(blogId: string): Promise<number> {
    return await PostModel.countDocuments({ blogId: blogId });
  }

  async getAllPostsForBlogs(
    sortBy: string,
    sortDirection: string,
    pageSize: number,
    skip: number,
    blogId: string
  ): Promise<PostsType[]> {
    return await PostModel.find({ blogId: blogId }, { _id: 0, __v: 0 })
      .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
      .skip(Number(skip))
      .limit(Number(pageSize))
      .lean();
  }

  async findBlog(id: string): Promise<BlogType | null> {
    return await BlogModel.findOne({ id: id }, { _id: 0, __v: 0 });
  }

  async createBlog(newBlog: BlogType): Promise<BlogType> {
    const result = await BlogModel.insertMany({ ...newBlog });
    return newBlog;
  }
  // async createPostForBlog(newPostForBlog: PostsType): Promise<PostsType> {
  //   const result = await PostModel.insertMany({
  //     ...newPostForBlog,
  //   });
  //   return newPostForBlog;
  // }

  async deleteBlog(id: string): Promise<boolean> {
    const result = await BlogModel.deleteOne({ id: id });
    return result.deletedCount === 1;
  }
  async changeBlog(
    id: string,
    name: string,
    description: string,
    websiteUrl: string
  ): Promise<boolean> {
    const result = await BlogModel.updateOne(
      { id: id },
      { name, description, websiteUrl }
    );

    return result.matchedCount === 1;
  }
}
