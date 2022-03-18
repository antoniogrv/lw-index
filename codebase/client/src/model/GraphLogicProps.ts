import React, { Dispatch, SetStateAction } from 'react';
import { GraphProps } from './GraphProps';

export interface GraphLogicProps {
	graphs: GraphProps[],
    setGraphs: Dispatch<SetStateAction<GraphProps[]>>
}
