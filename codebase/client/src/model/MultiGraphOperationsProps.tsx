import NavProps from './NavProps';

export interface MultiGraphOperationsProps {
	navProps: NavProps;
	ability: {
		isDeletable: boolean;
		isAnalyzable: boolean;
	};
	setAbility: React.Dispatch<
		React.SetStateAction<{
			isDeletable: boolean;
			isAnalyzable: boolean;
		}>
	>;
	alert: (alertText: string) => void;
	restore: () => void;
}
