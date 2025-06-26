import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from './Form';

// Mock SVG imports
jest.mock('../../assets/add_black_sm.svg', () => ({
	ReactComponent: () => <div data-testid="add-icon" />,
	default: () => 'add-icon',
}));

jest.mock('../../assets/remove_black_sm.svg', () => ({
	ReactComponent: () => <div data-testid="remove-icon" />,
	default: () => 'remove-icon',
}));

jest.mock('../../assets/delete_primary.svg', () => ({
	ReactComponent: () => <div data-testid="delete-icon" />,
	default: () => 'delete-icon',
}));

describe('Form Component', () => {
	it('renders form with all inputs', () => {
		render(<Form />);
		expect(screen.getByLabelText('Name')).toBeInTheDocument();
		expect(screen.getByLabelText('Size (GB)')).toBeInTheDocument();
		expect(screen.getByRole('slider')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Clear form' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Submit form' })).toBeInTheDocument();
	});

	it('validates name field', async () => {
		render(<Form />);
		const nameInput = screen.getByLabelText('Name');

		// Test minimum length validation
		fireEvent.change(nameInput, { target: { value: 'ab' } });
		fireEvent.blur(nameInput);
		expect(await screen.findByText('Name must be at least 3 characters')).toBeInTheDocument();

		// Test valid input
		fireEvent.change(nameInput, { target: { value: 'valid name' } });
		expect(screen.queryByText('Name must be at least 3 characters')).not.toBeInTheDocument();
	});

	it('enables submit button when form is valid', () => {
		render(<Form />);
		const submitButton = screen.getByRole('button', { name: 'Submit form' });
		expect(submitButton).toBeDisabled();

		// Make form valid
		fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'valid name' } });
		fireEvent.change(screen.getByLabelText('Size (GB)'), { target: { value: '10' } });

		expect(submitButton).not.toBeDisabled();
	});

	it('clears form when clear button is clicked', () => {
		render(<Form />);

		// Fill out form
		fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'test' } });
		fireEvent.change(screen.getByLabelText('Size (GB)'), { target: { value: '10' } });

		// Click clear
		fireEvent.click(screen.getByRole('button', { name: 'Clear form' }));

		// Verify cleared state
		expect(screen.getByLabelText('Name')).toHaveValue('');
		expect(screen.getByLabelText('Size (GB)')).toHaveValue(0);
	});
});
