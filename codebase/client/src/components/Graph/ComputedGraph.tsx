import React, { useEffect, useState } from 'react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	ResponsiveContainer,
	Tooltip,
} from 'recharts';
import AppStatus from '../../model/AppStatus';
import { ComputedGraphProps } from '../../model/ComputedGraphProps';
import { GraphData } from '../../model/GraphData';

function ComputedGraph(props: ComputedGraphProps) {
	const [renderedLines, setRenderedLines] = useState<React.ReactElement[]>();

	const view =
		props.graphProps.appStatusSet?.appStatus == AppStatus.__MultiGraph &&
		'multi-computed-graph';

	useEffect(() => {
		let index = 0;
		let tempLines: React.ReactElement[] = [];

		props.data?.forEach(() => {
			let lw = 'lw[' + index++ + ']';
			let hex = '#' + Math.floor(Math.random() * 16777215).toString(16);

			tempLines.push(<Line type='monotone' dataKey={lw} stroke={hex} />);
		});

		setRenderedLines(tempLines);
	}, [props]);

	return (
		<div className={view + ' sub-graph-window computed-graph'}>
			<ResponsiveContainer width='90%' height='90%'>
				<LineChart data={props.data}>
					{renderedLines}
					<XAxis dataKey='string' />
					<YAxis />
					<Tooltip />
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}

export default ComputedGraph;
