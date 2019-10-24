import { Button, Grid, Icon, Paper, Snackbar } from '@material-ui/core';
import { OpenDialogOptions, remote, SaveDialogOptions } from 'electron';
import * as fs from 'fs';
import * as React from 'react';

import QczekClass, { DEFAULT_MODULE_PARAMS, tModuleParams } from './components/QczekClass';
import SerialPortClass from './components/SerialPortClass';
import InfoColumn from './containers/InfoColumn';
import { ParamColumn } from './containers/ParamColumn';
import SerialColumn from './containers/SerialColumn';

const { dialog } = remote;
const styles = {
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: '5px 15px',
    margin: '5px 15px',
    height: '100%',
  },
};

interface tAppState {
  isPortOpened: boolean;
  snackBarOpen: boolean;
  snackBarText: string;
  moduleParams: tModuleParams;
}

export class App extends React.Component<null, tAppState> {
  state: tAppState = {
    isPortOpened: false,
    snackBarOpen: false,
    snackBarText: '',
    moduleParams: DEFAULT_MODULE_PARAMS,
  };
  port: SerialPortClass;
  qczek: QczekClass;

  constructor(props: null) {
    super(props);

    this.port = new SerialPortClass();
    this.port.onConnect = () => this.setState({ isPortOpened: true });
    this.port.onDisconnect = () => this.setState({ isPortOpened: false });
    this.port.onError = (errorMessage: string) => this.showMessageToUser(errorMessage);
  }

  connect(port: string) {
    const serial = this.port.connect(port);
    if (!serial) {
      return;
    }

    this.qczek = new QczekClass(serial);
    this.qczek.onParams = (moduleParams: Partial<tModuleParams>) =>
      this.setState({
        moduleParams: {
          ...this.state.moduleParams,
          ...moduleParams,
        },
      });
    this.qczek.onError = (errorMessage: string) => this.showMessageToUser(errorMessage);
  }

  showMessageToUser = (text: string) => {
    this.setState({ snackBarOpen: true, snackBarText: text });
  };

  handleSnackBarClose = () => {
    this.setState({ snackBarOpen: false });
  };

  onExportParamsClick = () => {
    if (!this.state.moduleParams) {
      return;
    }

    const options = {
      title: 'Save params to file:',
      filters: [{ name: 'text', extensions: ['txt'] }],
      defaultPath: localStorage.getItem('fileNamePath'),
    } as SaveDialogOptions;

    dialog.showSaveDialog(options, (fileName: string) => {
      if (fileName === undefined) {
        return;
      }

      localStorage.setItem('fileNamePath', fileName);

      const text = Object.keys(this.state.moduleParams).map(key =>
        QczekClass.generateParamLine(key, this.state.moduleParams[key]),
      );

      fs.writeFile(fileName, text.filter(String).join('\n'), (err: Error) => {
        if (err) {
          dialog.showErrorBox('File Save Error', err.message);
        } else {
          dialog.showMessageBox({ message: 'The file has been saved!', buttons: ['OK'] });
        }
      });
    });
  };

  onImportParamsClick = () => {
    const options = {
      title: 'Get params from file:',
      filters: [{ name: 'text', extensions: ['txt'] }],
      properties: ['openFile'],
      defaultPath: localStorage.getItem('fileNamePath'),
    } as OpenDialogOptions;

    dialog.showOpenDialog(options, (filePaths: string[]) => {
      if (!filePaths || filePaths.length !== 1) {
        return;
      }

      localStorage.setItem('fileNamePath', filePaths[0]);

      fs.readFile(filePaths[0], (err: Error, data: Buffer) => {
        if (err) {
          dialog.showErrorBox('File Read Error', err.message);
        } else {
          const newParams = QczekClass.parseParamsFromFile(data.toString());
          this.setState({
            moduleParams: {
              ...this.state.moduleParams,
              ...newParams,
              isMaster:
                newParams && newParams.version ? newParams.version.startsWith('QczekLRS_M') : false,
            },
          });
        }
      });
    });
  };

  componentWillUnmount() {
    this.port.disconnect();
  }

  render() {
    return (
      <div style={styles.root}>
        <Grid container spacing={2}>
          <Grid item xs={7} sm={7}>
            <Paper
              style={{ ...styles.paper, height: 230, overflowX: 'hidden', overflowY: 'auto' }}
              elevation={2}
            >
              <InfoColumn moduleParams={this.state.moduleParams} />
            </Paper>
          </Grid>
          <Grid item xs={5} sm={5}>
            <Paper style={{ ...styles.paper, height: 230 }} elevation={2}>
              <SerialColumn
                isPortOpened={this.state.isPortOpened}
                onConnectPortClick={port => this.connect(port)}
                onDisconnectPortClick={() => this.port.disconnect()}
                onReadParamsClick={() => this.qczek.readParams()}
                onSaveParamsClick={() => this.qczek.saveParams(this.state.moduleParams)}
                onExportParamsClick={this.onExportParamsClick}
                onImportParamsClick={this.onImportParamsClick}
                onUpdatePortListClick={SerialPortClass.updatePortList}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Paper
              style={{ ...styles.paper, height: 330, overflowX: 'hidden', overflowY: 'auto' }}
              elevation={2}
            >
              <ParamColumn
                moduleParams={this.state.moduleParams}
                onParamsChanged={moduleParams => this.setState({ moduleParams })}
              />
            </Paper>
          </Grid>
        </Grid>
        <Snackbar
          autoHideDuration={4000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={this.state.snackBarOpen}
          onClose={this.handleSnackBarClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          action={
            <Button color="inherit" size="small" onClick={this.handleSnackBarClose}>
              <Icon>clear</Icon>
            </Button>
          }
          message={<span id="message-id">{this.state.snackBarText}</span>}
        />
      </div>
    );
  }
}
