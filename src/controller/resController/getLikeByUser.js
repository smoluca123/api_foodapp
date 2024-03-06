import { responseConfig } from '../../config/responseConfig.js';
import models from '../../config/models.js';

const { like_res, user } = models;
const getLikedByUser = async (req, res) => {
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
    const likesByUser = await like_res.findAll({
      include: ['re'],
      attributes: ['id', 'date_like'],
      where: {
        user_id,
      },
    });
    const userData = await user.findOne({
      where: {
        user_id,
      },
    });
    responseConfig(
      res,
      200,
      {
        totalLike: likesByUser.length,
        user: userData,
        likes: likesByUser,
      },
      `Lấy danh sách nhà hàng người dùng ${userData.full_name} đã thích`
    );
  } catch (error) {
    responseConfig(res, 500, error, 'Thất bại');
  }
};

export default getLikedByUser;
