import { Controller, Get } from '@nestjs/common';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Controller('products')
export class ProductsGetController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    const products = await this.productsService.getAll();
    return products;
  }
}
