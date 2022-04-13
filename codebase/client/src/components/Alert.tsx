import parse from 'html-react-parser';
import { useEffect } from 'react';
import AlertPropsWrapper from '../model/AlertPropsWrapper';
import AlgoSelector from './AlgoSelector';

function Alert(props: AlertPropsWrapper) {
	useEffect(() => console.log(props.alertProps.select), []);

	return (
		<div className='alert'>
			<div className='alert-title'>Informazione</div>
			<div className='alert-content'>
				{props.alertProps.select === undefined ? (
					parse(props.alertProps.text)
				) : (
					<AlgoSelector {...props.alertProps.selectorProps} />
				)}
			</div>
		</div>
	);
}

export default Alert;
