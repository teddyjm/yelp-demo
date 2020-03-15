import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

it('renders search bar', () => {
    const { getByText, getByTestId } = render(<App />);
    const title = getByText(/Yelp search/);
    const searchButton = getByText('Search');
    const whereSearchTextBox = getByTestId('textfield_where');
    const whatSearchTextBox = getByTestId('textfield_what');

    expect(title).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(whatSearchTextBox).toBeInTheDocument();
    expect(whatSearchTextBox).toHaveValue('');
    expect(whereSearchTextBox).toBeInTheDocument();
    expect(whereSearchTextBox).toHaveValue('');
    
});
