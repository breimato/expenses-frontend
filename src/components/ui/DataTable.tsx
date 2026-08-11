import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
  type TdHTMLAttributes,
} from 'react';
import styles from './DataTable.module.css';

interface DataTableProps {
  headers: string[];
  alignRight?: number[];
  hideOnMobile?: number[];
  children: ReactNode;
  emptyMessage?: string;
  isEmpty?: boolean;
}

export function DataTable({
  headers,
  alignRight = [],
  hideOnMobile = [],
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
                key={`${header}-${index}`}
                className={[
                  alignRight.includes(index) ? styles.alignRight : undefined,
                  hideOnMobile.includes(index) ? styles.hideOnMobile : undefined,
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{enhanceRows(children, headers, alignRight, hideOnMobile)}</tbody>
      </table>
    </div>
  );
}

function enhanceRows(
  children: ReactNode,
  headers: string[],
  alignRight: number[],
  hideOnMobile: number[],
): ReactNode {
  return Children.map(children, (row) => {
    if (!isValidElement(row) || row.type !== 'tr') {
      return row;
    }

    const rowElement = row as ReactElement<{ children?: ReactNode }>;
    const cells = Children.map(rowElement.props.children, (cell, index) => {
      if (!isValidElement(cell) || cell.type !== 'td') {
        return cell;
      }

      const cellElement = cell as ReactElement<TdHTMLAttributes<HTMLTableCellElement>>;
      const label = headers[index]?.trim();
      return cloneElement(cellElement, {
        'data-label': label || undefined,
        className: [
          cellElement.props.className,
          alignRight.includes(index) ? styles.alignRight : undefined,
          hideOnMobile.includes(index) ? styles.hideOnMobile : undefined,
          !label ? styles.actionsCell : undefined,
        ]
          .filter(Boolean)
          .join(' '),
      });
    });

    return cloneElement(rowElement, undefined, cells);
  });
}

export { styles as dataTableStyles };
