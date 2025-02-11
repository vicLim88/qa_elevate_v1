import dotenv from "dotenv"
dotenv.config();

export const OPENAI_APIKEY: string = process.env.OPENAI_APIKEY!;
export const URL_OLLAMA_STAGING: string = process.env.URL_OLLAMA_STAGING!;
export const URL_OLLAMA_DOCKER_STAGING: string = process.env.URL_OLLAMA_DOCKER_STAGING!;