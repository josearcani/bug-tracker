import jwt, { SignOptions } from 'jsonwebtoken';
import { secretTokenKey } from '../utils/config';

interface JWTPayload {
  id: string;
  username: string;
  email: string;
}

export const generateJWT = ({username, id, email}: JWTPayload) => {
    const payload = { email, username, id };
    const signOptions: SignOptions = {
      expiresIn: '1h'
    }
  return jwt.sign(payload, secretTokenKey, signOptions);
  // return new Promise((resolve, reject) => {
  //   const payload = { email, username, id };
  //   const signOptions: SignOptions = {
  //     expiresIn: '1h'
  //   }
  //   jwt.sign(payload, secretTokenKey, signOptions, (err, token):any => {
  //     if (err) {
  //       console.log(err);
  //       reject('Token couldn\'t be generated');
  //     } else {
  //       resolve(token);
  //     }
  //   })
  // })
}
