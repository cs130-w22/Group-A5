import { render, screen } from '@testing-library/react';
import Header from '../header';

test('renders search bar text correctly', () => {
	render(<Header />);
	expect(screen.getByText(/Search/)).toBeInTheDocument();
});
