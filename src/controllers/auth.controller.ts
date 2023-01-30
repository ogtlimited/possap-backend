import { ResetPasswordDto } from './../dtos/users.dto';
import { NextFunction, Request, Response } from 'express';
import { ChangePasswordDto, CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);

      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: LoginUserDto = req.body;
      const { token, findUser } = await this.authService.login(userData);

      res.status(200).json({ data: findUser, message: 'login', token });
    } catch (error) {
      next(error);
    }
  };
  public changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: ChangePasswordDto = req.body;
      const userId = Number(req.params.id);
      const updatedUser = await this.authService.changePassword(userId, userData);

      res.status(200).json({ data: updatedUser, message: 'password updated' });
    } catch (error) {
      next(error);
    }
  };
  public sendResetPasswordOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: ResetPasswordDto = req.body;
      const user = await this.authService.sendResetPasswordOtp(userData);

      res.status(200).json({ data: user, message: 'sent reset otp' });
    } catch (error) {
      next(error);
    }
  };
  public validateResetPasswordOTP = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, ...userData } = req.body;
      console.log(userData, email);
      const user = await this.authService.validateResetPasswordOTP(email, userData);

      res.status(200).json({ data: user, message: 'validated' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
