import express from 'express';
import likeRes from '../controller/resController/likeRes.js';
import getLikedByRes from '../controller/resController/getLikeByRes.js';
import getLikedByUser from '../controller/resController/getLikeByUser.js';
import addRatingRes from '../controller/resController/addRateRes.js';
import removeRatingRes from '../controller/resController/removeRateRes.js';
import getRatedByRestaurant from '../controller/resController/getRateByRes.js';
import getRatedByUser from '../controller/resController/getRatedByUser.js';
import addOrder from '../controller/resController/addOrder.js';

const resRouter = express.Router();

resRouter.post('/like-res', likeRes);
resRouter.get('/get-liked-by-res/:resId', getLikedByRes);
resRouter.get('/get-liked-by-user/:userId', getLikedByUser);
resRouter.get('/get-liked-by-user/:userId', getLikedByUser);
resRouter.post('/add-rating', addRatingRes);
resRouter.post('/remove-rating', removeRatingRes);
resRouter.get('/get-rated-by-res/:resId', getRatedByRestaurant);
resRouter.get('/get-rated-by-user/:userId', getRatedByUser);
resRouter.post('/add-order', addOrder);

export default resRouter;
