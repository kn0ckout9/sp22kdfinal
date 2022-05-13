//console.log("Hello world");

// Function to display results
const displayResult = (startNum, endNum, incr, sum) => {
    const divElement = document.getElementById("output");
    // Reset output at each call
    divElement.innerHTML = "";

    const p1Elem = document.createElement("p");
    p1Elem.innerText = `The sum of numbers from ${startNum} to ${endNum} incremented by ${incr} is ${sum}`;

    divElement.appendChild(p1Elem)

    
}

// Function to sum the series - logic error need to fix
const sumSeries = (w,y,z) => {
    console.log(typeof z);
    
    let a=parseInt(w);
    let b=parseInt(y);
    let incr=parseInt(z);
    
    console.log(typeof a);

    let x = 0;
    let myArray2 = [];
    for (let i = a; i <= b; i+=incr) {
        myArray2.push(i)
        // console.log(`i is ${i}`)
      }
    //   console.log(`result is ${myArray2}`)
      const sum = myArray2.reduce((j, k) => j + k, 0)
    //   console.log(sum)
      return sum;
}

//sumSeries(1,6,1);


document.querySelector("form").addEventListener("submit", e => {
    // Cancel default behavior of sending a synchronous POST request
    e.preventDefault();
    // Create a FormData object, passing the form as a parameter
    const formData = new FormData(e.target);


    myArray = [];

    //console.log(formData)
    formData.forEach((val, key) => {
        console.log(`The key is: ${key}, The value is: ${val}`);
        myArray.push(val)
      });
    // console.log(myArray)

    const startNum = myArray[0];
    const endNum = myArray[1];
    const incr = myArray[2];

    // console.log(`${startNum} ${endNum} ${incr}`)

    const sum = sumSeries(startNum, endNum, incr);
    displayResult(startNum, endNum, incr, sum)


})