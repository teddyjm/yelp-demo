import axios, { AxiosInstance } from 'axios';

export type YelpBusiness = {
    rating: number,
    image_url: string,
    name: string,
    id: string
}

export type YelpBusinessSearchResult = {
    total: number,
    businesses: YelpBusiness[]
}

export type YelpReview = {
    id: string,
    rating: number,
    text: string,
    time_created: string,
    user: YelpUser
}

export type YelpUser = {
    id: string,
    name: string
}

export class YelpApi {
    // normally the api key would be hidden on the backend and there would also not be any cors issues to workaround
    // this implementation is a simplificaiton, not a desired solution

    private apiKey: string = 'JLt48hqsfzYTOT6j1hmzlkhsfXuIjfpQYNOjiw-nYe8zn51lCX8KRZCE5D-392dPGDVdx1TehOBQs8EgSaLqrUERA0bDBnFu5neBKK9A35Jh7jIavzj4qj5cs17NXXYx';

    axiosClient: AxiosInstance = axios.create({
        headers: {
            'Authorization': `Bearer ${this.apiKey}`
        }
    });

    Search = async (where: string, what?: string) => {
        let url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${where}`;
        if (what) {
            url += `&term=${what}`;
        }

        let response = await this.axiosClient.get(url);
        return response.data as YelpBusinessSearchResult;
    };

    Get = async (id: string) => {
        let url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}`;
        let response = await this.axiosClient.get(url);
        return response.data as YelpBusiness;
    };

    GetReviews = async (id: string) => {
        let url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}/reviews`;
        let response = await this.axiosClient.get(url);
        return response.data.reviews as YelpReview[];
    };
}

export default YelpApi;