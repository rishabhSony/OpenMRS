import React, { useState, useEffect } from 'react';
import { DndContext, DragOverlay, useDraggable, useDroppable } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { Button } from '@openmrs-enterprise/ui-components';
import { PredictiveOccupancy } from '../components/analytics/PredictiveOccupancy';
import { ExportControls } from '../components/analytics/ExportControls';

// Widget Definitions
const WIDGETS = [
    { id: 'occupancy', title: 'Occupancy Prediction', component: <PredictiveOccupancy /> },
    { id: 'stats', title: 'Quick Stats', component: <div className="p-4 bg-blue-50 rounded">Stats Placeholder</div> },
    { id: 'chart', title: 'Generic Chart', component: <div className="p-4 bg-green-50 rounded" style={{ height: 200 }}>Chart Placeholder</div> }
];

interface DraggableWidgetProps {
    id: string;
    title: string;
}

const DraggableWidget: React.FC<DraggableWidgetProps> = ({ id, title }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `sidebar-${id}`,
        data: { type: 'sidebar', widgetId: id }
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="widget-item p-3 mb-2 bg-white border rounded shadow-sm cursor-move">
            {title}
        </div>
    );
};

interface ReportItem {
    id: string;
    widgetId: string;
}

export const ReportBuilder: React.FC = () => {
    const [reportItems, setReportItems] = useState<ReportItem[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);

    // Load saved report
    useEffect(() => {
        const saved = localStorage.getItem('customReport');
        if (saved) {
            setReportItems(JSON.parse(saved));
        }
    }, []);

    const handleDragStart = (event: any) => {
        setActiveId(event.active.id);
    };

    // Handle the end of a drag event
    // If a widget is dropped over the 'canvas' area, we add it to the reportItems list
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveId(null);

        if (over && over.id === 'canvas') {
            const widgetId = active.data.current?.widgetId;
            if (widgetId) {
                const newItem = {
                    id: `item-${Date.now()}`, // Unique ID for the report item
                    widgetId: widgetId
                };
                setReportItems([...reportItems, newItem]);
            }
        }
    };

    const handleSave = () => {
        localStorage.setItem('customReport', JSON.stringify(reportItems));
        alert('Report configuration saved!');
    };

    const handleClear = () => {
        setReportItems([]);
        localStorage.removeItem('customReport');
    };

    const { setNodeRef } = useDroppable({
        id: 'canvas',
    });

    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="report-builder-page h-screen flex flex-col">
                <div className="page-header flex justify-between items-center p-4 bg-white border-b">
                    <div>
                        <h1>Custom Report Builder</h1>
                        <p className="subtitle">Drag widgets to build your custom dashboard</p>
                    </div>
                    <div className="actions flex gap-2">
                        <Button variant="outline" onClick={handleClear}>Clear</Button>
                        <Button onClick={handleSave}>Save Report</Button>
                        <ExportControls targetId="report-canvas" fileName="custom-report" />
                    </div>
                </div>

                <div className="builder-content flex flex-1 overflow-hidden">
                    {/* Sidebar */}
                    <div className="sidebar w-64 bg-gray-50 border-r p-4 overflow-y-auto">
                        <h3 className="mb-4 font-bold text-gray-700">Available Widgets</h3>
                        {WIDGETS.map(w => (
                            <DraggableWidget key={w.id} id={w.id} title={w.title} />
                        ))}
                    </div>

                    {/* Canvas */}
                    <div className="canvas-container flex-1 p-8 bg-gray-100 overflow-y-auto">
                        <div
                            id="report-canvas"
                            ref={setNodeRef}
                            className="canvas min-h-full bg-white rounded-lg shadow-sm p-8 border-2 border-dashed border-gray-300"
                            style={{ minHeight: '600px' }}
                        >
                            {reportItems.length === 0 ? (
                                <div className="text-center text-gray-400 mt-20">
                                    Drop widgets here to build your report
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {reportItems.map(item => {
                                        const widget = WIDGETS.find(w => w.id === item.widgetId);
                                        return widget ? (
                                            <div key={item.id} className="report-widget">
                                                {widget.component}
                                            </div>
                                        ) : null;
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <DragOverlay>
                {activeId ? (
                    <div className="p-3 bg-white border rounded shadow-lg opacity-80">
                        Dragging...
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};
