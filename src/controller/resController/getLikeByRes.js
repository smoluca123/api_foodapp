import { responseConfig } from '../../config/responseConfig.js';
import models from '../../config/models.js';

const { like_res, restaurant } = models;
const getLikedByRestaurant = async (req, res) => {
  try {
    const { resId: res_id } = req.params;
    const checkRes = await restaurant.findOne({
      where: {
        res_id,
      },
    });
    if (!checkRes) {
      return responseConfig(res, 404, {}, 'Không tìm thấy nhà hàng này');
    }
    const likesByRestaurant = await like_res.findAll({
      include: ['user'],
      attributes: ['id', 'date_like'],
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
        totalLike: likesByRestaurant.length,
        res: restaurentData,
        likes: likesByRestaurant,
      },
      `Lấy danh sách người dùng đã thích nhà hàng ${restaurentData.res_name}`
    );
  } catch (error) {
    responseConfig(res, 500, error, 'Thất bại');
  }
};

export default getLikedByRestaurant;
