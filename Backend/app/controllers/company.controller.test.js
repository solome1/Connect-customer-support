const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Company = require('../models/company.model');

describe('Company Controller', () => {
  beforeAll(async () => {
    // Connect to a test database
    const testDbUrl = 'mongodb://localhost:27017/test';
    await mongoose.connect(testDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Disconnect from the test database
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Clear the Company collection before each test
    await Company.deleteMany({});
  });

  describe('POST /api/companies', () => {
    it('should create a new company', async () => {
      const companyData = {
        name: 'Test Company',
        address: '123 Test Street',
        active: true,
      };

      const response = await request(app)
        .post('/api/companies')
        .send(companyData)
        .expect(201);

      expect(response.body).toHaveProperty('_id');
      expect(response.body.name).toBe(companyData.name);
      expect(response.body.address).toBe(companyData.address);
      expect(response.body.active).toBe(companyData.active);
    });

    it('should return 400 if name or address is missing', async () => {
      const companyData = {
        address: '123 Test Street',
        active: true,
      };

      const response = await request(app)
        .post('/api/companies')
        .send(companyData)
        .expect(400);

      expect(response.body).toHaveProperty('message', 'Name and address are required.');
    });
  });
});