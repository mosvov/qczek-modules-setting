import * as React from 'react';
import Select from 'material-ui/Select';
import Input from 'material-ui/Input';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import {InputLabel, MenuItem, FormGroup} from 'material-ui';
import Grid from 'material-ui/Grid';
import Icon from 'material-ui/Icon';
import Tooltip from 'material-ui/Tooltip';
import {IPortList} from '../components/SerialPortClass';

interface IPortProps {
    isPortOpened: boolean;
    onConnectPortClick: (port: string) => void;
    onDisconnectPortClick: () => void;
    onReadParamsClick: () => void;
    onUpdatePortListClick: () => Promise<IPortList[]>;
}

interface IPortState {
    selectedPort: string;
    portList: IPortList[];
}

export class SerialColumn extends React.Component<IPortProps, IPortState> {
    state: IPortState = {portList: [], selectedPort: ''};

    async componentDidMount() {
        await this.updatePortList();
    }

    updatePortList = async () => {
        const portList = await this.props.onUpdatePortListClick();
        this.setState({portList});
    }

    render() {
        return (
            <div>
                <FormGroup>
                    <InputLabel htmlFor='serial-port'>Serial port</InputLabel>
                    <Select
                        title='Select serial port'
                        value={this.state.selectedPort}
                        onChange={event => this.setState({selectedPort: event.target.value})}
                        input={<Input name='serial-port' id='serial-port'/>}
                    >
                        <MenuItem value=''>
                            <em>Select serial port</em>
                        </MenuItem>
                        {this.state.portList.map((port, i) => {
                            return <MenuItem key={i} value={port.comName}>{port.comName}</MenuItem>;
                        })}
                    </Select>
                </FormGroup>

                <Divider style={{margin: '10px 0'}}/>

                <Grid container spacing={8}>
                    <Grid item xs={6} sm={6}>
                        <Tooltip title='Update serial port list'>
                            <Button variant='raised' fullWidth={true} size='small' title='' onClick={this.updatePortList}>
                                Update <Icon>autorenew</Icon>
                            </Button>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        {this.props.isPortOpened ?
                            <Button variant='raised' color='secondary' fullWidth={true} size='small'
                                    onClick={this.props.onDisconnectPortClick}>
                                Disconnect <Icon>phonelink_erase</Icon>
                            </Button>
                            :
                            <Button variant='raised' color='primary' fullWidth={true} size='small'
                                    onClick={() => this.props.onConnectPortClick(this.state.selectedPort)}>
                                Connect <Icon>phonelink_ring</Icon>
                            </Button>
                        }
                    </Grid>
                </Grid>

                <Divider style={{margin: '10px 0'}}/>

                <Grid container spacing={8}>
                    <Grid item xs={6} sm={6}>
                        <Button variant='raised' fullWidth={true} size='small' onClick={this.props.onReadParamsClick}>
                            Read params
                        </Button>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Button variant='raised' color='primary' fullWidth={true} size='small'>
                            Save params
                        </Button>
                    </Grid>
                </Grid>
                <Divider style={{margin: '10px 0'}}/>

                <Grid container spacing={8}>
                    <Grid item xs={6} sm={6}>
                        <Button variant='raised' fullWidth={true} size='small'>
                            Export params
                        </Button>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Button variant='raised' color='primary' fullWidth={true} size='small'>
                            Import params
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}