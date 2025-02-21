const request = require('supertest');
const axios = require('axios');
const app = require('./server');
jest.mock('axios');

describe('NASA API server', () => {
  beforeAll(() => {
    // Mock successful APOD fetch
    axios.get.mockImplementation((url) => {
      if (url.includes('planetary/apod')) {
        return Promise.resolve({
          data: {
            date: '2021-01-01',
            explanation: 'An explanation of the picture',
            url: 'http://example.com/apod.jpg'
          }
        });
      } else if (url.includes('mars-photos')) {
        // Mock successful Mars Rover fetch
        return Promise.resolve({
          data: {
            photos: [
              { id: 1, camera: { name: 'FHAZ' }, img_src: 'http://example.com/mars.jpg' }
            ]
          }
        });
      } else if (url.includes('EPIC')) {
        // Mock successful EPIC fetch
        return Promise.resolve({
          data: [
            { identifier: 'epic_1', date: '2021-01-01', image: 'epic_image_1.jpg', type: 'natural' }
          ]
        });
      }
      return Promise.reject({
        response: { status: 500, data: { error: 'Internal Server Error' }}
      });
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('GET /apod', () => {
    it('fetches APOD data successfully', async () => {
      const res = await request(app).get('/apod');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('url', 'http://example.com/apod.jpg');
    });

    it('fetches APOD data for a specific date', async () => {
      const res = await request(app).get('/apod?date=2021-01-01');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('date', '2021-01-01');
    });
  });

  describe('GET /mars', () => {
    it('fetches Mars Rover data successfully', async () => {
      const res = await request(app).get('/mars');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('photos');
      expect(res.body.photos[0]).toHaveProperty('img_src', 'http://example.com/mars.jpg');
    });

    it('handles failure in fetching Mars data', async () => {
        axios.get.mockRejectedValueOnce({
          response: { status: 500, data: { error: 'Internal Server Error' }}
        });
        const res = await request(app).get('/mars');
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual({ error: 'Failed to fetch Mars-Rover data' });
      });
  });

  describe('GET /api/epic', () => {
    it('fetches EPIC data successfully', async () => {
      const res = await request(app).get('/api/epic?type=natural');
      expect(res.statusCode).toEqual(200);
      expect(res.body[0]).toHaveProperty('image', 'epic_image_1.jpg');
    });

    it('handles failure in fetching EPIC data', async () => {
        axios.get.mockRejectedValueOnce({
          response: { status: 500, data: { error: 'Internal Server Error' }}
        });
        const res = await request(app).get('/api/epic?type=natural');
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual({ error: 'Failed to fetch EPIC data' });
      });
  });
});
