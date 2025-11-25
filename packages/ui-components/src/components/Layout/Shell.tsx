import React from 'react';
import { Header, HeaderProps } from './Header';
import { Sidebar, SidebarProps } from './Sidebar';

export interface ShellProps extends HeaderProps, SidebarProps {
    children: React.ReactNode;
}

export const Shell: React.FC<ShellProps> = ({
    children,
    items,
    ...headerProps
}) => {
    return (
        <div className="app">
            <Header {...headerProps} />
            <div className="app-body" style={{ display: 'flex', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <Sidebar items={items} />
                <main className="main-content" style={{ flex: 1, paddingLeft: '2rem' }}>
                    {children}
                </main>
            </div>
        </div>
    );
};
