import { Module } from '@nestjs/common';
import { CurrenciesModule } from './currencies/currencies.module';
import { ExchangesModule } from './exchanges/exchanges.module';
import { GateService } from './exchanges/gate/gate.service';

@Module({
  imports: [CurrenciesModule, ExchangesModule],
  controllers: [],
  providers: [GateService],
})
export class AppModule {}
