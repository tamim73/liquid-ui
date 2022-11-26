import { children } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";

interface Props {
    children: JSX.Element
}
export function Horizon(props: Props) {
    const c = children(() => props.children)
    return (
        <figure>
            {c()}
        </figure>
    );
}

