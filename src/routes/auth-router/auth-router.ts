import { Router, Request, Response } from "express";
import { RequestWithBody } from "../../models/requestsTypes";
import { HTTP_STATUSES } from "../../models/statuses";
import { authInputValidation } from "../../middlewares/auth-input-validation-middleware";
import { errosValidation } from "../../middlewares/erros-validation";
import { jwtService } from "../../application/jwt-service";
import { authMiddleware } from "../../middlewares/auth-middleware";
import { AuthBodyParams } from "../../models/authTypes";
import { registrationInputValidation } from "../../middlewares/registration-input-validation-middleware";
import { usersService } from "../../domain/users-service/users-service";
import { authService } from "../../domain/auth-service/auth-service";
import { emailConfirmationValidation } from "../../middlewares/email-confirmation-validation";
import { resendingEmailInputValidation } from "../../middlewares/resending-email-input-validation";
import { isEmailExist } from "../../middlewares/isEmailExist-validation";
export const authRouter = Router({});

authRouter.post(
  "/registration",
  registrationInputValidation(),
  errosValidation,
  async (req: RequestWithBody<AuthBodyParams>, res: Response) => {
    const { login, email, password } = req.body;
    const user = await usersService.createUser(login, email, password);
    if (user === "login exists") {
      return res.status(HTTP_STATUSES.BAD_REQUEST_400).send({
        errorsMessages: [
          {
            message: "user with current login already exists",
            field: "login",
          },
        ],
      });
    }
    if (user === "email exists") {
      return res.status(HTTP_STATUSES.BAD_REQUEST_400).send({
        errorsMessages: [
          {
            message: "user with current email already exists",
            field: "email",
          },
        ],
      });
    }
    return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  }
);
authRouter.post(
  "/registration-confirmation",
  emailConfirmationValidation(),
  errosValidation,
  async (req: Request, res: Response) => {
    const result = await authService.confirmEmail(req.body.code);

    if (!result) {
      return res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    }
    return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  }
);
authRouter.post(
  "/registration-email-resending",
  resendingEmailInputValidation(),
  isEmailExist(),
  errosValidation,
  async (req: Request, res: Response) => {
    const user = await usersService.resendEmailConfirmationCode(req.body.email);
    if (user) {
      return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    } else {
      return res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    }
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
      const refreshToken = await jwtService.createRefreshToken(user);
      res
        .status(HTTP_STATUSES.OK_200)
        .cookie("refresh", refreshToken, { httpOnly: true, secure: true })
        .send({ accessToken });
    } else {
      res.status(HTTP_STATUSES.UNAUTHORISED_401).send();
    }
  }
);
authRouter.post("/refresh-token", async (req: Request, res: Response) => {
  if (req.cookies?.refresh) {
    const refreshToken = req.cookies.refresh;
    const isNormalRefrshToken = await jwtService.verifyRefreshToken(
      refreshToken
    );
    if (isNormalRefrshToken) {
      const userId = req.user?.id;
      const accessToken = await jwtService.createJWT(userId);
      return res.send({ accessToken });
    } else {
      return res.sendStatus(HTTP_STATUSES.UNAUTHORISED_401);
    }
  } else {
    return res.sendStatus(HTTP_STATUSES.UNAUTHORISED_401);
  }
});

authRouter.get("/me", authMiddleware, async (req: Request, res: Response) => {
  const userId = req.user?.id;
  console.log(userId);
  if (!userId) {
    res.send(HTTP_STATUSES.UNAUTHORISED_401);
  } else {
    const infoAboutMe = await usersService.findUserById(userId);
    const mappedInfo = {
      email: infoAboutMe?.accountData.email,
      login: infoAboutMe?.accountData.login,
      userId: infoAboutMe?.id,
    };
    res.send(mappedInfo);
  }
});
