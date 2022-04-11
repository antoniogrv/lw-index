import './App.css';
import React, { useEffect, useState } from 'react';
import Nav from './components/Nav';
import Graph from './components/Graph/Graph';
import GraphProps from './model/GraphProps';
import AlertProps from './model/AlertProps';
import NavProps from './model/NavProps';
import Alert from './components/Alert';

function App() {
	const [graphs, setGraphs] = useState<GraphProps[]>([]);
	const [renderedGraphs, setRenderedGraphs] = useState<React.ReactElement[]>([]);
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
								{renderedGraphs}
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
