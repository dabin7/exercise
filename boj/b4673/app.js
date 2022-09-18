solution();

function d(num) {
    const x = String(num)
    let sum = 0;
    for(let i = 0; i < x.length; ++i){
         sum += +x[i]
    }
    return num + sum
}

function solution(){
    const arr = Array(10001).fill(0)
    for(let i = 1; i <= 10000 ; ++i){
        if(d(i) <= 10000){
            arr[d(i)]++
        }
    }
    for(let i = 1; i <= 10000; ++i){
        if(arr[i] === 0){
            console.log(i)
        }
    }
}