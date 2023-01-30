import { Grid } from "../grid";
import { createSignal, For, Match, Show, Switch } from "solid-js";
import { COLORS } from "../../core/_index";
import { FormInputItem, FormItem } from "./interface";
import { FormSchema, useForm, Vals } from "./use-form";

interface FormProps {
    fields: FormItem[];
    initialValues?: any;
    isLoading?: boolean;
}

export function Form(props: FormProps) {
    const [getValues, setValues] = createSignal(props.initialValues);
    const form = useForm(createFormSchema(), { validateOnBlur: false });

    let errClear: any;

    return (
        <div
            style={{
                position: "relative",
                width: "fit-content",
                margin: "auto",
                padding: "1rem",
            }}
        >
            <Show when={props.isLoading}>
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        display: "flex",
                        "align-items": "center",
                        "justify-content": "center",
                        "background-color": "#000000",
                        opacity: 0.3,
                    }}
                    aria-busy="true"
                ></div>
            </Show>
            <form
                style={{ margin: 0 }}
                onSubmit={form.onSubmit(
                    (values) => {
                        console.log(values);
                        setValues(values);
                    }
                )}
            >
                <Grid>
                    <For each={props.fields}>
                        {(field) => (
                            <Switch fallback={<div>Unsupported Field</div>}>
                                <Match when={field.type == "text" && field} keyed>
                                    {(field) => (
                                        <label for={field.name}>
                                            {field.label}
                                            <input
                                                name={field.name}
                                                {...form.getInputProps(field.name)}
                                                placeholder={field.placeholder}
                                                aria-invalid={
                                                   form.errors[field.name] ? "true" : undefined
                                                }
                                            />
                                            <Show when={form.errors[field.name]} keyed>
                                                {(error) => (
                                                    <small
                                                        style={{
                                                            color: COLORS.danger,
                                                            "font-weight": 300,
                                                        }}
                                                    >
                                                        {error}
                                                    </small>
                                                )}
                                            </Show>
                                        </label>
                                    )}
                                </Match>
                            </Switch>
                        )}
                    </For>
                    <button style={{ margin: 0 }} type="submit">
                        submit
                    </button>
                </Grid>
            </form>
        </div>
    );

    function createFormSchema() {
        const schema: FormSchema<any> = {};
        props.fields.forEach((field) => {
            if (field.type == "space" || field.type == "header" || field.type == "section") return;
            schema[field.name] = [
                props.initialValues?.[field.name] || field.defaultValue,
                getFieldVals(field),
            ];
        });
        return schema;
    }

    function getFieldVals(field: FormInputItem) {
        const vals = [];

        if (field.required) vals.push(Vals.required());

        switch (field.type) {
            case "text":
                if (field.min) vals.push(Vals.minLength(field.min));
                if (field.max) vals.push(Vals.maxLength(field.max));
                if (field.minWords) vals.push(Vals.minWords(field.minWords));
                if (field.pattern) vals.push(Vals.pattern(field.pattern));
                break;

            default:
                break;
        }

        return vals;
    }
}
