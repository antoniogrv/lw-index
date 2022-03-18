import React, { Dispatch, SetStateAction } from 'react';
import AlertProps from './AlertProps';
import GraphProps from './GraphProps';

export default interface NavProps {
	graphs: GraphProps[],
    setGraphs: Dispatch<SetStateAction<GraphProps[]>>,

    alertStatus: boolean,
    setAlertStatus: Dispatch<SetStateAction<boolean>>,

    alertProps: AlertProps,
    setAlertProps: Dispatch<SetStateAction<AlertProps>>
}
