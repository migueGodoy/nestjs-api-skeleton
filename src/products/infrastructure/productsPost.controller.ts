import { Body, Controller, Post } from '@nestjs/common';
import { ProductsService } from '../application/products.service';

@Controller('products')
export class ProductsPostController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    const id = await this.productsService.insert(title, description, price);
    return { id };
  }
}
