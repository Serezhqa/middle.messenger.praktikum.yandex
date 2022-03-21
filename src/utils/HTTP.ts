enum Methods {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE'
}

type MethodOptions = {
  timeout: number;
  data?: Record<string, unknown> | string;
  headers?: Record<string, string>;
};

type RequestOptions = {
  timeout: number;
  data?: Record<string, unknown> | string;
  headers?: Record<string, string>;
  method: Methods;
};

function queryStringify(data: Record<string, unknown>) {
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

export const baseURL = 'https://ya-praktikum.tech/api/v2';

class HTTP {
  get(url: string, options: MethodOptions) {
    if (options.data && typeof options.data !== 'string') {
      url += queryStringify(options.data);
    }

    return this.request(url, { ...options, method: Methods.GET }, options.timeout);
  }

  post(url: string, options: MethodOptions) {
    return this.request(url, { ...options, method: Methods.POST }, options.timeout);
  }

  put(url: string, options: MethodOptions) {
    return this.request(url, { ...options, method: Methods.PUT }, options.timeout);
  }

  delete(url: string, options: MethodOptions) {
    return this.request(url, { ...options, method: Methods.DELETE }, options.timeout);
  }

  request(url: string, options: RequestOptions, timeout = 5000) {
    const { method, data, headers = {} } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.withCredentials = true;

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.timeout = timeout;
      xhr.onload = () => resolve(xhr);
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === 'GET' || !data) {
        xhr.send();
      } else {
        xhr.send((data as unknown as XMLHttpRequestBodyInit));
      }
    });
  }
}

export default new HTTP();
