import { responseConfig } from '../../config/responseConfig.js';
import models from '../../config/models.js';
import { dataToken } from '../../config/jwt.js';

const { user, food, sub_food, order } = models;

const addOrder = async (req, res) => {
  try {
    const { accesstoken } = req.headers;
    const { foodId: food_id, amount, code = '', subFood } = req.body;
    const { userId: user_id } = dataToken(accesstoken);

    const checkUser = await user.findOne({
      where: {
        user_id,
      },
    });
    const checkFood = await food.findOne({
      where: {
        food_id,
      },
    });
    const checkSubFood = await sub_food.findAll({
      where: {
        sub_id: subFood,
      },
    });
    if (!checkUser) {
      return responseConfig(res, 404, {}, 'Không tìm thấy người dùng');
    }
    if (!checkFood) {
      return responseConfig(res, 404, {}, 'Không tìm thấy món ăn');
    }
    if (checkSubFood.length !== subFood.length) {
      const invalidSubId = [];
      subFood.filter((item) => {
        if (!checkSubFood.find((item2) => item2.dataValues.sub_id === item)) {
          invalidSubId.push(item);
        }
      });
      return responseConfig(
        res,
        404,
        {
          invalidSubId,
        },
        'Không tìm thấy món ăn phụ có id là : ' + invalidSubId.join(', ')
      );
    }

    const checkSubFoodInvalid = checkSubFood.filter(
      (item) => item.dataValues.food_id !== food_id
    );
    if (checkSubFoodInvalid && checkSubFoodInvalid.length > 0) {
      return responseConfig(
        res,
        404,
        {
          subFoodInvalid: checkSubFoodInvalid,
        },
        'Món ăn phụ không thuộc món ăn chính'
      );
    }
    const orderData = await order.create({
      user_id,
      food_id,
      amount,
      code,
      arr_sub_id: JSON.stringify(subFood),
    });
    const foodData = await food.findOne({
      where: {
        food_id,
      },
    });
    return responseConfig(
      res,
      200,
      {
        ...orderData.dataValues,
        food: foodData.dataValues,
        subFood: checkSubFood,
      },
      'Thêm đơn hàng thành công'
    );
  } catch (error) {
    console.log(error);
    responseConfig(res, 500, error, 'Thất bại');
  }
};

export default addOrder;
