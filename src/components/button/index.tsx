import { Show } from 'solid-js';
import {COLORS} from '../../core/_index';
import { JSX } from 'solid-js/jsx-runtime';

interface Props {
    label: string;
    loading?: boolean;
    variant?: 'primary' | 'secondary' | 'danger';
    icon?: JSX.Element;
    type?: 'submit' | 'button' | 'reset';
    outline?: boolean;
    grow?: boolean;
}
export function Button(props: Props) {
    return (
        <button
            aria-busy={props.loading}
            type={props.type || 'button'}
            classList={{
                [props.variant]: true,
                outline: props.outline
            }}
            style={{
                display: 'flex',
                width: props.grow ? '100%' : 'fit-content',
                'align-items': 'center',
                'justify-content': 'center',
                "background-color": !props.outline && props.variant == 'danger' && COLORS.danger,
                "color": props.outline && props.variant == 'danger' && COLORS.danger,
                "border-color": props.variant == 'danger' && COLORS.danger
            }}
        >
            <Show when={props.icon}>
                <div>{props.icon}</div>
            </Show>
            {props.label}
        </button>
    );
}
