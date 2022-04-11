import { useState } from 'react';
import AppStatus from '../../model/AppStatus';
import GraphWrapper from '../../model/GraphWrapper';
import ComputedGraph from './ComputedGraph';
import EmptyGraph from './EmptyGraph';

function Graph(props: GraphWrapper) {
	const deletability: string = props.graph.isDeletable ? 'isDeletable' : '';
	const analyzability: string = props.graph.isAnalyzable
		? 'isAnalyzable'
		: '';

	const sideEffects = deletability + ' ' + analyzability;

	return (
		<div
			onClick={() => {
				props.graph.isDeletable &&
					props.graph.deleteSelf?.(props.graph.id);

				if (props.graph.isAnalyzable) {
					props.graph.setAppStatusSet?.({
						appStatus: AppStatus.__SingleGraph,
						graph: props.graph,
					});
				}
			}}
			className={'graph-window ' + sideEffects}
		>
			{props.graph.isEmpty ? (
				<ComputedGraph {...props} />
			) : (
				<EmptyGraph {...props} />
			)}
		</div>
	);
}

export default Graph;
