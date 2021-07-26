import * as React from "react";
import * as ReactDOM from "react-dom";
import Grid from "@material-ui/core/Grid";

import Header from './components/Header';
import BodyCard from './components/BodyCard';

const App = () => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Header />
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
                <BodyCard />
            </Grid>
            <Grid item xs={2}></Grid>
        </Grid>
    );
}
ReactDOM.render(<App />, document.getElementById('app'));