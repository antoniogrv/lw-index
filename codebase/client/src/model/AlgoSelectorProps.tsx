import { Algo } from './Algo';

export interface AlgoSelectorProps {
	selectedAlgo?: Algo;
	setSelectedAlgo?: React.Dispatch<React.SetStateAction<Algo>>;
	setAlertStatus?: React.Dispatch<React.SetStateAction<boolean>>;
}
