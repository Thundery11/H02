import { BlogType } from "../models/blogsTypes";
import { postsDbType } from "../models/postsTypes";
import { BlogModel } from "../mongo/blog/blog-model";
import { blogsCollection, postsCollection } from "./dataBase/blogsDb";

export const blogsRepository = {
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
  },

  async countDocuments(query: object): Promise<number> {
    return await BlogModel.countDocuments(query);
  },
  async countAllDocuments(blogId: string): Promise<number> {
    return await BlogModel.countDocuments({ blogId });
  },

  async getAllPostsForBlogs(
    sortBy: string,
    sortDirection: string,
    pageSize: number,
    skip: number,
    blogId: string
  ): Promise<postsDbType[]> {
    return await postsCollection
      .find({ blogId: blogId }, { projection: { _id: 0 } })
      .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
      .skip(Number(skip))
      .limit(Number(pageSize))
      .toArray();
  },

  async findBlog(id: string): Promise<BlogType | null> {
    return await BlogModel.findOne({ id: id }, { _id: 0, __v: 0 });
  },

  async createBlog(newBlog: BlogType): Promise<BlogType> {
    const result = await BlogModel.insertMany({ ...newBlog });
    return newBlog;
  },
  async createPostForBlog(newPostForBlog: postsDbType): Promise<postsDbType> {
    const result = await postsCollection.insertOne({
      ...newPostForBlog,
    });
    return newPostForBlog;
  },

  async deleteBlog(id: string): Promise<boolean> {
    const result = await BlogModel.deleteOne({ id: id });
    return result.deletedCount === 1;
  },
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
  },
};
