import { GraphData } from './GraphData';
import { Quality } from './Quality';

export interface ResponseData {
	graphData: GraphData[];
	quality: Quality;
}
