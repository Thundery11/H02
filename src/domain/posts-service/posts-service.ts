import { postsDbType } from "../../models/postsTypes";
import { postsRepository } from "../../repositories/posts-db-repository";

export const postsService = {
  async getAllPosts(
    query: object,
    sortBy: string,
    sortDirection: string,
    pageSize: number,
    skip: number
  ): Promise<postsDbType[]> {
    return await postsRepository.getAllPosts(
      query,
      sortBy,
      sortDirection,
      pageSize,
      skip
    );
  },

  async countDocuments(query: object): Promise<number> {
    return await postsRepository.countDocuments(query);
  },

  async getPost(id: string): Promise<postsDbType | null> {
    return await postsRepository.getPost(id);
  },

  async createPost(
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
  ): Promise<postsDbType> {
    const createdAt = new Date();
    const newPost: postsDbType = {
      id: Math.floor(Math.random() * 10000).toString(),
      title,
      shortDescription,
      content,
      blogId,
      blogName: "some blog",
      createdAt: createdAt.toISOString(),
    };

    const createdPost = await postsRepository.createPost(newPost);
    return createdPost;
  },

  async deletePost(id: string): Promise<boolean> {
    return await postsRepository.deletePost(id);
  },

  async updatePost(
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
  ): Promise<boolean> {
    return await postsRepository.updatePost(
      id,
      title,
      shortDescription,
      content,
      blogId
    );
  },
};
