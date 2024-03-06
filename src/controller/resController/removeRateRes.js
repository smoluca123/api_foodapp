import { responseConfig } from '../../config/responseConfig.js';
import models from '../../config/models.js';

const { rate_res } = models;
const removeRatingRes = async (req, res) => {
  try {
    const { rateId: id } = req.body;

    const checkRate = await rate_res.findOne({
      where: {
        id,
      },
    });
    if (!checkRate) {
      return responseConfig(res, 404, {}, 'Đánh giá không tồn tại');
    }

    await rate_res.destroy({
      where: {
        id,
      },
    });
    return responseConfig(res, 200, {}, 'Xóa đánh giá thành công');
  } catch (error) {
    return responseConfig(res, 500, error, 'Thất bại');
  }
};

export default removeRatingRes;
