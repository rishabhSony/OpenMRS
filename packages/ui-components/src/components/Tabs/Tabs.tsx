import React, { useState } from 'react';

export interface Tab {
    id: string;
    label: string;
    content: React.ReactNode;
}

export interface TabsProps {
    tabs: Tab[];
    defaultTab?: string;
    onChange?: (tabId: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, defaultTab, onChange }) => {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
        onChange?.(tabId);
    };

    return (
        <div className="tabs-container">
            <div className="tabs-header" style={{
                display: 'flex',
                gap: '1rem',
                borderBottom: '1px solid var(--color-border)',
                marginBottom: '1.5rem'
            }}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        style={{
                            background: 'none',
                            border: 'none',
                            padding: '0.75rem 0',
                            marginRight: '1rem',
                            color: activeTab === tab.id ? 'var(--color-primary-light)' : 'var(--color-text-secondary)',
                            borderBottom: activeTab === tab.id ? '2px solid var(--color-primary)' : '2px solid transparent',
                            fontWeight: activeTab === tab.id ? 600 : 500,
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="tabs-content">
                {tabs.find((tab) => tab.id === activeTab)?.content}
            </div>
        </div>
    );
};
