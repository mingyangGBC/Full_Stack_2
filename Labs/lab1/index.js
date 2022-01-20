console.log('Buffer Example')

console.log(__filename)
console.log(__dirname)

//Buffer.from(array)

let buf1 = Buffer.from('A Hello')
console.log(buf1) //<Buffer 41 20 48 65 6c 6c 6f>
console.log(buf1[0]) //65
console.log(buf1[7]) //undefined

console.log(buf1.toString()) // A Hello
console.log(buf1.length) //7

console.log("------ Emoji ------")

let str = '🌹💖'
let buf2 = Buffer.from(str)
console.log(buf2) //<Buffer f0 9f 8c b9 f0 9f 92 96>
console.log(buf2.length) //8
console.log(buf2[0]) //240
console.log(buf2.toString())
console.log(buf2.toString('utf8'))
console.log(buf2.toString('hex'))
console.log(buf2.toString('utf-16le'))

let buf3 = Buffer.alloc(10,67)
console.log(buf3.toString())
buf3[0] = 65
buf3[9] = 66
console.log(buf3.length)
console.log(buf3)
console.log(buf3.toString())

let s = 'Hello World'
buf3.write(s,4)
console.log(buf3.toString())

buf4 = Buffer.concat([buf3, Buffer.from('World')])
console.log(buf4.toString())
