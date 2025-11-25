import React from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { FormSchema, FormField } from './types';
import { Input, Select, Button } from '../../index'; // Assuming these exist in ui-components

// Registry of field components
const FieldRenderer: React.FC<{ field: FormField }> = ({ field }) => {
    const { register, formState: { errors } } = useFormContext();
    const error = errors[field.id]?.message as string;

    switch (field.type) {
        case 'text':
        case 'number':
        case 'date':
            return (
                <Input
                    label={field.label}
                    type={field.type}
                    {...register(field.id, {
                        required: field.required ? `${field.label} is required` : false,
                        ...(field.validation as any)
                    })}
                    error={error}
                    placeholder={field.placeholder}
                />
            );
        case 'select':
            return (
                <Select
                    label={field.label}
                    options={field.options || []}
                    {...register(field.id, { required: field.required })}
                    error={error}
                />
            );
        default:
            return null;
    }
};

interface FormEngineProps {
    schema: FormSchema;
    onSubmit: (data: any) => void;
    defaultValues?: any;
}

export const FormEngine: React.FC<FormEngineProps> = ({ schema, onSubmit, defaultValues }) => {
    const methods = useForm({
        defaultValues
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="form-engine">
                <h2>{schema.title}</h2>
                {schema.description && <p>{schema.description}</p>}

                {schema.sections.map(section => (
                    <div key={section.id} className="form-section">
                        <h3>{section.title}</h3>
                        <div className="form-grid">
                            {section.fields.map(field => (
                                <div key={field.id} className="form-field-wrapper">
                                    <FieldRenderer field={field} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="form-actions" style={{ marginTop: '1rem' }}>
                    <Button type="submit" variant="primary">Submit</Button>
                </div>
            </form>
        </FormProvider>
    );
};
