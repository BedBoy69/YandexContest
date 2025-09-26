async function getAvailableSatellites(satellites, timeoutMs = 3000) {
    const promises = satellites.map(async (satellite) => {
        try {
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('timeout')), timeoutMs);
            });
            
            const checkPromise = Promise.resolve(satellite.check());

            await Promise.race([checkPromise, timeoutPromise]);
            return satellite.name;
        } catch (error) {
            return null;
        }
    });
    
    const results = await Promise.all(promises);
    return results.filter(name => name !== null);
}

module.exports = getAvailableSatellites;