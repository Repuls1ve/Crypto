import { Controller } from '@nestjs/common';
import { ExchangesService } from 'src/exchanges/exchanges.service';

@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly exchanges: ExchangesService) {}
}
