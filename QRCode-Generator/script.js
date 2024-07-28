function printo(){
    let id=document.getElementById("inp").value;
    console.log(id);
    
    console.log(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${id}`);
    
    document.getElementById("output").innerHTML=`<img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${id}" alt="Italian Trulli"></img>`
    
    document.getElementById("container1").style.height="70vh"
    
    }
    