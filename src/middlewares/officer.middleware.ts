// import config from 'config';
// import { NextFunction, Response } from 'express';
// import { verify } from 'jsonwebtoken';
// import {OfficerEntity} from "@entities/officers.entity";
// import { HttpException } from '@exceptions/HttpException';
// import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
//
// const officerMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
//   try {
//     const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
//
//     if (Authorization) {
//       const secretKey: string = config.get('secretKey');
//       const { id } = (await verify(Authorization, secretKey)) as DataStoredInToken;
//       const findUser = await OfficerEntity.findOne(id, { select: ['id', 'email',] });
//
//       if (findUser) {
//         req.user = findUser;
//         next();
//       } else {
//         next(new HttpException(401, 'Wrong authentication token'));
//       }
//     } else {
//       next(new HttpException(404, 'Authentication token missing'));
//     }
//   } catch (error) {
//     next(new HttpException(401, 'Wrong authentication token'));
//   }
// };
//
// export default officerMiddleware;
