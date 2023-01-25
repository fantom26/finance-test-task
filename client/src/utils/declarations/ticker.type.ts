export enum TickerEvent {
  start = "start",
}

export interface ITickerApi {
  ticker: string;
  exchange: string;
  price: number;
  change: number;
  change_percent: number;
  dividend: number;
  yield: number;
  last_trade_time: string;
}

export interface ITicker extends ITickerApi {
  incremented: boolean;
  showned: boolean;
}
