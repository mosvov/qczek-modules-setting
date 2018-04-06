import * as React from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import {InputLabel, MenuItem, FormGroup,  ListItem,  ListItemIcon,  ListItemText} from 'material-ui';
import Select from 'material-ui/Select';
import Input from 'material-ui/Input';
import Divider from 'material-ui/Divider';
import List from 'material-ui/List';
import TextField from 'material-ui/TextField';

export class App extends React.Component<{}, {}> {
    handleChange = () => {
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
                            <FormGroup>
                                <InputLabel htmlFor='age-helper'>Serial port</InputLabel>
                                <Select
                                    value={10}
                                    onChange={this.handleChange}
                                    input={<Input name='age' id='age-helper'/>}
                                >
                                    <MenuItem value=''>
                                        <em>Select serial port</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormGroup>

                            <Divider style={{margin: '10px 0'}}/>

                            <Grid container spacing={8}>
                                <Grid item xs={6} sm={6}>
                                    <Button variant='raised' fullWidth={true} size='small'>
                                        Update <Icon>autorenew</Icon>
                                    </Button>
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <Button variant='raised' color='primary' fullWidth={true} size='small'>
                                        Connect <Icon>settings_remote</Icon>
                                    </Button>
                                </Grid>
                            </Grid>

                            <Divider style={{margin: '10px 0'}}/>

                            <Grid container spacing={8}>
                                <Grid item xs={6} sm={6}>
                                    <Button variant='raised' fullWidth={true} size='small'>
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