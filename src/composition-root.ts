import "reflect-metadata";
import { BLogsController } from "./controllers/blogs-controller";
import { CommentsController } from "./controllers/comments-controller";
import { PostsController } from "./controllers/posts-controller";
import { BlogService } from "./domain/blogs-service/blogs-service";
import { CommentsService } from "./domain/comments-service/commentsService";
import { LikesService } from "./domain/likes-service/likesService";
import { PostsService } from "./domain/posts-service/posts-service";
import { BlogsRepository } from "./repositories/blogs-db-repository";
import { CommentsRepository } from "./repositories/comments-repository/comments-repository";
import { LikesRepository } from "./repositories/likes-repository/likesRepository";
import { PostsRepository } from "./repositories/posts-db-repository";
import { Container } from "inversify";

// const blogsRepository = new BlogsRepository();
// const blogsService = new BlogService(blogsRepository);
// export const blogsController = new BLogsController(blogsService);

// const postsRepository = new PostsRepository();
// const likesRepository = new LikesRepository();
// const likesService = new LikesService(likesRepository);

// const commentsRepository = new CommentsRepository();
// const commentsService = new CommentsService(
//   commentsRepository,
//   likesRepository
// );
// const postsService = new PostsService(
//   postsRepository,
//   commentsRepository,
//   likesRepository
// );
// export const postsController = new PostsController(
//   postsService,
//   blogsRepository,
//   commentsService
// );
// export const commentsController = new CommentsController(
//   commentsService,
//   commentsRepository,
//   likesService
// );

export const container = new Container();
container.bind(BLogsController).to(BLogsController);
container.bind(BlogService).to(BlogService);
container.bind(BlogsRepository).to(BlogsRepository);
container.bind(PostsController).to(PostsController);
container.bind(PostsService).to(PostsService);
container.bind(PostsRepository).to(PostsRepository);
container.bind(CommentsController).to(CommentsController);
container.bind(CommentsService).to(CommentsService);
container.bind(CommentsRepository).to(CommentsRepository);
container.bind(LikesService).to(LikesService);
container.bind(LikesRepository).to(LikesRepository);

export const postsContainer = new Container();
