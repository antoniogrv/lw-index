import React from 'react';
import { AppStatusSet } from './AppStatusSet';
import { GraphData } from './GraphData';

export default interface GraphProps {
	id: number;

	isEmpty: boolean;
	isDeletable: boolean;
	isAnalyzable: boolean;

	deleteSelf?: (id: number) => void;

	appStatusSet?: AppStatusSet;
	setAppStatusSet?: React.Dispatch<React.SetStateAction<AppStatusSet>>;

	strings: string[];

	data?: GraphData;
}
