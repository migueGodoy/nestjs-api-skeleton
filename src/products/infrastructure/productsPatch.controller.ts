import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ProductsService } from '../products.service';

@Controller('products')
export class ProductsPatchController {
  constructor(private readonly productsService: ProductsService) {}

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    await this.productsService.update(id, title, description, price);
  }
}
