import request from 'supertest';
import app from '../app';

describe('tests /api/v1/health', () => {
  it('tests if returns 200.', async () => {
    const response = await request(app).get('/api/v1/health');

    expect(response.status).toEqual(200);
  });
});

describe('tests /api/v1/url-not-exist', () => {
  it('tests if returns 404 for not existing url.', async () => {
    const response = await request(app).get('/api/v1/url-not-exist');

    expect(response.status).toEqual(404);
  });
});
