import { Router, Request, Response } from "express";
import { RequestWithBody, RequestWithParams } from "../../models/requestsTypes";
import { usersService } from "../../domain/users-service/users-service";
import { HTTP_STATUSES } from "../../models/statuses";
import { usersDbType } from "../../models/usersTypes";
import { authGuardMiddleware } from "../../middlewares/authorisationMiddleware";
import { usersInputValidation } from "../../middlewares/users-input-validation";
import { errosValidation } from "../../middlewares/erros-validation";
import { UsersBodyParams } from "../../models/users-types";

export const usersRouter = Router({});

usersRouter.get(
  "/",
  authGuardMiddleware,
  async (req: Request, res: Response) => {
    const allUsers: usersDbType[] = await usersService.findAllUsers();
    res.status(HTTP_STATUSES.OK_200).send(allUsers);
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

    delete newUser.passwordHash;
    console.log(newUser);
    delete newUser.passwordSalt;
    res.status(HTTP_STATUSES.CREATED_201).send(newUser);
  }
);

usersRouter.delete(
  "/:id",
  authGuardMiddleware,
  async (req: RequestWithParams<{ id: string }>, res: Response) => {
    const id = req.params.id;
    const isDeletedUser = usersService.deleteUser(id);
    if (!isDeletedUser) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    } else {
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    }
  }
);
