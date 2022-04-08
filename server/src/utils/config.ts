export const secretTokenKey = process.env.SECRET_TOKEN_KEY as string;

// Decalration merging to provide user property on Request
declare module 'express-serve-static-core' {
  interface Request {
    user: TokenInterface,
  }
}

interface TokenInterface {
  id: string,
  email: string;
  username: string
}
