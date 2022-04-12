import { useEffect, useState } from 'react';
import AppStatus from '../../model/AppStatus';
import GraphProps from '../../model/GraphProps';
import NavProps from '../../model/NavProps';
import NavPropsWrapper from '../../model/NavPropsWrapper';
import { DefaultAbilities } from '../../templates/DefaultAbilities';
import { EXAMPLE_GRAPHS } from '../../templates/ExampleGraphs';
import MultiGraphOperations from './MultiGraphOperations';
import SingleGraphOperations from './SingleGraphOperations';

function Nav(props: NavPropsWrapper) {
	const state: NavProps = props.navProps;

	useEffect(() => {
		let newGraphs: GraphProps[] = [];
		state.graphs.forEach((graph) => {
			let temp = { ...graph, ...state.ability };
			newGraphs.push(temp);
		});
		state.setGraphs(newGraphs);
	}, [state.ability]);

	function restore() {
		state.setAbility(DefaultAbilities);
	}

	function generateExampleGraphs() {
		let tempGraphs: GraphProps[] = [];

		EXAMPLE_GRAPHS.forEach((graph) => {
			tempGraphs.push({
				...graph,
				appStatusSet: state.appStatusSet,
				setAppStatusSet: state.setAppStatusSet,
			});
		});

		console.log(tempGraphs);
		state.setGraphs(tempGraphs);
	}

	return (
		<nav>
			<div id='menu'>
				<div className='menu-title'>Operazioni</div>

				{state.appStatusSet.appStatus === AppStatus.__MultiGraph ? (
					<MultiGraphOperations
						navProps={state}
						ability={state.ability}
						setAbility={state.setAbility}
						alert={state.alert}
						restore={restore}
					/>
				) : (
					<SingleGraphOperations
						appStatusSet={state.appStatusSet}
						setAppStatusSet={state.setAppStatusSet}
						setAbility={state.setAbility}
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
					&gt;{' '}
					<span onClick={() => generateExampleGraphs()}>
						Genera esemplificazioni
					</span>
				</div>

				<div className='menu-footer-up'>
					deletability: {state.ability.isDeletable.toString()} <br />
					analyzability: {state.ability.isAnalyzable.toString()}{' '}
					<br />
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
