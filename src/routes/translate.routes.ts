import { Router } from "express";
import { getTranslation, populateTranslationData } from "../controllers/translate.controller.js";

export const routes = Router();

routes.get('/populate', populateTranslationData);

routes.get('/:lang', getTranslation);