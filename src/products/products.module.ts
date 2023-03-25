import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './domain/product.model';
import { ProductsPostController } from './infrastructure/productsPost.controller';
import { ProductsService } from './application/products.service';
import { ProductsGetController } from './infrastructure/productsGet.controller';
import { ProductsFindController } from './infrastructure/productsFind.controller';
import { ProductsPatchController } from './infrastructure/productsPatch.controller';
import { ProductsDeleteController } from './infrastructure/productsDelete.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  controllers: [
    ProductsPostController,
    ProductsGetController,
    ProductsFindController,
    ProductsPatchController,
    ProductsDeleteController,
  ],
  providers: [ProductsService],
})
export class ProductsModule {}
