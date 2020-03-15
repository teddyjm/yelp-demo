import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { YelpReview } from "../apis/YelpApi";
import Rating from '@material-ui/lab/Rating';

export const ReviewCard = (props: YelpReview) => {
    return <Card style={{ maxWidth: 345 }} variant="outlined">
            <CardActionArea>
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.user.name}
                </Typography>
                <Rating name="read-only" value={props.rating} readOnly />
                <Typography color="textSecondary">
                    {new Date(props.time_created).toLocaleTimeString()}
                </Typography>
                <Typography variant="body2" component="p">
                    {props.text}
                </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
}