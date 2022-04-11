import { useEffect, useState } from "react";
import GraphProps from "../model/GraphProps";
import ComputedGraph from "./Graph/ComputedGraph";
import Graph from "./Graph/Graph";
import StringInput from "./StringInput";

function MacroGraph(props: GraphProps) {
    const [renderedStrings, setRenderedStrings] = useState<React.ReactElement[]>([]); 
    const [strings, setStrings] = useState<string[]>(props.strings);

    useEffect(() => {
        let tempStrings: React.ReactElement[] = [];

		strings.forEach(string => {
			tempStrings.push(
                <StringInput 
                    string={string}
                    strings={strings}
                    setStrings={setStrings}
                />
            )
		});

        tempStrings.push(
            <StringInput
                strings={strings}
                setStrings={setStrings} 
            />
        );

		setRenderedStrings(tempStrings);
    }, [strings]);

    return(
        <div className="graph-window macro-graph">
            <div className="macro-graph-title">
                Grafico {props.id}
            </div>
            <ComputedGraph graph={props} />

            <div className="macro-data">
                <div className="macro-strings">
                    <div className="macro-block-title">Stringhe</div>
                    { renderedStrings }
                </div>

                <div className="macro-compute">
                    <div className="macro-block-title">Computazione</div>               
                </div>    
            </div>
        </div>
    )
}


export default MacroGraph;