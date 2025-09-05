import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpensesModule } from './expenses/expenses.module';
import { ExpenseMiddleware } from './expense/expense.middleware';
import { AbdiMiddleware } from './abdi/abdi.middleware';

@Module({
  imports: [ExpensesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ExpenseMiddleware, AbdiMiddleware).forRoutes('*');
  }
}
