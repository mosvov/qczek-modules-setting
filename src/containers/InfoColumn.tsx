import {shell} from 'electron';
import {Grid, List, ListItem, ListItemIcon, ListItemText} from 'material-ui';
import Icon from 'material-ui/Icon';
import * as React from 'react';
import {IModuleParams} from '../components/QczekClass';

interface IInfoProps {
    moduleParams?: IModuleParams;
}

export default class InfoColumn extends React.Component<IInfoProps, {}> {
    render() {
        const {moduleParams} = this.props;
        return (
            <List component='nav'>
                <Grid container>
                    <Grid item xs={12} sm={12} style={{height: 70}}>
                        {moduleParams && moduleParams.version &&
                        <ListItem>
                            <ListItemText
                                primary={`Version: ${moduleParams.version}`}
                                secondary={`Features ${moduleParams.features}`}/>
                        </ListItem>
                        }
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <ListItem button onClick={() => shell.openExternal('http://qczek.beyondrc.com/qczek-lrs-433mhz-1w-lora-rc-link')}>
                            <ListItemIcon>
                                <Icon>link</Icon>
                            </ListItemIcon>
                            Qczek RC Blog
                        </ListItem>

                        <ListItem button
                                  onClick={() => shell.openExternal('http://qczek.beyondrc.com/qczek-lrs-433mhz-1w-lora-rc-link/qczek-lrs-configuration/')}>
                            <ListItemIcon>
                                <Icon>link</Icon>
                            </ListItemIcon>
                            Params explanation
                        </ListItem>

                        <ListItem button onClick={() => shell.openExternal('http://www.rc-fpv.pl/viewtopic.php?f=10&t=42090')}>
                            <ListItemIcon>
                                <Icon>link</Icon>
                            </ListItemIcon>
                            RC-fpv.pl thread
                        </ListItem>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <ListItem button
                                  onClick={() => shell.openExternal('https://www.rcgroups.com/forums/showthread.php?2837542-QCZEK-LRS-DIY-433MHz-1W-(30dBm)-LORA-RC-LINK-with-telemetry')}>
                            <ListItemIcon>
                                <Icon>link</Icon>
                            </ListItemIcon>
                            RCGroups thread
                        </ListItem>
                        <ListItem button onClick={() => shell.openExternal('http://forum.rcdesign.ru/f90/thread512643.html')}>
                            <ListItemIcon>
                                <Icon>link</Icon>
                            </ListItemIcon>
                            RCDesign.ru thread
                        </ListItem>
                        <ListItem button onClick={() => shell.openExternal('http://forum.rcdesign.ru/f90/thread512643.html')}>
                            <ListItemIcon>
                                <Icon>link</Icon>
                            </ListItemIcon>
                            Github page
                        </ListItem>
                    </Grid>
                </Grid>
            </List>
        );
    }
}