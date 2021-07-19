import * as React from 'react';
import Grid from '@material-ui/core/Grid';

import Header from './components/Header';
import Content from './components/Content';

class App extends React.Component {
    render() {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Header />
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <Content />
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
        );
    };
}

export default App;