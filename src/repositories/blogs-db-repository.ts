import { blogsDbType } from "../models/blogsTypes";
import { postsDbType } from "../models/postsTypes";
import { blogsCollection, postsCollection } from "./dataBase/blogsDb";

export const blogsRepository = {
  async getAllBlogs(
    query: object,
    sortBy: string,
    sortDirection: string,
    pageSize: number,
    skip: number
  ): Promise<blogsDbType[]> {
    return await blogsCollection
      .find(query, { projection: { _id: 0 } })
      .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(Number(pageSize))
      .toArray();
  },

  async countDocuments(query: object): Promise<number> {
    return await blogsCollection.countDocuments(query);
  },
  async countAllDocuments(blogId: string): Promise<number> {
    return await postsCollection.countDocuments({ blogId });
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

  async findBlog(id: string): Promise<blogsDbType | null> {
    return await blogsCollection.findOne(
      { id: id },
      { projection: { _id: 0 } }
    );
  },

  async createBlog(newBlog: blogsDbType): Promise<blogsDbType> {
    const result = await blogsCollection.insertOne({ ...newBlog });
    return newBlog;
  },
  async createPostForBlog(newPostForBlog: postsDbType): Promise<postsDbType> {
    const result = await postsCollection.insertOne({
      ...newPostForBlog,
    });
    return newPostForBlog;
  },

  async deleteBlog(id: string): Promise<boolean> {
    const result = await blogsCollection.deleteOne({ id: id });
    return result.deletedCount === 1;
  },
  async changeBlog(
    id: string,
    name: string,
    description: string,
    websiteUrl: string
  ): Promise<boolean> {
    const result = await blogsCollection.updateOne(
      { id: id },
      {
        $set: {
          name: name,
          description: description,
          websiteUrl: websiteUrl,
        },
      }
    ); //  ? current date

    return result.matchedCount === 1;
  },
};
