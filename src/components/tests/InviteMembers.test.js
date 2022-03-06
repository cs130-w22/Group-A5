import { render, screen } from '@testing-library/react';
import InviteMembers from '../InviteMembers';

test('renders Invite Members button correctly', () => {
	render(<InviteMembers />);
	expect(screen.getByText(/Invite Members/)).toBeInTheDocument();
});
