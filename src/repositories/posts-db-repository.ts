import { CommentsDbType } from "../models/comments-types";
import { postsDbType } from "../models/postsTypes";
import { commentsCollection, postsCollection } from "./dataBase/blogsDb";

export const postsRepository = {
  async getAllPosts(
    query: object,
    sortBy: string,
    sortDirection: string,
    pageSize: number,
    skip: number
  ): Promise<postsDbType[]> {
    return await postsCollection
      .find({}, { projection: { _id: 0 } })
      .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(Number(pageSize))
      .toArray();
  },

  async countDocuments(query: object): Promise<number> {
    return await postsCollection.countDocuments({});
  },

  async getPost(id: string): Promise<postsDbType | null> {
    return await postsCollection.findOne(
      { id: id },
      { projection: { _id: 0 } }
    );
  },
  async getComments(
    sortBy: string,
    sortDirection: string,
    pageSize: number,
    skip: number,
    postId: string
  ): Promise<CommentsDbType[]> {
    return await commentsCollection
      .find({ postId: postId })
      .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(Number(pageSize))
      .toArray();
  },
  async countAllComments(postId: string): Promise<number> {
    return await commentsCollection.countDocuments({ postId });
  },
  async createPost(newPost: postsDbType): Promise<postsDbType> {
    const result = await postsCollection.insertOne({ ...newPost });
    return newPost;
  },
  async createCommet(newComment: CommentsDbType): Promise<CommentsDbType> {
    const result = await commentsCollection.insertOne({ ...newComment });
    return newComment;
  },

  async deletePost(id: string): Promise<boolean> {
    const result = await postsCollection.deleteOne({ id: id });
    return result.deletedCount === 1;
  },

  async updatePost(
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
  ): Promise<boolean> {
    const result = await postsCollection.updateOne(
      { id: id },
      {
        $set: {
          title: title,
          shortDescription: shortDescription,
          content: content,
          blogId: blogId,
        },
      }
    );
    return result.matchedCount === 1;
  },
};
