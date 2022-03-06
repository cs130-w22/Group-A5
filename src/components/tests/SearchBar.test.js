import { render, screen } from '@testing-library/react';
import SearchBar from '../SearchBar';

test('renders the search bar correctly', () => {
	render(<SearchBar />);
	//expect(screen.getByText(/Search/)).toBeInTheDocument();
	expect(screen.getByText(/Submit/)).toBeInTheDocument();
});
