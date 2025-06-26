import React from 'react';
import { Slider as AriaSlider, Label, SliderThumb, SliderTrack } from 'react-aria-components';
import type { SliderProps as AriaSliderProps } from 'react-aria-components';
import styles from './Slider.module.scss';

interface SliderProps extends Omit<AriaSliderProps, 'className' | 'style' | 'onChange'> {
	label?: string;
	min?: number;
	max?: number;
	step?: number;
	value: number;
	onChange: (value: number) => void;
	disabled?: boolean;
	ariaLabel: string;
}

/**
 * A basic slider component.
 *
 * @prop {string} [label] - The label for the slider.
 * @prop {number} [min=0] - The minimum value of the slider.
 * @prop {number} [max=100] - The maximum value of the slider.
 * @prop {number} [step=1] - The step size of the slider.
 * @prop {number} value - The value of the slider.
 * @prop {(value: number) => void} onChange - The function to call when the slider value changes.
 * @prop {boolean} [disabled=false] - Whether the slider is disabled.
 * @prop {string} [ariaLabel] - The aria-label for the slider.
 *
 * @example
 * <Slider value={50} onChange={(value) => console.log(value)} />
 */
const Slider: React.FC<SliderProps> = ({
	label,
	min = 0,
	max = 100,
	step = 1,
	value,
	onChange,
	disabled = false,
	ariaLabel,
}) => {
	return (
		<div className={styles.wrapper}>
			{label && <Label className={styles.label}>{label}</Label>}
			<AriaSlider
				className={styles.slider}
				minValue={min}
				maxValue={max}
				step={step}
				value={value}
				onChange={onChange}
				aria-label={ariaLabel}
				isDisabled={disabled}>
				<SliderTrack className={`${styles.track}`}>
					<SliderThumb className={styles.thumb} />
				</SliderTrack>
			</AriaSlider>
		</div>
	);
};

export default Slider;
