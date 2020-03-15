import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import YelpApi, { YelpBusinessSearchResult, YelpBusiness } from '../apis/YelpApi';
import { PlaceCard } from '../common/PlaceCard';
import { Grid } from '@material-ui/core';

type PlacesUrlParams = {
    what?: string,
    where: string
}

type PlacesState = {
    searchResult?: YelpBusinessSearchResult,
    isError: boolean
}

export class Places extends React.Component<RouteComponentProps<PlacesUrlParams>, PlacesState> {
    constructor(props: RouteComponentProps<PlacesUrlParams>) {
        super(props);

        this.state = {
            searchResult: undefined,
            isError: false
        }
    }

    yelpApi = new YelpApi();

    fetchData = async () => {
        try {
            let data = await this.yelpApi.Search(this.props.match.params.where, this.props.match.params.what);
            this.setState({ searchResult: data, isError: false });
        }
        catch (ex) {
            this.setState({ isError: true })
        }
    }

    componentDidUpdate = async (prevProps: RouteComponentProps<PlacesUrlParams>) => {
        if (this.props.match.params.where !== prevProps.match.params.where || this.props.match.params.what !== prevProps.match.params.what) {
            await this.fetchData();
        }
    }

    componentDidMount = async () => {
        await this.fetchData();
    }

    render() {
        return <React.Fragment>
            {this.state.isError && <Alert severity="error">Sorry, there was an error when serving your request!</Alert>}
            {!this.state.isError && this.state.searchResult?.total === 0 && <h2>Sorry, no results where found.</h2>}
            {!this.state.isError && this.state.searchResult?.total && this.state.searchResult.total > 0 && <React.Fragment>
                <h2>Found {this.state.searchResult.total} results</h2>
                <Grid container spacing={10}>
                {
                    this.state.searchResult.businesses.map((val: YelpBusiness, index) => {
                        return <Grid key={val.id} item xs={12} sm={6} md={4} lg={4} xl={3}><PlaceCard {...val} /></Grid>
                    })
                }
                </Grid>
                </React.Fragment>
            }
            
        </React.Fragment>
    }
}