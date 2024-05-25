import { Router } from 'express';
import multer from 'multer';
import * as controller from './controller';
const upload = multer({ dest: 'uploads/' });

const router = Router();

router.post('/upload', upload.single('file'), controller.saveAndUploadCSV);
router.get('/balance', controller.balanceCalculator);

export default router;
// router.get("/userRegistration", controller.userRegistration);
// router.get("/movieRating", controller.movieRating);
// router.get("/movieRecommendation", controller.movieRecommendation);