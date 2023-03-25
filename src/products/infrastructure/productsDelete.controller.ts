import { Controller, Delete, Param } from '@nestjs/common';
import { ProductsService } from '../products.service';

@Controller('products')
export class ProductsDeleteController {
  constructor(private readonly productsService: ProductsService) {}

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<void> {
    await this.productsService.delete(id);
  }
}
