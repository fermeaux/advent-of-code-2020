function solution1(input) {
    const joults = input.split('\n').map(entry => +entry)
    joults.sort((a, b) => a - b)
    let one = 1
    let three = 1
    for (let i = 0; i < joults.length; i++) {
        if (i >= 1 && joults[i] - joults[i - 1] === 1) one++
        else if (i >= 1 && joults[i] - joults[i - 1] === 3) three++
    }
    return one * three
}

let memoized = {}

function constructRoutes(items, last = 0) {
    if (items.length === 0) return 1
    let count = 0
    for (let i = 0; i < 3; i++) {
        if (items[i] - last <= 3) {
            if (!memoized[items[i]]) {
                const possibilities = items.filter((_, index) => index > i)
                const constructedCount = constructRoutes(possibilities, items[i])
                memoized[items[i]] = constructedCount
            }
            count += memoized[items[i]]
        }
    }
    return count
}

function solution2(input) {
    memoized = {}
    const joults = input.split('\n').map(entry => +entry)
    joults.sort((a, b) => a - b)
    return constructRoutes(joults)
}

const testInput = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`
const input = `70
102
148
9
99
63
40
52
91
39
55
28
54
22
95
61
118
35
14
21
129
82
137
45
7
87
81
25
3
108
41
11
145
18
65
80
115
29
136
42
97
104
117
141
62
121
23
96
24
128
48
1
112
8
34
144
134
116
58
147
51
84
17
126
64
68
135
10
77
105
127
73
111
90
16
103
109
98
146
123
130
69
133
110
30
122
15
74
33
38
83
92
2
53
140
4`
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