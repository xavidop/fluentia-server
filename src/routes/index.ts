import { Router } from "express";
import { interact } from "./interact";
import nocache from "nocache";

const router = Router();

router.get("/v1/interact", nocache(), interact);

export default router;
