import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ProductDto } from './dto/create.expense.dto';
import { ValidatePricePipe } from './pipes/price-validate.pipe';

@Controller('products')
export class ExpensesController {
  constructor(private readonly productsService: ExpensesService) {}

  @Get()
  getAllProducts(
    @Query('price', ValidatePricePipe) price = 0,
    @Query('category') category = '',
  ) {
    return this.productsService.getAllProducts(+price, category);
  }
  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @Post()
  createProduct(@Body() body: Omit<ProductDto, 'id' | 'createdAt'>) {
    return this.productsService.createProduct(body);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() body: Partial<ProductDto>) {
    return this.productsService.updateProduct(id, body);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
