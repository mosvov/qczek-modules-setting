import * as React from 'react';
import {IModuleVersion} from '../components/EbyteClass';
import {Grid, List, ListItem, ListItemText} from 'material-ui';

interface IInfoProps {
    moduleVersion?: IModuleVersion;
}

export class InfoColumn extends React.Component<IInfoProps, {}> {
    render() {
        const {moduleVersion} = this.props;
        return (
            <List component='nav'>
                <Grid container spacing={8}>
                    <Grid item xs={6} sm={6}>
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
                    <Grid item xs={6} sm={6}>
                        {moduleVersion &&
                        <ListItem>
                            <ListItemText
                                primary={`Info: ${moduleVersion.bytes}`}/>
                        </ListItem>
                        }
                    </Grid>
                </Grid>
            </List>
        );
    }
}