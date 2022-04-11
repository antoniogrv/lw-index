import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import GraphWrapper from '../../model/GraphWrapper';

function ComputedGraph(props: GraphWrapper) {
    //const data = [{self: "CCA", compared: "GGA", lw: 1, lw2: 5}, {self: "G", compared: "DASD", lw: 5, lw2: 7}, {self: "GGGA", compared: "TFF", lw: 2.5, lw2: 9}, ];

    return(
        <div className="sub-graph-window computed-graph">
            <div className="graph-window-title">Risultato dell'algoritmo MAW</div>
            <div className="graph-wrapper">
                <ResponsiveContainer width="90%" height="90%">
                    <LineChart data={props.graph.data}>
                        <Line type="monotone" dataKey="lw" stroke="#8884d8" />
                        <Line type="monotone" dataKey="lw2" stroke="#8884d8" />
                        <XAxis dataKey="self" />
                        <YAxis />
                        <Tooltip />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="graph-window-title" onClick={() => props.graph.isDeletable && (props.graph.deleteSelf)?.(props.graph.id)}>{props.graph.isDeletable.toString()}</div>
        </div>
    )
}

export default ComputedGraph;