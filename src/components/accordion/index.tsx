import { children } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

interface Props {
    title: string;
    variant?: 'outline' | 'primary' | 'secondary' | 'contrast';
    open?: boolean;
    children: JSX.Element;
}
export function Accordion(props: Props) {
    const c = children(() => props.children);
    return (
        <details open={props.open}>
            <summary
                role={(props.variant || 'outline') == 'outline' ? undefined : 'button'}
                class={props.variant}
            >
                {props.title}
            </summary>
            {c()}
        </details>
    );
}
