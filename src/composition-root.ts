import { BLogsController } from "./controllers/blogs-controller";
import { CommentsController } from "./controllers/comments-controller";
import { PostsController } from "./controllers/posts-controller";
import { BlogService } from "./domain/blogs-service/blogs-service";
import { CommentsService } from "./domain/comments-service/commentsService";
import { PostsService } from "./domain/posts-service/posts-service";
import { BlogsRepository } from "./repositories/blogs-db-repository";
import { CommentsRepository } from "./repositories/comments-repository/comments-repository";
import { PostsRepository } from "./repositories/posts-db-repository";

const blogsRepository = new BlogsRepository();
const blogsService = new BlogService(blogsRepository);
export const blogsController = new BLogsController(blogsService);

const postsRepository = new PostsRepository();
const postsService = new PostsService(postsRepository);
export const postsController = new PostsController(
  postsService,
  blogsRepository
);

const commentsRepository = new CommentsRepository();
const commentsService = new CommentsService(commentsRepository);
export const commentsController = new CommentsController(
  commentsService,
  commentsRepository
);
