import { Router, Request, Response } from "express";
import {
  RequestWithBody,
  RequestWithParams,
  RequestWithQuery,
} from "../../models/requestsTypes";
import { usersService } from "../../domain/users-service/users-service";
import { HTTP_STATUSES } from "../../models/statuses";
import {
  UsersBodyParams,
  UsersQueryParams,
  usersDbType,
  usersOutputType,
} from "../../models/usersTypes";
import { authGuardMiddleware } from "../../middlewares/authorisationMiddleware";
import { usersInputValidation } from "../../middlewares/users-input-validation";
import { errosValidation } from "../../middlewares/erros-validation";

export const usersRouter = Router({});

usersRouter.get(
  "/",
  authGuardMiddleware,
  async (req: RequestWithQuery<UsersQueryParams>, res: Response) => {
    const {
      sortBy = "createdAt",
      sortDirection = "desc",
      pageNumber = 1,
      pageSize = 10,
      searchLoginTerm = "",
      searchEmailTerm = "",
    } = req.query;

    const query = {
      login: new RegExp(searchLoginTerm, "i"),
      // email: new RegExp(`\^${searchEmailTerm}, "i"`),
    };
    const skip = (pageNumber - 1) * pageSize;

    const allUsers: usersOutputType[] = await usersService.findAllUsers(
      query,
      searchLoginTerm,
      searchEmailTerm,
      sortBy,
      sortDirection,
      pageSize,
      skip
    );
    const countedUsers = await usersService.countUsers();
    const pagesCount: number = Math.ceil(countedUsers / pageSize);
    const presentationUsers = {
      pagesCount,
      page: Number(pageNumber),
      pageSize: Number(pageSize),
      totalCount: countedUsers,
      items: allUsers,
    };
    console.log(countedUsers);
    res.status(HTTP_STATUSES.CREATED_201).send(presentationUsers);
  }
);

usersRouter.post(
  "/",
  authGuardMiddleware,
  usersInputValidation(),
  errosValidation,
  async (req: RequestWithBody<UsersBodyParams>, res: Response) => {
    const { login, email, password } = req.body;
    const newUser = await usersService.createUser(login, email, password);
    res.status(HTTP_STATUSES.CREATED_201).send(newUser);
  }
);

usersRouter.delete(
  "/:id",
  authGuardMiddleware,
  async (req: RequestWithParams<{ id: string }>, res: Response) => {
    const id = req.params.id;
    const isDeletedUser = await usersService.deleteUser(id);
    if (!isDeletedUser) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    } else {
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    }
  }
);
