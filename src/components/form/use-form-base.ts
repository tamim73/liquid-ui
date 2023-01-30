import { isEqual } from "../../core/utils";
import { getInputOnChange } from "./utils/get-input-on-change";
import { setPath, reorderPath, insertPath, getPath, removePath } from "./utils/paths";
import { validateValues, validateFieldValue, shouldValidateOnChange } from "./utils/validate";
import { getStatus } from "./utils/get-status";
import { clearListState } from "./utils/clear-list-state";
import {
    UseFormReturnType,
    UseFormInput,
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
} from "./types";
import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";

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

    const [errors, setErrors] = createStore<any>({});

    let _dirtyValues: Values = initialValues;
    const _setDirtyValues = (_values: Values) => {
        _dirtyValues = _values;
    };

    const resetTouched = () => setTouched({});
    const resetDirty: ResetDirty<Values> = (_values) => {
        _setDirtyValues(_values || getValues());
        setDirty({});
    };

    const clearErrors: ClearErrors = () => {
        const fields = Object.keys(initialValues);
        const errs = {};
        fields.forEach((field) => {
            errs[field] = null;
        });
        setErrors(errs);
    };
    const reset: Reset = () => {
        _setValues(() => initialValues);
        clearErrors();
        resetDirty(initialValues);
        resetTouched();
    };

    const setFieldError: SetFieldError<Values> = (path, error) => {
        return setErrors({ [path]: error });
    };

    const clearFieldError: ClearFieldError = (path: string) => setErrors({ [path]: null });

    const setFieldValue: SetFieldValue<Values> = (path, value) => {
        const shouldValidate = shouldValidateOnChange(path, validateInputOnChange);
        _setValues((current) => {
            const initialValue = getPath(path, _dirtyValues);
            const isFieldDirty = !isEqual(initialValue, value);
            setDirty((currentDirty) => ({ ...currentDirty, [path]: isFieldDirty }));
            setTouched((currentTouched) => ({ ...currentTouched, [path]: true }));

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

    const setValues: SetValues<Values> = (payload) => {
        _setValues((currentValues) => {
            const valuesPartial = typeof payload === "function" ? payload(currentValues) : payload;
            return { ...currentValues, ...valuesPartial };
        });
        clearInputErrorOnChange && clearErrors();
    };

    const reorderListItem: ReorderListItem<Values> = (path, payload) =>
        _setValues((current) => reorderPath(path, payload, current));

    const removeListItem: RemoveListItem<Values> = (path, index) => {
        _setValues((current) => removePath(path, index, current));
        // _setErrors((errs) => clearListState(path, errs));
        setDirty((current) => clearListState(`${String(path)}.${index}`, current));
    };

    const insertListItem: InsertListItem<Values> = (path, item, index) =>
        _setValues((current) => insertPath(path, item, index, current));
    const validate: Validate = () => {
        const results = validateValues(rules, getValues());
        // _setErrors(results.errors);
        return results;
    };

    const validateField: ValidateField<Values> = (path) => {
        const results = validateFieldValue(path, rules, getValues());
        results.hasError ? setFieldError(path, results.error) : clearFieldError(path);
        return results;
    };

    const getInputProps: GetInputProps<Values> = (
        path,
        { type = "input", withError = type === "input", withFocus = true } = {},
    ) => {
        const onChange = getInputOnChange((value) => setFieldValue(path, value as any));
        const payload: Record<string, any> = { onChange };

        if (withError) {
            payload.error = errors[path];
        }

        if (type === "checkbox") {
            payload.checked = getPath(path, getValues());
        } else {
            payload.value = getPath(path, getValues());
        }

        if (withFocus) {
            payload.onFocus = () => setTouched((current) => ({ ...current, [path]: true }));
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

    const onSubmit: OnSubmit<Values> =
        (handleSubmit, handleValidationFailure, preSubmit) => (event) => {
            event.preventDefault();
            preSubmit?.();
            clearErrors();
            const results = validate();
            if (results.hasErrors) {
                setErrors(results.errors);
                handleValidationFailure?.(results.errors, getValues(), event);
            } else {
                handleSubmit(getValues(), event);
            }
        };

    const onReset: OnReset = (event) => {
        event.preventDefault();
        reset();
    };

    const isDirty: GetFieldStatus<Values> = (path) => getStatus(getDirty(), path);

    const isTouched: GetFieldStatus<Values> = (path) => getStatus(getTouched(), path);

    const isValid: IsValid<Values> = (path) =>
        path
            ? !validateFieldValue(path, rules, getValues()).hasError
            : !validateValues(rules, getValues()).hasErrors;

    return {
        clearErrors,
        clearFieldError,
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
        errors,
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
