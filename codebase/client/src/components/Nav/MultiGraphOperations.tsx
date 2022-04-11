import { MultiGraphOperationsProps } from '../../model/MultiGraphOperationsProps';
import NavProps from '../../model/NavProps';
import NavPropsWrapper from '../../model/NavPropsWrapper';
import { BlankGraph } from '../../templates/BlankGraph';
import { DefaultAbilities } from '../../templates/DefaultAbilities';

function MultiGraphOperations(props: MultiGraphOperationsProps) {
	const state: NavProps = props.navProps;

	return (
		<div>
			<div className='operation'>
				&gt;{' '}
				<span
					onClick={() => {
						if (state.graphs.length !== 4) {
							state.setGraphs([
								...state.graphs,
								{
									...BlankGraph,
									id: state.graphs.length,

									appStatusSet: state.appStatusSet,
									setAppStatusSet: state.setAppStatusSet,
								},
							]);
							props.restore();
						} else alert('Numero massimo di istanze raggiunto.');
					}}
				>
					Crea nuova istanza
				</span>
			</div>

			<div className='operation'>
				&gt;{' '}
				<span
					onClick={() => {
						if (!state.graphs.length)
							alert('Nessun grafico presente.');
						else {
							props.setAbility({
								isAnalyzable: true,
								isDeletable: false,
							});
						}
					}}
				>
					Analizza istanza
				</span>
			</div>

			<div className='operation'>
				&gt;{' '}
				<span
					onClick={() => {
						if (!state.graphs.length)
							alert('Nessun grafico presente.');
						else {
							props.setAbility({
								isAnalyzable: false,
								isDeletable: true,
							});
						}
					}}
				>
					Elimina istanza
				</span>
			</div>

			<div className='operation'>
				&gt;{' '}
				<span
					onClick={() => {
						state.setGraphs([]);
						alert('Tavolo di lavoro svuotato.');
						props.restore();
					}}
				>
					Svuota tavolo di lavoro
				</span>
			</div>
		</div>
	);
}

export default MultiGraphOperations;
