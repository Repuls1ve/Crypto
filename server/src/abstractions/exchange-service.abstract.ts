import { IPair } from '../interfaces/pairs.interface';

export abstract class ExchangeService {
  abstract getPairs(): Promise<IPair[]>
}