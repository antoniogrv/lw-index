import React, { useEffect, useState } from 'react';
import { AlgoSelectorProps } from '../model/AlgoSelectorProps';
import ALGOS from '../templates/Algos';

export default function AlgoSelector(props: AlgoSelectorProps) {
	const [renderedItems, setRenderedItems] = useState<React.ReactElement[]>();

	useEffect(() => {
		let temp: React.ReactElement[] = [];

		ALGOS.forEach((algo) => {
			temp.push(
				<div
					onClick={() => {
						props.setSelectedAlgo && props.setSelectedAlgo(algo);
						props.setAlertStatus && props.setAlertStatus(false);
					}}
					className='selector'
				>
					{algo.name}
				</div>
			);
		});

		setRenderedItems(temp);
	}, []);

	return (
		<div className='selector-wrap'>
			<br />
			<div className='selector-tip'>
				Seleziona l'algoritmo con cui computare i grafici
			</div>
			{renderedItems}
		</div>
	);
}
