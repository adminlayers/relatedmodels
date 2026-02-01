import { NextResponse } from 'next/server';
import { MODEL_CONFIGS, AIProvider } from '@/lib/ai-providers';

export interface ModelInfo {
  id: string;
  name: string;
  provider: AIProvider;
  contextWindow: number;
  maxTokens: number;
  available: boolean;
}

/**
 * GET /api/models
 * Returns list of available AI models and their configurations
 */
export async function GET() {
  // Check which providers have API keys configured
  const providerAvailability: Record<AIProvider, boolean> = {
    anthropic: !!process.env.ANTHROPIC_API_KEY,
    openai: !!process.env.OPENAI_API_KEY,
    google: !!process.env.GOOGLE_AI_API_KEY,
    mistral: !!process.env.MISTRAL_API_KEY,
    cohere: !!process.env.COHERE_API_KEY,
  };

  const models: ModelInfo[] = Object.entries(MODEL_CONFIGS).map(([id, config]) => ({
    id,
    name: config.name,
    provider: config.provider,
    contextWindow: config.contextWindow,
    maxTokens: config.maxTokens,
    available: providerAvailability[config.provider],
  }));

  // Sort by provider, then by name
  models.sort((a, b) => {
    if (a.provider !== b.provider) {
      return a.provider.localeCompare(b.provider);
    }
    return a.name.localeCompare(b.name);
  });

  return NextResponse.json({
    models,
    providers: Object.entries(providerAvailability).map(([provider, available]) => ({
      provider,
      available,
    })),
  });
}
