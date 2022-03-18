import React, { ReactElement } from 'react';
import { GraphLogicProps } from '../model/GraphLogicProps';

function Nav(props: GraphLogicProps) {
    return(
        <nav>
			<div id="menu">
					<div className="menu-title">
						Operazioni
					</div>
					<div className="operation" onClick={() => { 
						if(props.graphs.length != 4)
							props.setGraphs([...props.graphs, { empty: false }]);
						else
							alert("Numero massimo di istanze");
						}
					}>
						&gt; <span>Crea nuova istanza</span>
					</div>
					<div className="operation">
						&gt; <span>Analizza istanza</span>
					</div>
					<div className="operation">
						&gt; <span>Elimina istanza</span>
					</div>
					<div className="operation" onClick={() => {
						props.setGraphs([]);
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