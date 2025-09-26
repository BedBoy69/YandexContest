module.exports = function memeSpreadTime(subscriptions, starters, target) {
    if (starters.includes(target)) {
        return 0;
    }
    
    const graph = {};
    
    for (const [user1, user2, time] of subscriptions) {
        if (!graph[user1]) graph[user1] = [];
        if (!graph[user2]) graph[user2] = [];
        
        graph[user1].push([user2, time]);
        graph[user2].push([user1, time]);
    }
    
    if (!graph[target]) {
        return -1;
    }
    
    const times = {};
    for (const user in graph) {
        times[user] = Infinity;
    }
    
    for (const starter of starters) {
        if (graph[starter]) {
            times[starter] = 0;
        }
    }
    
    const queue = [];
    for (const starter of starters) {
        if (graph[starter]) {
            queue.push({ user: starter, time: 0 });
        }
    }
    
    while (queue.length > 0) {
        let minIndex = 0;
        for (let i = 1; i < queue.length; i++) {
            if (queue[i].time < queue[minIndex].time) {
                minIndex = i;
            }
        }
        
        const current = queue[minIndex];
        queue.splice(minIndex, 1);
        
        const currentUser = current.user;
        const currentTime = current.time;
        
        if (currentTime > times[currentUser]) {
            continue;
        }
        
        if (currentUser == target) {
            return currentTime;
        }
        
        if (graph[currentUser]) {
            for (const [friend, transmissionTime] of graph[currentUser]) {
                const newTime = currentTime + transmissionTime;
                
                if (newTime < times[friend]) {
                    times[friend] = newTime;
                    queue.push({ user: friend, time: newTime });
                }
            }
        }
    }
    
    return times[target] === Infinity ? -1 : times[target];
}