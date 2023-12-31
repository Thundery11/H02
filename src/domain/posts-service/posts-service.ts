import { injectable } from "inversify";
import { CommentsOutputType, CommentsType } from "../../models/comments-types";
import { PostsType } from "../../models/postsTypes";
import { CommentsRepository } from "../../repositories/comments-repository/comments-repository";
import { LikesRepository } from "../../repositories/likes-repository/likesRepository";
import { PostsRepository } from "../../repositories/posts-db-repository";
@injectable()
export class PostsService {
  constructor(
    protected postsRepository: PostsRepository,
    protected commentsRepository: CommentsRepository,
    protected likesRepository: LikesRepository
  ) {}
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

  async createComment(
    postId: string,
    content: string,
    userId: string,
    userLogin: string
  ): Promise<CommentsOutputType> {
    const createdAt = new Date();

    const newComment = new CommentsType(
      postId,
      Math.floor(Math.random() * 10000).toString(),
      content,
      {
        userId: userId,
        userLogin: userLogin,
      },
      createdAt.toISOString(),
      {
        likesCount: 0,
        dislikesCount: 0,
        myStatus: "None",
      }
    );

    await this.postsRepository.createCommet(newComment);

    const outPutcommet = new CommentsOutputType(
      newComment.id,
      content,
      {
        userId: userId,
        userLogin: userLogin,
      },
      createdAt.toISOString(),
      {
        likesCount: 0,
        dislikesCount: 0,
        myStatus: "None",
      }
    );
    return outPutcommet;
  }

  async getComments(
    sortBy: string,
    sortDirection: string,
    pageSize: number,
    skip: number,
    postId: string,
    userId: string | null
  ): Promise<CommentsType[]> {
    const allComments = await this.postsRepository.getComments(
      sortBy,
      sortDirection,
      pageSize,
      skip,
      postId
    );
    // sdelat` map otdellno dlya kajdogo slychaya
    const result = await Promise.all(
      allComments.map(
        async (comment) => (
          (comment.likesInfo.likesCount = await this.likesRepository.countLikes(
            comment.id
          )),
          (comment.likesInfo.dislikesCount =
            await this.likesRepository.countDislikes(comment.id)),
          (comment.likesInfo.myStatus =
            await this.likesRepository.whatIsMyStatus(userId, comment.id))
            ?.myStatus
        )
      )
    );
    console.log(result);

    // allComments.map((comment) =>
    //   comment.likesInfo.myStatus === null
    //     ? (comment.likesInfo.myStatus = "None")
    //     : (comment.likesInfo.myStatus = comment.likesInfo.myStatus.myStatus)
    // );
    const outputAllComments = allComments.map((comment) =>
      comment.likesInfo.myStatus === null
        ? { ...comment, likesInfo: { ...comment.likesInfo, myStatus: "None" } }
        : {
            ...comment,
            likesInfo: {
              ...comment.likesInfo,
              myStatus: comment.likesInfo.myStatus.myStatus,
            },
          }
    );

    return outputAllComments;
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
