import { useEffect, useState } from 'react';
import { MacroGraphProps } from '../../model/MacroGraphProps';
import ComputedGraph from './ComputedGraph';
import StringInput from '../StringInput';
import { FormProps } from '../../model/FormProps';

function MacroGraph(props: MacroGraphProps) {
	const [strings, setStrings] = useState<string[]>([]);
	const [fid, setFid] = useState(0);
	const [forms, setForms] = useState<FormProps[]>([]);

	const [updateReq, setUpdateReq] = useState<{
		id: number;
		text: string;
		valid: boolean;
		type: string;
	}>({ id: 0, text: '', type: '', valid: false });

	const BlankForm: FormProps = {
		id: fid,
		string: '',
		updateSelf: setUpdateReq,
		valid: false,
	};

	const [renderedForms, setRenderedForms] = useState<React.ReactElement[]>(
		[]
	);

	useEffect(() => {
		let temp: FormProps[] = [];

		if (updateReq.type === 'del') {
			temp = forms.filter((form) => form.id !== updateReq?.id);
		} else if (updateReq.type === 'upd') {
			temp = forms.map(function (form) {
				return {
					...BlankForm,
					id: form.id,
					string:
						form.id === updateReq?.id
							? updateReq.text
							: form.string,
					valid:
						form.id === updateReq?.id
							? updateReq.valid
							: form.valid,
				};
			});
		}

		setForms(temp);
	}, [updateReq]);

	useEffect(() => {
		let tempRenderedForms: React.ReactElement[] = [];
		let tempStrings: string[] = [];

		printForms();

		forms.forEach((form) => {
			tempRenderedForms.push(<StringInput key={form.id} {...form} />);
			if (form.valid) tempStrings.push(form.string);
		});

		setRenderedForms(tempRenderedForms);
		setStrings(tempStrings);
	}, [forms]);

	function drawGraph() {
		printForms();
	}

	function printForms() {
		console.log('Printing forms...');
		forms.forEach((form) =>
			console.log('ID: ' + form.id + ' - String: ' + form.string)
		);
	}

	return (
		<div className='graph-window macro-graph'>
			<div className='macro-graph-title'>Grafico {props.graph.id}</div>

			<ComputedGraph graph={props.graph} />

			<div className='macro-data'>
				<div className='macro-strings'>
					<div className='macro-block-title'>Stringhe</div>
					{renderedForms}
					<div className='macro-buttons'>
						<div
							className='macro-button macro-button-compute'
							onClick={() => drawGraph()}
						>
							Computa
						</div>
						<div
							className='macro-button'
							onClick={() => {
								setFid(fid + 1);
								setForms([
									...forms,
									{
										...BlankForm,
										id: fid,
										string: fid.toString(),
									},
								]);
							}}
						>
							Inserisci
						</div>
					</div>
				</div>

				<div className='macro-compute'>
					<div className='macro-block-title'>Elaborazione</div>
					{strings.join(', ')}
				</div>
			</div>
		</div>
	);
}

export default MacroGraph;
