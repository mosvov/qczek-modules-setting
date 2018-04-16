import * as React from 'react';
import {Grid, MenuItem, TextField} from 'material-ui';
import EbyteClass, {IModuleParams} from '../components/EbyteClass';

interface IParamProps {
    moduleParams?: IModuleParams;
    onParamsChanged: (moduleParams: IModuleParams) => void;
}

export class ParamColumn extends React.Component<IParamProps, {}> {
    handleChange = (event: any) => {
        const target = event.target;
        if (!this.props.moduleParams) {
            return;
        }

        let newParams: IModuleParams = {
            ...this.props.moduleParams,
            [target.name]: target.value
        };

        newParams.newBytes = EbyteClass.generateNewParams(newParams);

        this.props.onParamsChanged(newParams);
    }

    render() {
        const {moduleParams} = this.props;

        return (
            <Grid container spacing={24}>
                <Grid item xs={3} sm={3}>
                    <TextField
                        name='baudRate'
                        select
                        label='Baud Rate'
                        value={moduleParams ? moduleParams.baudRate : ''}
                        onChange={this.handleChange}
                        fullWidth={true}
                        margin='normal'
                        helperText='Uart BaudRate'
                    >
                        <MenuItem value='0'>1200bps</MenuItem>
                        <MenuItem value='1'>2400bps</MenuItem>
                        <MenuItem value='2'>4800bps</MenuItem>
                        <MenuItem value='3'>9600bps</MenuItem>
                        <MenuItem value='4'>38400bps</MenuItem>
                        <MenuItem value='5'>57600bps</MenuItem>
                        <MenuItem value='6'>115200bps</MenuItem>
                    </TextField>
                </Grid>

                <Grid item xs={3} sm={3}>
                    <TextField
                        name='parityBit'
                        select
                        label='Parity Bit'
                        value={moduleParams ? moduleParams.parityBit : ''}
                        onChange={this.handleChange}
                        fullWidth={true}
                        margin='normal'
                        helperText='Note Parity'
                    >
                        <MenuItem value='0'>8N1</MenuItem>
                        <MenuItem value='1'>8O1</MenuItem>
                        <MenuItem value='2'>8E1</MenuItem>
                    </TextField>
                </Grid>

                <Grid item xs={3} sm={3}>
                    <TextField
                        name='airDataRate'
                        select
                        label='Air Data Rate'
                        value={moduleParams ? moduleParams.airDataRate : ''}
                        onChange={this.handleChange}
                        fullWidth={true}
                        margin='normal'
                        helperText='Data rate in the air'
                    >
                        <MenuItem value='0'>300Kbps</MenuItem>
                        <MenuItem value='1'>1200Kbps</MenuItem>
                        <MenuItem value='2'>2400Kbps</MenuItem>
                        <MenuItem value='3'>4800Kbps</MenuItem>
                        <MenuItem value='4'>9600Kbps</MenuItem>
                        <MenuItem value='5'>19200Kbps</MenuItem>
                    </TextField>
                </Grid>

                <Grid item xs={3} sm={3}>
                    <TextField
                        name='transmissionPower'
                        select
                        label='Transmission Power'
                        value={moduleParams ? moduleParams.transmissionPower : ''}
                        onChange={this.handleChange}
                        fullWidth={true}
                        margin='normal'
                        helperText='RF output power'
                    >
                        <MenuItem value='0'>20dBm</MenuItem>
                        <MenuItem value='1'>17dBm</MenuItem>
                        <MenuItem value='2'>14dBm</MenuItem>
                        <MenuItem value='3'>10dBm</MenuItem>
                    </TextField>
                </Grid>

                <Grid item xs={3} sm={3}>
                    <TextField
                        name='fecSwitch'
                        select
                        label='FEC'
                        value={moduleParams ? moduleParams.fecSwitch : ''}
                        onChange={this.handleChange}
                        fullWidth={true}
                        margin='normal'
                        helperText='Forward error correction'
                    >
                        <MenuItem value='0'>Disable</MenuItem>
                        <MenuItem value='1'>Enable</MenuItem>
                    </TextField>
                </Grid>

                <Grid item xs={3} sm={3}>
                    <TextField
                        name='txMode'
                        select
                        label='Fixed Mode'
                        value={moduleParams ? moduleParams.txMode : ''}
                        onChange={this.handleChange}
                        fullWidth={true}
                        margin='normal'
                        helperText='Open fixed mode or not '
                    >
                        <MenuItem value='0'>Transparent</MenuItem>
                        <MenuItem value='1'>Fixed</MenuItem>
                    </TextField>
                </Grid>

                <Grid item xs={3} sm={3}>
                    <TextField
                        name='wirelessWakeUp'
                        select
                        label='Wireless WakeUp'
                        value={moduleParams ? moduleParams.wirelessWakeUp : ''}
                        onChange={this.handleChange}
                        fullWidth={true}
                        margin='normal'
                        helperText='Work on radio timing'
                    >
                        <MenuItem value='0'>250ms</MenuItem>
                        <MenuItem value='1'>500ms</MenuItem>
                        <MenuItem value='2'>750ms</MenuItem>
                        <MenuItem value='3'>1000ms</MenuItem>
                        <MenuItem value='4'>1250ms</MenuItem>
                        <MenuItem value='5'>1500ms</MenuItem>
                        <MenuItem value='6'>1750ms</MenuItem>
                        <MenuItem value='7'>2000ms</MenuItem>
                    </TextField>
                </Grid>

                <Grid item xs={3} sm={3}>
                    <TextField
                        name='ioMode'
                        select
                        label='IO Mode'
                        value={moduleParams ? moduleParams.ioMode : ''}
                        onChange={this.handleChange}
                        fullWidth={true}
                        margin='normal'
                        helperText='PushPull, PullUp'
                    >
                        <MenuItem value='0'>Open</MenuItem>
                        <MenuItem value='1'>PushPull</MenuItem>
                    </TextField>
                </Grid>

                <Grid item xs={3} sm={3}>
                    <TextField
                        name='address'
                        label='Address'
                        value={moduleParams ? moduleParams.address : ''}
                        onChange={this.handleChange}
                        fullWidth={true}
                        margin='normal'
                        helperText='Hex Format'
                    />
                </Grid>

                <Grid item xs={3} sm={3}>
                    <TextField
                        name='channel'
                        label='Channel'
                        value={moduleParams ? moduleParams.channel : ''}
                        onChange={this.handleChange}
                        fullWidth={true}
                        margin='normal'
                        helperText='Frequency from 410 to 441'
                    />
                </Grid>

            </Grid>
        );
    }
}