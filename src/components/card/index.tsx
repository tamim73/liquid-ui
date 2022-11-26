import { children, Show } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

interface Props {
    header?: JSX.Element;
    footer?: JSX.Element;
    children: JSX.Element;
}
export function Card(props: Props) {
    const c = children(() => props.children);
    return (
        <article>
            <Show when={props.header}>
                <header>Header</header>
            </Show>
            {c()}
            <Show when={props.footer}>
                <footer>Footer</footer>
            </Show>
        </article>
    );
}
