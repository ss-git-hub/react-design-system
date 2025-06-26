import React from 'react';
import { Button as AriaButton } from 'react-aria-components';
import type { ButtonProps as AriaButtonProps } from 'react-aria-components';
import styles from './Button.module.scss';
import { IconPosition, ButtonType, ButtonSize, ButtonVariant, ButtonColor } from '../../utils/types/button';

interface IButtonProps extends Omit<AriaButtonProps, 'className' | 'style'> {
	size?: ButtonSize;
	variant: ButtonVariant;
	color: ButtonColor;
	children?: React.ReactNode;
	icon?: React.ReactNode;
	iconPosition?: IconPosition;
	iconOnly?: boolean;
	disabled?: boolean;
	onClick?: () => void;
	borderRadius?: string;
	type?: ButtonType;
	width?: string;
	height?: string;
	ariaLabel: string;
	rest?: React.HTMLAttributes<HTMLButtonElement>;
}

/**
 * A basic button component.
 *
 * @prop {string} {"sm"|"md"} [size=md] - The size of the button.
 * @prop {string} variant - The variant of the button. Should be either 'contained' or 'outlined'.
 * @prop {string} color - The color of the button. Should be either 'primary' or 'secondary'.
 * @prop {React.ReactNode} children - The content of the button.
 * @prop {React.ReactNode} [icon] - The icon of the button.
 * @prop {IconPosition} [iconPosition=left] - The position of the icon. Should be either 'left' or 'right'.
 * @prop {boolean} [iconOnly=false] - Whether the button should only display an icon.
 * @prop {boolean} [disabled=false] - Whether the button is disabled.
 * @prop {(event: React.MouseEvent<HTMLButtonElement>) => void} [onClick] - The function to call when the button is clicked.
 * @prop {string } [borderRadius=8] - The border radius of the button.
 * @prop {ButtonType} [type=button] - The type of the button. Should be either 'button', 'submit', or 'reset'.
 * @prop {string} [width] - The width of the button. When omitted, button width is determined by content or parent container.
 * @prop {string} [height] - The height of the button.
 * @prop {string} [ariaLabel] - The aria label of the button. Used for icon-only buttons.
 *
 * @example
 * <Button variant="contained" color="primary" onClick={() => console.log('clicked')}>Click me!</Button>
 */
const Button: React.FC<IButtonProps> = ({
	size = '',
	variant,
	color,
	children,
	icon,
	iconPosition,
	iconOnly = false,
	disabled = false,
	onClick,
	borderRadius = 8,
	type = ButtonType.Button,
	width,
	height,
	ariaLabel,
	...rest
}) => {
	const iconLeftClass = iconPosition === 'left' ? styles[`icon-left-${size}`] : '';
	const iconRightClass = iconPosition === 'right' ? styles[`icon-right-${size}`] : '';
	const iconOnlyClass = iconOnly ? styles['icon-only'] : '';
	const className = `${styles.button} ${styles[size]} ${styles[variant]} ${styles[color]} ${iconLeftClass} ${iconRightClass} ${iconOnlyClass}`;

	const customStyle: React.CSSProperties = {
		...(width ? { width } : {}),
		...(height ? { height } : {}),
		...(borderRadius ? { borderRadius } : {}),
	};

	return (
		<AriaButton
			className={className}
			style={customStyle}
			isDisabled={disabled}
			onClick={onClick}
			type={type}
			aria-label={
				iconOnly ? ariaLabel || 'icon button' : ariaLabel || (typeof children === 'string' ? children : undefined)
			}
			{...rest}>
			{iconOnly ? (
				<span className={styles.icon}>{icon}</span>
			) : (
				<>
					{iconPosition === IconPosition.Left && icon && <span className={styles.icon}>{icon}</span>}
					{children}
					{iconPosition === IconPosition.Right && icon && <span className={styles.icon}>{icon}</span>}
				</>
			)}
		</AriaButton>
	);
};

export default Button;
