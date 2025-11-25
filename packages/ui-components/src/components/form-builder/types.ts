export type FieldType = 'text' | 'number' | 'date' | 'select' | 'textarea' | 'checkbox';

export interface FormField {
    id: string;
    type: FieldType;
    label: string;
    required?: boolean;
    placeholder?: string;
    options?: { label: string; value: string }[]; // For select inputs
    validation?: {
        min?: number;
        max?: number;
        pattern?: string;
        custom?: (value: any) => boolean | string;
    };
    defaultValue?: any;
    hidden?: boolean;
}

export interface FormSection {
    id: string;
    title: string;
    fields: FormField[];
}

export interface FormSchema {
    id: string;
    title: string;
    description?: string;
    sections: FormSection[];
}
