/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('MetricsController (e2e)', () => {
  let app: INestApplication;
  let plantId: number;
  let inverterId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();

    // Seed a plant
    const plantRes = await request(app.getHttpServer())
      .post('/plants')
      .send({ name: 'E2E Plant', localization: 'Test City' });
    plantId = plantRes.body.id;

    // Seed an inverter
    const invRes = await request(app.getHttpServer())
      .post('/inverters')
      .send({ name: 'E2E Inv', model: 'E2E-1', plantId });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    inverterId = invRes.body.id;

    // Seed readings over two days
    await request(app.getHttpServer())
      .post('/metrics/readings')
      .send({ timestamp: '2025-05-01T10:00:00Z', power: 100, temperature: 20, inverterId });
    await request(app.getHttpServer())
      .post('/metrics/readings')
      .send({ timestamp: '2025-05-01T14:00:00Z', power: 150, temperature: 22, inverterId });
    await request(app.getHttpServer())
      .post('/metrics/readings')
      .send({ timestamp: '2025-05-02T12:00:00Z', power: 200, temperature: 25, inverterId });
  });

  afterAll(async () => {
    await app.close();
  });

  it('/metrics/max-power GET', async () => {
    const res = await request(app.getHttpServer())
      .get(`/metrics/max-power?inverter_id=${inverterId}&start_date=2025-05-01&end_date=2025-05-02`)
      .expect(200);

    expect(res.body).toEqual(
      expect.arrayContaining([
        { date: '2025-05-01', maxPower: '150' },
        { date: '2025-05-02', maxPower: '200' },
      ])
    );
  });

  it('/metrics/avg-temperature GET', async () => {
    const res = await request(app.getHttpServer())
      .get(`/metrics/avg-temperature?inverter_id=${inverterId}&start_date=2025-05-01&end_date=2025-05-02`)
      .expect(200);

    expect(res.body).toEqual(
      expect.arrayContaining([
        { date: '2025-05-01', avgTemperature: '21' }, // (20+22)/2
        { date: '2025-05-02', avgTemperature: '25' },
      ])
    );
  });

  it('/metrics/generation/plant GET', async () => {
    const res = await request(app.getHttpServer())
      .get(`/metrics/generation/plant?plant_id=${plantId}&start_date=2025-05-01&end_date=2025-05-02`)
      .expect(200);

    expect(res.body).toEqual(
      expect.arrayContaining([
        { date: '2025-05-01', energy: '250' }, // sum of powers
        { date: '2025-05-02', energy: '200' },
      ])
    );
  });

  it('/metrics/generation/inverter GET', async () => {
    const res = await request(app.getHttpServer())
      .get(`/metrics/generation/inverter?inverter_id=${inverterId}&start_date=2025-05-01&end_date=2025-05-02`)
      .expect(200);

    expect(res.body).toEqual(
      expect.arrayContaining([
        { date: '2025-05-01', energy: '250' },
        { date: '2025-05-02', energy: '200' },
      ])
    );
  });
});