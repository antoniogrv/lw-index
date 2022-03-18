import './App.css';
import React, { useEffect, useState } from 'react';
import Nav from './components/Nav';
import Graph from './components/Graph';
import { GraphProps } from './model/GraphProps';

function App() {
	const [selectedGraph, setSelectedGraph] = useState<number>(-1);
	const [graphs, setGraphs] = useState<GraphProps[]>([]);
	const [renderedGraphs, setRenderedGraphs] = useState<React.ReactElement[]>([]);

	useEffect(() => {
		let tempGraphs: React.ReactElement[] = [];
		graphs.forEach(graph => {
			tempGraphs.push(<Graph graph={graph} />)
		});
		setRenderedGraphs(tempGraphs);
	}, [graphs]);

	return (
		<main>
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
			<Nav
				graphs={graphs}
				setGraphs={setGraphs}
			/>
		</main>
	);
}

export default App;
