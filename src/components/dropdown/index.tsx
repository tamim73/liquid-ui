import { children, createEffect, For } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

interface Props {
    children: JSX.Element[] | JSX.Element;
    grow?: boolean;
    variant?: 'outline' | 'primary' | 'secondary' | 'contrast';
}
export function Dropdown(props: Props) {
    const c = children(() => props.children);
    return (
        <details role="list" style={{ width: props.grow ? '100%' : 'fit-content' }}>
            <summary
                aria-haspopup="listbox"
                role={props.variant == 'outline' ? undefined : 'button'}
                class={props.variant}
            >
                Dropdown
            </summary>
            <ul role="listbox">
                <For each={c() as JSX.Element[]}>
                    {item => (
                        <li>
                            <a>{item}</a>
                        </li>
                    )}
                </For>
            </ul>
        </details>
    );
}
