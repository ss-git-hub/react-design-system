import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Slider from './Slider';

describe('Slider Component', () => {
	const mockOnChange = jest.fn();
	const baseProps = {
		value: 50,
		onChange: mockOnChange,
		ariaLabel: 'Test Slider',
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders with default props', () => {
		const { container } = render(<Slider {...baseProps} />);
		const slider = screen.getByRole('slider');
		expect(slider).toBeInTheDocument();
		expect(slider).toHaveAccessibleName('Test Slider');
		const input = container.querySelector('input[type="range"]') as HTMLInputElement;
		expect(input.value).toBe('50'); // The actual DOM value
	});

	it('displays label when provided', () => {
		render(<Slider {...baseProps} label="Volume" />);
		expect(screen.getByText('Volume')).toBeInTheDocument();
	});

	it('calls onChange when value changes', () => {
		render(<Slider {...baseProps} />);
		const slider = screen.getByRole('slider');

		fireEvent.change(slider, { target: { value: '60' } });
		expect(mockOnChange).toHaveBeenCalledWith(60);
	});

	it('respects min and max values', () => {
		const { container } = render(<Slider {...baseProps} min={10} max={90} value={50} />);
		const input = container.querySelector('input[type="range"]') as HTMLInputElement;

		expect(input.min).toBe('10');
		expect(input.max).toBe('90');
	});

	it('uses custom step value', () => {
		render(<Slider {...baseProps} step={5} />);
		const slider = screen.getByRole('slider');

		fireEvent.change(slider, { target: { value: '55' } });
		expect(mockOnChange).toHaveBeenCalledWith(55);
	});
});
