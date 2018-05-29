import * as SerialPort from 'serialport';

export interface IModuleParams {
    version?: string;
    features?: string;
    isMaster: boolean;
    pCode: number;
    noOfCPPMChnls: number;
    pwrSelChnl?: number;
    txMinPwr: number;
    txMidPwr: number;
    txMaxPwr: number;
    serPortSpd: number;
    serMode: number;
    fr0: number;
    fr1: number;
    fr2: number;
    fr3: number;
    fr4: number;
    fr5: number;
    fr6: number;
    fr7: number;
    proto: number;
    devThrs: number;
    sTelFrmR: number;
    lTelFrmR: number;
    racem: number;
    rssiChnl: number;
    rssiT: number;
    timeToFS?: number;
    wdTime?: number;
    fsDontT?: number;
    lbeep?: number;
    m0PWMChn?: number;
    m1PWMChn?: number;
    silent?: number;
    fs00?: number;
    fs01?: number;
    fs02?: number;
    fs03?: number;
    fs04?: number;
    fs05?: number;
    fs06?: number;
    fs07?: number;
    fs08?: number;
    fs09?: number;
    fs010?: number;
    fs011?: number;
    fs012?: number;
    fs013?: number;
    fs014?: number;
    fs015?: number;
}

export const DEFAULT_MODULE_PARAMS: IModuleParams = {
    isMaster: true,
    pCode: 0,
    noOfCPPMChnls: 16,
    pwrSelChnl: 0,
    rssiChnl: 0,
    proto: 0,
    serPortSpd: 57600,
    serMode: 0,
    rssiT: 0,
    txMinPwr: 0,
    txMidPwr: 4,
    txMaxPwr: 15,
    devThrs: 20,
    sTelFrmR: 1,
    lTelFrmR: 6,
    racem: 0,
    fr0: 0,
    fr1: 0,
    fr2: 0,
    fr3: 0,
    fr4: 0,
    fr5: 0,
    fr6: 0,
    fr7: 0,
};

export default class QczekClass {
    port: SerialPort;
    onError: (errorMessage: string) => void;
    onParams: (params: Partial<IModuleParams>) => void;

    constructor(port: SerialPort) {
        this.port = port;

        this.port.on('open', () => this.readParams());

        const parser = port.pipe(new SerialPort.parsers.Readline({delimiter: '\n'}));
        parser.on('data', (data: string) => this.onData(data));
    }

    readParams() {
        this.port.write(QczekClass.alignCommand('{ParGetAll}'), this.handleError);
    }

    saveParams(params: IModuleParams) {
        if (!params) {
            return;
        }

        Object.keys(params).forEach((key) => {
            const line = QczekClass.generateParamLine(key, params[key]);
            if (!line || key === 'version' || key === 'features' || key === 'isMaster') {
                return;
            }

            console.log('Write to port', line, line.length);

            this.port.write(QczekClass.alignCommand(line), this.handleError);
        });

        this.port.write(QczekClass.alignCommand('{ParSave}'), this.handleError);
    }

    /**
     * Command that we send to serial should have minimum 10 char
     * Is because DMA buffer is processed every 10 chars
     *
     * If we have 22 char in command, we should send minimum 30
     */
    static alignCommand(command: string): string {
        return command.padEnd(30);
    }

    onData(data: string) {
        if (!data) {
            console.error('No data in response');
            return;
        }

        console.log('data', data);

        if (data.includes('{Msg S Param set}')) {
            console.log('Param saved');
            return;
        }

        const parsedLine = QczekClass.parseParamLine(data);
        if (parsedLine && parsedLine.version) {
            this.onParams({isMaster: parsedLine.version.startsWith('QczekLRS_M')});
        }

        return this.onParams(parsedLine);
    }

    handleError = (error: Error) => {
        if (error) {
            this.onError(error.message);
            console.error(error);
        }
    }

    static parseParamsFromFile(fileContent: string): IModuleParams {
        const lines = fileContent.split('\n');
        let params: IModuleParams = DEFAULT_MODULE_PARAMS;

        lines.forEach((line) => {
            params = {
                ...params,
                ...QczekClass.parseParamLine(line)
            };
        });

        return params;
    }

    static parseParamLine(line: string): Partial<IModuleParams> {
        if (!line) {
            return {};
        }

        const param = line.match(/\{(ParSetStr|ParSetInt) (.*?) (.*?)\}/);
        if (!param || param.length !== 4) {
            console.error('Param parsing error', param);
            return {};
        }

        const paramNameShort = param[2];
        let paramValue = !isNaN(parseInt(param[3])) ? parseInt(param[3]) : param[3];

        let paramName = paramNameShort;
        if (paramNameShort === 'v.') {
            paramName = 'version';
        }
        if (paramNameShort === 'f.') {
            paramName = 'features';
        }
        // show frequency to user divided by 1000000
        if (paramNameShort.startsWith('fr')) {
            paramValue = +paramValue / 1000000;
        }
        // It’s set in tenths of second - show to user in seconds
        if (paramNameShort === 'timeToFS') {
            paramValue = +paramValue / 10;
        }

        return {[paramName]: paramValue};
    }

    static generateParamLine(key: string, value: string | number): string {
        let paramSet = 'ParSetInt';
        let paramName = key;
        let paramValue = value;

        if (key === 'version') {
            paramSet = `ParSetStr`;
            paramName = `v.`;
        }

        if (key === 'features') {
            paramSet = `ParSetStr`;
            paramName = `f.`;
        }

        if (paramName.startsWith('fr')) {
            paramValue = +paramValue * 1000000;
        }

        if (paramName === 'timeToFS') {
            paramValue = +paramValue * 10;
        }

        if (paramName === 'isMaster') {
            return '';
        }

        return `{${paramSet} ${paramName} ${paramValue}}`;
    }
}