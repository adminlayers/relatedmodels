/**
 * AI Provider Configuration and Utilities
 * Handles communication with multiple AI model providers
 */

export type AIProvider = 'anthropic' | 'openai' | 'google' | 'mistral' | 'cohere';

export interface ModelConfig {
  id: string;
  name: string;
  provider: AIProvider;
  apiModel: string;
  maxTokens: number;
  contextWindow: number;
}

export const MODEL_CONFIGS: Record<string, ModelConfig> = {
  'claude-opus-4': {
    id: 'claude-opus-4',
    name: 'Claude Opus 4',
    provider: 'anthropic',
    apiModel: 'claude-opus-4-20250514',
    maxTokens: 4096,
    contextWindow: 200000,
  },
  'claude-sonnet-4': {
    id: 'claude-sonnet-4',
    name: 'Claude Sonnet 4',
    provider: 'anthropic',
    apiModel: 'claude-sonnet-4-20250514',
    maxTokens: 4096,
    contextWindow: 200000,
  },
  'claude-haiku-3.5': {
    id: 'claude-haiku-3.5',
    name: 'Claude Haiku 3.5',
    provider: 'anthropic',
    apiModel: 'claude-3-5-haiku-20241022',
    maxTokens: 4096,
    contextWindow: 200000,
  },
  'gpt-4o': {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'openai',
    apiModel: 'gpt-4o',
    maxTokens: 4096,
    contextWindow: 128000,
  },
  'gpt-4o-mini': {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'openai',
    apiModel: 'gpt-4o-mini',
    maxTokens: 4096,
    contextWindow: 128000,
  },
  'gemini-2.0-flash': {
    id: 'gemini-2.0-flash',
    name: 'Gemini 2.0 Flash',
    provider: 'google',
    apiModel: 'gemini-2.0-flash',
    maxTokens: 8192,
    contextWindow: 1000000,
  },
  'gemini-1.5-pro': {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'google',
    apiModel: 'gemini-1.5-pro',
    maxTokens: 8192,
    contextWindow: 2000000,
  },
  'mistral-large': {
    id: 'mistral-large',
    name: 'Mistral Large',
    provider: 'mistral',
    apiModel: 'mistral-large-latest',
    maxTokens: 4096,
    contextWindow: 128000,
  },
};

export interface CompletionRequest {
  model: string;
  prompt: string;
  maxTokens?: number;
  temperature?: number;
}

export interface CompletionResponse {
  modelId: string;
  content: string;
  responseTime: number;
  tokenUsage?: {
    prompt: number;
    completion: number;
    total: number;
  };
}

/**
 * Call Anthropic API
 */
async function callAnthropic(
  apiKey: string,
  model: string,
  prompt: string,
  maxTokens: number
): Promise<{ content: string; usage?: { input_tokens: number; output_tokens: number } }> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Anthropic API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return {
    content: data.content[0]?.text || '',
    usage: data.usage,
  };
}

/**
 * Call OpenAI API
 */
async function callOpenAI(
  apiKey: string,
  model: string,
  prompt: string,
  maxTokens: number
): Promise<{ content: string; usage?: { prompt_tokens: number; completion_tokens: number } }> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return {
    content: data.choices[0]?.message?.content || '',
    usage: data.usage,
  };
}

/**
 * Call Google AI (Gemini) API
 */
async function callGoogle(
  apiKey: string,
  model: string,
  prompt: string,
  maxTokens: number
): Promise<{ content: string }> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          maxOutputTokens: maxTokens,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Google AI API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return {
    content: data.candidates?.[0]?.content?.parts?.[0]?.text || '',
  };
}

/**
 * Call Mistral API
 */
async function callMistral(
  apiKey: string,
  model: string,
  prompt: string,
  maxTokens: number
): Promise<{ content: string; usage?: { prompt_tokens: number; completion_tokens: number } }> {
  const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Mistral API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return {
    content: data.choices[0]?.message?.content || '',
    usage: data.usage,
  };
}

/**
 * Get completion from any supported AI provider
 */
export async function getCompletion(
  request: CompletionRequest
): Promise<CompletionResponse> {
  const config = MODEL_CONFIGS[request.model];
  if (!config) {
    throw new Error(`Unknown model: ${request.model}`);
  }

  const maxTokens = request.maxTokens || config.maxTokens;
  const startTime = Date.now();

  let content: string;
  let tokenUsage: CompletionResponse['tokenUsage'] | undefined;

  switch (config.provider) {
    case 'anthropic': {
      const apiKey = process.env.ANTHROPIC_API_KEY;
      if (!apiKey) throw new Error('ANTHROPIC_API_KEY not configured');
      const result = await callAnthropic(apiKey, config.apiModel, request.prompt, maxTokens);
      content = result.content;
      if (result.usage) {
        tokenUsage = {
          prompt: result.usage.input_tokens,
          completion: result.usage.output_tokens,
          total: result.usage.input_tokens + result.usage.output_tokens,
        };
      }
      break;
    }
    case 'openai': {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) throw new Error('OPENAI_API_KEY not configured');
      const result = await callOpenAI(apiKey, config.apiModel, request.prompt, maxTokens);
      content = result.content;
      if (result.usage) {
        tokenUsage = {
          prompt: result.usage.prompt_tokens,
          completion: result.usage.completion_tokens,
          total: result.usage.prompt_tokens + result.usage.completion_tokens,
        };
      }
      break;
    }
    case 'google': {
      const apiKey = process.env.GOOGLE_AI_API_KEY;
      if (!apiKey) throw new Error('GOOGLE_AI_API_KEY not configured');
      const result = await callGoogle(apiKey, config.apiModel, request.prompt, maxTokens);
      content = result.content;
      break;
    }
    case 'mistral': {
      const apiKey = process.env.MISTRAL_API_KEY;
      if (!apiKey) throw new Error('MISTRAL_API_KEY not configured');
      const result = await callMistral(apiKey, config.apiModel, request.prompt, maxTokens);
      content = result.content;
      if (result.usage) {
        tokenUsage = {
          prompt: result.usage.prompt_tokens,
          completion: result.usage.completion_tokens,
          total: result.usage.prompt_tokens + result.usage.completion_tokens,
        };
      }
      break;
    }
    default:
      throw new Error(`Provider ${config.provider} not implemented`);
  }

  return {
    modelId: request.model,
    content,
    responseTime: Date.now() - startTime,
    tokenUsage,
  };
}

/**
 * Get completions from multiple models in parallel
 */
export async function getMultipleCompletions(
  models: string[],
  prompt: string,
  maxTokens?: number
): Promise<CompletionResponse[]> {
  const promises = models.map((model) =>
    getCompletion({ model, prompt, maxTokens }).catch((error) => ({
      modelId: model,
      content: `Error: ${error.message}`,
      responseTime: 0,
      error: true,
    }))
  );

  return Promise.all(promises) as Promise<CompletionResponse[]>;
}
