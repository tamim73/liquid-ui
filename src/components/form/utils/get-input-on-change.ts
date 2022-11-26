import { ChangeEvent } from '../types';

export function getInputOnChange<Value>(setValue: (value: Value | ((current: Value) => Value)) => void) {
    return (val: Value | ChangeEvent<unknown> | ((current: Value) => Value)) => {
        if (!val) {
            setValue(val as Value);
        } else if (typeof val === 'function') {
            setValue(val);
        } else if (typeof val === 'object' && val instanceof Event) {
            const { currentTarget } = val;
            if (currentTarget instanceof HTMLInputElement) {
                if (currentTarget.type === 'checkbox') {
                    setValue(currentTarget.checked as any);
                } else if (currentTarget instanceof HTMLTextAreaElement || currentTarget instanceof HTMLSelectElement) {
                    setValue(currentTarget.value as any);
                } else {
                    setValue(currentTarget.value as any);
                }
            }
        } else {
            setValue(val);
        }
    };
}
