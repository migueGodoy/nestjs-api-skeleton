import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insert(title: string, description: string, price: number) {
    const product = new this.productModel({ title, description, price });
    const result = await product.save();
    return result.id as string;
  }

  async getAll(): Promise<Product[]> {
    const products: Product[] = await this.productModel.find().exec();
    return products.map((product: Product) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    })) as Product[];
  }

  async find(id: string) {
    const product = await this.getProduct(id);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  async update(id: string, title: string, description: string, price: number) {
    const product = await this.getProduct(id);

    if (title) {
      product.title = title;
    }
    if (description) {
      product.description = description;
    }
    if (price) {
      product.price = price;
    }

    product.save();
  }

  async delete(id: string): Promise<void> {
    const result = await this.productModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Could not find product ${id}`);
    }
  }

  async getProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException(`Could not find product ${id}`);
    }

    if (!product) {
      throw new NotFoundException(`Could not find product ${id}`);
    }
    return product as Product;
  }
}
