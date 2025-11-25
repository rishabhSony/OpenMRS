import React from 'react';
import { NavLink } from 'react-router-dom';

export interface NavItem {
    label: string;
    path: string;
    icon?: React.ReactNode;
}

export interface SidebarProps {
    items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ items }) => {
    return (
        <aside className="sidebar glass" style={{
            width: '250px',
            height: 'calc(100vh - 80px)',
            position: 'sticky',
            top: '80px',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
        }}>
            <nav className="nav-vertical" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {items.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `nav-item ${isActive ? 'active' : ''}`
                        }
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            width: '100%'
                        }}
                    >
                        {item.icon}
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};
