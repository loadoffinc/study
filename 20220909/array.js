
// 検索をする
const find = () => {
  console.log("---------条件に合うもののうち最初に見つけたものを取得する(find)---------")
  const numList = [1, 2, 3, 4, 5];
  const strList = ["a", "b", "c", "x", "y", "z"];
  const objList = [{ val: 1 }, { val: 2 }, { val: 3 }];

  // 検索する（最初に見つかったものを取得する）
  const three = numList.find((v) => v === 3);
  /*numList.find(function(v) {
    return v === 3;
  })*/
  console.log(`検索結果1：${three}`);
  const notAstr = strList.find((v) => v !== "a")
  console.log(`検索結果2：${notAstr}`);
  const valThree = objList.find((v) => v.val === 3);
  console.log(`検索結果3：${JSON.stringify(valThree)}`);
  console.log(valThree === objList[2])


  // 値がない場合
  const noValue = numList.find((v) => v === 100);
  console.log(`存在しない：${noValue}`);
}

// 条件に合うものを全て取得する
const filter = () => {
  console.log("---------条件に合うもの全て取得する---------")
  const numList = [1, 2, 3, 4, 5];
  const strList = ["a", "b", "c", "x", "y", "z"];
  const objList = [{ val: 1 }, { val: 2 }, { val: 3 }, { val: 4 }];

  const oddList = numList.filter((v) => v % 2 === 1)
  console.log(`検索結果1：${JSON.stringify(oddList)}`)
  const notAXList = strList.filter((v) => v !== "a" && v !== "x")
  console.log(`検索結果2：${JSON.stringify(notAXList)}`)
  const evenObjList = objList.filter((v) => v.val % 2 === 0)
  console.log(`検索結果3：${JSON.stringify(evenObjList)}`)

  // 存在しない場合
  const noValue = numList.filter((v) => v === 100);
  console.log(`存在しない：${JSON.stringify(noValue)}`);
}

// 値が存在するかをチェックする
const exists = () => {
  console.log("---------値の存在確認---------")
  console.log("--indexOfを使用する")
  const numList = [1, 3, 5, 3, 2, 1];
  const indexOf = numList.indexOf(3)
  console.log(`存在する場合:${indexOf}`) // 0以上の数字が戻る
  const noIndex = numList.indexOf(100)
  console.log(`存在しない場合:${noIndex}`) // 0以上の数字が戻る

  console.log("--includesを使用する")
  const includes = numList.includes(5)
  console.log(`存在する場合:${includes}`) // true
  const notInclude = numList.includes(100)
  console.log(`存在しない場合:${notInclude}`) // false
  console.log("------比較-----" + ('1' == 1))
  console.log("------比較-----" + ('1' === 1))
  console.log("------比較-----" + (false == 0))
  console.log("------比較-----" + (false == null))
  console.log("------比較-----" + (0 == null))
  console.log("------比較-----" + ('' == 0))
  /*const a = { val: 1 }
  const b = { val: 1 }
  const c = a
  console.log(`a === b:${a === b}`)
  console.log(`b === c:${b === c}`)
  console.log(`a === c:${a === c}`)
  console.log(`a.val:${a.val}`)
  console.log(`b.val:${b.val}`)
  console.log(`c.val:${c.val}`)*/
  // objectの配列の存在確認はfindを利用する
  console.log("--findを使用する")
  const objList = [{ val: 1 }, { val: 2 }, { val: 3 }, { val: 4 }];
  console.log("----------" + objList.includes({ val: 1 }))
  const find = objList.find((v) => v.val === 3)
  console.log(`存在チェック:${find !== undefined}`) // true
}

// 全件確認するなど
const forEach = () => {
  console.log("---------全件走破する---------")
  const numList = [1, 3, 5, 3, 2, 1, 4];
  numList.forEach((val, index) => {
    console.log(`${index}: ${val}`)
  })
  console.log("- 例えば偶数の数を数える")
  let cnt = 0;
  numList.forEach((val) => {
    if (val % 2 === 0) {
      cnt++
    }
  })
  console.log(`偶数の数: ${cnt}`)

  console.log("- 例えば新しいユニークな配列を作る")
  // ↓ ただしいい書き方ではない可能性も高い
  const newArr = []
  numList.forEach((v) => {
    // 1 + 2 + 3 ... + 10000
    if (!newArr.includes(v)) {
      newArr.push(v)
    }
  })
  console.log(`ユニークな配列：${JSON.stringify(newArr)}`)

  // forを使ってもできる
  console.log("- forを使ってもできる")
  for (let i = 0; i < numList.length; i++) {
    console.log(`${i}: ${numList[i]}`)
  }

  // forを使うかforEachを使うか迷ったら
  // await処理を使うか？　-> 使う for, 使わない forEach
  // 途中で関数自体を終了させたいか？ -> 終了させたい for, 終了させない forEach
  // 関数を途中で終了させるときに some を使用する場合もある
  console.log("- someを使う")
  numList.some((v, i) => {
    console.log(`${i}: ${v}`)
    return v === 2
  })
}

// 元の配列から新しい配列を取得する
const map = () => {
  console.log("---------配列から新しい配列を作る---------")
  const numList = [1, 3, 5, 3, 2, 1, 4];
  const newArr = numList.map((v, i) => {
    return { value: v, index: i }
  })
  console.log(`新しい配列：${JSON.stringify(newArr)}`)
}

const hoge = () => {
  //const numList = [1, 3, 5, 3, 2, 1, 4];
  console.log()
}

// ある条件をもとにソートする
const sort = () => {
  const numList = [1, 3, 5, 3, 2, 1, 4];
  numList.sort((a, b) => a > b ? -1 : a === b ? 0 : 1)
  console.log(numList)
}

//find()
//filter()
//exists()
//forEach()
//map()
sort()