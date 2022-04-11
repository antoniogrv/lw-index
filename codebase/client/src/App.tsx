import './App.css';
import React, { useEffect, useState } from 'react';
import Nav from './components/Nav';
import Graph from './components/Graph/Graph';
import GraphProps from './model/GraphProps';
import AlertProps from './model/AlertProps';
import NavProps from './model/NavProps';
import Alert from './components/Alert';
import AppStatus from './model/AppStatus';
import AppStatusEnum from './model/AppStatus';
import MacroGraph from './components/MacroGraph';
import blankGraph from './templates/BlankGraph';

function App() {
	const [appStatus, setAppStatus] = useState<AppStatusEnum>(AppStatus.__MultiGraph);

	const [graphs, setGraphs] = useState<GraphProps[]>([]);

	/* __MultiGraph Views */
	const [renderedGraphs, setRenderedGraphs] = useState<React.ReactElement[]>([]);

	/* __SingleGraph Views */
	const [evokedGraph, setEvokedGraph] = useState<GraphProps>(blankGraph);
	
	const [alertProps, setAlertProps] = useState<AlertProps>({ text: '?None' });
	const [alertStatus, setAlertStatus] = useState<boolean>(false);

	const navProps: NavProps = {
		graphs: graphs,
		setGraphs: setGraphs,

		alertStatus: alertStatus,
		setAlertStatus: setAlertStatus,

		alertProps: alertProps,
		setAlertProps: setAlertProps
	}

	useEffect(() => {
		let tempGraphs: React.ReactElement[] = [];
		graphs.forEach(graph => {
			let deletableGraph = {...graph, deleteSelf: deleteSelf}
			tempGraphs.push(<Graph graph={deletableGraph} />)
		});
		setRenderedGraphs(tempGraphs);
	}, [graphs]);

	function deleteSelf(id: number) {
		let temp = graphs.filter(graph => graph.id != id);
		setGraphs(temp);
	}

	return (
		<main className={alertStatus ? "h-v-center" : ""}>
			{alertStatus && <Alert alertProps={alertProps} />}
			<div onClick={() => { if(alertStatus) setAlertStatus(false) }} className={"main-wrapper " + (alertStatus ? "blurred" : "")}>
				<div id="content-wrapper">
					{
						!graphs.length ? (
							<div id="content-logo">
								LW
								<br />
								<span>index</span>
							</div>
						) : (
							<div id="content">
								{appStatus === AppStatus.__MultiGraph ? renderedGraphs : <MacroGraph /> }
							</div>
						)
					}
				</div>
				<Nav navProps={navProps} />
			</div>
		</main>
	);
}

export default App;