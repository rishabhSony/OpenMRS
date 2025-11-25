import React from 'react';
import { FormEngine, Card } from '@openmrs-enterprise/ui-components';
import type { FormSchema } from '@openmrs-enterprise/ui-components';

const sampleSchema: FormSchema = {
    id: 'patient-registration',
    title: 'New Patient Registration',
    description: 'Enter patient details below.',
    sections: [
        {
            id: 'demographics',
            title: 'Demographics',
            fields: [
                {
                    id: 'firstName',
                    type: 'text',
                    label: 'First Name',
                    required: true,
                    placeholder: 'Enter first name'
                },
                {
                    id: 'lastName',
                    type: 'text',
                    label: 'Last Name',
                    required: true,
                    placeholder: 'Enter last name'
                },
                {
                    id: 'birthDate',
                    type: 'date',
                    label: 'Date of Birth',
                    required: true
                },
                {
                    id: 'gender',
                    type: 'select',
                    label: 'Gender',
                    required: true,
                    options: [
                        { label: 'Male', value: 'M' },
                        { label: 'Female', value: 'F' },
                        { label: 'Other', value: 'O' }
                    ]
                }
            ]
        },
        {
            id: 'contact',
            title: 'Contact Information',
            fields: [
                {
                    id: 'phone',
                    type: 'text',
                    label: 'Phone Number',
                    validation: {
                        pattern: '^[0-9]{10}$'
                    }
                },
                {
                    id: 'address',
                    type: 'text',
                    label: 'Address',
                    required: true
                }
            ]
        }
    ]
};

export const FormBuilderDemo: React.FC = () => {
    const handleSubmit = (data: any) => {
        console.log('Form Data:', data);
        alert(JSON.stringify(data, null, 2));
    };

    return (
        <div className="page-container">
            <h1>Dynamic Form Builder Demo</h1>
            <Card>
                <FormEngine
                    schema={sampleSchema}
                    onSubmit={handleSubmit}
                />
            </Card>
        </div>
    );
};
