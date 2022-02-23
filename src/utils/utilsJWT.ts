import { sign, verify } from 'jsonwebtoken';
import { DataJWT } from '../interface/User';

const secret = 'segredo';

const createToken = (data: DataJWT) => {
  const token = sign(data, secret, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });
  return token;
};

const verifyToken = (token: string) => {
  const decoded = verify(token, secret);

  return decoded;
};

export default { createToken, verifyToken };