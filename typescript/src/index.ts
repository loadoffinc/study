
type Hoge = {
  a: string
  b: string
}

var a: Hoge = JSON.parse('{"a":1, "b": "2", "c": {"x": 1}}')

console.log("-------------")
console.log(typeof a.a)
console.log((a as any).c)
console.log("-------------")
