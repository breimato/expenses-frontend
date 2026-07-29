import type { ReactNode } from 'react';
import styles from './DataTable.module.css';

interface DataTableProps {
  headers: string[];
  alignRight?: number[];
  children: ReactNode;
  emptyMessage?: string;
  isEmpty?: boolean;
}

export function DataTable({
  headers,
  alignRight = [],
  children,
  emptyMessage = 'Sin datos',
  isEmpty = false,
}: DataTableProps) {
  if (isEmpty) {
    return <p className={styles.empty}>{emptyMessage}</p>;
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={header}
                className={alignRight.includes(index) ? styles.alignRight : undefined}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export { styles as dataTableStyles };
