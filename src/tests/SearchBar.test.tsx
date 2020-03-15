import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBar from '../components/common/SearchBar';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from "history";

const setup = () => {
    const history = createMemoryHistory();
    const { getByText, getByTestId } = render(
        <Router history={history}>
            <SearchBar />
        </Router>
    );
    const searchButton = getByText('Search');
    const whereSearchTextBox = getByTestId('textfield_where');
    const whatSearchTextBox = getByTestId('textfield_what');

    return { searchButton, whereSearchTextBox, whatSearchTextBox, history }
}

it('clicking search bar causes redirection', () => {
    const { searchButton, whereSearchTextBox, whatSearchTextBox, history } = setup();

    fireEvent.change(whereSearchTextBox, { target: { value: 'Poznan' } });
    fireEvent.change(whatSearchTextBox, { target: { value: 'Restaurant' } });
    fireEvent.click(searchButton);

    expect(history.location.pathname).toBe('/places/Poznan/Restaurant');
});

it('clicking search bar with where only', () => {
    const { searchButton, whereSearchTextBox, whatSearchTextBox, history } = setup();

    fireEvent.change(whereSearchTextBox, { target: { value: 'Poznan' } });
    fireEvent.click(searchButton);

    expect(history.location.pathname).toBe('/places/Poznan/');
});

it('clicking without where doesnt redirect', () => {
    const { searchButton, whereSearchTextBox, whatSearchTextBox, history } = setup();

    fireEvent.click(searchButton);

    expect(history.location.pathname).toBe('/');
});