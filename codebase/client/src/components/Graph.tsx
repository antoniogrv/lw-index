import React, { ReactElement } from 'react';
import { GraphProps } from '../model/GraphProps';

function Graph(props: GraphProps) {
    return (
        <div className="graph-window">{props.empty}</div>
    )
}

export default Graph;