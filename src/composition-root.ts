import { BLogsController } from "./controllers/blogs-controller";
import { BlogService } from "./domain/blogs-service/blogs-service";
import { BlogsRepository } from "./repositories/blogs-db-repository";

const blogsRepository = new BlogsRepository();
const blogsService = new BlogService(blogsRepository);
export const blogsController = new BLogsController(blogsService);
