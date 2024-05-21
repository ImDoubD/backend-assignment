import { Router } from 'express';
import * as controller from './controller';

const router = Router();

router.get("/userRegistration", controller.userRegistration);
router.get("/movieRating", controller.movieRating);
router.get("/movieRecommendation", controller.movieRecommendation);
export default router;