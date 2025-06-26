import React from 'react';
import { Input as AriaInput, Label, Text } from 'react-aria-components';
import type { InputProps as AriaInputProps } from 'react-aria-components';
import styles from './Input.module.scss';
import { InputSize, TextAlign } from '../../utils/types/input';

interface IInputProps extends Omit<AriaInputProps, 'className' | 'style'> {
	label?: string;
	name?: string;
	ariaLabel: string;
	value: string;
	placeholder?: string;
	disabled?: boolean;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	type?: string;
	required?: boolean;
	minLength?: number;
	maxLength?: number;
	inputSize?: InputSize;
	height?: string;
	width?: string;
	fontSize?: string;
	padding?: string;
	textAlign?: TextAlign;
	border?: string;
	error?: string;
}

/**
 * A basic input component.
 *
 * @prop {string} [label] - The label for the input.
 * @prop {string} [name] - The name of the input.
 * @prop {string} [ariaLabel] - The aria label of the input.
 * @prop {string} value - The value of the input.
 * @prop {string} [placeholder] - The placeholder of the input.
 * @prop {boolean} [disabled=false] - Whether the input is disabled.
 * @prop {(value: string) => void} [onChange] - The function to call when the input value changes.
 * @prop {string} [type=text] - The type of the input.
 * @prop {boolean} [required=false] - Whether the input is required.
 * @prop {number} [minLength] - The minimum length of the input value.
 * @prop {number} [maxLength] - The maximum length of the input value.
 * @prop {InputSize} [inputSize=md] - The size of the input.
 * @prop {string} [height] - The height of the input.
 * @prop {string} [width] - The width of the input.
 * @prop {string} [fontSize] - The font size of the input.
 * @prop {string} [padding] - The padding of the input.
 * @prop {string} [textAlign=center] {"left"| "right" |"center"} - The text alignment of the input.
 * @prop {string} [border] - The border of the input.
 * @prop {string} [error] - The error message of the input.
 *
 * @example
 * <Input label="Username" value="John Doe" onChange={(value) => console.log(value)} />
 */
const Input: React.FC<IInputProps> = ({
	label,
	name,
	ariaLabel,
	value,
	placeholder,
	disabled = false,
	onChange,
	onBlur,
	type = 'text',
	required = false,
	minLength,
	maxLength,
	inputSize = 'md',
	padding,
	textAlign = 'center',
	height,
	width,
	fontSize,
	border,
	error,
}) => {
	const customStyle: React.CSSProperties = {
		...(height ? { height } : {}),
		...(width ? { width } : {}),
		...(fontSize ? { fontSize } : {}),
		...(padding ? { padding } : {}),
		...(textAlign ? { textAlign } : {}),
		...(border ? { border } : {}),
	};

	const sizeClass = styles[inputSize];
	const inputClass = `${styles.input} ${sizeClass}`;

	return (
		<div className={styles.wrapper}>
			{label && (
				<Label className={styles.label} htmlFor={name || 'input'}>
					{label}
				</Label>
			)}
			<AriaInput
				className={inputClass}
				value={value}
				id={name || 'input'}
				name={name}
				aria-label={ariaLabel}
				placeholder={placeholder}
				disabled={disabled}
				type={type}
				onChange={onChange}
				onBlur={onBlur}
				aria-invalid={!!error}
				required={required}
				minLength={minLength}
				maxLength={maxLength}
				style={customStyle}
			/>
			{error && <Text className={styles.error}>{error}</Text>}
		</div>
	);
};

export default Input;
