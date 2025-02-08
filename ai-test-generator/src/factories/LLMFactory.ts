import "reflect-metadata";
import { container } from "tsyringe";
import { LLMService, OllamaService, OpenAIService } from "@services/LLM";
import { logger_custom } from "@utilities/custom_logger";

export enum LLMType {
    OLLAMA = "ollama",
    OPENAI = "openai"
}

const GlobalLLMRegistry: Map<string, new () => LLMService> = new Map();

export function LLMProvider(name: LLMType) {
    return function<T extends new (...args:any[])=>LLMService>(target: T){
        logger_custom.info(`Registering ${name}`);
        GlobalLLMRegistry.set(name, target);
    };
}

export class LLMFactory {
    static create(type: LLMType): LLMService {
        const service = GlobalLLMRegistry.get(type);
        if(!service) {
            throw new Error(`No LLM Provider found for ${type}`);
        }
        return container.resolve(service);
    }
}