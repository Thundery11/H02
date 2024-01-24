import { injectable } from "inversify";
import { CommentsOutputType, CommentsType } from "../../models/comments-types";
import { PostsType } from "../../models/postsTypes";
import { CommentsRepository } from "../../repositories/comments-repository/comments-repository";
import { LikesRepository } from "../../repositories/likes-repository/likesRepository";
import { PostsRepository } from "../../repositories/posts-db-repository";
import {
  LastLikedOutputType,
  LastLikedType,
  MyStatus,
} from "../../models/likesTypes";
import { LikesService } from "../likes-service/likesService";
@injectable()
export class PostsService {
  constructor(
    protected postsRepository: PostsRepository,
    protected commentsRepository: CommentsRepository,
    protected likesRepository: LikesRepository,
    protected likesService: LikesService
  ) {}
  async getAllPosts(
    query: object,
    userId: string | null,
    sortBy: string,
    sortDirection: string,
    pageSize: number,
    skip: number
  ): Promise<PostsType[]> {
    const allPosts: PostsType[] = await this.postsRepository.getAllPosts(
      query,
      userId,
      sortBy,
      sortDirection,
      pageSize,
      skip
    );
    const result = await Promise.all(
      allPosts.map(
        async (post) => (
          (post.extendedLikesInfo.likesCount =
            await this.likesRepository.countLikes(post.id)),
          (post.extendedLikesInfo.dislikesCount =
            await this.likesRepository.countDislikes(post.id)),
          (post.extendedLikesInfo.myStatus =
            await this.likesRepository.whatIsMyStatus(userId, post.id))
            ?.myStatus,
          (post.extendedLikesInfo.newestLikes =
            await this.likesRepository.getLastLikes(post.id))
        )
      )
    );
    const outputPosts = allPosts.map((post) =>
      post.extendedLikesInfo.myStatus === null
        ? {
            ...post,
            extendedLikesInfo: {
              ...post.extendedLikesInfo,
              myStatus: MyStatus.None,
            },
          }
        : {
            ...post,
            extendedLikesInfo: {
              ...post.extendedLikesInfo,
              myStatus: post.extendedLikesInfo.myStatus.myStatus,
            },
          }
    );

    return outputPosts;
  }

  async countDocuments(query: object): Promise<number> {
    return await this.postsRepository.countDocuments(query);
  }

  async getPost(
    _parentId: string,
    userId: string | null
  ): Promise<PostsType | null> {
    const post = await this.postsRepository.getPost(_parentId);
    const dislikesCount = await this.likesRepository.countDislikes(_parentId);
    const likesCount = await this.likesRepository.countLikes(_parentId);
    const reaction = userId
      ? (await this.likesRepository.whatIsMyStatus(userId, _parentId))
          ?.myStatus ?? MyStatus.None
      : MyStatus.None;

    if (!post) {
      return null;
    }
    const lastLiked: LastLikedOutputType[] =
      await this.likesService.getLastLikes(_parentId);
    const outputPost: PostsType = {
      ...post,
      extendedLikesInfo: {
        ...post.extendedLikesInfo,
        likesCount: likesCount,
        dislikesCount: dislikesCount,
        myStatus: reaction,
        newestLikes: lastLiked,
      },
    };
    // if (reaction === null) {
    //   outputPost.extendedLikesInfo.myStatus = MyStatus.None;
    // } else {
    //   outputPost.extendedLikesInfo.myStatus = reaction?.myStatus;
    // }
    return outputPost;
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
      createdAt.toISOString(),
      {
        likesCount: 0,
        dislikesCount: 0,
        myStatus: MyStatus.None,
        newestLikes: [],
      }
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
        myStatus: MyStatus.None,
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
        myStatus: MyStatus.None,
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
            ?.myStatus ?? MyStatus.None
        )
      )
    );

    // allComments.map((comment) =>
    //   comment.likesInfo.myStatus === null
    //     ? (comment.likesInfo.myStatus = "None")
    //     : (comment.likesInfo.myStatus = comment.likesInfo.myStatus.myStatus)
    // );
    const outputAllComments = allComments.map((comment) =>
      comment.likesInfo.myStatus === null
        ? {
            ...comment,
            likesInfo: { ...comment.likesInfo, myStatus: MyStatus.None },
          }
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
