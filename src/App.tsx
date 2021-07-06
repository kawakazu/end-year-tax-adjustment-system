import * as React from 'react';
import { Grid, Modal } from '@material-ui/core';

import Header from './components/Header';
import Content from './components/Content';

class App extends React.Component {
    render() {
        return (
            <Grid container direction="column">
                <Grid item>
                    <Header />
                </Grid>
                <Grid item container>
                    <Grid sm={2} />
                    <Grid xs={8} sm={8}>
                        <Content />
                    </Grid>
                    <Grid sm={2} />
                </Grid>
            </Grid>
        );
    };
}

export default App;