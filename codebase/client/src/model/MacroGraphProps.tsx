import GraphProps from './GraphProps';

export interface MacroGraphProps {
	graph: GraphProps;
	setGraphs: React.Dispatch<React.SetStateAction<GraphProps[]>>;
	alert: (alertText: string) => void;
}
