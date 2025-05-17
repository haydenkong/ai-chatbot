import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { xai } from '@ai-sdk/xai';
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';
import { openai } from '@ai-sdk/openai';

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'chat-model': xai('grok-2-vision-1212'),
        'chat-model-reasoning': wrapLanguageModel({
          model: xai('grok-3-mini-beta'),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': xai('grok-2-1212'),
        'artifact-model': xai('grok-2-1212'),
        // Add OpenAI models (model ID only, no apiKey)
        'GPT 4.1': openai('gpt-4.1-2025-04-14'),
        'OpenAI o4 Mini': openai('o4-mini-2025-04-16'),
        'GPT 4o': openai('gpt-4o-2024-08-06'),
      },
      imageModels: {
        'small-model': xai.image('grok-2-image'),
      },
    });
