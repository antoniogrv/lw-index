import GraphWrapper from '../../model/GraphWrapper';
import ComputedGraph from './ComputedGraph';
import EmptyGraph from './EmptyGraph';

function Graph(props: GraphWrapper) {
    const deletability: string = props.graph.isDeletable ? 'isDeletable' : '';
    const analyzability: string = props.graph.isAnalyzable ? 'isAnalyzable' : '';

    const sideEffects = deletability + " " + analyzability;

    return (
        <div 
            onClick={() => {
                props.graph.isDeletable && (props.graph.deleteSelf)?.(props.graph.id);
                props.graph.isAnalyzable && (props.graph.deleteSelf)?.(props.graph.id);
            }}
            className={"graph-window " + sideEffects}
        >
            { props.graph.isEmpty ? <ComputedGraph {...props} /> : <EmptyGraph {...props} /> }
        </div>
    )
}

export default Graph;