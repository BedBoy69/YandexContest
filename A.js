function makeTable(data, columns) {
    if (!columns || columns.length === 0) return '';

    const columnWidths = {};

    columns.forEach(col => {
        columnWidths[col] = col.length;

        data.forEach(item => {
            let value = item[col]; 
            let displayValue = '-';
            
            if (value !== null && value !== undefined) {
                displayValue = String(value);
            }
            
            columnWidths[col] = Math.max(columnWidths[col], displayValue.length);
        });
    });

    const getCellValue = (item, column) => {
        if (item.hasOwnProperty(column)) {
            const value = item[column];
            return value !== null && value !== undefined ? String(value) : '-';
        }
        return '-';
    };

    const createHorizontalLine = () => {
        let line = '#';
        columns.forEach((col, index) => {
            line += '='.repeat(columnWidths[col] + 2);
            line += index === columns.length - 1 ? '#' : '#';
        });
        return line;
    };

    const createRow = (getValueCallback) => {
        let row = '|';
        columns.forEach((col, index) => {
            const value = getValueCallback(col);
            const padding = columnWidths[col] - value.length;
            row += ` ${value}${' '.repeat(padding)} |`;
        });
        return row;
    };

    let table = '';
    const horizontalLine = createHorizontalLine();

    table += horizontalLine + '\n';

    table += createRow(col => col) + '\n';

    table += horizontalLine + '\n';

    if (data.length > 0) {
        data.forEach(item => {
            table += createRow(col => getCellValue(item, col)) + '\n';
            table += horizontalLine + '\n';
        });
    } else {
        table += createRow(() => '-') + '\n';
        table += horizontalLine + '\n';
    }
    
    return table.trim();
}

module.exports = makeTable;

