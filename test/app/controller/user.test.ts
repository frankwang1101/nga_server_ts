import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';
import * as dayjs from 'dayjs';

describe('test/app/controller/user.test.ts', () => {
  it('should create one ', async () => {
    const result = await app
      .httpRequest()
      .post('/api/v1/user')
      .send({
        uid: 10012,
        username: 'test12',
        nickname: 'test12',
        status: 0,
        createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      })
      .set('x-csrf-token', '1231')
      .expect(200);
    assert(JSON.parse(result.text).data.nickname === 'test12');
  });

  it('should GET that', async () => {
    const result = await app
      .httpRequest()
      .get('/api/v1/user/100001')
      .expect(200);
    assert(JSON.parse(result.text).data.uid === 100001);
  });

  it('should delete that one', async () => {
    const result = await app
      .httpRequest()
      .delete('/api/v1/user/10012')
      .expect(200);
    assert(JSON.parse(result.text).code === 0);
  });
});
