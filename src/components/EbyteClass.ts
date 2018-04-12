import * as SerialPort from 'serialport';

export interface IModuleVersion {
    id: string;
    version: number;
    bytes: string;
}

export interface IModuleParams {
    uartRate: string;
    parity: string;
    airRate: string;
}

export default class EbyteClass {
    port: SerialPort;
    buffer: Buffer;
    onError: (errorMessage: string) => void;

    onVersion: (version: IModuleVersion) => void;
    onParams: (params: IModuleParams) => void;

    constructor(port: SerialPort) {
        this.port = port;

        this.port.on('open', () => this.readVersion());
        this.port.on('data', (data: Buffer) => this.onData(data));
    }

    readVersion() {
        this.port.write([0xC3, 0xC3, 0xC3], this.handleError);
    }

    readParams() {
        this.port.write([0xC1, 0xC1, 0xC1], this.handleError);
    }

    onData(data: Buffer) {
        this.buffer = this.buffer ? Buffer.concat([this.buffer, data]) : data;

        const firstByte = this.buffer.toString('hex', 0, 1);
        //The module returns the version information
        if (firstByte === 'c3' && this.buffer && this.buffer.length === 4) {
            this.onVersion({
                id: 'E' + this.buffer.toString('hex', 1, 2),
                version: parseInt(this.buffer.toString('hex', 2, 3)) / 10,
                bytes: EbyteClass.formatString(this.buffer.toString('hex'))
            });

            delete this.buffer;
        }

        //The module returns the saved parameters
        if (firstByte === 'c3' && this.buffer && this.buffer.length === 6) {
            this.onParams({
                uartRate: this.buffer.toString('hex', 1, 2),
                parity: this.buffer.toString('hex', 2, 3),
                airRate: this.buffer.toString('hex', 3, 4),
            });
            console.log('Module params', this.buffer.toString('hex'));

            delete this.buffer;
        }
        console.log('this.buffer', this.buffer);
    }

    static formatString(bytes: string) {
        return bytes.replace(/(\S{2})/g, '$1 ').toLocaleUpperCase();
    }

    handleError = (error: Error) => {
        if (error) {
            this.onError(error.message);
            console.error(error);
        }
    }
}