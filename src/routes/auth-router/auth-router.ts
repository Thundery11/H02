import { Router, Request, Response } from "express";
import { RequestWithBody } from "../../models/requestsTypes";
import { usersService } from "../../domain/users-service/users-service";
import { HTTP_STATUSES } from "../../models/statuses";
import { authInputValidation } from "../../middlewares/auth-input-validation-middleware";
import { errosValidation } from "../../middlewares/erros-validation";
import { jwtService } from "../../application/jwt-service";
import { authMiddleware } from "../../middlewares/auth-middleware";
import { emailAdapter } from "../../adapters/email-adapter";
import { AuthBodyParams } from "../../models/authTypes";
import { registrationInputValidation } from "../../middlewares/registration-input-validation-middleware";
export const authRouter = Router({});

authRouter.post(
  "/registration",
  registrationInputValidation(),
  errosValidation,
  async (req: RequestWithBody<AuthBodyParams>, res: Response) => {
    const { login, email, password } = req.body;
    const user = await usersService.createUser(login, email, password);
    await emailAdapter.sendEmail(login, email, password);

    res.send({ email: req.body.email });
  }
);

authRouter.post(
  "/login",
  authInputValidation(),
  errosValidation,
  async (
    req: RequestWithBody<{ loginOrEmail: string; password: string }>,
    res: Response
  ) => {
    const user = await usersService.checkCredantials(
      req.body.loginOrEmail,
      req.body.password
    );
    if (user) {
      const accessToken = await jwtService.createJWT(user);

      res.status(HTTP_STATUSES.OK_200).send({ accessToken });
    } else {
      res.status(HTTP_STATUSES.UNAUTHORISED_401).send();
    }
  }
);

authRouter.get("/me", authMiddleware, async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    res.send(HTTP_STATUSES.UNAUTHORISED_401);
  } else {
    const infoAboutMe = await usersService.findUserById(userId);
    const mappedInfo = {
      email: infoAboutMe?.email,
      login: infoAboutMe?.login,
      userId: infoAboutMe?.id,
    };
    res.send(mappedInfo);
  }
});
