import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Product } from './product.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProduct(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ): { id: string } {
    const id = this.productsService.insert(title, description, price);
    return { id };
  }

  @Get()
  getAllProducts(): Product[] {
    return this.productsService.getAll();
  }

  @Get(':id')
  findProduct(@Param('id') id: string): Product {
    return this.productsService.find(id);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    this.productsService.update(id, title, description, price);
    return;
  }
}
