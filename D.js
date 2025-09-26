function solution(root) {
    const result = {};
    
    function traverse(obj, path) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const currentPath = path ? `${path}.${key}` : key;
                
                if (typeof obj[key] === 'function') {
                    result[currentPath] = function() {
                        return obj[key](currentPath);
                    };
                } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                    traverse(obj[key], currentPath);
                }
            }
        }
    }
    
    traverse(root, '');
    return result;
}

module.exports = solution;