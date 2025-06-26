function mul() {
  var a = document.getElementById("in1").value;
  var b = document.getElementById("in2").value;
  var c = a * b;
  document.getElementById("id3").innerHTML = "The result is:" + c;
}
function div() {
  var a = document.getElementById("in1").value;
  var b = document.getElementById("in2").value;
  var c = a / b;
  document.getElementById("id3").innerHTML = "The result is:" + c;
}

function add() {
  var a = document.getElementById("in1").value;
  var b = document.getElementById("in2").value;
  var c = Number(a) + Number(b);

  document.getElementById("id3").innerHTML = "The result is:" + c;
}

function sub() {
  var a = document.getElementById("in1").value;
  var b = document.getElementById("in2").value;
  var c = a - b;
  document.getElementById("id3").innerHTML = "The result is:" + c;
}

function dark()
{

  document.body.style.backgroundColor="black";
  document.body.style.color="white";
  document.getElementById("theme").innerHTML="White";
  document.getElementById("add").style.color="white";
  document.getElementById("sub").style.color="white";
  document.getElementById("mul").style.color="white";
  document.getElementById("div").style.color="white";

}


function white()
{
  document.body.style.backgroundColor="white";
  document.body.style.color="black";
  document.getElementById("theme").innerHTML="Dark";
  document.getElementById("add").style.color="black";
  document.getElementById("sub").style.color="black";
  document.getElementById("mul").style.color="black";
  document.getElementById("div").style.color="black";

}

function background(){
  document.body.style.backgroundColor==="white"?dark():white()
  
}