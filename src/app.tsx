import * as React from 'react';
import SerialColumn from './containers/SerialColumn';
import InfoColumn from './containers/InfoColumn';
import SerialPortClass from './components/SerialPortClass';
import EbyteClass, {IModuleParams, IModuleVersion} from './components/EbyteClass';
import {Icon, Paper, Grid, Snackbar, Button} from 'material-ui';
import {ParamColumn} from './containers/ParamColumn';

import {remote} from 'electron';
import * as  fs from 'fs';

const {dialog} = remote;

interface IAppState {
    isPortOpened: boolean;
    snackBarOpen: boolean;
    snackBarText: string;
    moduleVersion?: IModuleVersion;
    moduleParams?: IModuleParams;
}

export class App extends React.Component<{}, IAppState> {
    state: IAppState = {isPortOpened: false, snackBarOpen: false, snackBarText: ''};
    port: SerialPortClass;
    ebyte: EbyteClass;

    constructor(props: any) {
        super(props);

        this.port = new SerialPortClass();
        this.port.onConnect = () => this.setState({isPortOpened: true});
        this.port.onDisconnect = () => this.setState({isPortOpened: false});
        this.port.onError = (errorMessage: string) => this.showMessageToUser(errorMessage);
    }

    connect(port: string) {
        const serial = this.port.connect(port);
        if (!serial) {
            return;
        }

        this.ebyte = new EbyteClass(serial);
        this.ebyte.onVersion = (moduleVersion: IModuleVersion) => this.setState({moduleVersion});
        this.ebyte.onParams = (moduleParams: IModuleParams) => this.setState({moduleParams});
        this.ebyte.onError = (errorMessage: string) => this.showMessageToUser(errorMessage);
    }

    showMessageToUser = (text: string) => {
        this.setState({snackBarOpen: true, snackBarText: text});
    }

    handleSnackBarClose = () => {
        this.setState({snackBarOpen: false});
    }

    onExportParamsClick = () => {
        if (!this.state.moduleParams) {
            return;
        }

        let options = {
            title: 'Save params to file:',
            filters: [{name: 'text', extensions: ['txt']}]
        };

        dialog.showSaveDialog(options, (fileName: string) => {
            if (fileName === undefined) {
                return;
            }

            fs.writeFile(fileName, this.state.moduleParams && this.state.moduleParams.bytes, (err: Error) => {
                if (err) {
                    dialog.showErrorBox('File Save Error', err.message);
                } else {
                    dialog.showMessageBox({message: 'The file has been saved!', buttons: ['OK']});
                }

            });
        });
    }

    onImportParamsClick = () => {
        let options = {
            title: 'Get params from file:',
            filters: [{name: 'text', extensions: ['txt']}],
            properties: ['openFile']
        };

        dialog.showOpenDialog(options, (filePaths: string) => {
            if (!filePaths || filePaths.length != 1) {
                return;
            }

            fs.readFile(filePaths[0], (err: Error, data: Buffer) => {
                if (err) {
                    dialog.showErrorBox('File Read Error', err.message);
                } else {
                    const txtContent = data.toString();
                    if (this.state.moduleParams) {
                        this.setState({
                            moduleParams: {
                                ...this.state.moduleParams,
                                newBytes: txtContent
                            }
                        });
                    }
                }

            });
        });
    }

    componentWillUnmount() {
        this.port.disconnect();
    }

    render() {
        return (
            <div style={styles.root}>
                <Grid container spacing={16}>
                    <Grid item xs={7} sm={7}>
                        <Paper style={{...styles.paper, height: 230, overflowX: 'hidden', overflowY: 'scroll'}}>
                            <InfoColumn
                                moduleVersion={this.state.moduleVersion}
                                moduleParams={this.state.moduleParams}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                        <Paper style={{...styles.paper, height: 230}}>
                            <SerialColumn
                                isPortOpened={this.state.isPortOpened}
                                onConnectPortClick={(port) => this.connect(port)}
                                onDisconnectPortClick={() => this.port.disconnect()}
                                onReadParamsClick={() => this.ebyte.readParams()}
                                onSaveParamsClick={() => this.ebyte.saveParams(this.state.moduleParams && this.state.moduleParams.newBytes)}
                                onExportParamsClick={this.onExportParamsClick}
                                onImportParamsClick={this.onImportParamsClick}
                                onUpdatePortListClick={SerialPortClass.updatePortList}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Paper style={styles.paper}>
                            <ParamColumn
                                moduleParams={this.state.moduleParams}
                                onParamsChanged={(moduleParams) => this.setState({moduleParams})}/>
                        </Paper>
                    </Grid>
                </Grid>
                <Snackbar
                    autoHideDuration={4000}
                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                    open={this.state.snackBarOpen}
                    onClose={this.handleSnackBarClose}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    action={
                        <Button color='inherit' size='small' onClick={this.handleSnackBarClose}>
                            <Icon>clear</Icon>
                        </Button>
                    }
                    message={<span id='message-id'>{this.state.snackBarText}</span>}
                />
            </div>
        );
    }
}

const styles = {
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: '5px 15px',
        margin: '5px 15px',
        height: '100%'
    }
};