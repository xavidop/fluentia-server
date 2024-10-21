import { Router } from "express";
import { interact } from "./interact";
import { health } from "./health";
import nocache from "nocache";

const router = Router();

router.post("/v1/interact", nocache(), interact);

router.get("/v1/health", nocache(), health);

export default router;
