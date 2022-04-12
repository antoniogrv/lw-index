import { createNoSubstitutionTemplateLiteral } from 'typescript';
import AppStatus from '../model/AppStatus';
import { GraphData } from '../model/GraphData';
import GraphProps from '../model/GraphProps';
import { BlankGraph } from './BlankGraph';

// 4 stringhe per ciascun grafico

function generateString() {
	let stringLength = Math.floor(Math.random() * 5) + 2; // 1 .. 7
	let string = '';

	for (let i = 0; i < stringLength; i++) {
		let rand = Math.floor(Math.random() * 4); // 1 .. 3
		let c = '';

		switch (rand) {
			case 0:
				c = 'A';
				break;
			case 1:
				c = 'C';
				break;
			case 2:
				c = 'G';
				break;
			case 3:
				c = 'T';
				break;
		}

		string += c;
	}

	return string.toUpperCase();
}

function generateIndexes(blank: number) {
	let lw: number[] = [];

	for (let i = 0; i < 4; i++) {
		if (i == blank) lw[i] = 0.0;
		else lw[i] = Math.random() * 4;
	}

	return lw;
}

function generateRow(index: number) {
	let rngIndexes = generateIndexes(index);
	let realIndexes: number[] = [];

	if (rngIndexes == null) realIndexes = [0.0, 0.0, 0.0, 0.0];
	else realIndexes = rngIndexes;

	let row: GraphData = {
		string: generateString(),
		lw: realIndexes,
	};

	return row;
}

function generateGraph() {
	let graph: GraphData[] = [];

	for (let i = 0; i < 4; i++) {
		graph[i] = generateRow(i);
	}

	return graph;
}

function generateGraphData() {
	let graphData: GraphData[][] = [];

	for (let i = 0; i < 4; i++) {
		graphData[i] = generateGraph();
	}

	console.log(graphData);

	return graphData;
}

function generateGraphs() {
	let graphs: GraphProps[] = [];

	for (let i = 0; i < 4; i++) {
		let graph: GraphProps = {
			...BlankGraph,
			isEmpty: false,
			id: i,
			data: generateGraphData()[i],
		};

		graphs[i] = graph;
	}

	return graphs;
}

export var EXAMPLE_GRAPHS: GraphProps[] = generateGraphs();
