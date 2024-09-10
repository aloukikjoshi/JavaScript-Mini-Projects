function mul() {
  var a = document.getElementById("in1").value;
  var b = document.getElementById("in1").value;
  var c = a * b;
  document.getElementById("id3").innerHTML = "The result is:" + c;
}
function div() {
  var a = document.getElementById("in1").value;
  var b = document.getElementById("in1").value;
  var c = a / b;
  document.getElementById("id3").innerHTML = "The result is:" + c;
}
function add() {
  var a = document.getElementById("in1").value;
  var b = document.getElementById("in1").value;
  var c = Number(a) + Number(b);

  document.getElementById("id3").innerHTML = "The result is:" + c;
}

function sub() {
  var a = document.getElementById("in1").value;
  var b = document.getElementById("in1").value;
  var c = a - b;
  document.getElementById("id3").innerHTML = "The result is:" + c;
}
