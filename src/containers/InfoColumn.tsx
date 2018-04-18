import {Grid, List, ListItem, ListItemText} from 'material-ui';
import * as React from 'react';
import {IModuleParams, IModuleVersion} from '../components/EbyteClass';

interface IInfoProps {
    moduleVersion?: IModuleVersion;
    moduleParams?: IModuleParams;
}

export default class InfoColumn extends React.Component<IInfoProps, {}> {
    render() {
        const {moduleVersion, moduleParams} = this.props;
        return (
            <List component='nav'>
                <Grid container>
                    <Grid item xs={5} sm={5}>
                        {moduleVersion &&
                        <ListItem>
                            <ListItemText
                                primary={`ID: ${moduleVersion.id}`}/>
                        </ListItem>
                        }
                        {moduleVersion &&
                        <ListItem>
                            <ListItemText
                                primary={`Version: ${moduleVersion.version}`}/>
                        </ListItem>
                        }
                        {moduleParams &&
                        <ListItem>
                            <ListItemText
                                primary={`Channel: ${moduleParams.channel} Mhz`}/>
                        </ListItem>
                        }
                    </Grid>
                    <Grid item xs={7} sm={7}>
                        {moduleVersion &&
                        <ListItem>
                            <ListItemText
                                primary={`Info: ${moduleVersion.bytes}`}/>
                        </ListItem>
                        }
                        {moduleParams &&
                        <ListItem>
                            <ListItemText
                                primary={`Params: ${moduleParams.bytes}`}/>
                        </ListItem>
                        }
                        {moduleParams && moduleParams.newBytes &&
                        <ListItem>
                            <ListItemText
                                primary={`New params: ${moduleParams.newBytes}`}/>
                        </ListItem>
                        }
                    </Grid>
                </Grid>
            </List>
        );
    }
}