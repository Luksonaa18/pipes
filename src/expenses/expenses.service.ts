import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductDto } from './dto/create.expense.dto';

@Injectable()
export class ExpensesService {
  private products: ProductDto[] = [];

  getAllProducts(price: number, category?: string) {
    if (price <= 300) {
      throw new BadRequestException('Price must be greater than 300');
    }

    let result = this.products.filter((p) => p.price > 300);

    if (category) {
      result = result.filter((p) => p.category === category);
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
  filterProductsByRole(role: string) {
    if (role === 'admin') {
      return this.products;
    }
  }
}
