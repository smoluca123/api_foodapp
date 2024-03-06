import { responseConfig } from '../../config/responseConfig.js';
import models from '../../config/models.js';

const { rate_res, restaurant } = models;
const getRatedByRestaurant = async (req, res) => {
  try {
    const { resId: res_id } = req.params;
    const checkRes = await restaurant.findOne({
      where: {
        res_id,
      },
    });
    if (!checkRes) {
      return responseConfig(res, 404, {}, 'Không tìm thấy nhà hàng');
    }
    const ratesByRestaurant = await rate_res.findAll({
      include: ['user'],
      attributes: ['id', 'amount', 'date_rate'],
      where: {
        res_id,
      },
    });
    const restaurentData = await restaurant.findOne({
      where: {
        res_id,
      },
    });
    responseConfig(
      res,
      200,
      {
        totalRate: ratesByRestaurant.length,
        res: restaurentData,
        rates: ratesByRestaurant,
      },
      `Lấy danh sách người dùng đã đánh giá nhà hàng ${restaurentData.res_name}`
    );
  } catch (error) {
    responseConfig(res, 500, error, 'Thất bại');
  }
};

export default getRatedByRestaurant;
