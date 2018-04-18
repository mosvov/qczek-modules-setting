import * as SerialPort from 'serialport';

export interface IModuleVersion {
    id: string;
    version: number;
    bytes: string;
}

export interface IModuleParams {
    baudRate: number;
    parityBit: number;
    airDataRate: number;
    address: number;
    channel: number;
    transmissionMode: number;
    txMode: number;
    ioMode: number;
    wirelessWakeUp: number;
    fecSwitch: number;
    transmissionPower: number;
    bytes: string;
    newBytes: string;
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

    saveParams(params?: string) {
        if (!params) {
            return;
        }

        const bytes = Buffer.from(params.replace(/\s/g, ''), 'hex');
        this.port.write(bytes, this.handleError);
    }

    onData(data: Buffer) {
        this.buffer = this.buffer ? Buffer.concat([this.buffer, data]) : data;

        console.log('onData', data.toString('hex'));

        const firstByte = this.buffer.toString('hex', 0, 1);
        // The module returns the version information
        if (firstByte === 'c3' && this.buffer && this.buffer.length === 4) {
            this.onVersion({
                id: 'E' + this.buffer.toString('hex', 1, 2),
                version: parseInt(this.buffer.toString('hex', 2, 3)) / 10,
                bytes: EbyteClass.formatString(this.buffer.toString('hex'))
            });
            // read params after receive version
            this.readParams();
            delete this.buffer;
        }

        // The module returns the saved parameters
        if (firstByte === 'c0' && this.buffer && this.buffer.length === 6) {
            const itemSPED = this.buffer.readUInt8(3);
            const itemCHAN = this.buffer.readUInt8(4);
            const itemOPTION = this.buffer.readUInt8(5);

            const address = this.buffer.readUInt8(2) | this.buffer.readUInt8(1) << 8;

            let parityBit = itemSPED >> 6;
            if (parityBit === 3) {
                parityBit = 0;
            }

            const baudRate = (itemSPED >> 3) & 7;

            let airDataRate = itemSPED & 7;
            if (airDataRate > 5) {
                airDataRate = 5;
            }

            const channel = 410 + (itemCHAN & 0x1f); // or 862

            const transmissionMode = itemOPTION >> 7;
            const txMode = itemOPTION >> 7;
            const ioMode = (itemOPTION >> 6) & 1;
            const wirelessWakeUp = (itemOPTION >> 3) & 7;
            const fecSwitch = (itemOPTION >> 2) & 1;
            const transmissionPower = itemOPTION & 3;

            this.onParams({
                baudRate,
                parityBit,
                airDataRate,
                channel,
                transmissionMode,
                txMode,
                ioMode,
                wirelessWakeUp,
                fecSwitch,
                transmissionPower,
                address,
                bytes: EbyteClass.formatString(this.buffer.toString('hex')),
                newBytes: ''
            });

            delete this.buffer;
        }
    }

    static formatString(bytes: string) {
        return bytes.replace(/(\S{2})/g, '$1 ').toLocaleUpperCase();
    }

    static generateNewParams(params: IModuleParams) {
        const param0 = 0xC0;
        const param1 = params.address >> 8;
        const param2 = params.address & 0xff;
        const param3 = params.airDataRate | params.baudRate << 3 | params.parityBit << 6;
        const param4 = (params.channel - 410) & 0x1f;
        const param5 = params.transmissionPower | params.fecSwitch << 2 | params.wirelessWakeUp << 3 | params.ioMode << 6 | params.txMode << 7;

        const bytes = new Buffer([param0, param1, param2, param3, param4, param5]);

        return EbyteClass.formatString(bytes.toString('hex'));
    }

    handleError = (error: Error) => {
        if (error) {
            this.onError(error.message);
            console.error(error);
        }
    }
}