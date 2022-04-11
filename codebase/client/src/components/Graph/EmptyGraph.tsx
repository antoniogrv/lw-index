import GraphWrapper from "../../model/GraphWrapper";

function EmptyGraph(props: GraphWrapper) {
    return(
        <div 
            onClick={() => {props.graph.isDeletable && (props.graph.deleteSelf)?.(props.graph.id)}}
            className={'sub-graph-window empty-graph ' + props.graph.isDeletable}
        >
           <p className="graph-title">Grafico vuoto</p>
           <p className="graph-subtitle">Analizza questo grafico per popolarlo</p>
        </div>
    )
}

export default EmptyGraph;