import { fireEvent, render, screen } from '@testing-library/react';
import NumberInput from './NumberInput';

// Mock SVG imports
jest.mock('../../assets/add_black_sm.svg', () => ({
	ReactComponent: () => <div data-testid="add-icon" />,
	default: () => 'add-icon',
}));

jest.mock('../../assets/remove_black_sm.svg', () => ({
	ReactComponent: () => <div data-testid="remove-icon" />,
	default: () => 'remove-icon',
}));

describe('NumberInput Component', () => {
	const mockOnChange = jest.fn();
	const baseProps = {
		label: 'Test Input',
		value: 5,
		onChange: mockOnChange,
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders with label, value, and buttons', () => {
		render(<NumberInput {...baseProps} />);

		expect(screen.getByText('Test Input')).toBeInTheDocument();
		expect(screen.getByDisplayValue('5')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Decrement' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Increment' })).toBeInTheDocument();
	});

	it('increases and decreases value when buttons are clicked', () => {
		render(<NumberInput {...baseProps} />);

		fireEvent.click(screen.getByRole('button', { name: 'Increment' }));
		expect(mockOnChange).toHaveBeenCalledWith(6);

		// Reset mock
		mockOnChange.mockClear();

		fireEvent.click(screen.getByRole('button', { name: 'Decrement' }));
		expect(mockOnChange).toHaveBeenCalledWith(4);
	});

	it('respects min and max values', () => {
		render(<NumberInput {...baseProps} value={10} min={10} max={20} />);

		// Shouldn't decrement below min (button should be disabled)
		const decrementBtn = screen.getByRole('button', { name: 'Decrement' });
		expect(decrementBtn).toBeDisabled();

		// Should increment normally
		fireEvent.click(screen.getByRole('button', { name: 'Increment' }));
		expect(mockOnChange).toHaveBeenCalledWith(11);
	});

	it('handles direct number input', () => {
		render(<NumberInput {...baseProps} />);

		const input = screen.getByDisplayValue('5');
		fireEvent.change(input, { target: { value: '15' } });
		expect(mockOnChange).toHaveBeenCalledWith(15);
	});

	it('disables all controls when disabled prop is true', () => {
		render(<NumberInput {...baseProps} disabled={true} />);

		expect(screen.getByDisplayValue('5')).toBeDisabled();
		expect(screen.getByRole('button', { name: 'Increment' })).toBeDisabled();
		expect(screen.getByRole('button', { name: 'Decrement' })).toBeDisabled();
	});
});
