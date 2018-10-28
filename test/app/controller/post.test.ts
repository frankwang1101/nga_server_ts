import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';

describe('test/app/controller/post.test.ts', () => {
  let id = 0;
  it('should create one ', async () => {
    const result = await app
      .httpRequest()
      .post('/api/v1/post')
      .send({
        title: 'first post',
        authorid: '10001',
        content: 'testPOst',
      })
      .set('x-csrf-token', '1231')
      .expect(200);
    const res = JSON.parse(result.text);
    id = res.data.id;
    assert(res.data.title === 'first post');
  });

  it('should GET that', async () => {
    const result = await app
      .httpRequest()
      .get('/api/v1/post/' + id)
      .expect(200);
    const content = JSON.parse(result.text).data.content.data;
    assert(Buffer.from(content).toString() === 'testPOst');
  });

  it('should delete that one', async () => {
    const result = await app
      .httpRequest()
      .delete('/api/v1/post/' + id)
      .expect(200);
    assert(JSON.parse(result.text).code === 0);
  });
});
