import { injectable } from "inversify";
import { CommentsType } from "../models/comments-types";
import { PostsType } from "../models/postsTypes";
import { CommentsModel, PostModel } from "./dataBase/blogsDb";
@injectable()
export class PostsRepository {
  async getAllPosts(
    query: object,
    sortBy: string,
    sortDirection: string,
    pageSize: number,
    skip: number
  ): Promise<PostsType[]> {
    return await PostModel.find({}, { _id: 0, __v: 0 })
      .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(Number(pageSize))
      .lean();
  }

  async countDocuments(query: object): Promise<number> {
    return await PostModel.countDocuments({});
  }

  async getPost(id: string): Promise<PostsType | null> {
    return await PostModel.findOne({ id: id }, { _id: 0, __v: 0 });
  }
  async getComments(
    sortBy: string,
    sortDirection: string,
    pageSize: number,
    skip: number,
    postId: string
  ): Promise<CommentsType[]> {
    return await CommentsModel.find(
      { postId: postId },
      { _id: 0, postId: 0, __v: 0 }
    )
      .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(Number(pageSize))
      .lean();
  }

  async countAllComments(postId: string): Promise<number> {
    return await CommentsModel.countDocuments({ postId });
  }

  async createPost(newPost: PostsType): Promise<PostsType> {
    const result = await PostModel.insertMany({ ...newPost });
    return newPost;
  }

  async createCommet(newComment: CommentsType): Promise<CommentsType> {
    const result = await CommentsModel.insertMany({ ...newComment });
    return newComment;
  }

  async deletePost(id: string): Promise<boolean> {
    const result = await PostModel.deleteOne({ id: id });
    return result.deletedCount === 1;
  }

  async updatePost(
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
  ): Promise<boolean> {
    const result = await PostModel.updateOne(
      { id: id },
      {
        title: title,
        shortDescription: shortDescription,
        content: content,
        blogId: blogId,
      }
    );
    return result.matchedCount === 1;
  }
}
