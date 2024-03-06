import { responseConfig } from '../../config/responseConfig.js';
import models from '../../config/models.js';
import { dataToken } from '../../config/jwt.js';

const { restaurant, user, like_res } = models;
const likeRes = async (req, res) => {
  try {
    const { accesstoken: token } = req.headers;
    const { resId: res_id } = req.body;
    const { userId: user_id } = dataToken(token);
    const checkRes = await restaurant.findOne({
      where: {
        res_id,
      },
    });
    const checkUser = await user.findOne({
      where: {
        user_id,
      },
    });
    if (!checkRes) {
      return responseConfig(res, 404, {}, 'Không tìm thấy nhà hàng');
    }
    if (!checkUser) {
      return responseConfig(res, 404, {}, 'Không tìm thấy người dùng');
    }

    const checkLike = await like_res.findOne({
      where: { res_id, user_id },
    });
    if (checkLike) {
      like_res.destroy({
        where: {
          res_id,
          user_id,
        },
      });
      return responseConfig(res, 200, {}, 'Bạn đã bỏ thích nhà hàng');
    }
    await like_res.create({
      res_id,
      user_id,
      date_like: new Date(),
    });
    return responseConfig(res, 200, {}, 'Bạn đã thích nhà hàng');
  } catch (error) {
    responseConfig(res, 500, error, 'Thất bại');
  }
};

export default likeRes;
