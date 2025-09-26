function solution(office, history) {
    const matrix = office.map(row => [...row]);
    const rows = office.length;
    const cols = office[0].length;
    

    function parseRoom(roomStr) {
        const [row, col] = roomStr.split('.').map(Number);
        return [rows - row, col - 1];
    }
    
    function formatRoom(row, col) {
        return `${rows - row}.${col + 1}`;
    }
    /*
    for (const [roomStr, change] of history) {
        const [row, col] = parseRoom(roomStr);
        if (row >= 0 && row < rows && col >= 0 && col < cols) {
            matrix[row][col] = change;
        }
    }
    */
    
    function findMaxActivityRoom(matrix) {
        let maxActivity = -Infinity;
        let resultRoom = null;
        
        for (let arrayRow = rows - 1; arrayRow >= 0; arrayRow--) {
            for (let arrayCol = 0; arrayCol < cols; arrayCol++) {
                const currentActivity = matrix[arrayRow][arrayCol];
                
                if (currentActivity > maxActivity) {
                    maxActivity = currentActivity;
                    resultRoom = formatRoom(arrayRow, arrayCol);
                } else if (currentActivity === maxActivity && resultRoom !== null) {
                    const currentRoom = formatRoom(arrayRow, arrayCol);
                    const [currentRoomRow, currentRoomCol] = currentRoom.split('.').map(Number);
                    const [resultRoomRow, resultRoomCol] = resultRoom.split('.').map(Number);
                    
                    if (currentRoomRow < resultRoomRow || 
                        (currentRoomRow === resultRoomRow && currentRoomCol < resultRoomCol)) {
                        resultRoom = currentRoom;
                    }
                }
            }
        }
        
        return maxActivity > 0 ? resultRoom : null;
    }

    let currentMaxRoom = findMaxActivityRoom(matrix);
    for (const event of history) {
        const [roomStr, change] = event;
        const [row, col] = parseRoom(roomStr);
        
        if (row >= 0 && row < rows && col >= 0 && col < cols) {
            matrix[row][col] = change;
        }
    }
    currentMaxRoom = findMaxActivityRoom(matrix);
    return currentMaxRoom(matrix);
}

module.exports = solution;