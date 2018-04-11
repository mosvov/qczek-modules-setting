import * as React from 'react';
import {Port} from './port';
import SerialPortClass from './SerialPortClass';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Icon from 'material-ui/Icon';
import {MenuItem, ListItem, ListItemIcon, ListItemText} from 'material-ui';
import List from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';

interface IAppState {
    isPortOpened: boolean;
    snackBarOpen: boolean;
    snackBarText: string;
    moduleVersion?: IModuleVersion;
}

export interface IModuleVersion {
    name: string;
    version: string;
    variant: string;
}

export class App extends React.Component<{}, IAppState> {
    state: IAppState = {isPortOpened: false, snackBarOpen: false, snackBarText: ''};
    port: SerialPortClass;

    constructor(props: any) {
        super(props);

        this.port = new SerialPortClass();
        this.port.onConnect = () => this.setState({isPortOpened: true});
        this.port.onDisconnect = () => this.setState({isPortOpened: false});
        this.port.onError = (errorMessage: string) => this.showMessageToUser(errorMessage);
        this.port.onVersion = (moduleVersion: IModuleVersion) => this.setState({moduleVersion});
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
                            <List component='nav'>
                                <ListItem>
                                    <ListItemIcon>
                                        <Icon>arrow_back</Icon>
                                    </ListItemIcon>
                                    <ListItemText primary='Inbox'/>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Icon>arrow_back</Icon>
                                    </ListItemIcon>
                                    <ListItemText primary='Inbo1111 1 223 23 x'/>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Icon>arrow_forward</Icon>
                                    </ListItemIcon>
                                    <ListItemText primary='Drafts'/>
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                        <Paper style={{...styles.paper, height: 230}}>
                            <Port
                                isPortOpened={this.state.isPortOpened}
                                onConnectPortClick={(port) => this.port.connect(port)}
                                onDisconnectPortClick={this.port.disconnect}
                                onReadParamsClick={() => this.port.readParams()}
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