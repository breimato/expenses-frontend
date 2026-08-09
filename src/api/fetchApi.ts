import type { FetchAPI } from '@/api/generated';
import { clearStoredSession } from '@/context/AuthContext';

/**
 * OpenAPI defines several GET endpoints with a JSON body.
 * Browser fetch() rejects GET requests that include a body.
 * XMLHttpRequest supports this pattern and matches curl/Spring behavior.
 */
export const fetchApi: FetchAPI = async (url, init) => {
  const requestUrl = url.toString();
  const method = init?.method?.toUpperCase() ?? 'GET';
  const hasBody = init?.body !== undefined && init?.body !== null && init?.body !== '';

  const response =
    method === 'GET' && hasBody
      ? await xhrGetWithBody(requestUrl, init)
      : await fetch(url, init);

  if (response.status === 401 && !requestUrl.includes('/v1/auth/')) {
    clearStoredSession();
    const loginPath = `${import.meta.env.BASE_URL}login`.replace(/\/{2,}/g, '/');
    if (!window.location.pathname.endsWith('/login')) {
      window.location.assign(loginPath);
    }
  }

  return response;
};

function xhrGetWithBody(url: string, init: RequestInit): Promise<Response> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'text';

    if (init.headers) {
      for (const [key, value] of Object.entries(init.headers as Record<string, string>)) {
        xhr.setRequestHeader(key, String(value));
      }
    }

    xhr.onload = () => {
      resolve(
        new Response(xhr.responseText, {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseResponseHeaders(xhr.getAllResponseHeaders()),
        }),
      );
    };

    xhr.onerror = () => reject(new TypeError('Failed to fetch'));
    xhr.send(init.body as XMLHttpRequestBodyInit);
  });
}

function parseResponseHeaders(rawHeaders: string): Headers {
  const headers = new Headers();

  rawHeaders
    .trim()
    .split(/[\r\n]+/)
    .filter(Boolean)
    .forEach((line) => {
      const separatorIndex = line.indexOf(':');
      if (separatorIndex === -1) {
        return;
      }
      const key = line.slice(0, separatorIndex).trim();
      const value = line.slice(separatorIndex + 1).trim();
      headers.append(key, value);
    });

  return headers;
}
