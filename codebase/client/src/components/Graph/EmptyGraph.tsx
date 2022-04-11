import GraphWrapper from "../../model/GraphWrapper";

function EmptyGraph(props: GraphWrapper) {
    return(
        <div className='sub-graph-window empty-graph'>
           <p className="graph-title">Grafico vuoto {props.graph.id} </p>
           <p className="graph-subtitle">Analizza questo grafico per popolarlo</p>
        </div>
    )
}

export default EmptyGraph;