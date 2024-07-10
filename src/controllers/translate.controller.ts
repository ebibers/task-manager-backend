import { Request, Response } from 'express';
import data from '../../public/assets/i18n/languages.json' assert { type: "json" };
import { getTranslationData, storeLanguage } from '../models/translate.model.js';

// Populates database with translation data from json file.
export async function populateTranslationData(req: Request, res: Response) {
  for (let entry of data) {
    await storeLanguage({ abreviation: entry.abreviation, translation: entry.translation });
  }
  
  res.send(true);
}

export async function getTranslation(req: Request, res: Response) {
  const language = req.params.lang;

  const translation = await getTranslationData(language);

  res.send(translation);
}