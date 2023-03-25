import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from '../application/products.service';

@Controller('products')
export class ProductsFindController {
  constructor(private readonly productsService: ProductsService) {}

  @Get(':id')
  findProduct(@Param('id') id: string) {
    return this.productsService.find(id);
  }
}
