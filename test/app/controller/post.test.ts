import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';
import * as dayjs from 'dayjs';
const d = Date.now();
describe('test/app/controller/post.test.ts', () => {
  it('should create one ', async () => {
    const result = await app
      .httpRequest()
      .post('/api/v1/post')
      .send({
        uid: d.toString(),
        title: 'post-title',
        content: 'post-content',
        author_id: 100001,
        createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      })
      .set('x-csrf-token', '1231')
      .expect(200);
    assert(JSON.parse(result.text).data.title === 'post-title');
  });

  it('should GET that', async () => {
    const result = await app
      .httpRequest()
      .get(`/api/v1/post/${d}`)
      .expect(200);
    assert(JSON.parse(result.text).data.uid === d.toString());
  });

  it('should delete that one', async () => {
    const result = await app
      .httpRequest()
      .delete(`/api/v1/post/${d}`)
      .expect(200);
    assert(JSON.parse(result.text).code === 0);
  });
});
