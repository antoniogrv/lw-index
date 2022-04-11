import { useState } from 'react';
import { idText } from 'typescript';
import { FormProps } from '../model/FormProps';
import { DNARegex } from '../templates/DNARegex';

function StringInput(props: FormProps) {
	const [disabled, setDisabled] = useState<boolean>(false);
	const [status, setStatus] = useState<string>('?');
	const [input, setInput] = useState<string>(
		props.string === undefined || props.string === '' ? '' : props.string
	);

	function parseStrings() {
		if (!disabled) {
			props.updateSelf({ id: props.id, text: input, type: 'upd' });

			setDisabled(true);
			setStatus(checkInputStatus());
		} else {
			setDisabled(false);
			setStatus('?');
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
			<div className={status + '-input-status input-status'}>
				<span>{status}</span>
			</div>
			<div
				onClick={() =>
					props.updateSelf({ id: props.id, text: input, type: 'del' })
				}
				className='delete-button'
			>
				<span>X</span>
			</div>
		</form>
	);
}

export default StringInput;
