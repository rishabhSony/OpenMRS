import React from 'react';
import { Card } from '@openmrs-enterprise/ui-components';
import type { VitalsData } from '@openmrs-enterprise/core';
import { isVitalAbnormal } from '@openmrs-enterprise/core';
import './VitalsWidget.css';

interface VitalsWidgetProps {
    vitals: VitalsData;
    timestamp?: Date;
}

export const VitalsWidget: React.FC<VitalsWidgetProps> = ({ vitals, timestamp }) => {
    const getVitalClass = (type: string, value?: number) => {
        if (!value) return '';
        return isVitalAbnormal(type as any, value) ? 'abnormal' : 'normal';
    };

    const formatBP = () => {
        if (!vitals.bloodPressureSystolic || !vitals.bloodPressureDiastolic) return '--/--';
        return `${vitals.bloodPressureSystolic}/${vitals.bloodPressureDiastolic}`;
    };

    return (
        <Card title="Latest Vitals" className="vitals-widget">
            {timestamp && (
                <div className="vitals-timestamp">
                    Recorded: {new Date(timestamp).toLocaleString()}
                </div>
            )}

            <div className="vitals-grid">
                <div className={`vital-item ${getVitalClass('bloodPressureSystolic', vitals.bloodPressureSystolic)}`}>
                    <div className="vital-label">Blood Pressure</div>
                    <div className="vital-value">{formatBP()}</div>
                    <div className="vital-unit">mmHg</div>
                </div>

                <div className={`vital-item ${getVitalClass('heartRate', vitals.heartRate)}`}>
                    <div className="vital-label">Heart Rate</div>
                    <div className="vital-value">{vitals.heartRate || '--'}</div>
                    <div className="vital-unit">BPM</div>
                </div>

                <div className={`vital-item ${getVitalClass('temperature', vitals.temperature)}`}>
                    <div className="vital-label">Temperature</div>
                    <div className="vital-value">{vitals.temperature || '--'}</div>
                    <div className="vital-unit">°{vitals.temperatureUnit || 'C'}</div>
                </div>

                <div className={`vital-item ${getVitalClass('respiratoryRate', vitals.respiratoryRate)}`}>
                    <div className="vital-label">Respiratory Rate</div>
                    <div className="vital-value">{vitals.respiratoryRate || '--'}</div>
                    <div className="vital-unit">/min</div>
                </div>

                <div className={`vital-item ${getVitalClass('oxygenSaturation', vitals.oxygenSaturation)}`}>
                    <div className="vital-label">SpO2</div>
                    <div className="vital-value">{vitals.oxygenSaturation || '--'}</div>
                    <div className="vital-unit">%</div>
                </div>

                <div className="vital-item">
                    <div className="vital-label">Weight</div>
                    <div className="vital-value">{vitals.weight || '--'}</div>
                    <div className="vital-unit">{vitals.weightUnit || 'kg'}</div>
                </div>

                <div className="vital-item">
                    <div className="vital-label">Height</div>
                    <div className="vital-value">{vitals.height || '--'}</div>
                    <div className="vital-unit">{vitals.heightUnit || 'cm'}</div>
                </div>

                {vitals.bmi && (
                    <div className="vital-item bmi">
                        <div className="vital-label">BMI</div>
                        <div className="vital-value">{vitals.bmi}</div>
                        <div className="vital-unit">kg/m²</div>
                    </div>
                )}
            </div>

            {vitals.notes && (
                <div className="vitals-notes">
                    <strong>Notes:</strong> {vitals.notes}
                </div>
            )}
        </Card>
    );
};
