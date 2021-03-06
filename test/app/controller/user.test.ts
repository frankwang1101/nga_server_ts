import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';

describe('test/app/controller/user.test.ts', () => {
  let id = 0;
  it('should create one ', async () => {
    const result = await app
      .httpRequest()
      .post('/api/v1/user')
      .send({
        username: 'test12',
        nickname: 'test12',
      })
      .set('x-csrf-token', '1231')
      .expect(200);
    const res = JSON.parse(result.text);
    id = res.data.uid;
    assert(res.data.nickname === 'test12');
  });

  it('should GET that', async () => {
    const result = await app
      .httpRequest()
      .get('/api/v1/user/' + id)
      .expect(200);
    assert(JSON.parse(result.text).data.uid === id);
  });

  it('should delete that one', async () => {
    const result = await app
      .httpRequest()
      .delete('/api/v1/user/' + id)
      .expect(200);
    assert(JSON.parse(result.text).code === 0);
  });
});
