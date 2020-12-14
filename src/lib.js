export function constructRoutes(items, currentRoute = []) {
    if (items.length === 0) return [currentRoute]
    const routes = []
    items.forEach((item) => {
        const possibilities = items.filter(tmp => tmp !== item)
        const constructed = constructRoutes(possibilities, [...currentRoute, item])
        routes.push(...constructed)
    })
    return routes
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

export function dec2bin(dec){
    return (dec >>> 0).toString(2);
}