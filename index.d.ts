import * as http from 'http';
import { Socket } from 'net';
import { Url } from 'url';

export interface IPrimusParser {
  encoder: (data: any, fn: (error: Error, response: any) => void) => void;
  decoder: (data: any, fn: (error: Error, response: any) => void) => void;
}
export interface SocketConstructor {
  new (url: string, options?: IPrimusOptions): Socket
}
export declare class Primus {
  constructor(server: http.Server, options?: IPrimusOptions);
  authorize(req: http.IncomingMessage, done: () => void): void;
  before(event: string, cb: () => void): void;
  before(event: string, cb: (req: http.IncomingMessage, res: http.ServerResponse, next: any) => void): void;
  before(event: string, cb: (req: http.IncomingMessage, res: http.ServerResponse) => void): void;
  destroy(): void;
  disable(name: string): void;
  emits(event: string, parser: (next: any, parser: any) => void): void; // might be better tied to a TSD for https://github.com/primus/emits
  enable(name: string): void;
  end(): void;
  forEach(cb: (spark: ISpark, id: string, connections: any) => void): void;
  id(cb: (id: any) => void): void;
  library(): string;
  on(event: string, cb: (spark: ISpark) => void): void;
  open(): void;
  remove(name: string): void;
  socket: Socket;
  static createSocket(options?: IPrimusOptions): SocketConstructor;
  static createServer(onConnection: (spark:ISpark) => void, options?: IPrimusOptions):Primus;
  transform(event: string, cb: (packet: any) => void): void;
  transforms(event: string, parser: (packet: any, next: any) => void): void; // might be better tied to a TSD for https://github.com/primus/emits
  use(name: string, plugin: Object): void;
  write(data: any): void;
  plugin(name: string, module: any): void;
  save(filename: string): void;

  // querystringify
  querystring(query: string): object | any;
  querystringify(query: object | any): string;
}

export interface IPrimusOptions {
  authorization?: Function;
  compression?: boolean;
  credentials?: boolean;
  exposed?: boolean;
  global?: string;
  headers?: boolean;
  maxAge?: string;
  methods?: string;
  origins?: string; // for client
  port?:number; // for server
  parser?: 'JSON' | 'binary' | 'EJSON' | IPrimusParser;
  pathname?: string;
  plugin?: any;
  strategy?: any;
  timeout?: number;
  transformer?: string;
  [key: string]: any;
  pingInterval?: number;
  maxLength?: number;
  transport?: any;
  idGenerator?: Function;
}

export interface IPrimusConnectOptions {
  timeout?: number;
  pingTimeout?: number;
  strategy?: string | ['online' | 'timeout' | 'disconnect'];
  manual?: boolean;
  websockets?: boolean;
  network?: boolean;
  transport?: any;
  queueSize?: any;
  reconnect?: {
    max?: any;
    min?: number;
    retries?: number;
    'reconnect timeout': number;
    factor?: number;
  };
}

export type SparkRequest = http.IncomingMessage & http.ClientRequest & {
  upgrade: boolean
  client: Socket
  parser: null | any
  uri: Url
  query: object | any
  originalUrl: string
}

export interface ISpark {
  headers: any[];
  address: string;
  query: string;
  id: string;
  request: SparkRequest;

  write(data: any): void;
  end(data?: any, options?: Object): void;
  emits(event: string, parser: (next: any, parser: any) => void): void; // might be better tied to a TSD for https://github.com/primus/emits
  on(event: string, cb: (data: any) => void): void;
}
