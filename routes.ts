import { Router } from 'express';
import multer from 'multer';
import * as controller from './controller';
const upload = multer({ dest: 'uploads/' });

const router = Router();

router.post('/upload', upload.single('file'), controller.saveAndUploadCSV);
router.get('/balance', controller.balanceCalculator);

export default router;
