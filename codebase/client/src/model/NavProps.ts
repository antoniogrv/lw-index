import React, { Dispatch, SetStateAction } from 'react';
import AlertProps from './AlertProps';
import { Algo } from './Algo';
import { AppStatusSet } from './AppStatusSet';
import GraphProps from './GraphProps';

export default interface NavProps {
	graphs: GraphProps[];
	setGraphs: Dispatch<SetStateAction<GraphProps[]>>;

	alertStatus: boolean;
	setAlertStatus: Dispatch<SetStateAction<boolean>>;

	alert: (alertText: string, select?: boolean) => void;

	appStatusSet: AppStatusSet;
	setAppStatusSet: React.Dispatch<React.SetStateAction<AppStatusSet>>;

	gid: number;
	setGid: React.Dispatch<React.SetStateAction<number>>;

	ability: { isDeletable: boolean; isAnalyzable: boolean };
	setAbility: React.Dispatch<
		React.SetStateAction<{
			isDeletable: boolean;
			isAnalyzable: boolean;
		}>
	>;

	selectedAlgo: Algo;
	setSelectedAlgo: React.Dispatch<React.SetStateAction<Algo>>;
}
