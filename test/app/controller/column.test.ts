import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';
describe('test/app/controller/column.test.ts', () => {
  let id = 0;
  it('should create one ', async () => {
    const result = await app
      .httpRequest()
      .post(`/api/v1/column`)
      .send({
        title: 'column-title',
        desc: 'column-content',
        order: 1,
      })
      .set('x-csrf-token', '1231')
      .expect(200);
    const res = JSON.parse(result.text);
    id = res.data.id;
    assert(res.data.title === 'column-title');
  });

  it('should GET that', async () => {
    const result = await app
      .httpRequest()
      .get(`/api/v1/column/${id}`)
      .expect(200);
    assert(JSON.parse(result.text).data.id === id);
  });

  it('should delete that one', async () => {
    const result = await app
      .httpRequest()
      .delete(`/api/v1/column/${id}`)
      .expect(200);
    assert(JSON.parse(result.text).code === 0);
  });
});
