import { JSX } from 'solid-js/jsx-runtime';

interface Props {
    children: JSX.Element;
}
export function Container(props: Props) {
    return <div class="container">{props.children}</div>;
}

export default Container;
