import { responseConfig } from '../../config/responseConfig.js';
import models from '../../config/models.js';
import { dataToken } from '../../config/jwt.js';

const { rate_res, user, restaurant } = models;
const addRatingRes = async (req, res) => {
  try {
    const { accesstoken: token } = req.headers;
    const { resId: res_id, rateAmount } = req.body;
    const { userId: user_id } = dataToken(token);
    const rateValid = rateAmount < 0 ? 0 : rateAmount > 5 ? 5 : rateAmount;

    const checkRate = await rate_res.findOne({
      where: {
        user_id,
        res_id,
      },
    });
    const checkUser = await user.findOne({
      where: {
        user_id,
      },
    });
    const checkRes = await restaurant.findOne({
      where: {
        res_id,
      },
    });
    if (checkRate) {
      return responseConfig(res, 400, {}, 'Bạn đã đánh giá nhà hàng rồi!');
    }
    if (!checkUser) {
      return responseConfig(res, 404, {}, 'Người dùng không tồn tại');
    }
    if (!checkRes) {
      return responseConfig(res, 404, {}, 'Không tìm thấy nhà hàng');
    }

    const ratingRes = await rate_res.create({
      user_id,
      res_id,
      amount: rateValid,
      date_rate: new Date(),
    });
    return responseConfig(res, 200, ratingRes, 'Thêm đánh giá thành công');
  } catch (error) {
    return responseConfig(res, 500, error, 'Thất bại');
  }
};

export default addRatingRes;
