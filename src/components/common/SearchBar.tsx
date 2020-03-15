import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Grid, Button } from '@material-ui/core';
import { withRouter, RouteComponentProps } from 'react-router-dom';

type SearchBarState = {
    whatSearchText: string,
    whereSearchText: string,
    isValid: boolean
};

class SearchBar extends React.Component<RouteComponentProps<any>, SearchBarState> {
    constructor(props: any) {
        super(props);
        this.state = {
            whatSearchText: '',
            whereSearchText: '',
            isValid: true
        }
    }

    handleSearchOnClick = () => {
        if (this.state.whereSearchText.length === 0) {
            this.setState({ isValid: false });
            return;
        } else {
            this.setState({ isValid: true });
        }

        this.props.history.push(`/places/${this.state.whereSearchText}/${this.state.whatSearchText}`);
    };

    render() {
        return <React.Fragment>
            <AppBar position="static" color="transparent">
                <Toolbar>
                    <Grid container spacing={3} alignItems="center" justify="flex-start">
                        <Grid item xs={1}>
                            <Typography variant="h6" noWrap>
                                Yelp search
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField inputProps={{'data-testid': 'textfield_what'}} label="What?" type="search" variant="filled" onChange={(e) => { this.setState({ whatSearchText: e.target.value }); }} style={{ marginRight: "10px" }} />
                            <TextField inputProps={{'data-testid': 'textfield_where' }} label="Where?" type="search" variant="filled" error={!this.state.isValid} onChange={(e) => { this.setState({ whereSearchText: e.target.value }); }} required />
                        </Grid>
                        <Grid item xs={1}>
                            <Button variant="contained" color="primary" onClick={this.handleSearchOnClick}>Search</Button>
                        </Grid>
                        <Grid item xs="auto">
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    }
}

export default withRouter(SearchBar);