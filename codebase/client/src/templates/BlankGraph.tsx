import GraphProps from '../model/GraphProps';
import ALGOS from './Algos';

export const BlankGraph: GraphProps = {
	id: -1,

	isEmpty: true,
	isDeletable: false,
	isAnalyzable: false,

	strings: [],

	algo: ALGOS[0],
};
