import { Module } from '@nestjs/common';
import { CurrenciesModule } from './currencies/currencies.module';
import { ExchangesModule } from './exchanges/exchanges.module';

@Module({
  imports: [CurrenciesModule, ExchangesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
