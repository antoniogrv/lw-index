import { useEffect, useState } from 'react';
import AppStatus from '../../model/AppStatus';
import GraphProps from '../../model/GraphProps';
import NavProps from '../../model/NavProps';
import NavPropsWrapper from '../../model/NavPropsWrapper';
import { DefaultAbilities } from '../../templates/DefaultAbilities';
import MultiGraphOperations from './MultiGraphOperations';
import SingleGraphOperations from './SingleGraphOperations';

function Nav(props: NavPropsWrapper) {
	const state: NavProps = props.navProps;

	const [ability, setAbility] = useState(DefaultAbilities);

	useEffect(() => {
		let newGraphs: GraphProps[] = [];
		state.graphs.forEach((graph) => {
			let temp = { ...graph, ...ability };
			newGraphs.push(temp);
		});
		state.setGraphs(newGraphs);
	}, [ability]);

	function alert(alertText: string) {
		state.setAlertStatus(true);
		state.setAlertProps({
			text: alertText,
		});
	}

	function restore() {
		setAbility(DefaultAbilities);
	}

	return (
		<nav>
			<div id='menu'>
				<div className='menu-title'>Operazioni</div>

				{state.appStatusSet.appStatus === AppStatus.__MultiGraph ? (
					<MultiGraphOperations
						navProps={state}
						ability={ability}
						setAbility={setAbility}
						alert={alert}
						restore={restore}
					/>
				) : (
					<SingleGraphOperations
						appStatusSet={state.appStatusSet}
						setAppStatusSet={state.setAppStatusSet}
					/>
				)}

				<br />

				<div className='menu-title'>Algoritmo</div>

				{/* Algoritmo > Informazioni Algoritmo */}

				<div className='operation'>
					&gt; <span>Informazioni algoritmo</span>
				</div>

				{/* Algoritmo > Seleziona Algoritmo */}

				<div className='operation'>
					&gt; <span>Seleziona algoritmo</span>
				</div>

				<br />

				{/* Debug */}

				<div className='menu-title'>Debug</div>
				<div className='operation'>
					&gt; <span>Download --MAW_Sources</span>
				</div>
				<div className='operation'>
					&gt; <span>Codebase Repository</span>
				</div>
				<div className='operation'>
					&gt; <span>Genera esemplificazioni</span>
				</div>

				<div className='menu-footer-up'>
					deletability: {ability.isDeletable.toString()} <br />
					analyzability: {ability.isAnalyzable.toString()} <br />
					appStatus: {state.appStatusSet.appStatus}
				</div>

				<div className='menu-footer-down'>
					MAW-LW-Index
					<br />
					LW Index di Crochemore
				</div>
			</div>
		</nav>
	);
}

export default Nav;
