import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';

describe('test/app/controller/reply.test.ts', () => {
  let id = 0;
  it('should create one ', async () => {
    const result = await app
      .httpRequest()
      .post('/api/v1/reply')
      .send({
        authorid: '10001',
        postid: 'aaa',
        content: 'testreply',
      })
      .set('x-csrf-token', '1231')
      .expect(200);
    const res = JSON.parse(result.text);
    id = res.data.id;
    assert(res.data.content === 'testreply');
  });

  it('should GET that', async () => {
    const result = await app
      .httpRequest()
      .get('/api/v1/reply/' + id)
      .expect(200);
    const content = JSON.parse(result.text).data.content.data;
    assert(Buffer.from(content).toString() === 'testreply');
  });

  it('should delete that one', async () => {
    const result = await app
      .httpRequest()
      .delete('/api/v1/reply/' + id)
      .expect(200);
    assert(JSON.parse(result.text).code === 0);
  });
});
