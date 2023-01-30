import { mdQuery, smQuery, spacing } from "../../core/_index";
import { css } from "solid-styled-components";
import { children, JSX } from "solid-js";

interface Props {
    dir: "row" | "column";
    gap?: string | number;
    breakpoint?: "mobile" | "tablet";
    align?: "center";
    justify?: "center";
    children: JSX.Element | JSX.Element[];
}
export function Flex(props: Props) {
    const c = children(() => props.children);
    return (
        <div
            class={css({
                display: "flex",
                flexDirection: props.dir,
                alignItems: props.align,
                justifyContent: props.justify,
                gap: (typeof props.gap == "string"
                    ? spacing[props.gap] || props.gap
                    : `${props.gap || 0}px`) as string,
                [smQuery]: {
                    flexDirection:
                        props.breakpoint == "mobile" || props.breakpoint == "tablet"
                            ? "column"
                            : props.dir,
                },
                [mdQuery]: {
                    flexDirection: props.breakpoint == "tablet" ? "column" : props.dir,
                },
            })}
        >
            {c()}
        </div>
    );
}
