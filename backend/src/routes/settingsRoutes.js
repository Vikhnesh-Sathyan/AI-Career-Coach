import express from "express";

import {

getSettings,
updateProfile,
updateCareer,
updateNotifications,
updateSubscription

} from "../controllers/settingsController.js";


import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();



router.get(
"/",
protect,
getSettings
);



router.put(
"/profile",
protect,
updateProfile
);



router.put(
"/career",
protect,
updateCareer
);



router.put(
"/notifications",
protect,
updateNotifications
);



router.put(
"/subscription",
protect,
updateSubscription
);



export default router;