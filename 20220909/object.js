// Objectのデータ構造

const yon = Symbol()
const san = 'sanver2'
// 今回はキーバリュー型の話
const keyValue = () => {
  console.log("--------キーバリュー---------")
  // key valueのキーはstringかintegerが一般的だがSymbol型もある
  const kv = {
    1: "いち",
    "2": "に",
    [san]: "さん",
    [yon]: 'よん'
  }
  console.log(kv)
  console.log(kv[san])
  console.log(kv[yon])
}

// テクニック - Unique
const unique = () => {
  // ユニークにしてみる
  const vals = [1, 2, 3, 4, 5, 6, 1, 2, 5, 9]
  const map = {}
  const newVals = []
  vals.forEach((v) => {
    if (!map[v]) {
      newVals.push(v)
      map[v] = true
    }
  })


  console.log("--------ユニーク---------")
  const arr = [{ key: 'key1', val: 'val1' }, { key: 'key1', val: 'val2' }, { key: 'key2', val: 'val3' }]
  let kv = {}
  console.log("- ユニークにして最初のもののみ取得する")
  arr.forEach((v) => {
    if (!kv[v.key]) {
      kv[v.key] = v
    }
  })
  console.log(JSON.stringify(kv))

  // 例えばユニークにvalsにまとめる
  console.log("- valsにまとめる")
  kv = {}
  arr.forEach((v) => {
    if (!kv[v.key]) {
      kv[v.key] = { vals: [] }
    }
    kv[v.key].vals.push(v.val)
  })
  console.log(JSON.stringify(kv))
}



//keyValue()
unique()