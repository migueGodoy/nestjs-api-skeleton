import { TestingModule, Test } from "@nestjs/testing";
import { ProductsService } from "../../src/products/products.service";

describe('Product Service', () => {
    let productService: ProductsService;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ProductsService]
        }).compile();

        productService = module.get<ProductsService>(ProductsService);
    });

    it('Insert', () => {
         let newProduct = {
            title: 'Titulo Test',
            description: 'Description example',
            price:25000
         }

         let id = productService.insert(newProduct.title, newProduct. description, newProduct.price);
         expect(id).toBeDefined();
    })

    it('GetAll', () => {
        let newProduct = {
            title: 'Titulo Test',
            description: 'Description example',
            price:25000
         }

         let id = productService.insert(newProduct.title, newProduct. description, newProduct.price);
         let id2 = productService.insert(newProduct.title, newProduct. description, newProduct.price);
        let allProducts = productService.getAll();

        expect(allProducts).toHaveLength(2);
   })

   it('Find', () => {

    let newProduct = {
        title: 'Titulo Test',
        description: 'Description example',
        price:25000
     }

     let id = productService.insert(newProduct.title, newProduct. description, newProduct.price);

     let productFound = productService.find(id);

     expect(productFound.title).toBe(newProduct.title)

   })

   it('Updated', () => {
    let newProduct = {
        title: 'Titulo Test',
        description: 'Description example',
        price:25000
     }
     let updateProduct = {
        title: 'Titulo updated',
        description: 'Description example updated',
        price:1800
     }

     let id = productService.insert(newProduct.title, newProduct. description, newProduct.price);
     expect(productService.update(id, updateProduct.title, null, updateProduct.price)).toHaveBeenCalled;
   })

   it('Delete ', () => {
    let newProduct = {
        title: 'Titulo Test',
        description: 'Description example',
        price:25000
     }

     let id = productService.insert(newProduct.title, newProduct. description, newProduct.price);
    expect(productService.delete(id)).toHaveBeenCalled;

   })

   it('GetProductAndIndex ', () => {
    let newProduct = {
        title: 'Titulo Test',
        description: 'Description example',
        price:25000
     }

     let id = productService.insert(newProduct.title, newProduct. description, newProduct.price);
     let result = productService.getProductAndIndex(id);
     expect(result[0].title).toBe(newProduct.title);
     expect(result[1]).toBe(0);

   })

})