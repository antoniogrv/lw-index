import AppStatus from '../../model/AppStatus';
import { SingleGraphOperationsProps } from '../../model/SingleGraphOperationsProps';
import { BlankGraph } from '../../templates/BlankGraph';

function SingleGraphOperations(props: SingleGraphOperationsProps) {
	return (
		<div>
			<div className='operation'>
				&gt;{' '}
				<span
					onClick={() =>
						props.setAppStatusSet({
							appStatus: AppStatus.__MultiGraph,
							graph: BlankGraph,
						})
					}
				>
					Smetti di analizzare
				</span>
			</div>
		</div>
	);
}

export default SingleGraphOperations;
