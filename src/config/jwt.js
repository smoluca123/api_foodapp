import jwt from 'jsonwebtoken';

// create token
// method encrypt HS256
const createToken = (data) =>
  jwt.sign(data, 'SECRET', {
    algorithm: 'HS256',
    expiresIn: '1d',
  });

// check token
const checkToken = (token) => {
  try {
    jwt.verify(token, 'SECRET');
    return null; // Token hợp lệ
  } catch (err) {
    return err; // Token không hợp lệ
  }
};

// decrypt token

const dataToken = (token) => jwt.decode(token);

export { createToken, checkToken, dataToken };
