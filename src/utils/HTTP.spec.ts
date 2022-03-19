import { expect } from 'chai';
import http from './HTTP';

describe('Проверяем HTTP.ts', () => {
  describe('Проверяем наличие методов get(), post(), put(), delete()', () => {
    it('.get() присутствует', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(http.get).to.exist;
    });

    it('.post() присутствует', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(http.post).to.exist;
    });

    it('.put() присутствует', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(http.put).to.exist;
    });

    it('.delete() присутствует', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(http.delete).to.exist;
    });
  });

  describe('Проверяем, что методы возвращают promise', () => {
    it('.get() возвращает promise', () => {
      const request = http.get('url', { timeout: 5000 });
      expect(request instanceof Promise).to.eq(true);
    });

    it('.post() возвращает promise', () => {
      const request = http.post('url', { timeout: 5000 });
      expect(request instanceof Promise).to.eq(true);
    });

    it('.put() возвращает promise', () => {
      const request = http.put('url', { timeout: 5000 });
      expect(request instanceof Promise).to.eq(true);
    });

    it('.delete() возвращает promise', () => {
      const request = http.delete('url', { timeout: 5000 });
      expect(request instanceof Promise).to.eq(true);
    });
  });
});
