import * as React from 'react';
import {SerialColumn} from './containers/SerialColumn';
import SerialPortClass from './components/SerialPortClass';
import EbyteClass, {IModuleVersion} from './components/EbyteClass';

import {MenuItem, Icon, Paper, Grid, TextField, Snackbar, Button} from 'material-ui';
import {InfoColumn} from './containers/InfoColumn';

interface IAppState {
    isPortOpened: boolean;
    snackBarOpen: boolean;
    snackBarText: string;
    moduleVersion?: IModuleVersion;
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
        this.ebyte.onError = (errorMessage: string) => this.showMessageToUser(errorMessage);

    }

    showMessageToUser = (text: string) => {
        this.setState({snackBarOpen: true, snackBarText: text});
    }

    handleSnackBarClose = () => {
        this.setState({snackBarOpen: false});
    }

    handleChange = () => {
        console.log('handleChange');
    }

    render() {
        const currencies = [
            {
                value: 'USD',
                label: '$',
            },
            {
                value: 'EUR',
                label: '€',
            },
            {
                value: 'BTC',
                label: '฿',
            },
            {
                value: 'JPY',
                label: '¥',
            },
        ];
        return (
            <div style={styles.root}>
                <Grid container spacing={16}>
                    <Grid item xs={7} sm={7}>
                        <Paper style={{...styles.paper, height: 230, overflowX: 'hidden', overflowY: 'scroll'}}>
                            <InfoColumn moduleVersion={this.state.moduleVersion}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                        <Paper style={{...styles.paper, height: 230}}>
                            <SerialColumn
                                isPortOpened={this.state.isPortOpened}
                                onConnectPortClick={(port) => this.connect(port)}
                                onDisconnectPortClick={() => this.port.disconnect()}
                                onReadParamsClick={() => this.ebyte.readParams()}
                                onUpdatePortListClick={SerialPortClass.updatePortList}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Paper style={styles.paper}>

                            <Grid container spacing={24}>
                                <Grid item xs={4} sm={4}>
                                    <TextField
                                        id='select-currency'
                                        select
                                        label='Select'

                                        value={5}
                                        onChange={this.handleChange}
                                        helperText='Please select your currency'
                                        margin='normal'
                                    >
                                        {currencies.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item xs={4} sm={4}>
                                    <TextField
                                        id='select-currency'
                                        select
                                        label='Select'

                                        value={5}
                                        onChange={this.handleChange}
                                        helperText='Please select your currency'
                                        margin='normal'
                                    >
                                        {currencies.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item xs={4} sm={4}>
                                    <TextField
                                        id='select-currency'
                                        select
                                        label='Select'

                                        value={5}
                                        onChange={this.handleChange}
                                        helperText='Please select your currency'
                                        margin='normal'
                                    >
                                        {currencies.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item xs={4} sm={4}>
                                    <TextField
                                        id='select-currency'
                                        select
                                        label='Select'

                                        value={5}
                                        onChange={this.handleChange}
                                        helperText='Please select your currency'
                                        margin='normal'
                                    >
                                        {currencies.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item xs={4} sm={4}>
                                    <TextField
                                        id='select-currency'
                                        select
                                        label='Select'

                                        value={5}
                                        onChange={this.handleChange}
                                        helperText='Please select your currency'
                                        margin='normal'
                                    >
                                        {currencies.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item xs={4} sm={4}>
                                    <TextField
                                        id='select-currency'
                                        select
                                        label='Select'

                                        value={5}
                                        onChange={this.handleChange}
                                        helperText='Please select your currency'
                                        margin='normal'
                                    >
                                        {currencies.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                            </Grid>

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