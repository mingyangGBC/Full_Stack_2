let calculator = require("../app/calculator");
let expect = require("chai").assert;

describe("Add", ()=>{
    makeTest = (x,y) =>{
        let expected = x + y;
        it(`add(${x},${y}) expected result ${expected} PASS`, ()=>{
            expect.equal(calculator.add(x,y), expected);
        });
    }

    makeTest(5,2)
})

describe("Add", ()=>{
    makeTest = (x,y) =>{
        let expected = x + y;
        it(`add(${x},${y}) expected result 8 Fail`, ()=>{
            expect.equal(calculator.add(x,y), 8);
        });
    }

    makeTest(5,2)
})

describe("sub", ()=>{
    makeTest = (x,y) =>{
        let expected = x - y;
        it(`sub(${x},${y}) expected result ${expected} PASS`, ()=>{
            expect.equal(calculator.sub(x,y), expected);
        });
    }

    makeTest(5,2)
})

describe("sub", ()=>{
    makeTest = (x,y) =>{
        let expected = x - y;
        it(`sub(${x},${y}) expected result 5 Fail`, ()=>{
            expect.equal(calculator.sub(x,y), 8);
        });
    }

    makeTest(5,2)
})

describe("Mul", ()=>{
    makeTest = (x,y) =>{
        let expected = x * y;
        it(`mul(${x},${y}) expected result ${expected} PASS`, ()=>{
            expect.equal(calculator.mul(x,y), expected);
        });
    }

    makeTest(5,2)
})

describe("Mul", ()=>{
    makeTest = (x,y) =>{
        let expected = x * y;
        it(`mul(${x},${y}) expected result 12 Fail`, ()=>{
            expect.equal(calculator.mul(x,y), 8);
        });
    }

    makeTest(5,2)
})

describe("Div", ()=>{
    makeTest = (x,y) =>{
        let expected = x / y;
        it(`div(${x},${y}) expected result ${expected} PASS`, ()=>{
            expect.equal(calculator.div(x,y), expected);
        });
    }

    makeTest(10,2)
})

describe("Div", ()=>{
    makeTest = (x,y) =>{
        let expected = x / y;
        it(`div(${x},${y}) expected result 8 Fail`, ()=>{
            expect.equal(calculator.div(x,y), 2);
        });
    }

    makeTest(10,2)
})