import React, { useEffect, useState } from 'react';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import { QualityGraphProps } from '../../model/QualityGraphProps';

export default function QualityGraph(props: QualityGraphProps) {
	useEffect(() => {
		console.log('QualityGraph');
		console.log(props.data);
	}, [props.data]);

	return (
		<div className='quality-graph-wrap'>
			<div className='quality-graph'>
				<BarChart data={props.data} width={550} height={300}>
					<XAxis dataKey='algo.abbr' />
					<YAxis dataKey='time' />
					<Bar dataKey='time' fill='#8884d8' />
				</BarChart>
			</div>
		</div>
	);
}
