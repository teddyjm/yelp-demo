import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { YelpBusiness } from "../apis/YelpApi";
import Rating from '@material-ui/lab/Rating';
import { Link } from 'react-router-dom';

export const PlaceCard = (props: YelpBusiness) => {
    return <Link to={`/place/${props.id}`}>
        <Card style={{ maxWidth: 345 }} variant="outlined">
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt={props.name}
                    height="140"
                    image={props.image_url}
                    title={props.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.name}
                    </Typography>
                    <Rating name="read-only" value={props.rating} readOnly />
                </CardContent>
            </CardActionArea>
        </Card>
    </Link>
}