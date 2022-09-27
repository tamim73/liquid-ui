import { For } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import { lgQuery, smQuery, mdQuery } from '../../core/breakpoints';
import { Spacing, spacing } from '../../core/spacing';
import { css } from 'solid-styled-components';

export interface GridProps {
    children: JSX.Element[];
    gap?: Spacing;
    gapRow?: Spacing;
    gapCol?: Spacing;
    cols?: number;
    colsSm?: number;
    colsMd?: number;
    colsLg?: number;
    justify?: 'auto' | 'start' | 'end' | 'center' | 'stretch' | 'baseline';
    align: 'auto' | 'start' | 'end' | 'center' | 'stretch' | 'baseline';
}
function Grid(props: GridProps) {
    return (
        <div
            class={css({
                'display': 'grid',
                'gap': (props.gap ? spacing[props.gap] : spacing.md) + 'px',
                'column-gap': (props.gapCol ? spacing[props.gapCol] : '') + 'px',
                'row-gap': (props.gapRow ? spacing[props.gapRow] : '') + 'px',
                'grid-template-columns': `repeat(${props.cols || 'auto-fit'},auto)`,
                'align-items': props.align || 'center',
                'justify-content': props.justify || 'center',
                [smQuery]: {
                    'grid-template-columns': `repeat(${props.colsSm || 1},auto)`,
                },
                [mdQuery]: {
                    'grid-template-columns': `repeat(${props.colsMd || props.cols || 'auto-fit'},auto)`,
                },
                [lgQuery]: {
                    'grid-template-columns': `repeat(${props.colsLg || props.cols || 'auto-fit'},auto)`,
                },
            })}
        >
            <For each={props.children}>{item => <div>{item}</div>}</For>
        </div>
    );
}

export default Grid;
