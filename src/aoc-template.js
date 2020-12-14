const canTest = true
const canResolve = true

function solution1(input) {
    let values = {}
    input.split('\n').forEach(entry => {
        const { name } = /(?<name>.+)/.exec(entry).groups
        values[name] = 0
    })
    return ''
}

function solution2(input) {
    return ''
}

const testInput = [``]
const input = ``

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