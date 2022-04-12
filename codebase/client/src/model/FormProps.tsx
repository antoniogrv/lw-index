export interface FormProps {
	id: number;
	string: string;
	updateSelf: React.Dispatch<
		React.SetStateAction<{
			id: number;
			text: string;
			valid: boolean;
			type: string;
			new?: boolean;
		}>
	>;
	valid: boolean;
	preDisabled?: boolean;
	preState?: string;
}
