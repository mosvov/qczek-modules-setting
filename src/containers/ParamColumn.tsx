import { Grid, InputLabel, ListItemText, MenuItem, Tab, TextField } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import Tabs from '@material-ui/core/Tabs';
import Tooltip from '@material-ui/core/Tooltip';
import { Handle, Range } from 'rc-slider';
import { ChangeEvent } from 'react';
import * as React from 'react';
import { tModuleParams } from '../components/QczekClass';

interface tParamProps {
  moduleParams: tModuleParams;
  onParamsChanged: (moduleParams: tModuleParams) => void;
}

interface tParamState {
  activeTab: number;
}

export class ParamColumn extends React.Component<tParamProps, tParamState> {
  state: tParamState = {
    activeTab: 0,
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // range change
    if (Array.isArray(event) && event.length === 3) {
      return this.props.onParamsChanged({
        ...this.props.moduleParams,
        txMinPwr: Math.round(event[0] / (100 / 15)),
        txMidPwr: Math.round(event[1] / (100 / 15)),
        txMaxPwr: Math.round(event[2] / (100 / 15)),
      });
    }

    const target = event.target;
    if (!this.props.moduleParams) {
      return;
    }

    const newParams: tModuleParams = {
      ...this.props.moduleParams,
      [target.name]: target.value,
    };

    this.props.onParamsChanged(newParams);
  };

  // @ts-ignore
  handleRange = (props) => {
    const { value, index, ...restProps } = props;

    const realValue = Math.round(value / (100 / 15));

    return (
      <Tooltip title={`${value}% / ${realValue}`} placement="top" key={index}>
        <Handle value={value} {...restProps} />
      </Tooltip>
    );
  };

  render() {
    const { moduleParams } = this.props;

    return (
      <div style={{ position: 'relative', paddingTop: 40 }}>
        <AppBar
          position="absolute"
          style={{ top: '-5px', left: '-15px', width: 'calc(100% + 30px)' }}
        >
          <Tabs
            value={this.state.activeTab}
            onChange={(_, value) => this.setState({ activeTab: value })}
          >
            <Tab label="Main settings" />
            <Tab label="RF frequencies" />
            <Tab label="Telemetry" />
            {!moduleParams.isMaster && <Tab label="Fail safe" />}
          </Tabs>
        </AppBar>

        {this.state.activeTab === 0 && (
          <Grid container spacing={2}>
            <Grid item xs={3} sm={3}>
              <TextField
                type="number"
                name="pCode"
                label="Pairing Code"
                value={moduleParams.pCode}
                onChange={this.handleChange}
                fullWidth={true}
                margin="normal"
                helperText="Range from 0 to 65535"
              />
            </Grid>

            <Grid item xs={3} sm={3}>
              <TextField
                name="proto"
                select
                label="RC Protocol"
                value={moduleParams.proto}
                onChange={this.handleChange}
                fullWidth={true}
                margin="normal"
                helperText=""
              >
                {moduleParams.isMaster && <MenuItem value={0}>CPPM</MenuItem>}
                {moduleParams.isMaster && <MenuItem value={1}>FrSky PXX XJT D8/D16</MenuItem>}
                {moduleParams.isMaster && <MenuItem value={2}>SBUS</MenuItem>}
                {!moduleParams.isMaster && <MenuItem value={0}>CPPM</MenuItem>}
                {!moduleParams.isMaster && <MenuItem value={1}>SBUS</MenuItem>}
              </TextField>
            </Grid>
            <Grid item xs={6} sm={6} />
            <Grid item xs={3} sm={3}>
              <TextField
                name="noOfCPPMChnls"
                select
                label="Number of CPPM channels"
                value={moduleParams.noOfCPPMChnls}
                onChange={this.handleChange}
                fullWidth={true}
                margin="normal"
                helperText="Range from 8 to 16"
              >
                {[...Array(9).keys()].map((i) => {
                  return (
                    <MenuItem key={i} value={i + 8}>
                      {i + 8}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
            {moduleParams.isMaster && (
              <Grid item xs={3} sm={3}>
                <TextField
                  name="pwrSelChnl"
                  select
                  label="Power Sel. channel"
                  value={moduleParams.pwrSelChnl}
                  onChange={this.handleChange}
                  fullWidth={true}
                  margin="normal"
                  helperText="Range from 0 to 16"
                >
                  {[...Array(17).keys()].map((i) => {
                    return (
                      <MenuItem key={i} value={i}>
                        {i}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>
            )}
            {!moduleParams.isMaster && (
              <Grid item xs={3} sm={3}>
                <TextField
                  name="rssiChnl"
                  select
                  label="RSSI injection channel"
                  value={moduleParams ? moduleParams.rssiChnl : ''}
                  onChange={this.handleChange}
                  fullWidth={true}
                  margin="normal"
                  helperText="Range from 0 to 16"
                >
                  {[...Array(17).keys()].map((i) => {
                    return (
                      <MenuItem key={i} value={i}>
                        {i}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>
            )}
            {moduleParams && !moduleParams.isMaster && (
              <Grid item xs={3} sm={3}>
                <TextField
                  name="rssiT"
                  select
                  label="RSSI calculation"
                  value={moduleParams ? moduleParams.rssiT : ''}
                  onChange={this.handleChange}
                  fullWidth={true}
                  margin="normal"
                  helperText=""
                >
                  <MenuItem value={0}>RF Signal strength</MenuItem>
                  <MenuItem value={1}>SNR level</MenuItem>
                  <MenuItem value={2}>Packet loss</MenuItem>
                </TextField>
              </Grid>
            )}
            {moduleParams && !moduleParams.isMaster && (
              <Grid item xs={3} sm={3}>
                <TextField
                  name="lbeep"
                  select
                  label="LBeep"
                  value={moduleParams ? moduleParams.lbeep : ''}
                  onChange={this.handleChange}
                  fullWidth={true}
                  margin="normal"
                  helperText="lbeep signal on rssi pin"
                >
                  <MenuItem value={0}>RSSI PWM</MenuItem>
                  <MenuItem value={1}>LBeep</MenuItem>
                </TextField>
              </Grid>
            )}
            {moduleParams && !moduleParams.isMaster && (
              <Grid item xs={3} sm={3}>
                <TextField
                  name="m0PWMChn"
                  select
                  label="M0 PWM Channel"
                  value={moduleParams ? moduleParams.m0PWMChn : ''}
                  onChange={this.handleChange}
                  fullWidth={true}
                  margin="normal"
                  helperText="Output pwm to control servo"
                >
                  {[...Array(17).keys()].map((i) => {
                    return (
                      <MenuItem key={i} value={i}>
                        {i}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>
            )}
            {moduleParams && !moduleParams.isMaster && (
              <Grid item xs={3} sm={3}>
                <TextField
                  name="m1PWMChn"
                  select
                  label="M1 PWM Channel"
                  value={moduleParams ? moduleParams.m1PWMChn : ''}
                  onChange={this.handleChange}
                  fullWidth={true}
                  margin="normal"
                  helperText="Output pwm to control servo"
                >
                  {[...Array(17).keys()].map((i) => {
                    return (
                      <MenuItem key={i} value={i}>
                        {i}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>
            )}
            {moduleParams && !moduleParams.isMaster && (
              <Grid item xs={3} sm={3}>
                <TextField
                  name="silent"
                  select
                  label="Silent mode"
                  value={moduleParams ? moduleParams.silent : ''}
                  onChange={this.handleChange}
                  fullWidth={true}
                  margin="normal"
                  helperText="Disable sending any RF signal"
                >
                  <MenuItem value={0}>Off</MenuItem>
                  <MenuItem value={1}>On</MenuItem>
                </TextField>
              </Grid>
            )}

            <Grid item xs={3} sm={3}>
              <TextField
                name="racem"
                select
                label="Race mode"
                value={moduleParams ? moduleParams.racem : ''}
                onChange={this.handleChange}
                fullWidth={true}
                margin="normal"
                helperText="beta"
              >
                <MenuItem value={0}>Off</MenuItem>
                <MenuItem value={1}>On</MenuItem>
              </TextField>
            </Grid>

            {moduleParams && moduleParams.isMaster && moduleParams.txMaxPwr && (
              <Grid item xs={12} sm={12}>
                <InputLabel>
                  RF Power Minimum/Medium/Maximum levels -{' '}
                  {`${moduleParams.txMinPwr}/${moduleParams.txMidPwr}/${moduleParams.txMaxPwr}`}
                </InputLabel>

                <Range
                  marks={{ 0: '0', 25: '25%', 50: '50%', 75: '75%', 100: '100%' }}
                  allowCross={false}
                  defaultValue={[
                    (moduleParams.txMinPwr * 100) / 15,
                    (moduleParams.txMidPwr * 100) / 15,
                    (moduleParams.txMaxPwr * 100) / 15,
                  ]}
                  handleStyle={[
                    { backgroundColor: '#f50057' },
                    { backgroundColor: '#f50057' },
                    { backgroundColor: '#f50057' },
                  ]}
                  handle={this.handleRange}
                  // @ts-ignore
                  onChange={this.handleChange}
                />
              </Grid>
            )}
          </Grid>
        )}

        {this.state.activeTab === 1 && (
          <Grid container spacing={2}>
            {[...Array(8).keys()].map((i) => {
              return (
                <Grid item key={i} xs={3} sm={3}>
                  <TextField
                    type="number"
                    name={`fr${i}`}
                    label={`Frequency ${i + 1}`}
                    // @ts-ignore
                    value={moduleParams[`fr${i}`]}
                    onChange={this.handleChange}
                    fullWidth={true}
                    margin="normal"
                  />
                </Grid>
              );
            })}
            {moduleParams && !moduleParams.isMaster && (
              <Grid item xs={3} sm={3}>
                <TextField
                  type="number"
                  name={`beaFreq`}
                  label={`Beacon Frequency`}
                  value={moduleParams.beaFreq}
                  onChange={this.handleChange}
                  fullWidth={true}
                  margin="normal"
                  helperText=""
                />
              </Grid>
            )}
          </Grid>
        )}

        {this.state.activeTab === 2 && (
          <Grid container spacing={2}>
            <Grid item xs={3} sm={3}>
              <TextField
                name="serPortSpd"
                select
                label="Serial Port Speed"
                value={moduleParams.serPortSpd}
                onChange={this.handleChange}
                fullWidth={true}
                margin="normal"
                helperText=""
              >
                <MenuItem value={1200}>1200bps</MenuItem>
                <MenuItem value={2400}>2400bps</MenuItem>
                <MenuItem value={4800}>4800bps</MenuItem>
                <MenuItem value={9600}>9600bps</MenuItem>
                <MenuItem value={38400}>38400bps</MenuItem>
                <MenuItem value={57600}>57600bps</MenuItem>
                <MenuItem value={115200}>115200bps</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={3} sm={3}>
              <TextField
                name="serMode"
                select
                label="Telemetry type"
                value={moduleParams.serMode}
                onChange={this.handleChange}
                fullWidth={true}
                margin="normal"
                helperText=""
              >
                <MenuItem value={0}>Transparency mode</MenuItem>
                <MenuItem value={1}>Mavlink telemetry encapsulation</MenuItem>
                <MenuItem value={2}>uBlox GPS telemetry</MenuItem>
                <MenuItem value={3}>Mavlink enc. + SPORT</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6} sm={6} />
            {moduleParams.isMaster && (
              <Grid item xs={3} sm={3}>
                <TextField
                  type="number"
                  name="devThrs"
                  label="Deviation threshold"
                  value={moduleParams.devThrs}
                  onChange={this.handleChange}
                  fullWidth={true}
                  margin="normal"
                  helperText="How to utilize limited band"
                />
              </Grid>
            )}
            {moduleParams.isMaster && (
              <Grid item xs={3} sm={3}>
                <TextField
                  type="number"
                  name="sTelFrmR"
                  label="Standard telemetry frame rate"
                  value={moduleParams.sTelFrmR}
                  onChange={this.handleChange}
                  fullWidth={true}
                  margin="normal"
                  helperText=""
                />
              </Grid>
            )}
            {moduleParams.isMaster && (
              <Grid item xs={3} sm={3}>
                <TextField
                  type="number"
                  name="lTelFrmR"
                  label="Low telemetry frame rate"
                  value={moduleParams.lTelFrmR}
                  onChange={this.handleChange}
                  fullWidth={true}
                  margin="normal"
                  helperText=""
                />
              </Grid>
            )}
          </Grid>
        )}
        {this.state.activeTab === 3 && (
          <Grid container spacing={2}>
            <Grid item xs={3} sm={3}>
              <TextField
                type="number"
                name="timeToFS"
                label="Time to fail safe activation"
                value={moduleParams.timeToFS}
                onChange={this.handleChange}
                fullWidth={true}
                margin="normal"
                helperText="Value in seconds"
              />
            </Grid>

            <Grid item xs={3} sm={3}>
              <TextField
                type="number"
                name="wdTime"
                label="Reset RX if no signal"
                value={moduleParams.wdTime}
                onChange={this.handleChange}
                fullWidth={true}
                margin="normal"
                helperText="Value in seconds"
              />
            </Grid>

            {moduleParams.fsDontT ? (
              <Grid item xs={2} sm={2}>
                <InputLabel htmlFor="select-multiple-checkbox">FS Btn not set channel</InputLabel>
                <Select
                  multiple
                  value={moduleParams.fsDontT}
                  onChange={this.handleChange}
                  input={<Input id="select-multiple-checkbox" />}
                  renderValue={(selected: string[]) => selected && selected.join(', ')}
                >
                  {[...Array(17).keys()].map((i) => {
                    return (
                      <MenuItem key={i} value={i}>
                        <Checkbox checked={false} />
                        <ListItemText primary={`Channel ${i}`} />
                      </MenuItem>
                    );
                  })}
                </Select>
              </Grid>
            ) : (
              ''
            )}

            <Grid item xs={6} sm={6} />

            {[...Array(16).keys()].map((i) => {
              const paramName = i < 10 ? `fs0${i}` : `fs${i}`;

              return (
                <Grid item key={i} xs={2} sm={2}>
                  <TextField
                    type="number"
                    name={paramName}
                    label={`Channel ${i + 1}`}
                    // @ts-ignore
                    value={moduleParams[paramName] ? moduleParams[paramName] : 0}
                    onChange={this.handleChange}
                    fullWidth={true}
                    margin="normal"
                  />
                </Grid>
              );
            })}
          </Grid>
        )}
      </div>
    );
  }
}
