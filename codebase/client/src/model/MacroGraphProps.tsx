import { Algo } from './Algo';
import GraphProps from './GraphProps';
import { QualityGraphProps } from './QualityGraphProps';

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

	qualityGraphProps: QualityGraphProps;
	setQualityGraphProps: React.Dispatch<
		React.SetStateAction<QualityGraphProps>
	>;

	selectedAlgo: Algo;
}
