import { Test } from '@nestjs/testing';
import { ProductsService } from '../../src/products/products.service';
import { ProductsController } from '../../src/products/products.controller';
import { Product } from '../../src/products/product.model';
import { v4 as uuidv4 } from 'uuid';

describe('CatsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [ProductsController],
        providers: [ProductsService],
      }).compile();

    productsService = moduleRef.get<ProductsService>(ProductsService);
    productsController = moduleRef.get<ProductsController>(ProductsController);
  });

  describe('Get All', () => {
    it('should return an array of products', async () => {
      const product = new Product('1', 'test','description',256)
      const result = [product];
      jest.spyOn(productsService, 'getAll').mockImplementation(() => result);

      expect(await productsController.getAllProducts()).toBe(result);
    });
  });

  describe('Insertar nuevo producto', () => {
    it('should return an array of cats', async () => {
      const finalId = "237bdb26-b452-4bd4-8270-1111c65aab25";
      jest.spyOn(productsService, 'insert').mockImplementation(() => finalId);
      const idProduct = productsController.addProduct('test','description',250);
      expect(idProduct.id).toBe(finalId);
    });
  });

  describe('Get by id', () => {
    it('should return an array of cats', async () => {
      const finalId = "237bdb26-b452-4bd4-8270-1111c65aab25";
      const product = new Product(finalId, 'test','description',256)
      jest.spyOn(productsService, 'find').mockImplementation(() => product);
      const resultProduct = productsController.findProduct(finalId);
      expect(resultProduct).toBe(product);
    });
  });

  describe('Patch product', () => {
    it('should patch a product', async () => {
      const productidUpdated = "237bdb26-b452-4bd4-8270-1111c65aab30";
      const productUpdated = new Product(productidUpdated, 'test','description',256);
      jest.spyOn(productsService, 'update').mockImplementation();
      expect(productsController.updateProduct(
        productidUpdated,
        productUpdated.title,
        productUpdated.description,
        productUpdated.price
        )).toBe(undefined);
    });
  });

  describe('Delete product', () => {
    it('Should delete product', async () => {
      const productidUpdated = "237bdb26-b452-4bd4-8270-1111c65aab30";
      const productUpdated = new Product(productidUpdated, 'test','description',256);
      jest.spyOn(productsService, 'delete').mockImplementation();
      expect(productsController.deleteProduct(productidUpdated)).toBe(undefined);
    });
  });
});