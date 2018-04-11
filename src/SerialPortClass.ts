import * as SerialPort from 'serialport';
import {IModuleVersion} from './app';

export default class SerialPortClass {
    port: SerialPort;
    buffer: Buffer;
    onConnect: () => void;
    onDisconnect: () => void;
    onError: (errorMessage: string) => void;
    onVersion: (version: IModuleVersion) => void;

    connect(portName: string) {
        if (!portName) {
            return this.onError('No port selected');
        }

        this.port = new SerialPort(portName, {baudRate: 9600}, this.handleError);

        this.port.on('open', () => {
            console.log('Port opened');
            this.onConnect();
            this.readVersion();
        });

        this.port.on('close', () => {
            console.log('Port closed');
            this.onDisconnect();
        });

        this.port.on('error', this.handleError);

        this.port.on('data', (data: Buffer) => {
            this.buffer = this.buffer ? Buffer.concat([this.buffer, data]) : data;

            const firstByte = this.buffer.toString('hex', 0, 1);
            //The module returns the version information
            if (firstByte === 'c3' && this.buffer.length === 4) {
                this.onVersion({
                    name: this.buffer.toString('hex', 1, 2),
                    version: this.buffer.toString('hex', 2, 3),
                    variant: this.buffer.toString('hex', 3, 4),
                });

                delete this.buffer;
            }

            //The module returns the saved parameters
            if (firstByte === 'c3' && this.buffer.length === 6) {
                console.log('Module params', this.buffer.toString('hex'));

                delete this.buffer;
            }
            console.log('this.buffer', this.buffer);

        });
    }

    disconnect() {
        this.port.close(this.handleError);
    }

    handleError(error: Error) {
        if (error) {
            this.onError(error.message);
            console.error(error);
        }
    }

    readVersion() {
        this.port.write([0xC3, 0xC3, 0xC3], this.handleError);
    }

    readParams() {
        this.port.write([0xC1, 0xC1, 0xC1], this.handleError);
    }

    static async updatePortList() {
        return await SerialPort.list();
    }
}

export interface IPortList {
    comName: string;
    manufacturer: string;
    serialNumber: string;
    pnpId: string;
    locationId: string;
    productId: string;
    vendorId: string;
}