import { Service } from 'egg';

/**
 * Test Service
 */
export default class Test extends Service {

  /**
   * sayHi to you
   * @param name - your name
   */
  public async sayHi(name: string) {
    return `hi, ${name}`;
  }

  public async getPosts() {
    return JSON.stringify({
      today: 123,
      total: 1135,
    });
  }
}
