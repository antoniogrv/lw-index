export interface FormProps {
	id: number;
	string: string;
	updateSelf: React.Dispatch<
		React.SetStateAction<{
			id: number;
			text: string;
			valid: boolean;
			type: string;
		}>
	>;
	valid: boolean;
}
