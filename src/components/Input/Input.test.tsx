import { fireEvent, render, screen } from '@testing-library/react';
import Input from './Input';
import styles from './Input.module.scss';

describe('Input Component', () => {
	const mockOnChange = jest.fn();
	const mockOnBlur = jest.fn();
	const testProps = {
		label: 'Test Label',
		name: 'test-input',
		ariaLabel: 'Test Input',
		value: '',
		placeholder: 'Enter text',
		onChange: mockOnChange,
		onBlur: mockOnBlur,
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders with basic props', () => {
		render(<Input {...testProps} />);

		const input = screen.getByRole('textbox');
		const label = screen.getByText('Test Label');

		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute('name', 'test-input');
		expect(input).toHaveAttribute('aria-label', 'Test Input');
		expect(input).toHaveAttribute('placeholder', 'Enter text');
		expect(label).toBeInTheDocument();
	});

	it('handles onChange event', () => {
		render(<Input {...testProps} />);

		const input = screen.getByRole('textbox');
		fireEvent.change(input, { target: { value: 'new value' } });

		expect(mockOnChange).toHaveBeenCalledTimes(1);
	});

	it('handles onBlur event', () => {
		render(<Input {...testProps} />);

		const input = screen.getByRole('textbox');
		fireEvent.blur(input);

		expect(mockOnBlur).toHaveBeenCalledTimes(1);
	});

	it('renders disabled state', () => {
		render(<Input {...testProps} disabled={true} />);

		const input = screen.getByRole('textbox');
		expect(input).toBeDisabled();
	});

	it('applies correct classes based on size', () => {
		const { rerender } = render(<Input {...testProps} inputSize={'sm'} />);
		expect(screen.getByRole('textbox')).toHaveClass(styles.sm);

		rerender(<Input {...testProps} inputSize={'md'} />);
		expect(screen.getByRole('textbox')).toHaveClass(styles.md);
	});

	it('applies custom styles', () => {
		render(
			<Input
				{...testProps}
				height="50px"
				width="200px"
				fontSize="16px"
				padding="10px"
				textAlign={'left'}
				border="1px solid red"
			/>,
		);

		const input = screen.getByRole('textbox');
		expect(input).toHaveStyle({
			height: '50px',
			width: '200px',
			fontSize: '16px',
			padding: '10px',
			textAlign: 'left',
			border: '1px solid red',
		});
	});

	it('shows error message when error prop is provided', () => {
		render(<Input {...testProps} error="Invalid input" />);

		const errorMessage = screen.getByText('Invalid input');
		const input = screen.getByRole('textbox');

		expect(errorMessage).toBeInTheDocument();
		expect(errorMessage).toHaveClass(styles.error);
		expect(input).toHaveAttribute('aria-invalid', 'true');
	});

	it('renders without label when not provided', () => {
		render(<Input {...testProps} label={undefined} />);

		const label = screen.queryByText('Test Label');
		expect(label).not.toBeInTheDocument();
	});

	it('applies required attribute', () => {
		render(<Input {...testProps} required={true} />);

		const input = screen.getByRole('textbox');
		expect(input).toBeRequired();
	});

	it('applies minLength and maxLength attributes', () => {
		render(<Input {...testProps} minLength={2} maxLength={10} />);

		const input = screen.getByRole('textbox');
		expect(input).toHaveAttribute('minLength', '2');
		expect(input).toHaveAttribute('maxLength', '10');
	});

	it('renders different input types', () => {
		const { rerender } = render(<Input {...testProps} type="email" />);
		expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');

		rerender(<Input {...testProps} type="password" label="Test Label" />);
		const passwordInput = screen.getByLabelText('Test Label');
		expect(passwordInput).toHaveAttribute('type', 'password');

		rerender(<Input {...testProps} type="number" />);
		expect(screen.getByRole('spinbutton')).toBeInTheDocument();
	});

	it('uses name as id when provided', () => {
		render(<Input {...testProps} name="custom-id" />);
		expect(screen.getByRole('textbox')).toHaveAttribute('id', 'custom-id');
	});

	it('falls back to default id when name not provided', () => {
		render(<Input {...testProps} name={undefined} />);
		expect(screen.getByRole('textbox')).toHaveAttribute('id', 'input');
	});
});
