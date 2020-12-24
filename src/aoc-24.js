const canTest = true
const canResolve = true

function init(input) {
    const tiles = {}
    input.split('\n').forEach(entry => {
        let x = 0
        let y = 0
        for (let i = 0; i < entry.length; i++) {
            if (entry[i] === 'w') x--
            if (entry[i] === 'e') x++
            if (entry[i] === 'n') {
                i++
                y += 0.5
                if (entry[i] === 'w') x -= 0.5
                if (entry[i] === 'e') x += 0.5
            }
            if (entry[i] === 's') {
                i++
                y -= 0.5
                if (entry[i] === 'w') x -= 0.5
                if (entry[i] === 'e') x += 0.5
            }
        }
        const key = `${x},${y}`
        if (!tiles[key]) tiles[key] = false
        tiles[key] = !tiles[key]
    })
    return tiles
}

function solution1(input) {
    const tiles = init(input)
    return Object.values(tiles).filter(tile => tile === true).length
}

const incrementors = [[-1,0], [1,0], [0.5,0.5], [-0.5,0.5], [0.5,-0.5], [-0.5,-0.5]]

function extendNeighbours(tiles) {
    const tmpTiles = {...tiles}
    Object.keys(tiles).forEach((key) => {
        const loc = key.split(',')
        const x = +loc[0]
        const y = +loc[1]
        incrementors.forEach(incrementor => {
            const neighbourKey = `${incrementor[0] + x},${incrementor[1] + y}`
            if (!tmpTiles[neighbourKey]) {
                tmpTiles[neighbourKey] = false
            }
        })
    })
    return tmpTiles
}

function getNeighbours(key, tiles) {
    const loc = key.split(',')
    const x = +loc[0]
    const y = +loc[1]
    return incrementors.reduce((prev, current) => {
        if (tiles[`${current[0] + x},${current[1] + y}`] === true) return prev + 1
        return prev
    }, 0)
}

function solution2(input) {
    let tiles = init(input)
    for (let turn = 0; turn < 100; turn++) {
        tiles = extendNeighbours(tiles)
        const tmpTiles = {...tiles}
        Object.keys(tiles).forEach(key => {
            const neighbours = getNeighbours(key, tiles)
            if (tiles[key] === true && (neighbours === 0 || neighbours > 2)) tmpTiles[key] = false
            if (tiles[key] === false && neighbours === 2) tmpTiles[key] = true
        })
        tiles = {...tmpTiles}
    }
    return Object.values(tiles).filter(tile => tile === true).length
}

const testInput = [`sesenwnenenewseeswwswswwnenewsewsw
neeenesenwnwwswnenewnwwsewnenwseswesw
seswneswswsenwwnwse
nwnwneseeswswnenewneswwnewseswneseene
swweswneswnenwsewnwneneseenw
eesenwseswswnenwswnwnwsewwnwsene
sewnenenenesenwsewnenwwwse
wenwwweseeeweswwwnwwe
wsweesenenewnwwnwsenewsenwwsesesenwne
neeswseenwwswnwswswnw
nenwswwsewswnenenewsenwsenwnesesenew
enewnwewneswsewnwswenweswnenwsenwsw
sweneswneswneneenwnewenewwneswswnese
swwesenesewenwneswnwwneseswwne
enesenwswwswneneswsenwnewswseenwsese
wnwnesenesenenwwnenwsewesewsesesew
nenewswnwewswnenesenwnesewesw
eneswnwswnwsenenwnwnwwseeswneewsenese
neswnwewnwnwseenwseesewsenwsweewe
wseweeenwnesenwwwswnew`]
const input = `nweneneeneneneneneesweenene
seswswswswnwswnenwswweseswseswswseswsenw
enweneswneneesenenenenenenene
nwseenwsewneseseseswneeenwewseenwnw
wwweseswnwwwswwwwnweswwew
weeneseeneeswswneswseeeeeee
nwseswnwswwnwnwwweneseswenenenwwe
nwnwwswesenwewwnenwsenenwnwnwswnwnwese
sweswseswsenwseswswswswsw
senesenenesewnwswesewneswseesesee
seenewwewwwwswswwwnewsewnwww
wswneswswsewwseswswnwswswnese
seseeeswewseswsweeseenwnenwwnwnwnw
nwnwnenwnenwsewswnwnwsewnwnwnwwwwwnw
wneweswwsenwwwswnwwew
swwswwewsewwwwwwwwwnw
swswewnwseseswnenenewswwswsweswsesese
seswseewnenwnweswnesweenwswnenenenee
nwswnenwneswenwnwnewneneswnwsesenwnee
nwsenenewwsenwsewwewnwwswwseeswsw
swseseeneewseeeeesesenesenwewseee
eneeeeneneewswwnenenenenenenenene
wwneweneesenwneeesweeneweesee
nwneneneneenenwnenwneswneswnwnewwneene
wseneeneewwwsesewenesenewwnenese
weeseneneenesesenenenenwnwswnewnew
swsweswenenwswnenwneneneseseswnwswseswe
swsewwwswsenwnwswww
nwnwnwswnwnwenwnwnwnenwnwsenwnwwwnwnw
senwneseseseeneeseeseeeseseswswenwse
nwsweseneneswwesenesweswneswwwswswwsw
nwnwnwnwnwnwnwnwenwwewnwswnwnwsenwnwnw
seseseeneswswwseswnwnwswseeseswneewww
eswnwseswswsweswesesewseswnesewswswsw
wnwswseneneneseseswwswswsw
eeneneseeweseeweeeneswnenwnenwsesw
seseswsewneseswenewsesesesenwseeewe
nwswnwwwnwewewwnwsw
eenwweeeeeeseenwseseneswsesee
eseeswnenwneneenenesenenwnwnenenenesw
senwsweenweeneneenwseneeesweene
swswswwweswsweswswswswseenenwswwsww
esenwneseseneneswnwnenwneeswesenwwne
eseseeesweeseseewseesewsenwsese
sewewnwnwwswewnwnwnwnwwnwnwnwww
seseewseeeneeeewseese
esenwneswnwewnwneneswneeneneesenene
eswswseenweeswnenesewenwnenwsweswee
ewenweeeneseeewseeseseeneswsew
eswseseseswswsesew
wesenweswwnesewseseeneswswswsenwse
sesewewseseesewnweenesenwseesw
swwneswswseneseseseewseswsesesesenwsenwsw
nwswnwswseswnwwseswswswseswnwseeenese
neeswwswwnwsenwsewseneswseweseneene
swwswsesesesenenwsenenwsweseseswsw
seeesewesesenwneeseese
seseenwseseswsesewseneese
senwseneswsewsesweseseseseseseswseswne
nwsenewnwneneseswneseenwneswneenwwnw
wswwwenwwwwsewnwnwesenwnwnwnenww
nwseswswswswswswswswswwswswsw
newwswwswnesewwwswswwswsweswwswsw
swewwnwnwewseswwswswsewsww
nwseeeseeeseeeesesenwnwsweeeee
senenwseesewswseneweeenwseswseseese
neneneswnenwnenenenwnesenwnesenenesenewe
wnesenwsenwseseswneseeswsesenenw
eswseseseswnenwnwswswseswseswseseseswse
seenwswnenwswnwnwnwswnwnwnwnenwnwnwnwnw
nenwsewewswneswenenwneneeswnwneesesw
nenenewnenwnweneneeswwnenwneneseesene
wwwwswwswnewseeneneswswwswsw
wneneeeneeesweneneenesenewneeee
eneeeeneeeeeeweseenenwseew
eewwsweneenwwseweeee
nwwwsewwnewwse
ewenwesweeseseeeeseseswnenwsesee
esewseswsesesenwnweseseesesenweenwe
swswwnenesewsewseneswneseswswneneseese
nenenwnenenwneswneswsenwenwnenenw
swneseseeswseswsewswsesewnwseswswnwsee
wswswswswnwewwswwswswwwsweewew
esweneesenenweeneweeeseeeneswne
nwenwseneswnwnwnwwswnwenwnwwwnwnwne
seswsweseswswswseswswswswneswnenwswswswsw
swnwswswnwseswnwwsese
wswneswswneswsewwswwesww
neweenewswswnesesenenesenenwe
swnwseswwseseneseseswsesewwnweesese
wenweweeneneeeneseeswenee
seneesweenweeeswesee
wswswswsesewneeseneswswswswwesesesw
neneneseswnenenenenenenenenenesenenenewnew
neneseenenewenenenenwnenenweneseenesw
seneewwwwswnwsewwwwwwwwswwsw
seeseeseswnwewewnwseesesesesesenese
wwnwwenwnwnwnwwnwswewnenwwenww
senweeeeeeeeeswnwenweswwee
eswwwewseseeswneseneseenwwenesese
swsenweseseswseswseswnesesenweseswwwswsw
nwnwneswsweneneneewneswewnenwneseeswnw
senwswsewseseneenewseswseseseesesee
nwwnwnweswswsesenwwnenwwswwneseweene
wsesweswswswswwswnwswnwnwneseswesww
nwnwnwnwnwwnwwnwsenw
swwwnwnwewwwnwswwsesweewwwwe
nwnwswswswnwnwseswenwnewwnwenwnwnwe
neeenwneneneeneweneneswswnenene
swswswswswseswsenwswswswseseswewneswswe
seseseswewseseswswnesenesesewnwsesesenw
sewseeseseseseseseenesewseseswsewsese
swswswnewswswswswwswswsweewswwnwesw
nwwnenwnwnwnwsenwnenwnwnesenenenwnwnww
nesweswwswwswswwswswswsw
nesenesesweeneewswseneeswnwnenwswenw
eseeseeeenweeseseneeeswse
wenwswwwnwnwnwenwwwwwwneswnwnw
ewseeeneeseseeneswwse
swswseseswswswneswseenwwswnewseswswenwe
nenewswesenwwseseswswseseenwsewswneswse
swswesesesesesenwsenesenwneseswsewseswsese
nenwnesewnwnwnwnwenwnwnwsenwnwnenenwnw
wwwswwwwnewwsenewsewwnwwswenw
newesewsewseeseneswseseswnwnewsesese
sweweseneseneswswnwnenwenwnwneswne
ewnwneeeneenwseswswnwnwnenwwwnesene
swnwswnewnweenwnwnenwnwnenenwsenwnenenwnw
nwnwnwnwwnewnwwnwnwwsenwnwneseswwnw
wsewwwnwwwwwwwwnwwsenewseww
nwwnewsenwnenwnwnenwsenwsenwwnenenenwse
nwswseswnwswsweswsewseswswseseswneswsesw
seewewsesesesesene
nwwswswswswswswwswenwswswewswswswsw
sesewwwwwnewwnewnewneswesewwswne
esewseweseneseseseswsenwsesesenesese
swwsewwsenwwnesenewneewnwwwww
nwnwnwnwneseswneneswsenesenwnwnw
swneenenwnwswenwnenwwsewnwnwswenenw
nwsewseswswenewseneseseeseeswwseneew
swswnenwswewswnwswneneswswweswswesw
swnewesewwwwwwsewneseewnwww
swswswswwswseneneewweswneswsewswne
sesenwsesesesenewswnweseseseeswsesesw
swswnwswswnweswnwswsweswswwseseswwnww
wswswneswseneenewnesenesewnenwnweew
nwesesweeeseeeseewwenweseee
nwsesenesewseswseswseneswwswswwesene
sesenwswsesesesewsesenwnesesenwseseswse
ewnwwswnenwnesenenwnenwneseeswneneswnene
eneswnewnenwneneswseneseswnenwene
wwewwwnwwwwnwwwnwswwwewsw
wnenwenwnwneneneswenenwneneswnwsenene
sewsenwnwnwwwewnwsewwwnenenwwwnw
nwnwnwnwnwnwwswnenewnwnwewwnwnwwse
wnwwewwnwnwnwnwnwwnwnwww
neseseseesesesesesesenwswwnesesesese
wnwnewnwwsewnewse
enwnenwneswnwnwnwnwnwswnenwnwnwnwnwsee
eeeeeeenwweeeesw
nwsesesenwwseseseswsesenenesesesesesese
wnwnwneneenesenwseswwseswnwwwwee
nwswneneneneenwneneenwwnenenenesenwnene
wnwwwwwnewsewwwwwwwnw
swnwnwsewnewwnwnenewwwwseswnenesw
swseswswswswswswswnwnewneswwswswwswswse
swwswswnwwwewwwswwneswwwnesw
nwnwnwwnenwnwnwnwnwnwnenesenw
wseswswnwwwwwesenwnwesesesenwnwnw
eenewenenesenenwe
wwwewnwwsewwwwwnwwwwwsew
sweswsweewseseswswswswnwswswseswwnwse
wswseswneeseswswswnewseswswswseenwswsw
newwsenewnwwwwwwnwwsenwseewww
nwnwnwneswnwnwwnwnwnwenwnwnwnwswenwsw
sweseswnwnwenwseswnwnweneneneswnwswnesew
nwenwwnwsenwnwnwenwnwnewswwnenwnwnwenw
newsweeswswnwnenweseweeneswneswnesw
neeneseeenwseesenewwsweswnwenene
nwnwswswwnwsewswwswseswsewswnwewwse
nwnwwnwnwnwsenwsenwnwnenwewnwnwwnwsw
nenwsweeewnwnwnenenenwnwnenenenewnenw
sewswwswsewnewnewswwnenewwwwse
nwsesesenwewseseseseseseseswnesw
ewwwwwwwwsewwwswswswnenwswwswne
nenwsenwnwsewnwnwwnwnwnwsesenwnwnwnwnwnw
nwesewseseseeseseseseeseeseene
seewswwwnwsewnenwnwnwnwsweneswnesene
swswewswswwwneswswwswswnwwnewseswswsw
enwnwswnwwwsenwwnwnwenwwwwnwww
eneneswnenenenwnwnwne
nenenenenenenenenenenesewnewnenenesenw
swsweseswswsenenwswswswswswnwseswswswswnw
senewwswnwswesewnenwnwsenweseswsee
senewnewnwseewwwwswseswnwewnesw
sesenwesewneeseseseseswsesewnwnwenw
eweeneeeseeseneswe
nenenenenenewneneneseneneneneee
wswwwewwneswwwwwww
wewnwwnenwswnwneneswwnwsenwnenwswenwse
ewseseeeseseweseneseeseesesewee
swswswnesweswsenwsesewseseswseswesesesw
seseeeeswneweenwseseesewnewee
nwseeneesweneeneswswwnwesweeeeenw
seneseswseseesenwswsesesenweneseewswne
swsweneswswswnwseswswnwswswswswswswsene
neswswwnwseeseswnwwswnewsenenenwswnese
nwneneswswwseneswsewnewwewwseenewnw
eswswswseseseseseswnwseseswsesesenwese
nwsewwsewnwwnwneeeweeswwwwswsene
nwnwnwnwnwenwwwnwnw
swswswswsweswswswweswnwsenwwswswswswsw
nenesenwnwnenenwnenene
nwnewswnwswnwnenwswneseneewswseeneswnee
enenwnwnweneswnenwnwneneswwnwnenewsw
seseseesesewsewseseseneseswnesenesese
nwwsenewnwnwwsewwnwwsenwsenenwnwnww
sewseseseseseseseseseenweseeswsenwse
wewsewwwswwewnwwswnwwneswsww
swwswswwswswwswwwneeswsw
nwenwswneesenenenwnwnwswwnwenesw
neeeswnwsesewenwsesweswwene
nenwswswnwneneneenwwnwenenwnewnwneeene
nwswswnenenwswwsesesw
nenwnesenwwnwnwnwnenenenenesesenwnwnwne
seseesewseeeeeesewesenenewsesesenw
swsesesewwsenweeswswnenweswesenwnwsw
nwseseeseseswsenwseseseswswseseswwsesw
nenwswwswswswwswswswswewswwnewsww
swswswswwswewseswneswswswneseswswseswsw
swnwnwnwnwnwnwnwnwnwnwnwnwswnwenwenwnw
nesweseswesenwwsweswswnwsewswwswsw
senenwwwwswwswnwwenesw
nwesewnwnwnwnwwnweseenwnwwnwnwsww
swesenewnwneswseeswsewnwneswneswwsw
sesesesenwsewsesesesesesewsenesesenese
seeseewswswwswneenwsww
wnenwnewenwnwneeneneseswseeneenwesesw
nwenwnwswnwnwwwnwwwwnw
neswwwwswwsenwswseweswwwnweww
sesweeeeeswnwenwee
neseseswneseswseeswsewseseswsenwseseswswse
swnwnwnwnwnwwnwwnwnenwwnwwnw
eseeeseeeneeeneseeeweeewe
eeeswneeweswneeenwewsweswene
sewwwnwnwwenwsenwwwnenwnwwwnwww
seneseneswseswswswnwswseseswswwswswswsw
swnwwwwwwwnwwswseseswwneswswsww
nwnewnenenenwnwsenweenwwnewneeswne
wwewnewwsenwnenewsewwwsewswnwsew
nwnwnenwswnwnwneswwnwswnwwnenwswnwnwee
eeeesweeeewswneeeneeeeee
eeseeseweeeseeseeenesese
nwswnwswneneneneneneswnenenenewnwese
seseseeswseswsesesenesenwsewswsesenwsesese
wsewseswseenesenwseseseneswsewesewe
enweeneseeneenewswseneenewene
nenwsesenwnwsewnwnwnwwwnwwwswnwnwwne
seseswseseseseseseneseneesewse
neeneeneneenenwswneneneswnesenenewnene
swnwenwnwnwneswnwswnenwnwnw
eeswnwneeneeenee
neseseenwsewsewswseneeswswseeenesesee
swwnwnwnwneswnwnenwnwsenwnenenwse
nwnwnwewswwsweseswswsenwwswsewenw
nwnwewswnwsenwsewswwswwwswe
wswwwwwwewwwwww
wnwswwswwwswnenwwewsewwwswsewsw
eneneeenenenenewseneneswneenenewnesene
wsenwnwwnwnwswenwnwnwswnwwnwnwnenwnwnese
senewnwswsenwseswsenwseseeenew
wnwnwnwwwnwwenwnwnwnwnw
sweewwwneswwwnweeswnwenwwwwenw
swnwnwnwnewwnwnwwnwnwnwsenwne
enwswnwnwsenenesenwswnweswnesesenwwnenww
nenwnwnwsewnwnwnenwnwnwnw
nenenenenwnenwwneswsesenenewnenenenenese
neneenenenwneseenwwnwnenenenenewnwnw
neneneeneweenenenenewseneswse
seseneswsesesesesesewseseseswesenenesese
seeseneseswsenwswseswneesesesewswnwnwwse
seeeeseeeeseeeseeswwnenewsee
senwnwnwnwwneswswnwwnweenwnwnwwnwnw
wswswnwswswwswsweeswsesweswswsenew
senwnwnenwwnwnwnwnwswnwenesenwnwnwne
senwnwnwnesenwnwneenwneweeswnwnwswnw
nwwnwwwsewsewwwswenwnwe
eswnenenenenwneneneneneeeenee
swneewseseenenenweeneeeeeenee
senwwneseesewwseswnwswnewnw
enwwwwwsenwwnwwwswwwwwewww
nwswswwsenwnwnwnwwwnwwnwneesewnwnwne
nwnesesewsewswnwsesewnwneeeswwswese
esesewnewwnesenwwnwseswne
wnwwwwnewnewnewnwnwsenwswwseww
sesewseseseswswswsesweswseesenww
eewenenweneseeeeswswenwwe
neswweneneweeneneenwneeswseeneese
neseseswseseseesenwnwsesesesewewsese
wnwnenwseewswnwwwnwnwe
seeswnwewwswewnwnwwnwenwswswnw
swseneswneseseseseseseswseswnwswsesewsw
neseeewesenwnwwneneseeweswseswnw
nenweenenweeseeeeeeswnweeeswsene
eseseseeenweesesesweeese
seneseswwwsenwnesewneseseseesew
esweeeeeeeneeeeenw
nenwwwwswnwnwnesenwwnwnwnwsenenw
nwenwnwnesenwnwnwneswwwnwsenwwwnwww
wewswseseswneseswneswseswnweseneww
ewnwnewwwsewnwwswswnwwwwnwwewnw
nwseswnwnwnwsesenwnwsesenwneneneneseewsw
wnwnwwnwnwnwnwwwnwwwwew
wnwwnwnwsenwnwnwwnwnwwne
nenwnwswnewneewswseneeenenwnenenwe
nenwnwnwneneneneswwnwswsenenwesenwnenw
nwnwnwewwnwwnewwnwswwwwwneswnwse
enwnwseseseswsweewnwnwsesesesenewsene
nenesenenwneenenenenewnewsewneenwswne
swweswwswswnwswswwwswswswsw
nwsesweswseseswseswnenwswsenwnesewnw
wwwswswswwswnewswswwsewswwnenww`

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