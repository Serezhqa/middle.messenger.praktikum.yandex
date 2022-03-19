export const baseURL = 'https://ya-praktikum.tech/api/v2';

export default abstract class BaseAPI {
  baseURL = baseURL;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(_data?: unknown) {
    throw new Error('Метод create() не реализован');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  request(_data?: unknown) {
    throw new Error('Метод request() не реализован');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(_data?: unknown) {
    throw new Error('Метод update() не реализован');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delete(_data?: unknown) {
    throw new Error('Метод delete() не реализован');
  }
}
