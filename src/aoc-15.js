const canTest = false
const canResolve = true

function solution1(input) {
    let memoized = {}
    let entries = input.split(',')
    entries.forEach((entry, index) => memoized[+entry] = index + 1)
    let turn = entries.length + 2
    let last = 0
    while (turn <= 2020) {
        const tmp = (!memoized[last] ? 0 : turn - 1 - memoized[last])
        memoized[last] = turn - 1
        last = tmp
        turn += 1
    }
    return last
}

function solution2(input) {
    let memoized = {}
    let entries = input.split(',')
    entries.forEach((entry, index) => memoized[+entry] = index + 1)
    let turn = entries.length + 2
    let last = 0
    while (turn <= 30000000) {
        const tmp = (!memoized[last] ? 0 : turn - 1 - memoized[last])
        memoized[last] = turn - 1
        last = tmp
        turn += 1
    }
    return last
}

const testInput = [`0,3,6`, '1,3,2', '2,1,3', '1,2,3', '2,3,1', '3,2,1', '3,1,2']
const input = `0,14,1,3,7,9`

console.log(`\n\n`)
if (canTest) {
    testInput.forEach((t, index) => {
        console.log(`===== Test Output ${index + 1} =====`)
        const value1Test = solution1(t)
        console.log(value1Test)
        const value2Test = solution2(t)
        console.log(value2Test)
    })
}
if (canResolve) {
    console.log('=====   My Output   =====')
    const value1 = solution1(input)
    console.log(value1)
    const value2 = solution2(input)
    console.log(value2)
}