
function search(){
      let place=document.getElementById('place').value;
      let icon=document.getElementById('icon').value;
      console.log(place);//new location
      fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${place}&appid=474532abab6d05c2aa0259be1e658ff7`)
    .then(response => response.json())
    .then(data=> {
        document.getElementById('temp').innerHTML=Math.round(data.main.temp)+"°C";
        document.getElementById('city').innerHTML=data.name;
        document.getElementById('windspeed').innerHTML=Math.round(data.wind.speed)+"km/hr";
        document.getElementById('humidity').innerHTML=data.main.humidity+"%"; 
        console.log(data.weather[0].main);

        document.getElementById("info2").style.display="block";

        if(data.weather[0].main=="Mist")
        {
            document.getElementById("icon").src="mist.png";
        }
        else if(data.weather[0].main=="Rain")
        {
            document.getElementById("icon").src="rain.png";
        }
        else if(data.weather[0].main=="Snow")
        {
            document.getElementById("icon").src="snow.png";
        }
        else if(data.weather[0].main=="Drizzle")
        {
            document.getElementById("icon").src="drizzle.png";
        }
        else if(data.weather[0].main=="Clouds")
        {
            document.getElementById("icon").src="clouds.png";
        }
        else if(data.weather[0].main=="Clear")
        {
            document.getElementById("icon").src="clear.png";
        }
        else if(data.weather[0].main=="Haze")
        {
            document.getElementById("icon").src="mist.png";
        }
    })
    .catch(err => console.error(err));
} 