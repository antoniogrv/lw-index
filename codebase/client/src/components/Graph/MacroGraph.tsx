import { useEffect, useState } from 'react';
import { MacroGraphProps } from '../../model/MacroGraphProps';
import ComputedGraph from './ComputedGraph';
import StringInput from '../StringInput';
import { parse } from 'path';

function MacroGraph(props: MacroGraphProps) {
	const [strings, setStrings] = useState<string[]>(props.graph.strings);
	const [renderedStrings, setRenderedStrings] = useState<
		React.ReactElement[]
	>([<StringInput strings={strings} setStrings={setStrings} />]);

	useEffect(() => {
		let tempStrings: React.ReactElement[] = [];

		console.log(strings);

		strings.forEach((string) => {
			tempStrings.push(
				<StringInput
					string={string}
					strings={strings}
					setStrings={setStrings}
				/>
			);
		});
		setRenderedStrings(tempStrings);
	}, [strings]);

	function drawGraph() {
		console.log(strings);
	}

	return (
		<div className='graph-window macro-graph'>
			<div className='macro-graph-title'>Grafico {props.graph.id}</div>

			<ComputedGraph graph={props.graph} />

			<div className='macro-data'>
				<div className='macro-strings'>
					<div className='macro-block-title'>Stringhe</div>
					{renderedStrings}
					<div className='macro-buttons'>
						<div
							className='macro-button macro-button-compute'
							onClick={() => drawGraph()}
						>
							Computa
						</div>
						<div
							className='macro-button'
							onClick={() =>
								setRenderedStrings([
									...renderedStrings,
									<StringInput
										strings={strings}
										setStrings={setStrings}
									/>,
								])
							}
						>
							Inserisci
						</div>
					</div>
				</div>

				<div className='macro-compute'>
					<div className='macro-block-title'>Elaborazione</div>
				</div>
			</div>
		</div>
	);
}

export default MacroGraph;
