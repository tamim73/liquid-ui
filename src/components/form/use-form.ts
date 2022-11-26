import isEqual from 'fast-deep-equal';
import { getInputOnChange } from './utils/get-input-on-change';
import { setPath, reorderPath, insertPath, getPath, removePath } from './utils/paths';
import { filterErrors } from './utils/filter-errors';
import { validateValues, validateFieldValue, shouldValidateOnChange } from './utils/validate';
import { getStatus } from './utils/get-status';
import { clearListState } from './utils/clear-list-state';
import {
    UseFormReturnType,
    UseFormInput,
    SetErrors,
    ClearErrors,
    Reset,
    SetFieldError,
    SetFieldValue,
    SetValues,
    ReorderListItem,
    RemoveListItem,
    InsertListItem,
    ClearFieldError,
    Validate,
    ValidateField,
    GetInputProps,
    OnSubmit,
    OnReset,
    GetFieldStatus,
    ResetDirty,
    IsValid,
} from './types';
import { createSignal } from 'solid-js';

export function useForm<Values = Record<string, unknown>>({
    initialValues = {} as Values,
    initialErrors = {},
    initialDirty = {},
    initialTouched = {},
    clearInputErrorOnChange = true,
    validateInputOnChange = false,
    validateInputOnBlur = false,
    validate: rules,
}: UseFormInput<Values> = {}): UseFormReturnType<Values> {
    const [getTouched, setTouched] = createSignal(initialTouched);
    const [getDirty, setDirty] = createSignal(initialDirty);
    const [getValues, _setValues] = createSignal(initialValues);
    const [geErrors, _setErrors] = createSignal(filterErrors(initialErrors));

    let _dirtyValues: Values = initialValues;
    const _setDirtyValues = (_values: Values) => {
        _dirtyValues = _values;
    };

    const resetTouched = () => setTouched({});
    const resetDirty: ResetDirty<Values> = _values => {
        _setDirtyValues(_values || getValues());
        setDirty({});
    };

    const setErrors: SetErrors = errs =>
        _setErrors(current => filterErrors(typeof errs === 'function' ? errs(current) : errs));

    const clearErrors: ClearErrors = () => _setErrors({});
    const reset: Reset = () => {
        _setValues(() => initialValues);
        clearErrors();
        resetDirty(initialValues);
        resetTouched();
    };

    const setFieldError: SetFieldError<Values> = (path, error) =>
        setErrors(current => ({ ...current, [path]: error }));

    const clearFieldError: ClearFieldError = path =>
        setErrors(current => {
            if (typeof path !== 'string') {
                return current;
            }

            const clone = { ...current };
            delete clone[path];
            return clone;
        });

    const setFieldValue: SetFieldValue<Values> = (path, value) => {
        const shouldValidate = shouldValidateOnChange(path, validateInputOnChange);
        _setValues(current => {
            const initialValue = getPath(path, _dirtyValues);
            const isFieldDirty = !isEqual(initialValue, value);
            setDirty(currentDirty => ({ ...currentDirty, [path]: isFieldDirty }));
            setTouched(currentTouched => ({ ...currentTouched, [path]: true }));

            const result = setPath(path, value, current);

            if (shouldValidate) {
                const validationResults = validateFieldValue(path, rules, result);
                validationResults.hasError
                    ? setFieldError(path, validationResults.error)
                    : clearFieldError(path);
            }

            return result;
        });

        !shouldValidate && clearInputErrorOnChange && setFieldError(path, null);
    };

    const setValues: SetValues<Values> = payload => {
        _setValues(currentValues => {
            const valuesPartial = typeof payload === 'function' ? payload(currentValues) : payload;
            return { ...currentValues, ...valuesPartial };
        });
        clearInputErrorOnChange && clearErrors();
    };

    const reorderListItem: ReorderListItem<Values> = (path, payload) =>
        _setValues(current => reorderPath(path, payload, current));

    const removeListItem: RemoveListItem<Values> = (path, index) => {
        _setValues(current => removePath(path, index, current));
        _setErrors(errs => clearListState(path, errs));
        setDirty(current => clearListState(`${String(path)}.${index}`, current));
    };

    const insertListItem: InsertListItem<Values> = (path, item, index) =>
        _setValues(current => insertPath(path, item, index, current));
    const validate: Validate = () => {
        const results = validateValues(rules, getValues());
        _setErrors(results.errors);
        return results;
    };

    const validateField: ValidateField<Values> = path => {
        const results = validateFieldValue(path, rules, getValues());
        results.hasError ? setFieldError(path, results.error) : clearFieldError(path);
        return results;
    };

    const getInputProps: GetInputProps<Values> = (
        path,
        { type = 'input', withError = type === 'input', withFocus = true } = {}
    ) => {
        const onChange = getInputOnChange(value => setFieldValue(path, value as any));
        const payload: Record<string, any> = { onChange };

        if (withError) {
            payload.error = geErrors()[path];
        }

        if (type === 'checkbox') {
            payload.checked = getPath(path, getValues());
        } else {
            payload.value = getPath(path, getValues());
        }

        if (withFocus) {
            payload.onFocus = () => setTouched(current => ({ ...current, [path]: true }));
            payload.onBlur = () => {
                if (shouldValidateOnChange(path, validateInputOnBlur)) {
                    const validationResults = validateFieldValue(path, rules, getValues());

                    validationResults.hasError
                        ? setFieldError(path, validationResults.error)
                        : clearFieldError(path);
                }
            };
        }

        return payload;
    };

    const onSubmit: OnSubmit<Values> = (handleSubmit, handleValidationFailure, preSubmit) => event => {
        event.preventDefault();
        preSubmit?.();
        const results = validate();

        if (results.hasErrors) {
            handleValidationFailure?.(results.errors, getValues(), event);
        } else {
            handleSubmit(getValues(), event);
        }
    };

    const onReset: OnReset = event => {
        event.preventDefault();
        reset();
    };

    const isDirty: GetFieldStatus<Values> = path => getStatus(getDirty(), path);

    const isTouched: GetFieldStatus<Values> = path => getStatus(getTouched(), path);

    const isValid: IsValid<Values> = path =>
        path
            ? !validateFieldValue(path, rules, getValues()).hasError
            : !validateValues(rules, getValues()).hasErrors;

    return {
        clearErrors,
        clearFieldError,
        errors: geErrors(),
        getInputProps,
        insertListItem,
        isDirty,
        isTouched,
        isValid,
        onReset,
        onSubmit,
        removeListItem,
        reorderListItem,
        reset,
        resetDirty,
        resetTouched,
        setDirty,
        setErrors,
        setFieldError,
        setFieldValue,
        setTouched,
        setValues,
        validate,
        validateField,
        values: getValues(),
    };
}
