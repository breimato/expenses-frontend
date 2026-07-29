import { ResponseError } from '@/api/generated/runtime';

export interface ApiErrorInfo {
  code: string;
  message: string;
  isGuide: boolean;
}

const GUIDE_CODES = new Set(['EXP-CATEGORY-003']);

export async function getApiErrorInfo(
  error: unknown,
  fallback = 'Ha ocurrido un error',
): Promise<ApiErrorInfo> {
  if (error instanceof ResponseError) {
    try {
      const body = await error.response.clone().json();
      if (typeof body?.message === 'string' && body.message.length > 0) {
        const parts = body.message.split(' | ');
        const code = parts.length > 1 ? parts[0].trim() : '';
        const message = parts.length > 1 ? parts.slice(1).join(' | ') : body.message;
        return { code, message, isGuide: GUIDE_CODES.has(code) };
      }
    } catch {
      return { code: '', message: fallback, isGuide: false };
    }
  }
  if (error instanceof Error && error.message) {
    return { code: '', message: error.message, isGuide: false };
  }
  return { code: '', message: fallback, isGuide: false };
}

export async function getApiErrorMessage(error: unknown, fallback?: string): Promise<string> {
  const info = await getApiErrorInfo(error, fallback);
  return info.message;
}
