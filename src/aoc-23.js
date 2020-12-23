const canTest = true
const canResolve = true

function rotate(array) {
    const tmp = array.shift()
    array.push(tmp)
}

function rotateUntil(array, condition) {
    while (array[0] !== condition) {
        rotate(array)
    }
    rotate(array)
}

function solution1(input) {
    let cups = input.split('').map(cup => +cup)
    for (let turn = 0; turn < 100; turn++) {
        const origin = cups[0]
        let destination = cups[0] - 1
        if (destination <= 0) destination = 9
        rotate(cups)
        const pickup = [cups.shift(),cups.shift(),cups.shift()]
        while (pickup.some(p => p === destination)) {
            if (--destination <= 0) destination = 9 
        }
        rotateUntil(cups, destination)
        cups = [...pickup, ...cups]
        rotateUntil(cups, origin)
    }
    rotateUntil(cups, 1)
    return cups.join('')
}

function solution2(input) {
    const cups = input.split('').map(cup => +cup)
    const nodes = {}
    let lastNode = null
    for (let i = 0; i < cups.length; i++) {
        const node = { value: cups[i], left: null, right: null }
        nodes[cups[i]] = node
        if (lastNode !== null) {
            lastNode.right = node
            node.left = lastNode
        }
        lastNode = node
    }
    for (let i = cups.length + 1; i < 1000001; i++) {
        const node = { value: i, left: null, right: null }
        nodes[i] = node
        lastNode.right = node
        node.left = lastNode
        lastNode = node
    }
    let firstNode = nodes[cups[0]]
    lastNode.right = firstNode
    firstNode.left = lastNode
    for (let i = 0; i < 10000000; i++) {
        const firstValue = firstNode.value
        const cup1 = firstNode.right
        const cup2 = cup1.right
        const cup3 = cup2.right
        firstNode.right = cup3.right
        firstNode.right.left = firstNode
        let destinationValue = firstValue - 1
        if (destinationValue <= 0) destinationValue = 1000000
        while (cup1.value === destinationValue || cup2.value === destinationValue || cup3.value === destinationValue) {
            destinationValue = destinationValue - 1
            if (destinationValue <= 0) destinationValue = 1000000
        }
        const destinationNode = nodes[destinationValue]
        cup3.right = destinationNode.right
        cup3.right.left = cup3
        destinationNode.right = cup1
        cup1.left = destinationNode
        firstNode = firstNode.right
    }
    while (firstNode.value !== 1) {
        firstNode = firstNode.right
    }
    return firstNode.right.value * firstNode.right.right.value
}

const testInput = [`389125467`]
const input = `624397158`

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
    console.time()
    const value2 = solution2(input)
    console.timeEnd()
    console.log(value2)
}