import SerialPort from 'serialport';

export default class SerialPortClass {
  port: SerialPort;
  onConnect: () => void;
  onDisconnect: () => void;
  onError: (errorMessage: string) => void;

  connect(portName: string, baudRate = 57600): SerialPort | void {
    if (!portName) {
      return this.onError('No port selected');
    }

    this.port = new SerialPort(portName, { baudRate }, this.handleError);

    this.port.on('open', () => {
      console.log('Port opened');
      this.onConnect();
    });

    this.port.on('close', () => {
      console.log('Port closed');
      this.onDisconnect();
    });

    this.port.on('error', this.handleError);

    return this.port;
  }

  disconnect(): void {
    this.port.close(this.handleError);
  }

  static async updatePortList(): Promise<SerialPort.PortInfo[]> {
    return await SerialPort.list();
  }

  handleError = (error: Error): void => {
    if (error) {
      this.onError(error.message);
      console.error(error);
    }
  };
}

export type IPortList = SerialPort.PortInfo;
