import { useEffect, useState } from 'react';
import { MacroGraphProps } from '../../model/MacroGraphProps';
import ComputedGraph from './ComputedGraph';
import StringInput from '../StringInput';

function MacroGraph(props: MacroGraphProps) {
	const [renderedStrings, setRenderedStrings] = useState<
		React.ReactElement[]
	>([]);
	const [strings, setStrings] = useState<string[]>(props.graph.strings);

	useEffect(() => {
		let tempStrings: React.ReactElement[] = [];

		strings.forEach((string) => {
			tempStrings.push(
				<StringInput
					string={string}
					strings={strings}
					setStrings={setStrings}
				/>
			);
		});

		tempStrings.push(
			<StringInput strings={strings} setStrings={setStrings} />
		);

		setRenderedStrings(tempStrings);
	}, [strings]);

	return (
		<div className='graph-window macro-graph'>
			<div className='macro-graph-title'>Grafico {props.graph.id}</div>

			<ComputedGraph graph={props.graph} />

			<div className='macro-data'>
				<div className='macro-strings'>
					<div className='macro-block-title'>Stringhe</div>
					{renderedStrings}
				</div>

				<div className='macro-compute'>
					<div className='macro-block-title'>Computazione</div>
				</div>
			</div>
		</div>
	);
}

export default MacroGraph;
