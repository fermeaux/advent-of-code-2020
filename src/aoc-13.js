function solution1(input) {
    const entries = input.split('\n')
    const ts = +entries[0]
    const bus = entries[1].split(',').reduce((p, c) => {
        if (c !== 'x') p.push(+c)
        return p
    }, [])
    let bestScore = -1
    let bestCar = null
    bus.forEach(car => {
        const cc = ((Math.ceil(ts / car)) * car) - ts
        if (bestScore < 0 || cc < bestScore) {
            bestScore = cc
            bestCar = car
        }
    })
    return bestCar * bestScore
}

function solution2(input) {
    const entries = input.split('\n')
    const bus = entries[1].split(',').reduce((p, c) => {
        if (c !== 'x') p.push(+c)
        else p.push(1)
        return p
    }, [])
    let timestamp = 100000000000000
    let lowestMultiplier = 1
    let i = 0
    while (i < bus.length) {
        if ((timestamp + i) % bus[i] === 0) {
            lowestMultiplier *= bus[i]
            i++
        } else {
            timestamp += lowestMultiplier
        }
    }
    return timestamp
}

const testInput = `939
1789,37,47,1889`
const input = `1000340
13,x,x,x,x,x,x,37,x,x,x,x,x,401,x,x,x,x,x,x,x,x,x,x,x,x,x,17,x,x,x,x,19,x,x,x,23,x,x,x,x,x,29,x,613,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,41`
const value1 = solution1(input)
const value1Test = solution1(testInput)
const value2 = solution2(input)
const value2Test = solution2(testInput)

console.log('===== Test Output =====')
console.log(value1Test)
console.log(value2Test)
console.log('=====  My Output  =====')
console.log(value1)
console.log(value2)