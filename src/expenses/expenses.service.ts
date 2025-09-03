import { Injectable } from '@nestjs/common';
import { ExpensesDto } from './dto/create.expense.dto';

@Injectable()
export class ExpensesService {
  private expenses: ExpensesDto[] = [];
  getAllExpenses() {
    return this.expenses;
  }
  createExpense(newExpense: ExpensesDto) {
    this.expenses.push(newExpense);
    return 'expense created';
  }
  deleteExpense(id: string) {
    this.expenses = this.expenses.filter((expense) => expense.id !== id);
    return 'expense deleted';
  }
  findExpenseById(id: string) {
    return this.expenses.find((expense) => expense.id === id);
  }
}
