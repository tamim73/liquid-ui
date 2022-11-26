interface Props {
    value?: number;
    indeterminate?: boolean;
}
export function Progress(props: Props) {
    return (
        <div>
            <progress value={props.value || 0} max="100"></progress>
        </div>
    );
}
