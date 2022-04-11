import { useEffect, useState } from 'react';
import GraphProps from '../model/GraphProps';
import NavProps from '../model/NavProps';
import NavPropsWrapper from '../model/NavPropsWrapper';

function Nav(props: NavPropsWrapper) {
	const state: NavProps = props.navProps;
	const [deletability, setDeletability] = useState(false);

	useEffect(() => {
		let newGraphs: GraphProps[] = [];
		state.graphs.forEach(graph => {
			let temp = {...graph, isDeletable: deletability}
			newGraphs.push(temp)
		});
		state.setGraphs(newGraphs);
	}, [deletability])

	const blankGraph: GraphProps = {
		id: state.graphs.length,
		isEmpty: false, 
		isDeletable: false
	}

	function alert(alertText: string) {
		state.setAlertStatus(true);
		state.setAlertProps({
			text: alertText
		});
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
							if(state.graphs.length !== 4)
								state.setGraphs([...state.graphs, blankGraph]);
							else {
								state.setAlertStatus(true);
								state.setAlertProps({
									text: "Numero massimo di istanze raggiunto (4). Svuota il tavolo di lavoro per produrre nuovi misurzioni."
								});
							}
						}}>
							Crea nuova istanza
						</span>
					</div>

					{/* Operazioni > Analizza Istanza */}

					<div className="operation">
						&gt; <span>Analizza istanza</span>
					</div>

					{/* Operazioni > Elimina Istanze */}

					<div className="operation">
						&gt; <span onClick={() => {
							if(!state.graphs.length)
								alert("Nessun grafico presente.");
							else
								setDeletability(!deletability);
						}}>
							Elimina istanza
						</span>
					</div>

					{/* Operazioni > Svuota Tavolo di Lavoro */}

					<div className="operation">
						&gt; <span  onClick={() => {
							state.setGraphs([]);
							alert("Tavolo di lavoro svuotato.")
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

					<div className="menu-footer">MAW-LW-Index<br />LW Index di Crochemore</div>
				</div>
			</nav>
    )
}

export default Nav;