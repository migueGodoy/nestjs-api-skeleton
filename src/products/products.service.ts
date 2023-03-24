import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  products: Product[] = [];

  insert(title: string, description: string, price: number): string {
    const id = uuidv4();
    const product = new Product(id, title, description, price);
    this.products.push(product);
    return id;
  }

  getAll(): Product[] {
    return [...this.products];
  }

  find(id: string): Product {
    const product = this.products.find(
      (product: Product) => product.getId() === id,
    );

    if (!product) {
      throw new NotFoundException(`Could not find product ${id}`);
    }
    return product;
  }
}
