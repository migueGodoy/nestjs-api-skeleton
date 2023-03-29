import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsModule } from "../../src/products/products.module";
import * as request from 'supertest';

describe('AppController (e2e)', () => {
    let app: INestApplication;
    let id;
  
    beforeEach(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [ProductsModule],
      }).compile();
  
      app = moduleFixture.createNestApplication();
      await app.init();
    });
  
    it('/ (GET)', async () => {
      return request(app.getHttpServer())
        .get('/products')
        .expect(200);
    });

    it('/ (post)', async () => {
      const result = await request(app.getHttpServer())
        .post('/products')
        .send({
          title: 'Product title',
          description: 'Description',
          price: 25000
        })
        .expect(201);
        
    });

    it('/ (GET by Id)', async () => {
      const resultInsert = await request(app.getHttpServer())
        .post('/products')
        .send({
          title: 'Product title',
          description: 'Description',
          price: 25000
        })

        id = resultInsert.body.id;
      const result = await request(app.getHttpServer())
        .get('/products/' + id)
        .expect(200);

      expect(result.body.title).toBe('Product title')
    });

    it('Should by call to patch on do it who God say it', async () => {

      const resultInsert = await request(app.getHttpServer())
        .post('/products')
        .send({
          title: 'Product title',
          description: 'Description',
          price: 25000
        })

        id = resultInsert.body.id;

      await request(app.getHttpServer())
        .patch('/products/' + id)
        .send({
          title: 'Product modified',
          description: 'Description modified',
          price: 23
        })
        .expect(200);


        const resultGet = await request(app.getHttpServer())
        .get('/products/' + id)
        .expect(200);

        expect(resultGet.body.title).toBe('Product modified');
    })
  });
  