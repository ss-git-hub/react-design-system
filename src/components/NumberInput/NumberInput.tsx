import React, { useRef, useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './NumberInput.module.scss';
import { Label, Text } from 'react-aria-components';
import Add from '../../assets/add_black_sm.svg';
import Remove from '../../assets/remove_black_sm.svg';

interface INumberInputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className' | 'style' | 'onChange'> {
	label: string;
	value: number;
	min?: number;
	max?: number;
	step?: number;
	disabled?: boolean;
	onChange: (value: number) => void;
	error?: string;
}

/**
 * A component for inputting a number with increment/decrement buttons.
 *
 * @prop {string} label The label for the input.
 * @prop {number} value The value of the input.
 * @prop {number} [min] The minimum value of the input.
 * @prop {number} [max] The maximum value of the input.
 * @prop {number} [step=1] The step size of the input.
 * @prop {boolean} [disabled=false] Whether the input is disabled.
 * @prop {(value: number) => void} onChange The function to call when the input value changes.
 * @prop {string} [error] The error message of the input.
 *
 * @example
 * <NumberInput label="Number of items" value={5} onChange={(value) => console.log(value)} />
 */
const NumberInput: React.FC<INumberInputProps> = ({
	label,
	value,
	min,
	max,
	step = 1,
	disabled = false,
	onChange,
	error,
}) => {
	const [isFocused, setIsFocused] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);

	const handleDecrement = () => {
		const newValue = typeof min === 'number' ? Math.max(value - step, min) : value - step;
		setIsFocused(true);
		onChange(newValue);
	};

	const handleIncrement = () => {
		const newValue = typeof max === 'number' ? Math.min(value + step, max) : value + step;
		setIsFocused(true);
		onChange(newValue);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const num = Number(e.target.value);
		if (!isNaN(num) && (min === undefined || num >= min) && (max === undefined || num <= max)) {
			onChange(num);
		} else if (e.target.value === '') {
			onChange?.(0);
		}
	};

	const handleBlur = (e: React.FocusEvent) => {
		if (wrapperRef.current && !wrapperRef.current.contains(e.relatedTarget as HTMLElement | null)) {
			setIsFocused(false);
		}
	};

	return (
		<div className={`${styles.numberInputWrapper}`}>
			<Label className={styles.label} htmlFor="input">
				{label}
			</Label>
			<div
				ref={wrapperRef}
				className={`${styles.buttonInputWrapper} ${disabled ? styles.disabled : ''} ${isFocused ? styles.focused : ''}`}
				onBlur={handleBlur}
				tabIndex={-1}>
				<Button
					size="sm"
					borderRadius={'4px'}
					variant="contained"
					color="secondary"
					iconOnly
					icon={<img src={Remove} alt="Remove" />}
					ariaLabel="Decrement"
					disabled={disabled || (typeof min === 'number' && value <= min)}
					onClick={handleDecrement}
				/>
				<Input
					value={String(value)}
					onChange={handleInputChange}
					type="number"
					border="none"
					width="44px"
					height="20px"
					padding="0"
					disabled={disabled}
					ariaLabel="Number input"
				/>
				<Button
					size="sm"
					borderRadius={'4px'}
					variant="contained"
					color="secondary"
					iconOnly
					icon={<img src={Add} alt="Add" />}
					ariaLabel="Increment"
					disabled={disabled || (typeof max === 'number' && value >= max)}
					onClick={handleIncrement}
				/>
			</div>
			{error && <Text className={styles.error}>{error}</Text>}
		</div>
	);
};

export default NumberInput;
