import { responseConfig } from '../../config/responseConfig.js';
import models from '../../config/models.js';

const { rate_res, user } = models;
const getRatedByUser = async (req, res) => {
  try {
    const { userId: user_id } = req.params;
    const checkUser = await user.findOne({
      where: {
        user_id,
      },
    });
    if (!checkUser) {
      return responseConfig(res, 404, {}, 'Không tìm thấy người dùng');
    }
    const ratesByUser = await rate_res.findAll({
      include: ['re'],
      attributes: ['id', 'amount', 'date_rate'],
      where: {
        user_id,
      },
    });
    const userData = await user.findOne({
      attributes: {
        exclude: ['password'],
      },
      where: {
        user_id,
      },
    });
    responseConfig(
      res,
      200,
      {
        totalRate: ratesByUser.length,
        user: userData,
        rates: ratesByUser,
      },
      `Lấy danh sách những đánh giá nhà hàng của ${userData.full_name}`
    );
  } catch (error) {
    responseConfig(res, 500, error, 'Thất bại');
  }
};

export default getRatedByUser;
