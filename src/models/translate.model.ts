import mongoose from "mongoose";

export interface TranslationInterface {
  language: string,
  translation: {}
}

const translationSchema = new mongoose.Schema<TranslationInterface>({
  language: { type: String, unique: true },
  translation: {}
});

const Translation = mongoose.model('Translation', translationSchema);

export async function storeLanguage(lang: { abreviation: string, translation: {} }) {
  await Translation.create({
    language: lang.abreviation,
    translation: lang.translation
  });
}

export async function findLanguage(lang: string) {
  return await Translation.findOne({ language: lang });
}

export async function getTranslationData(lang: string) {
  const language = await findLanguage(lang);

  return language?.translation;
}