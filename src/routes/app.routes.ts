import {Router} from 'express';
import AppController from '../controllers/app.controllers';

const router = Router();

router.post("/createUser", AppController.createUser);

export default router;
