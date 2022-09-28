import { JSX } from 'solid-js/jsx-runtime';

export interface ContainerProps {
    children: JSX.Element;
}
function Container(props: ContainerProps) {
    return <div class="container">{props.children}</div>;
}

export default Container;
