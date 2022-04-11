export interface FormProps {
	id: number;
	string: string;
	updateSelf: React.Dispatch<
		React.SetStateAction<{
			id: number;
			text: string;
			type: string;
		}>
	>;
}
