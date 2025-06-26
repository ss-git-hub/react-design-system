import { fireEvent, render, screen } from '@testing-library/react';
import { IconPosition } from '../../utils/types/button';
import Button from './Button';
import styles from './Button.module.scss';

describe('Button component', () => {
	it('renders a basic button with text', () => {
		render(
			<Button variant={'contained'} color={'primary'} ariaLabel="Test Button">
				Click Me
			</Button>,
		);

		const button = screen.getByRole('button', { name: 'Test Button' });
		expect(button).toBeInTheDocument();
		expect(button).toHaveClass(styles.button);
		expect(button).toHaveClass(styles.contained);
		expect(button).toHaveClass(styles.primary);
	});

	it('renders a disabled button', () => {
		render(
			<Button variant={'contained'} color={'primary'} disabled={true} ariaLabel="Disabled Button">
				Disabled
			</Button>,
		);

		const button = screen.getByRole('button');
		expect(button).toBeDisabled();
	});

	it('renders button with icon on the left', () => {
		const icon = <span data-testid="icon">Icon</span>;
		render(
			<Button
				variant={'contained'}
				color={'primary'}
				icon={icon}
				iconPosition={IconPosition.Left}
				ariaLabel="Button with left icon">
				Text
			</Button>,
		);

		const button = screen.getByRole('button');
		const iconElement = screen.getByTestId('icon');
		expect(button).toContainElement(iconElement);
	});

	it('renders button with icon on the right', () => {
		const icon = <span data-testid="icon">Icon</span>;
		render(
			<Button
				variant={'contained'}
				color={'primary'}
				icon={icon}
				iconPosition={IconPosition.Right}
				ariaLabel="Button with right icon">
				Text
			</Button>,
		);

		const button = screen.getByRole('button');
		const iconElement = screen.getByTestId('icon');
		expect(button).toContainElement(iconElement);
	});

	it('renders icon-only button', () => {
		const icon = <span data-testid="icon">Icon</span>;
		render(<Button variant={'contained'} color={'primary'} icon={icon} iconOnly={true} ariaLabel="Icon only button" />);

		const button = screen.getByRole('button', { name: 'Icon only button' });
		const iconElement = screen.getByTestId('icon');
		expect(button).toContainElement(iconElement);
		expect(button.childNodes.length).toBe(1);
	});

	it('applies custom styles', () => {
		render(
			<Button
				variant={'contained'}
				color={'primary'}
				width="200px"
				height="50px"
				borderRadius="10px"
				ariaLabel="Styled Button">
				Styled
			</Button>,
		);

		const button = screen.getByRole('button');
		expect(button).toHaveStyle({
			width: '200px',
			height: '50px',
			borderRadius: '10px',
		});
	});

	it('calls onClick handler when clicked', () => {
		const onClick = jest.fn();
		const { getByText } = render(
			<Button variant="contained" color="primary" ariaLabel="Click me!" onClick={onClick}>
				Click me!
			</Button>,
		);
		const button = getByText('Click me!');
		fireEvent.click(button);
		expect(onClick).toHaveBeenCalledTimes(1);
	});

	it('does not call onClick handler when disabled', () => {
		const onClick = jest.fn();
		const { getByText } = render(
			<Button variant="contained" color="primary" ariaLabel="Test Button" onClick={onClick} disabled>
				Click me!
			</Button>,
		);
		const button = getByText('Click me!');
		fireEvent.click(button);
		expect(onClick).not.toHaveBeenCalled();
	});

	it('has correct aria-label', () => {
		const { getByRole } = render(
			<Button variant="contained" color="primary" ariaLabel="My button">
				Click me!
			</Button>,
		);
		const button = getByRole('button');
		expect(button).toHaveAttribute('aria-label', 'My button');
	});

	it('has correct aria-label when icon only', () => {
		const { getByRole } = render(
			<Button variant="contained" color="primary" icon={<div>Icon</div>} iconOnly ariaLabel="My icon button" />,
		);
		const button = getByRole('button');
		expect(button).toHaveAttribute('aria-label', 'My icon button');
	});
});
