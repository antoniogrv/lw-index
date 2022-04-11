import GraphWrapper from '../../model/GraphWrapper';
import ComputedGraph from './ComputedGraph';
import EmptyGraph from './EmptyGraph';

function Graph(props: GraphWrapper) {

    return (
        <div className="graph-window">
            { props.graph.isEmpty ? <ComputedGraph {...props} /> : <EmptyGraph {...props} /> }
        </div>
    )
}

export default Graph;