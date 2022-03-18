import GraphProps from '../model/GraphProps';
import NavProps from '../model/NavProps';
import NavPropsWrapper from '../model/NavPropsWrapper';

function Nav(props: NavPropsWrapper) {
	const state: NavProps = props.navProps;

	const blankGraph: GraphProps = {
		id: state.graphs.length,
		empty: false, 
		deletable: false
	}

    return(
        <nav>
			<div id="menu">
					<div className="menu-title">
						Operazioni
					</div>
					<div className="operation" onClick={() => { 
						if(state.graphs.length !== 4)
							state.setGraphs([...state.graphs, blankGraph]);
						else {
							state.setAlertStatus(true);
							state.setAlertProps({
								text: "Numero massimo di istanze raggiunto (4). Svuota il tavolo di lavoro per produrre nuovi misurzioni."
							});
						}
					}}>
						&gt; <span>Crea nuova istanza</span>
					</div>
					<div className="operation">
						&gt; <span>Analizza istanza</span>
					</div>
					<div className="operation" onClick={() => {
						let newGraphs: GraphProps[] = [];
						state.graphs.forEach(graph => {
							let temp = {...graph, deletable: true}
							newGraphs.push(temp)
						});
						state.setGraphs(newGraphs);
					}}>
						&gt; <span>Elimina istanza</span>
					</div>
					<div className="operation" onClick={() => {
						state.setGraphs([]);
					}}>
						&gt; <span>Svuota tavolo di lavoro</span>
					</div>

					<br />

					<div className="menu-title">
						Algoritmo
					</div>
					<div className="operation">
						&gt; <span>Informazioni algoritmo</span>
					</div>
					<div className="operation">
						&gt; <span>Seleziona algoritmo</span>
					</div>

					<br />

					<div className="menu-title">
						Debug
					</div>
					<div className="operation">
						&gt; <span>Download --MAW_Sources</span>
					</div>
					<div className="operation" onClick={() => {
						state.setAlertStatus(true);
						state.setAlertProps({
							text: "Lorem Ipsum"
						});
					}}>
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