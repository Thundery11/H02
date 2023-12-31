import { Router, Request, Response } from "express";
import { RequestWithBody } from "../../models/requestsTypes";
import { HTTP_STATUSES } from "../../models/statuses";
import { authInputValidation } from "../../middlewares/auth-input-validation-middleware";
import { errosValidation } from "../../middlewares/erros-validation";
import { jwtService } from "../../application/jwt-service";
import { authMiddleware } from "../../middlewares/auth-middleware";
import {
  AuthBodyParams,
  PasswordAndRecoveryCode,
  emailType,
} from "../../models/authTypes";
import { registrationInputValidation } from "../../middlewares/registration-input-validation-middleware";
import { usersService } from "../../domain/users-service/users-service";
import { authService } from "../../domain/auth-service/auth-service";
import { emailConfirmationValidation } from "../../middlewares/email-confirmation-validation";
import { resendingEmailInputValidation } from "../../middlewares/resending-email-input-validation";
import { isEmailExist } from "../../middlewares/isEmailExist-validation";
import { checkRefreshToken } from "../../middlewares/check-refresh-token-middleware";
import { sesionService } from "../../domain/session-service/session-service";
import { uuid } from "uuidv4";
import { securityDevicesService } from "../../domain/security-devices-service/security-devices-service";
import { SecurityDevicesType } from "../../models/SecurityDevicesType";
import { requestsToApiMiddleware } from "../../middlewares/request-to-api-middleware";
import { passwordRecoveryInputValidation } from "../../middlewares/password-recovery-input-validation";
import { passwordInputValidation } from "../../middlewares/password-input-validation";
export const authRouter = Router({});

authRouter.post(
  "/registration",
  requestsToApiMiddleware,
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
  "/password-recovery",
  passwordRecoveryInputValidation(),
  errosValidation,
  requestsToApiMiddleware,
  async (req: RequestWithBody<emailType>, res: Response) => {
    const email = req.body.email;
    await usersService.sendPasswordRecoveryCode(email);
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  }
);
authRouter.post(
  "/new-password",
  requestsToApiMiddleware,
  passwordInputValidation(),
  errosValidation,
  async (req: RequestWithBody<PasswordAndRecoveryCode>, res: Response) => {
    const newPassword = req.body.newPassword;
    const recoveryCode = req.body.recoveryCode;
    const result = await usersService.isOkRecoveryCode(recoveryCode);
    if (!result) {
      return res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    }
    const userEmail = result.email;
    const changePassword = await usersService.changePassword(
      userEmail,
      newPassword
    );
    if (!changePassword) return res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  }
);

authRouter.post(
  "/registration-confirmation",
  requestsToApiMiddleware,
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
  requestsToApiMiddleware,
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
  requestsToApiMiddleware,
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
    const title = req.headers["user-agent"] || "Mozilla";
    const deviceId = uuid();
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    if (!ip) {
      return res.status(HTTP_STATUSES.NOT_FOUND_404).send("unknown ip addres");
    }

    if (user) {
      console.log(user);
      const accessToken = await jwtService.createJWT(user);
      const refreshToken = await jwtService.createRefreshToken(user, deviceId);
      const result = await jwtService.verifyRefreshToken(refreshToken);
      const lastActiveDate = new Date(result.iat * 1000).toISOString();
      const device: SecurityDevicesType = {
        userId: user.id,
        ip,
        title,
        lastActiveDate,
        deviceId,
      };
      await securityDevicesService.addDevice(device);

      return res
        .status(HTTP_STATUSES.OK_200)
        .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
        .send({ accessToken });
    } else {
      return res.status(HTTP_STATUSES.UNAUTHORISED_401).send();
    }
  }
);
authRouter.post(
  "/refresh-token",
  checkRefreshToken,
  async (req: Request, res: Response) => {
    const oldRefreshToken = req.cookies.refreshToken;
    await sesionService.updateBlackListTokens(oldRefreshToken);
    const user = req.user;
    if (!user) {
      return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
    const payload = await jwtService.verifyRefreshToken(oldRefreshToken);
    const isLastActiveDate = new Date(payload.iat * 1000).toISOString();
    const isValidRefreshToken =
      await securityDevicesService.isValidRefreshToken(isLastActiveDate);
    if (!isValidRefreshToken) {
      return res.sendStatus(HTTP_STATUSES.UNAUTHORISED_401);
    }
    const accessToken = await jwtService.createJWT(user);
    const newRefreshToken = await jwtService.createRefreshToken(
      user,
      payload.deviceId
    );
    const result = await jwtService.verifyRefreshToken(newRefreshToken);
    console.log(result);
    const lastActiveDate = new Date(result.iat * 1000).toISOString();
    const deviceId = result.deviceId;
    await securityDevicesService.updateLastActiveDate(deviceId, lastActiveDate);

    return res
      .status(HTTP_STATUSES.OK_200)
      .cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
      })
      .send({ accessToken });
  }
);
authRouter.post(
  "/logout",
  checkRefreshToken,
  async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    const result = await jwtService.verifyRefreshToken(refreshToken);
    const lastActiveDate = new Date(result.iat * 1000).toISOString();
    await securityDevicesService.deleteRefreshTokenWhenLogout(lastActiveDate);
    await sesionService.updateBlackListTokens(refreshToken);
    return res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  }
);

authRouter.get("/me", authMiddleware, async (req: Request, res: Response) => {
  const userId = req.user?.id;
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
