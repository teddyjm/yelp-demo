import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import axios from 'axios'
import YelpApi from '../components/apis/YelpApi'

jest.mock('axios')
const axiosMock = axios as jest.Mocked<typeof axios>;

const setup = () => {
    axiosMock.get.mockResolvedValue({ data: {} });

    const yelpApi = new YelpApi();
    yelpApi.axiosClient = axiosMock;

    return {axiosMock, yelpApi}
}

test('search by where only', async () => {
    const where = "Poznan";
    const expectedUrl = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${where}`;

    const { axiosMock, yelpApi } = setup();
    
    await yelpApi.Search(where);

    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(axiosMock.get).toHaveBeenCalledWith(expectedUrl);
});

test('search by where and what', async () => {
    const where = "Poznan";
    const what = "Restaurant";
    const expectedUrl = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${where}&term=${what}`;

    const { axiosMock, yelpApi } = setup();

    await yelpApi.Search(where, what);

    expect(axiosMock.get).toHaveBeenCalled();
    expect(axiosMock.get).toHaveBeenCalledWith(expectedUrl);
});

test('get details', async () => {
    const id = "asdfasdf345rt3tfvsdaf";
    const expectedUrl = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}`;

    const { axiosMock, yelpApi } = setup();

    await yelpApi.Get(id);

    expect(axiosMock.get).toHaveBeenCalled();
    expect(axiosMock.get).toHaveBeenCalledWith(expectedUrl);
});

test('get details', async () => {
    const id = "asdfasdf345rt3tfvsdaf";
    const expectedUrl = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}/reviews`;

    const { axiosMock, yelpApi } = setup();

    await yelpApi.GetReviews(id);

    expect(axiosMock.get).toHaveBeenCalled();
    expect(axiosMock.get).toHaveBeenCalledWith(expectedUrl);
});