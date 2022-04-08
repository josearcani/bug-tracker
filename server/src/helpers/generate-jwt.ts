import jwt, { SignOptions } from 'jsonwebtoken';

interface JWTPayload {
  id: string;
  username: string;
  email: string;
}

const secretTokenKey = process.env.SECRET_TOKEN_KEY as string;

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
