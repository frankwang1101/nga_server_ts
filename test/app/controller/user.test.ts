import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';

describe('test/app/controller/user.test.ts', () => {
  it('should GET nothing', async () => {
    const result = await app.httpRequest().get('/api/v1/user/1112213').expect(200);
    assert(JSON.parse(result.text).data.uid === 1112213);
  });
});
