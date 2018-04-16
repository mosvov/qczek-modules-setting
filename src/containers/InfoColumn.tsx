import * as React from 'react';
import {IModuleParams, IModuleVersion} from '../components/EbyteClass';
import {Grid, List, ListItem, ListItemText} from 'material-ui';

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
                    <Grid item xs={4} sm={4}>
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
                    </Grid>
                    <Grid item xs={8} sm={8}>
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
                    </Grid>
                </Grid>
            </List>
        );
    }
}