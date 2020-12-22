const canTest = true
const canResolve = true

function solution1(input) {
    let players = []
    input.split('\n\n').forEach((entry) => {
        players.push(entry.split(':\n')[1].split('\n').map(tmp => +tmp))
    })
    while (players[0].length > 0 && players[1].length > 0) {
        const a = players[0].shift()
        const b = players[1].shift()
        if (a > b) {
            players[0].push(a, b)
        } else {
            players[1].push(b, a)
        }
    }
    const player = players[0].length > 0 ? players[0] : players[1]
    return player.reduce((p, c, i) => p + c * (player.length - i), 0)
}

function recursivePlay(players, depth = 0) {
    let played = {}
    while (players[0].length && players[1].length) {
		let check = players[0].join('') + '+' + players[1].join('')
		if (played[check]) return 0
        played[check] = true
        let a = players[0].shift()
        let b = players[1].shift()
		if (a <= players[0].length && b <= players[1].length) {
            let winner = recursivePlay([[...players[0].slice(0, a)], [...players[1].slice(0, b)]], depth + 1)
            if (winner === 0) players[0].push(a, b)
            else players[1].push(b, a)
		} else if (a > b) players[0].push(a, b)
        else if (a < b) players[1].push(b, a)
	}
	if (depth === 0) {
		let winner = players[0].length ? players[0] : players[1]
        return winner.reduce((p, c, i) => p + c * (winner.length - i), 0)
    }
    return players[0].length ? 0 : 1
}

function solution2(input) {
    let players = []
    input.split('\n\n').forEach((entry) => {
        players.push(entry.split(':\n')[1].split('\n').map(tmp => +tmp))
    })
    return recursivePlay(players)
}

const testInput = [`Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`]
const input = `Player 1:
25
37
35
16
9
26
17
5
47
32
11
43
40
15
7
19
36
20
50
3
21
34
44
18
22

Player 2:
12
1
27
41
4
39
13
29
38
2
33
28
10
6
24
31
42
8
23
45
46
48
49
30
14`

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