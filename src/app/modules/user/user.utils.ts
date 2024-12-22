
import jwt from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { useremail: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};