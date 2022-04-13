import { useEffect, useState } from 'react';
import { MacroGraphProps } from '../../model/MacroGraphProps';
import ComputedGraph from './ComputedGraph';
import StringInput from '../StringInput';
import { FormProps } from '../../model/FormProps';
import { COMPUTE_GRAPH_ENDPOINT } from '../../templates/Endpoints';
import { GraphData } from '../../model/GraphData';
import { SyncLoader } from 'react-spinners';
import { Quality } from '../../model/Quality';
import QualityGraph from './QualityGraph';
import { QualityGraphProps } from '../../model/QualityGraphProps';

function MacroGraph(props: MacroGraphProps) {
	const [strings, setStrings] = useState<string[]>([]);
	const [fid, setFid] = useState(0);
	const [forms, setForms] = useState<FormProps[]>([]);
	const [computeRequest, setComputeRequest] = useState<{
		strings: string[];
		algo: string;
	}>();
	const [result, setResult] = useState<GraphData[]>();
	const [quality, setQuality] = useState<Quality>();

	const [updateReq, setUpdateReq] = useState<{
		id: number;
		text: string;
		valid: boolean;
		type: string;
		new?: boolean;
	}>({ id: 0, text: '', type: '', valid: false, new: false });

	const [renderedForms, setRenderedForms] = useState<React.ReactElement[]>(
		[]
	);

	const [qualityGraphProps, setQualityGraphProps] =
		useState<QualityGraphProps>({ data: [] });

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const BlankForm: FormProps = {
		id: fid,
		string: '',
		updateSelf: setUpdateReq,
		valid: false,
	};

	useEffect(() => {
		setResult(props.graph.data);
		setQualityGraphProps(props.qualityGraphProps);
		props.qualityGraphProps &&
			setQualityGraphProps(props.qualityGraphProps);
	}, []);

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

		forms.forEach((form) => {
			tempRenderedForms.push(<StringInput key={form.id} {...form} />);
			if (form.valid) tempStrings.push(form.string);
		});

		console.log('Updating rendered forms');
		console.log(forms);

		setRenderedForms(tempRenderedForms);
		setStrings(tempStrings);
	}, [forms]);

	function drawGraph() {
		if (strings.length >= 2) {
			setIsLoading(true);

			setComputeRequest({
				strings: strings,
				algo: 'scMAW',
			});
		} else if (strings.length == 1) {
			props.alert(
				'Per computare il grafico, servono almeno due stringhe valide.'
			);
		} else {
			props.alert('Inserisci delle stringhe per computare il grafico.');
		}
	}

	useEffect(() => {
		if (computeRequest?.strings.length) {
			fetch(COMPUTE_GRAPH_ENDPOINT, {
				method: 'POST',
				body: JSON.stringify(computeRequest),
				headers: new Headers({
					'Content-Type': 'application/json',
					Accept: 'application/json',
				}),
			})
				.then((responsePlain) => responsePlain.json())
				.then((responseJSON) => {
					setResult(responseJSON.graphData);
					setQuality(responseJSON.quality);

					/*setTimeout(
						() => props.alert('Grafico computato con successo!'),
						1000
					);*/

					setIsLoading(false);
				});
		}
	}, [computeRequest]);

	useEffect(() => {
		if (quality !== undefined) {
			let tempQualityGraphPropsData: Quality[] = [];

			tempQualityGraphPropsData.push(...qualityGraphProps.data, {
				...quality,
				algo: props.graph.algo,
			});

			console.log('New Quality');
			console.log(tempQualityGraphPropsData);

			setQualityGraphProps({ data: tempQualityGraphPropsData });
			props.setQualityGraphProps(qualityGraphProps);
		}
	}, [quality]);

	useEffect(() => {
		let tempGraphs = props.graphs
			.filter((graph) => graph.id !== props.graph.id)
			.map((graph) => {
				return {
					...graph,
					isDeletable: false,
					isAnalyzable: false,
				};
			});

		let isEmpty = result !== undefined ? false : true;

		console.log(strings);

		let thisGraph = {
			...props.graph,

			isDeletable: false,
			isAnalyzable: false,
			isEmpty: isEmpty,

			data: result,
		};

		if (!updateReq.new) {
			let tempForms: FormProps[] = [];

			if (props.graph.data != null) {
				let i: number = 0;

				props.graph.data.forEach((graph) => {
					console.log(0);

					tempForms.push({
						...BlankForm,
						id: i++,
						string: graph.string,
						valid: true,
						preDisabled: true,
						preState: 'OK',
					});

					setFid(fid + 4);
				});

				setForms(tempForms);
			}
		}

		props.setGraphs([thisGraph, ...tempGraphs]);
	}, [result]);

	function printForms() {
		console.log('Printing forms...');
		forms.forEach((form) =>
			console.log('ID: ' + form.id + ' - String: ' + form.string)
		);
	}

	return (
		<div className='graph-window macro-graph'>
			{isLoading && (
				<div className='macro-loading'>
					<SyncLoader />
				</div>
			)}
			<div className={isLoading ? 'loading' : ''}>
				<div className='macro-graph-title'>
					Grafico {props.graph.id}
				</div>

				<ComputedGraph data={result} graphProps={props.graph} />

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
						<div className='macro-algo-title'>
							{props.graph.algo.name}
						</div>
						<div className='macro-strings-list'>
							S=&#123;{strings.join(', ')}&#125;
						</div>
						<hr />
						<div className='quality'>
							Tempo di computazione:{' '}
							<span>{quality && quality.time}s</span>
						</div>
						<QualityGraph data={qualityGraphProps?.data} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default MacroGraph;
