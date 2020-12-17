const canTest = true
const canResolve = true

function solution1(input) {
    let map = {};
    const entries = input.split('\n')
    for (let y = 0; y < entries.length; y++) {
        for (let x = 0; x < entries[0].length; x++) {
            if (entries[y][x] === '#') {
                map[`${x},${y},0`] = true
            }
        }
    }
    const countNeighbours = (x, y, z) => {
        let count = 0;
        for (let zz = z - 1; zz <= z + 1; zz++) {
            for (let yy = y - 1; yy <= y + 1; yy++) {
                for (let xx = x - 1; xx <= x + 1; xx++) {
                    if ((xx !== x || yy !== y || zz !== z) && map[`${xx},${yy},${zz}`]) {
                        count++
                    }
                }
            }
        }
        return count
    }
    let height = [0, entries.length]
    let width = [0, entries[0].length]
    let depth = [0, 1]
    for (let t = 0; t < 6; t++) {
        let newMap = {}
        depth[0]--
        depth[1]++
        width[0]--
        width[1]++
        height[0]--
        height[1]++
        for (let z = depth[0]; z < depth[1]; z++) {
            for (let y = width[0]; y < width[1]; y++) {
                for (let x = height[0]; x < height[1]; x++) {
                    let neigh = countNeighbours(x, y, z)
                    const isActive = map[`${x},${y},${z}`]
                    if (neigh === 3 || (neigh === 2 && isActive)) {
                        newMap[`${x},${y},${z}`] = true
                    }
                }
            }
        }
        map = newMap
    }
    return Object.keys(map).length
}

function solution2(input) {
    let map = {}
    const entries = input.split('\n')
    for (let y = 0; y < entries.length; y++) {
        for (let x = 0; x < entries[0].length; x++) {
            if (entries[y][x] === '#') {
                map[`${x},${y},0,0`] = true
            }
        }
    }
    const countNeighbours = (x, y, z, w) => {
        let count = 0
        for (let ww = w - 1; ww <= w + 1; ww++) {
            for (let zz = z - 1; zz <= z + 1; zz++) {
                for (let yy = y - 1; yy <= y + 1; yy++) {
                    for (let xx = x - 1; xx <= x + 1; xx++) {
                        if ((xx !== x || yy !== y || zz !== z || ww !== w) && map[`${xx},${yy},${zz},${ww}`]) {
                            count++
                        }
                    }
                }
            }
        }
        return count
    }
    let height = [0, entries.length]
    let width = [0, entries[0].length]
    let depth = [0, 1]
    let hyper = [0, 1]
    for (let t = 0; t < 6; t++) {
        let newMap = {}
        depth[0]--
        depth[1]++
        width[0]--
        width[1]++
        height[0]--
        height[1]++
        hyper[0]--
        hyper[1]++
        for (let w = hyper[0]; w < hyper[1]; w++) {
            for (let z = depth[0]; z < depth[1]; z++) {
                for (let y = width[0]; y < width[1]; y++) {
                    for (let x = height[0]; x < height[1]; x++) {
                        let neigh = countNeighbours(x, y, z, w)
                        const isActive = map[`${x},${y},${z},${w}`]
                        if (neigh === 3 || (neigh === 2 && isActive)) {
                            newMap[`${x},${y},${z},${w}`] = true
                        }
                    }
                }
            }
        }
        map = newMap
    }
    return Object.keys(map).length
}

const testInput = [`.#.
..#
###`]
const input = `#.##.##.
.##..#..
....#..#
.##....#
#..##...
.###..#.
..#.#..#
.....#..`

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