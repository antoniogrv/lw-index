import GraphProps from './GraphProps';

export interface MacroGraphProps {
	graph: GraphProps;
	graphs: GraphProps[];
	setGraphs: React.Dispatch<React.SetStateAction<GraphProps[]>>;
	alert: (alertText: string) => void;
	setAbility: React.Dispatch<
		React.SetStateAction<{
			isDeletable: boolean;
			isAnalyzable: boolean;
		}>
	>;
}
