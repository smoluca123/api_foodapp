import { responseConfig } from '../../config/responseConfig.js';
import models from '../../config/models.js';
import { createToken } from '../../config/jwt.js';

const { user } = models;
const authRegister = async (req, res) => {
  try {
    const { fullName: full_name, email, password } = req.body;

    const checkUser = await user.findOne({
      where: {
        email,
      },
    });

    if (checkUser) {
      return responseConfig(res, 500, {}, 'Email đã tồn tại');
    }

    const userCreated = await user.create({
      full_name,
      email,
      password,
    });
    const key = new Date().getTime();
    const token = createToken({
      userId: userCreated.dataValues.user_id,
      key,
    });
    const { password: _pw, ...dataUser } = userCreated.dataValues;
    responseConfig(
      res,
      200,
      {
        ...dataUser,
        accessToken: token,
      },
      'Đăng ký thành công'
    );
  } catch (error) {
    responseConfig(res, 500, error, 'Thất bại');
  }
};

export default authRegister;
