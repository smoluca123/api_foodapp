import { responseConfig } from '../../config/responseConfig.js';
import models from '../../config/models.js';
import { createToken } from '../../config/jwt.js';

const { user } = models;
const authLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkUser = await user.findOne({
      where: {
        email,
      },
    });

    if (!checkUser) {
      return responseConfig(res, 404, {}, 'Email không tồn tại');
    }

    if (checkUser.password !== password) {
      return responseConfig(res, 500, {}, 'Mật khẩu không đúng');
    }

    const key = new Date().getTime();
    const token = createToken({
      userId: checkUser.dataValues.user_id,
      key,
    });
    const { password: _pw, ...dataUser } = checkUser.dataValues;
    responseConfig(
      res,
      200,
      {
        ...dataUser,
        accessToken: token,
      },
      'Đăng nhập thành công'
    );
  } catch (error) {
    responseConfig(res, 500, error, 'Thất bại');
  }
};

export default authLogin;
