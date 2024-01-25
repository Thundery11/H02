import { BlogType } from "../../models/blogsTypes";
import { BlogsRepository } from "../../repositories/blogs-db-repository";
import { PostsType } from "../../models/postsTypes";
import { inject, injectable } from "inversify";
import { MyStatus } from "../../models/likesTypes";
import { LikesRepository } from "../../repositories/likes-repository/likesRepository";
import { LikesService } from "../likes-service/likesService";
@injectable()
export class BlogService {
  constructor(
    protected blogsRepository: BlogsRepository,
    protected likesRepository: LikesRepository,
    protected likesService: LikesService
  ) {}
  async getAllBlogs(
    query: object,
    sortBy: string,
    sortDirection: string,
    pageSize: number,
    skip: number
  ): Promise<BlogType[]> {
    return await this.blogsRepository.getAllBlogs(
      query,
      sortBy,
      sortDirection,
      pageSize,
      skip
    );
  }

  async countDocuments(query: object): Promise<number> {
    return await this.blogsRepository.countDocuments(query);
  }

  async countAllDocuments(blogId: string): Promise<number> {
    return await this.blogsRepository.countAllDocuments(blogId);
  }

  async getAllPostsForBlogs(
    userId: string | null,
    blogId: string,
    sortBy: string,
    sortDirection: string,
    pageSize: number,
    skip: number
  ): Promise<PostsType[]> {
    const allPosts = await this.blogsRepository.getAllPostsForBlogs(
      sortBy,
      sortDirection,
      pageSize,
      skip,
      blogId
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

  async findBlog(id: string): Promise<BlogType | null> {
    return await this.blogsRepository.findBlog(id);
  }

  async createBlog(
    name: string,
    description: string,
    websiteUrl: string
  ): Promise<BlogType> {
    const createdat = new Date();

    const newBlog = new BlogType(
      Math.floor(Math.random() * 10000).toString(),
      name,
      description,
      websiteUrl,
      createdat.toISOString(),
      false
    );

    const createdBlog = this.blogsRepository.createBlog(newBlog);
    return createdBlog;
  }

  async createPostForBlog(
    blogId: string,
    title: string,
    shortDescription: string,
    content: string,
    blogName: string
  ): Promise<PostsType> {
    const createdat = new Date();

    const newPostForBlog = new PostsType(
      Math.floor(Math.random() * 10000).toString(),
      title,
      shortDescription,
      content,
      blogId,
      blogName,
      createdat.toISOString(),
      {
        likesCount: 0,
        dislikesCount: 0,
        myStatus: MyStatus.None,
        newestLikes: [],
      }
    );
    const createdPostForBlog =
      this.blogsRepository.createPostForBlog(newPostForBlog);
    return createdPostForBlog;
  }

  async deleteBlog(id: string): Promise<boolean> {
    return await this.blogsRepository.deleteBlog(id);
  }

  async changeBlog(
    id: string,
    name: string,
    description: string,
    websiteUrl: string
  ): Promise<boolean> {
    return await this.blogsRepository.changeBlog(
      id,
      name,
      description,
      websiteUrl
    );
  }
}
