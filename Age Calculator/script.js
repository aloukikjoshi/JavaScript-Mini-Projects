const dobInput = document.getElementById("dob");
const calculateBtn = document.getElementById("calculate-btn");
const resultDiv = document.getElementById("result");

calculateBtn.addEventListener("click", function() {

    const dob = new Date(dobInput.value);

    const currentDate=new Date();

    const year=currentDate.getFullYear() - dob.getFullYear() ;

    const month=currentDate.getMonth() - dob.getMonth();

    const date= currentDate.getDate() - dob.getDate();



    // Display formatted date with options for customization
    const dobFormatted = dob.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });


    resultDiv.innerHTML = `You were born on ${dobFormatted} and your age is ${year} years ${month} months ${date} days.`;

});
