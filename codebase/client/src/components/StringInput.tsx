import { useState } from 'react';
import { StringInputProps } from '../model/StringInputProps';
import { DNARegex } from '../templates/DNARegex';

function StringInput(props: StringInputProps) {
	const [disabled, setDisabled] = useState<boolean>(false);
	const [status, setStatus] = useState<string>('?');
	const [input, setInput] = useState<string>(
		props.string === undefined || props.string === '' ? '' : props.string
	);

	const [former, setFormer] = useState<String>();

	function parseStrings() {
		if (!disabled) {
			console.log(input == former);

			if (input == former) props.setStrings([...props.strings]);
			else {
				let tempStrings = props.strings.filter(
					(string) => former != string
				);
				props.setStrings([...tempStrings, input]);
			}

			setDisabled(true);
			setStatus(checkInputStatus());
			setFormer(input);
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
		</form>
	);
}

export default StringInput;
