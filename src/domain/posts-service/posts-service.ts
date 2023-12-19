import {
  CommentsDbType,
  CommentsOutputType,
} from "../../models/comments-types";
import { PostsType } from "../../models/postsTypes";
import { PostsRepository } from "../../repositories/posts-db-repository";
export class PostsService {
  constructor(protected postsRepository: PostsRepository) {}
  async getAllPosts(
    query: object,
    sortBy: string,
    sortDirection: string,
    pageSize: number,
    skip: number
  ): Promise<PostsType[]> {
    return await this.postsRepository.getAllPosts(
      query,
      sortBy,
      sortDirection,
      pageSize,
      skip
    );
  }

  async countDocuments(query: object): Promise<number> {
    return await this.postsRepository.countDocuments(query);
  }

  async getPost(id: string): Promise<PostsType | null> {
    return await this.postsRepository.getPost(id);
  }

  async createPost(
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
  ): Promise<PostsType> {
    const createdAt = new Date();

    const newPost = new PostsType(
      Math.floor(Math.random() * 10000).toString(),
      title,
      shortDescription,
      content,
      blogId,
      blogName,
      createdAt.toISOString()
    );

    const createdPost = await this.postsRepository.createPost(newPost);
    return createdPost;
  }

  async createCommet(
    postId: string,
    content: string,
    userId: string,
    userLogin: string
  ): Promise<CommentsOutputType> {
    const createdAt = new Date();

    const newComment: CommentsDbType = {
      postId,
      id: Math.floor(Math.random() * 10000).toString(),
      content: content,
      commentatorInfo: {
        userId: userId,
        userLogin: userLogin,
      },
      createdAt: createdAt.toISOString(),
    };

    await this.postsRepository.createCommet(newComment);

    const outPutcommet: CommentsOutputType = {
      id: newComment.id,
      content: content,
      commentatorInfo: {
        userId: userId,
        userLogin: userLogin,
      },
      createdAt: createdAt.toISOString(),
    };
    return outPutcommet;
  }

  async getComments(
    sortBy: string,
    sortDirection: string,
    pageSize: number,
    skip: number,
    postId: string
  ): Promise<CommentsDbType[]> {
    return await this.postsRepository.getComments(
      sortBy,
      sortDirection,
      pageSize,
      skip,
      postId
    );
  }

  async countAllComments(postId: string): Promise<number> {
    return this.postsRepository.countAllComments(postId);
  }

  async deletePost(id: string): Promise<boolean> {
    return await this.postsRepository.deletePost(id);
  }

  async updatePost(
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
  ): Promise<boolean> {
    return await this.postsRepository.updatePost(
      id,
      title,
      shortDescription,
      content,
      blogId
    );
  }
}
