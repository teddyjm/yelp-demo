import React from 'react';
import YelpApi, { YelpBusiness, YelpReview } from '../apis/YelpApi';
import { RouteComponentProps } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import Rating from '@material-ui/lab/Rating';
import { ReviewCard } from '../common/ReviewCard';

type PlaceUrlParams = {
    id: string
}

type PlaceState = {
    placeDetails?: YelpBusiness,
    reviews: YelpReview[],
    isError: boolean
}

export class Place extends React.Component<RouteComponentProps<PlaceUrlParams>, PlaceState> {
    constructor(props: RouteComponentProps<PlaceUrlParams>) {
        super(props);

        this.state = {
            placeDetails: undefined,
            reviews: [],
            isError: false
        }
    }

    yelpApi = new YelpApi();

    fetchData = async () => {
        try {
            let details = await this.yelpApi.Get(this.props.match.params.id);
            let reviews = await this.yelpApi.GetReviews(this.props.match.params.id);
            this.setState({ placeDetails: details, reviews: reviews, isError: false });
            console.log(details);
        }
        catch (ex) {
            this.setState({ isError: true })
        }
    }

    componentDidMount = async () => {
        await this.fetchData();
    }

    render() {
        return <React.Fragment>
            {this.state.isError && <Alert severity="error">Sorry, there was an error when serving your request!</Alert>}
            {
                this.state.placeDetails && <React.Fragment>
                    <h2>{this.state.placeDetails.name} reviews</h2>
                    <Rating name="read-only" value={this.state.placeDetails.rating} readOnly />
                    {
                        this.state.reviews.map((val: YelpReview, index) => {
                            return <ReviewCard key={val.id} {...val} />
                        })
                    }
                </React.Fragment>
            }
        </React.Fragment>
    }
}