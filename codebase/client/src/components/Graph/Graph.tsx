import GraphWrapper from '../../model/GraphWrapper';
import ComputedGraph from './ComputedGraph';
import EmptyGraph from './EmptyGraph';

function Graph(props: GraphWrapper) {
    const isDeletableEffect: string = props.graph.isDeletable ? 'isDeletable' : '';
    return (
        <div 
            onClick={() => {props.graph.isDeletable && (props.graph.deleteSelf)?.(props.graph.id)}}
            className={"graph-window " + isDeletableEffect}
        >
            { props.graph.isEmpty ? <ComputedGraph {...props} /> : <EmptyGraph {...props} /> }
        </div>
    )
}

export default Graph;