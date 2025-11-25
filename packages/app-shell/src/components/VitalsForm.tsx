import React, { useState, useEffect } from 'react';
import { Input, Button } from '@openmrs-enterprise/ui-components';
import type { VitalsData } from '@openmrs-enterprise/core';
import { calculateBMI, VITAL_RANGES, isVitalAbnormal } from '@openmrs-enterprise/core';
import './VitalsForm.css';

interface VitalsFormProps {
    onSubmit: (data: VitalsData) => void;
    onCancel: () => void;
    initialData?: VitalsData;
}

export const VitalsForm: React.FC<VitalsFormProps> = ({ onSubmit, onCancel, initialData }) => {
    const [formData, setFormData] = useState<VitalsData>(initialData || {
        temperatureUnit: 'C',
        weightUnit: 'kg',
        heightUnit: 'cm'
    });

    // Auto-calculate BMI when weight or height changes
    useEffect(() => {
        if (formData.weight && formData.height) {
            const bmi = calculateBMI(
                formData.weight,
                formData.height,
                formData.weightUnit,
                formData.heightUnit
            );
            setFormData(prev => ({ ...prev, bmi }));
        }
    }, [formData.weight, formData.height, formData.weightUnit, formData.heightUnit]);

    const handleChange = (field: keyof VitalsData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const getInputClass = (type: string, value?: number) => {
        if (!value) return '';
        const isAbnormal = isVitalAbnormal(type as any, value);
        return isAbnormal ? 'vital-abnormal' : 'vital-normal';
    };

    return (
        <form onSubmit={handleSubmit} className="vitals-form">
            <div className="form-grid">
                {/* Blood Pressure */}
                <div className="form-section">
                    <h3>Blood Pressure</h3>
                    <div className="bp-group">
                        <Input
                            label="Systolic (mmHg)"
                            type="number"
                            value={formData.bloodPressureSystolic || ''}
                            onChange={(e) => handleChange('bloodPressureSystolic', Number(e.target.value))}
                            placeholder="120"
                            min={VITAL_RANGES.bloodPressureSystolic.min}
                            max={VITAL_RANGES.bloodPressureSystolic.max}
                            className={getInputClass('bloodPressureSystolic', formData.bloodPressureSystolic)}
                        />
                        <span className="bp-separator">/</span>
                        <Input
                            label="Diastolic (mmHg)"
                            type="number"
                            value={formData.bloodPressureDiastolic || ''}
                            onChange={(e) => handleChange('bloodPressureDiastolic', Number(e.target.value))}
                            placeholder="80"
                            min={VITAL_RANGES.bloodPressureDiastolic.min}
                            max={VITAL_RANGES.bloodPressureDiastolic.max}
                            className={getInputClass('bloodPressureDiastolic', formData.bloodPressureDiastolic)}
                        />
                    </div>
                </div>

                {/* Heart Rate */}
                <Input
                    label={`Heart Rate (${VITAL_RANGES.heartRate.unit})`}
                    type="number"
                    value={formData.heartRate || ''}
                    onChange={(e) => handleChange('heartRate', Number(e.target.value))}
                    placeholder="72"
                    min={VITAL_RANGES.heartRate.min}
                    max={VITAL_RANGES.heartRate.max}
                    className={getInputClass('heartRate', formData.heartRate)}
                />

                {/* Temperature */}
                <div className="temp-group">
                    <Input
                        label="Temperature"
                        type="number"
                        step="0.1"
                        value={formData.temperature || ''}
                        onChange={(e) => handleChange('temperature', Number(e.target.value))}
                        placeholder="37.0"
                        className={getInputClass('temperature', formData.temperature)}
                    />
                    <select
                        value={formData.temperatureUnit}
                        onChange={(e) => handleChange('temperatureUnit', e.target.value)}
                        className="unit-select"
                    >
                        <option value="C">°C</option>
                        <option value="F">°F</option>
                    </select>
                </div>

                {/* Respiratory Rate */}
                <Input
                    label={`Respiratory Rate (${VITAL_RANGES.respiratoryRate.unit})`}
                    type="number"
                    value={formData.respiratoryRate || ''}
                    onChange={(e) => handleChange('respiratoryRate', Number(e.target.value))}
                    placeholder="16"
                    min={VITAL_RANGES.respiratoryRate.min}
                    max={VITAL_RANGES.respiratoryRate.max}
                    className={getInputClass('respiratoryRate', formData.respiratoryRate)}
                />

                {/* Oxygen Saturation */}
                <Input
                    label={`Oxygen Saturation (${VITAL_RANGES.oxygenSaturation.unit})`}
                    type="number"
                    value={formData.oxygenSaturation || ''}
                    onChange={(e) => handleChange('oxygenSaturation', Number(e.target.value))}
                    placeholder="98"
                    min={VITAL_RANGES.oxygenSaturation.min}
                    max={VITAL_RANGES.oxygenSaturation.max}
                    className={getInputClass('oxygenSaturation', formData.oxygenSaturation)}
                />

                {/* Weight */}
                <div className="weight-group">
                    <Input
                        label="Weight"
                        type="number"
                        step="0.1"
                        value={formData.weight || ''}
                        onChange={(e) => handleChange('weight', Number(e.target.value))}
                        placeholder="70"
                    />
                    <select
                        value={formData.weightUnit}
                        onChange={(e) => handleChange('weightUnit', e.target.value)}
                        className="unit-select"
                    >
                        <option value="kg">kg</option>
                        <option value="lbs">lbs</option>
                    </select>
                </div>

                {/* Height */}
                <div className="height-group">
                    <Input
                        label="Height"
                        type="number"
                        step="0.1"
                        value={formData.height || ''}
                        onChange={(e) => handleChange('height', Number(e.target.value))}
                        placeholder="170"
                    />
                    <select
                        value={formData.heightUnit}
                        onChange={(e) => handleChange('heightUnit', e.target.value)}
                        className="unit-select"
                    >
                        <option value="cm">cm</option>
                        <option value="in">in</option>
                    </select>
                </div>

                {/* BMI (Auto-calculated) */}
                {formData.bmi && (
                    <div className="bmi-display">
                        <label>BMI</label>
                        <div className="bmi-value">{formData.bmi} kg/m²</div>
                    </div>
                )}

                {/* Notes */}
                <div className="notes-section">
                    <label>Notes</label>
                    <textarea
                        value={formData.notes || ''}
                        onChange={(e) => handleChange('notes', e.target.value)}
                        placeholder="Additional observations..."
                        rows={3}
                    />
                </div>
            </div>

            <div className="form-actions">
                <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
                <Button type="submit" variant="primary">Save Vitals</Button>
            </div>
        </form>
    );
};
