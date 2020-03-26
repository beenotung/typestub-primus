export interface PrimusEmitter {
    send(event: string, data: any, ack?: (data: any) => void): void

    on(event: string, cb: (data: any, ack?: (data: any) => void) => void): void
}
