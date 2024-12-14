// Function to validate URLs
function isValidURL(string) {
  var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null);
}

// Function to start the process
function startIT() {
  var myurl = document.getElementById("urltext").value;

  if (myurl == "") {
    alert("Please Enter URL");
  } else if (myurl !== "" && isValidURL(myurl) == true) {
    grabFAV();
  } else {
    alert("Please Enter Valid URL");
  }
}

// Function to grab the favicon
function grabFAV() {
  var myurl = document.getElementById("urltext").value;
  var myimg = document.getElementById("theimg");
  var mysize = document.getElementById("size").value;

  var duckapi = "https://icons.duckduckgo.com/ip3/";
  var gapi = "https://s2.googleusercontent.com/s2/favicons?domain=";

  if (mysize == "default") {
    // Remove protocols to normalize the URL
    myurl = myurl.replace("https://", "").replace("http://", "");
    myimg.src = duckapi + myurl + ".ico";
  } else {
    myimg.src = gapi + myurl + "&sz=" + mysize;
  }
}

// Function to download the favicon
function downloadFAV() {
  var imgSrc = document.getElementById("theimg").src;

  if (imgSrc) {
    var a = document.createElement("a");
    a.href = imgSrc;
    a.download = "favicon.ico";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    alert("Please grab a favicon first!");
  }
}
