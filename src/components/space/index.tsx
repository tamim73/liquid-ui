import { spacing, Spacing } from "@core";

interface SpaceProps {
    h?: Spacing | number;
    w?: Spacing | number;
}
export function Space(props: SpaceProps) {
    return (
        <div
            style={{
                display: 'inline-block',
                width: (typeof props.w == 'string' ? spacing[props.w] || props.w : `${props.w || 0}px`) as string,
                height: (typeof props.h == 'string' ? spacing[props.h] || props.h : `${props.h || 0}px`) as string,
            }}
        ></div>
    );
}

