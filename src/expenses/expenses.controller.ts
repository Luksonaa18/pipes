import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ExpensesServicePipe } from './pipes/toUpperCase.pipe';
import { ExpenseServiceToLowerCase } from './pipes/toLowerCase.pipe';
import { ExpensesDto } from './dto/create.expense.dto';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}
  @Get('/all')
  getAllExpenses() {
    return this.expensesService.getAllExpenses();
  }
  @Get('/:role')
  getExpenseByRole(@Param('role', ExpensesServicePipe) role: string) {
    return `'expense by role ${role}'`;
  }
  @Get('/roles/:role')
  getExpenseByRoles(@Param('role', ExpenseServiceToLowerCase) role: string) {
    return `'expense by role ${role}'`;
  }
  @Post('/new')
  createExpense(@Body() body: ExpensesDto) {
    return this.expensesService.createExpense(body);
  }
  @Delete('/:id')
  deleteExpense(@Param('id') id: string) {
    return this.expensesService.deleteExpense(id);
  }
  @Get('/find/:id')
  findExpenseById(@Param('id') id: string) {
    return this.expensesService.findExpenseById(id);
  }
}
