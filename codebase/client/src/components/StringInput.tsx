import { useState } from 'react';
import { FormProps } from '../model/FormProps';
import { DNARegex } from '../templates/DNARegex';

function StringInput(props: FormProps) {
	const [disabled, setDisabled] = useState<boolean>(
		props.preDisabled === undefined ? false : props.preDisabled
	);
	const [statusText, setStatusText] = useState<string>(
		props.preState === undefined ? '?' : props.preState
	);
	const [input, setInput] = useState<string>(
		props.string === undefined || props.string === '' ? '' : props.string
	);

	function parseStrings() {
		if (!disabled) {
			let valid: boolean = DNARegex.test(input);
			props.updateSelf({
				id: props.id,
				text: input,
				valid: valid,
				type: 'upd',
				new: true,
			});

			setDisabled(true);
			setStatusText(checkInputStatus());
		} else {
			setDisabled(false);
			setStatusText('?');
		}
	}

	function checkInputStatus(): string {
		if (DNARegex.test(input)) return 'OK';
		else return 'NO';
	}

	return (
		<form>
			<input
				disabled={disabled}
				value={input}
				type='text'
				onInput={(e) => setInput(e.currentTarget.value)}
				placeholder='Inserisci una nuova stringa'
			/>
			<input
				type='submit'
				value={disabled ? 'Modifica' : 'Aggiungi'}
				onClick={(e) => {
					e.preventDefault();
					parseStrings();
				}}
			/>
			<div className={statusText + '-input-status input-status'}>
				<span>{statusText}</span>
			</div>
			<div
				onClick={() =>
					props.updateSelf({
						id: props.id,
						text: input,
						valid: false,
						type: 'del',
						new: true,
					})
				}
				className='delete-button'
			>
				<span>X</span>
			</div>
		</form>
	);
}

export default StringInput;
