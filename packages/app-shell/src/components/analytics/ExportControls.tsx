import React, { useState } from 'react';
import { Button } from '@openmrs-enterprise/ui-components';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

interface ExportControlsProps {
    targetId: string; // ID of the DOM element to capture for PDF
    dataToExport?: any[]; // Data to export to Excel
    fileName?: string;
}

export const ExportControls: React.FC<ExportControlsProps> = ({
    targetId,
    dataToExport = [],
    fileName = 'report'
}) => {
    const [isExporting, setIsExporting] = useState(false);

    const handleExportPDF = async () => {
        const element = document.getElementById(targetId);
        if (!element) return;

        setIsExporting(true);
        try {
            const canvas = await html2canvas(element, {
                scale: 2,
                logging: false,
                useCORS: true
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'a4'
            });

            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${fileName}.pdf`);
        } catch (error) {
            console.error('PDF Export failed:', error);
        } finally {
            setIsExporting(false);
        }
    };

    const handleExportExcel = () => {
        if (!dataToExport || dataToExport.length === 0) {
            alert('No data available to export');
            return;
        }

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(dataToExport);
        XLSX.utils.book_append_sheet(wb, ws, 'Data');
        XLSX.writeFile(wb, `${fileName}.xlsx`);
    };

    return (
        <div className="export-controls" style={{ display: 'flex', gap: '0.5rem' }}>
            <Button
                variant="outline"
                onClick={handleExportPDF}
                disabled={isExporting}
            >
                {isExporting ? 'Generating PDF...' : '📄 Export PDF'}
            </Button>
            <Button
                variant="outline"
                onClick={handleExportExcel}
                disabled={dataToExport.length === 0}
            >
                📊 Export Excel
            </Button>
        </div>
    );
};
