// Write a function that prints Multiples of a Given Number until 100:-

function getMultiples(num){
    let multipleArray = [];
    for (let i=num;i<=100;i++){
        if(i%num==0){
            multipleArray.push(i);
        }
    }
    return multipleArray;
}
console.log(getMultiples(4))