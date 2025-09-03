import { Injectable } from '@nestjs/common';
import { ProductDto } from './dto/create.expense.dto';

@Injectable()
export class ExpensesService {
  private products: ProductDto[] = [];

  getAllProducts(filters?: { price?: number; category?: string }) {
    let result = this.products;

    if (typeof filters?.price === 'number') {
      result = result.filter((p) => p.price > (filters.price as number));
    }

    if (filters?.category) {
      result = result.filter(
        (p) => p.category.toLowerCase() === filters.category!.toLowerCase(),
      );
    }

    return result;
  }

  getProductById(id: string) {
    return this.products.find((p) => p.id === id);
  }

  createProduct(data: Omit<ProductDto, 'id' | 'createdAt'>) {
    const newProduct: ProductDto = {
      id: Math.random().toString(),
      createdAt: new Date(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  updateProduct(id: string, updateData: Partial<ProductDto>) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) return null;

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updateData,
    };

    return this.products[productIndex];
  }

  deleteProduct(id: string) {
    this.products = this.products.filter((p) => p.id !== id);
    return 'Product deleted';
  }
}
