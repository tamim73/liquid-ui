export type FormItem = FormInputItem | FormNonInputItem;

export type FormInputItem =
    | FormField_Text
    | FormField_Phone
    | FormField_Date
    | FormField_Time
    | FormField_Check
    | FormField_Pattern
    | FormField_Email
    | FormField_Area
    | FormField_Select
    | FormField_Number;

export type FormNonInputItem = Form_Section | Form_Header | Form_Space;

/* -------------------------------------------------------------------------- */
/*                                   fields                                   */
/* -------------------------------------------------------------------------- */

export interface FormField_Text extends FormFieldBase {
    type: 'text';
    min?: number;
    max?: number;
    minWords?: number;
    pattern?: RegExp;
    secret?: boolean;
}
export interface FormField_Number extends FormFieldBase {
    type: 'number';
}
export interface FormField_Phone extends FormFieldBase {
    type: 'phone';
}
export interface FormField_Date extends FormFieldBase {
    type: 'date';
}
export interface FormField_Time extends FormFieldBase {
    type: 'time';
}
export interface FormField_Check extends FormFieldBase {
    type: 'check';
}
export interface FormField_Pattern extends FormFieldBase {
    type: 'pattern';
}
export interface FormField_Email extends FormFieldBase {
    type: 'email';
}
export interface FormField_Area extends FormFieldBase {
    type: 'area';
}
export interface FormField_Select extends FormFieldBase {
    type: 'select';
    options: FormFieldSelectOption[];
    multi?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                 Separators                                 */
/* -------------------------------------------------------------------------- */
interface Form_Section extends FormItemBase {
    type: 'section';
    title: string;
    description: string;
}
interface Form_Header extends FormItemBase {
    type: 'header';
    title: string;
}
interface Form_Space extends FormItemBase {
    type: 'space';
}

/* -------------------------------------------------------------------------- */
/*                                    base                                    */
/* -------------------------------------------------------------------------- */
interface FormFieldBase extends FormItemBase {
    type:
        | 'text'
        | 'number'
        | 'phone'
        | 'date'
        | 'time'
        | 'check'
        | 'pattern'
        | 'email'
        | 'area'
        | 'select';
    required?: boolean;
    label?: string;
    placeholder?: string;
    defaultValue?: any;
}
interface FormItemBase {
    type: string;
    name: string;
    hidden?: boolean;
}
interface FormFieldSelectOption {
    label: string;
    value: any;
}
