import { NextRequest, NextResponse } from 'next/server';
import { getMultipleCompletions, MODEL_CONFIGS } from '@/lib/ai-providers';

export interface CompareRequest {
  prompt: string;
  models: string[];
  maxTokens?: number;
}

export interface CompareResponse {
  id: string;
  prompt: string;
  timestamp: string;
  results: {
    modelId: string;
    modelName: string;
    provider: string;
    content: string;
    responseTime: number;
    status: 'complete' | 'error';
    tokenUsage?: {
      prompt: number;
      completion: number;
      total: number;
    };
  }[];
}

export async function POST(request: NextRequest) {
  try {
    const body: CompareRequest = await request.json();

    // Validate request
    if (!body.prompt || typeof body.prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    if (!body.models || !Array.isArray(body.models) || body.models.length === 0) {
      return NextResponse.json(
        { error: 'At least one model must be selected' },
        { status: 400 }
      );
    }

    if (body.models.length > 4) {
      return NextResponse.json(
        { error: 'Maximum 4 models can be compared at once' },
        { status: 400 }
      );
    }

    // Validate model IDs
    const invalidModels = body.models.filter((m) => !MODEL_CONFIGS[m]);
    if (invalidModels.length > 0) {
      return NextResponse.json(
        { error: `Invalid model(s): ${invalidModels.join(', ')}` },
        { status: 400 }
      );
    }

    // Get completions from all models
    const completions = await getMultipleCompletions(
      body.models,
      body.prompt,
      body.maxTokens
    );

    // Build response
    const response: CompareResponse = {
      id: crypto.randomUUID(),
      prompt: body.prompt,
      timestamp: new Date().toISOString(),
      results: completions.map((completion) => {
        const config = MODEL_CONFIGS[completion.modelId];
        const hasError = 'error' in completion && completion.error;
        return {
          modelId: completion.modelId,
          modelName: config?.name || completion.modelId,
          provider: config?.provider || 'unknown',
          content: completion.content,
          responseTime: completion.responseTime,
          status: hasError ? 'error' : 'complete',
          tokenUsage: completion.tokenUsage,
        };
      }),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Compare API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
