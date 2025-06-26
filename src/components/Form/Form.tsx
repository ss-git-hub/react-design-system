import React, { useEffect, useState } from 'react';
import Input from '../Input/Input';
import NumberInput from '../NumberInput/NumberInput';
import Slider from '../Slider/Slider';
import Button from '../Button/Button';
import { IconPosition, ButtonType } from '../../utils/types/button';
import styles from './Form.module.scss';
import Delete from '../../assets/delete_primary.svg';

const MIN_INPUT_SIZE = 0;
const MAX_INPUT_SIZE = 100;

const Form: React.FC = () => {
	const [name, setName] = useState('');
	const [size, setSize] = useState(0);
	const [errors, setErrors] = useState({ name: '', size: '' });
	const [touched, setTouched] = useState({ name: false, size: false });
	const isFormValid = name.trim().length >= 3 && size > 0;
	const isFormEmpty = name.trim().length === 0 && size === 0;

	const handleClear = () => {
		setName('');
		setSize(0);
		setTouched({ name: false, size: false });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!isFormValid) return;
		window.alert(`Name: ${name}\nSize(GB): ${size}`);
	};

	const handleBlur = (field: 'name' | 'size') => {
		setTouched((prev) => ({ ...prev, [field]: true }));
	};

	useEffect(() => {
		setErrors({
			name: name.trim().length < 3 ? 'Name must be at least 3 characters' : '',
			size: size <= 0 ? 'Size must be greater than 0' : '',
		});
	}, [name, size]);

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<div className={styles.inputs}>
				<Input
					label="Name"
					name="name"
					ariaLabel="Name input"
					textAlign="left"
					value={name}
					placeholder="enter name"
					onChange={(e) => setName(e.target.value)}
					onBlur={() => handleBlur('name')}
					required
					minLength={3}
					maxLength={20}
					error={touched.name && errors.name ? errors.name : ''}
				/>
				<div className={styles.rowGroup}>
					<NumberInput label="Size (GB)" value={size} min={MIN_INPUT_SIZE} max={MAX_INPUT_SIZE} onChange={setSize} />
					<div style={{ marginBottom: '0.75rem' }}>
						<Slider ariaLabel="slider" min={MIN_INPUT_SIZE} max={MAX_INPUT_SIZE} value={size} onChange={setSize} />
					</div>
				</div>
			</div>
			<div className={styles.actions}>
				<Button
					size="md"
					width={'135.5px'}
					variant="outlined"
					color="primary"
					iconPosition={IconPosition.Left}
					icon={<img alt="clear" src={Delete} />}
					type={ButtonType.Button}
					disabled={isFormEmpty}
					ariaLabel="Clear form"
					onClick={handleClear}>
					Clear
				</Button>
				<Button
					size="md"
					width={'135.5px'}
					variant="contained"
					color="primary"
					type={ButtonType.Submit}
					disabled={!isFormValid}
					ariaLabel="Submit form">
					Submit
				</Button>
			</div>
		</form>
	);
};

export default Form;
