import React, { useEffect, useState } from 'react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	ResponsiveContainer,
	Tooltip,
} from 'recharts';
import { ComputedGraphProps } from '../../model/ComputedGraphProps';
import { GraphData } from '../../model/GraphData';

function ComputedGraph(props: ComputedGraphProps) {
	const [renderedLines, setRenderedLines] = useState<React.ReactElement[]>();

	useEffect(() => {
		console.log('Updating ComputedGraph');

		let index = 0;
		let tempLines: React.ReactElement[] = [];

		props.data?.forEach(() => {
			let lw = 'lw[' + index++ + ']';

			tempLines.push(
				<Line type='monotone' dataKey={lw} stroke='#8884d8' />
			);
		});
		setRenderedLines(tempLines);
	}, [props]);

	return (
		<div className='sub-graph-window computed-graph'>
			<div className='graph-wrapper'>
				<ResponsiveContainer width='90%' height='90%'>
					<LineChart data={props.data}>
						{renderedLines}
						<XAxis dataKey='string' />
						<YAxis />
						<Tooltip />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}

export default ComputedGraph;
