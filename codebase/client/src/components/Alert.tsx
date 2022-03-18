import AlertPropsWrapper from "../model/AlertPropsWrapper";

function Alert(props: AlertPropsWrapper) {
    const state = props.alertProps;

    return(
        <div className="alert">
            <div className="alert-title">Informazione</div>
            <div className="alert-content">{state.text}</div>
        </div>
    )
}

export default Alert;