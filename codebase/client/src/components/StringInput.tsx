import { useState } from "react";
import { StringInputProps } from "../model/StringInputProps";

function StringInput(props: StringInputProps) {
    const [input, setInput] = useState<string>((props.string === undefined || props.string === "") ? "" : props.string);

    function parseStrings() {
        props.setStrings([...props.strings, input]);
    } 

    return(
        <form>
            <input value={input} type="text" onInput={e => setInput(e.currentTarget.value)} placeholder="Inserisci una nuova stringa" />
            <input type="submit" value="Inserisci" onClick={(e) => { e.preventDefault(); parseStrings() }} />
        </form>
    )
}

export default StringInput;