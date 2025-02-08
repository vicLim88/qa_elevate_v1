import { LLMProvider, LLMType } from "@factories/LLMFactory";
import { OllamaService, OpenAIService } from "@services/LLM";

@LLMProvider(LLMType.OLLAMA)
export class OllamaProvider extends OllamaService{}

@LLMProvider(LLMType.OPENAI)
export class OpenAIProvider extends OpenAIService{}