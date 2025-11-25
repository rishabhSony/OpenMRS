import React from 'react';

export interface Column<T> {
    key: string;
    header: string;
    render?: (item: T) => React.ReactNode;
    width?: string;
}

export interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    onRowClick?: (item: T) => void;
    isLoading?: boolean;
    keyExtractor?: (item: T) => string | number;
}

export function Table<T>({
    data,
    columns,
    onRowClick,
    isLoading,
    keyExtractor = (item: any) => item.id
}: TableProps<T>) {
    if (isLoading) {
        return <div className="p-4 text-center">Loading...</div>;
    }

    return (
        <div className="table-container" style={{ overflowX: 'auto' }}>
            <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                style={{
                                    padding: '1rem',
                                    textAlign: 'left',
                                    fontWeight: 600,
                                    color: 'var(--color-text-secondary)',
                                    width: column.width
                                }}
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        const rowKey = keyExtractor(item) || index;
                        return (
                            <tr
                                key={rowKey}
                                onClick={() => onRowClick?.(item)}
                                style={{
                                    borderBottom: '1px solid var(--color-border)',
                                    cursor: onRowClick ? 'pointer' : 'default',
                                    transition: 'background-color 0.2s'
                                }}
                                className="table-row"
                            >
                                {columns.map((column) => (
                                    <td
                                        key={`${rowKey}-${column.key}`}
                                        style={{ padding: '1rem' }}
                                    >
                                        {column.render ? column.render(item) : (item as any)[column.key]}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {data.length === 0 && (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                    No data available
                </div>
            )}
        </div>
    );
}
