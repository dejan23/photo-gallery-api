import request from 'supertest';
import path from 'path';
import app from '../app';

describe('tests /api/v1/images', () => {
  it('tests if returns 200.', async () => {
    const response = await request(app).get('/api/v1/images');

    expect(response.status).toEqual(200);
  });
});

describe('tests /api/v1/images/upload', () => {
  const dirname = path.resolve(path.dirname(''));
  const testImage = `${dirname}/src/test/testFiles/testImage.jpeg`;

  const testImageLarge = `${dirname}/src/test/testFiles/testImageLarge.jpeg`;

  it('tests if returns 200.', async () => {
    const response = await request(app)
      .post('/api/v1/images/upload')
      .attach('file', testImage);

    expect(response.status).toEqual(200);
  });

  it('tests if returns 200 for large images, over threshold.', async () => {
    const response = await request(app)
      .post('/api/v1/images/upload')
      .attach('file', testImageLarge);

    expect(response.status).toEqual(200);
  });

  it('tests duplicate image.', async () => {
    const response = await request(app)
      .post('/api/v1/images/upload')
      .attach('file', testImage);

    expect(response.body.message).toBe(
      'Error: testImage.jpeg - this image already uploaded',
    );
  });

  it('tests if returns 400 when no file was provided.', async () => {
    const response = await request(app).post('/api/v1/images/upload');

    expect(response.status).toEqual(400);
  });
});
