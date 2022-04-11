import { useEffect, useState } from 'react';
import GraphProps from '../model/GraphProps';
import NavProps from '../model/NavProps';
import NavPropsWrapper from '../model/NavPropsWrapper';
import blankGraph from '../templates/BlankGraph';

function Nav(props: NavPropsWrapper) {
	const state: NavProps = props.navProps;

	const __default = {
			isDeletable: false,
			isAnalyzable: false,		
	}

	const [ability, setAbility] = useState(__default);

	useEffect(() => {
		let newGraphs: GraphProps[] = [];
		state.graphs.forEach(graph => {
			let temp = {...graph, ...ability}
			newGraphs.push(temp)
		});
		state.setGraphs(newGraphs);
	}, [ability])

	function alert(alertText: string) {
		state.setAlertStatus(true);
		state.setAlertProps({
			text: alertText
		});
	}

	function restore() {
		setAbility(__default);
	}

    return(
        <nav>
			<div id="menu">
					<div className="menu-title">
						Operazioni
					</div>

					{/* Operazioni > Crea Nuova Istanza */}

					<div className="operation">
						&gt; <span onClick={() => { 
							if(state.graphs.length !== 4) {
								state.setGraphs([...state.graphs, 
									{	
										...blankGraph,
										id: state.graphs.length
									} 
								]);
								restore();
							} else 
								alert("Numero massimo di istanze raggiunto.");
						}}>
							Crea nuova istanza
						</span>
					</div>

					{/* Operazioni > Analizza Istanza */}

					<div className="operation">
						&gt; <span onClick={() => {
							if(!state.graphs.length)
								alert("Nessun grafico presente.");
							else {
								setAbility({
									isAnalyzable: true,
									isDeletable: false
								});
							}
						}}>
							Analizza istanza
						</span>
					</div>

					{/* Operazioni > Elimina Istanze */}

					<div className="operation">
						&gt; <span onClick={() => {
							if(!state.graphs.length)
								alert("Nessun grafico presente.");
							else {
								setAbility({
									isAnalyzable: false,
									isDeletable: true
								});
							}
						}}>
							Elimina istanza
						</span>
					</div>

					{/* Operazioni > Svuota Tavolo di Lavoro */}

					<div className="operation">
						&gt; <span  onClick={() => {
							state.setGraphs([]);
							alert("Tavolo di lavoro svuotato.");
							restore();
						}}>
							Svuota tavolo di lavoro
						</span>
					</div>

					<br />

					<div className="menu-title">
						Algoritmo
					</div>

					{/* Algoritmo > Informazioni Algoritmo */}

					<div className="operation">
						&gt; <span>Informazioni algoritmo</span>
					</div>

					{/* Algoritmo > Seleziona Algoritmo */}

					<div className="operation">
						&gt; <span>Seleziona algoritmo</span>
					</div>

					<br />

					{/* Debug */}

					<div className="menu-title">
						Debug
					</div>
					<div className="operation">
						&gt; <span>Download --MAW_Sources</span>
					</div>
					<div className="operation">
						&gt; <span>Codebase Repository</span>
					</div>
					<div className="operation">
						&gt; <span>Genera esemplificazioni</span>
					</div>
					
					<div className="menu-footer-up">
						deletability: {ability.isDeletable.toString()} <br />
						analyzability: {ability.isAnalyzable.toString()} <br />
						appStatus: blank
					</div>

					<div className="menu-footer-down">MAW-LW-Index<br />LW Index di Crochemore</div>
				</div>
			</nav>
    )
}

export default Nav;