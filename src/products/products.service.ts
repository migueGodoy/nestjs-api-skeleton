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
    return this.getProductAndIndex(id)[0];
  }

  update(id: string, title: string, description: string, price: number) {
    const [product, index] = this.getProductAndIndex(id);
    const updatedProduct: Product = { ...product };

    if (title) {
      updatedProduct.title = title;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (price) {
      updatedProduct.price = price;
    }
    this.products[index] = updatedProduct;
  }

  delete(id: string): void {
    const [, index] = this.getProductAndIndex(id);

    this.products.splice(index, 1);
  }

  private getProductAndIndex(id: string): [Product, number] {
    const index = this.products.findIndex(
      (product: Product) => product.id === id,
    );
    const product = this.products[index];

    if (!product) {
      throw new NotFoundException(`Could not find product ${id}`);
    }
    return [product, index];
  }
}
