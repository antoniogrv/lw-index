import { AppStatusSet } from './AppStatusSet';

export interface SingleGraphOperationsProps {
	appStatusSet: AppStatusSet;
	setAppStatusSet: React.Dispatch<React.SetStateAction<AppStatusSet>>;
}
