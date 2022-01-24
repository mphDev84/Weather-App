let y;
function getUserValue(){//function called when submit button pressed
	
	y=document.querySelector("#user_input").value;//access user-input value	
	displayWeather();//call function to make a GET request to weather API for JSON data
	console.log(y)//unit test
	if(y===""){
		alert("please enter a town/city/zip code/post code")//make sure there is a value!
	}
	
};

function displayWeather(){
	event.preventDefault();
	let x = y;//pass user value to this function
const data = null;
const xhr = new XMLHttpRequest();//new HttpRequest object
//set-up variables for use
let myCity=x;
	let myStr;
	let myParse;
	let myLocation;
	let myRegion;
	let myCountry;
	let myTemp_c;
	let myTemp_f;
	let condition;
	let chance_rain;
	let tomorrow_max_temp_c;
	let tomorrow_max_temp_f;
	let tomorrow_min_temp_c;
	let tomorrow_min_temp_f;
	let tomorrow_condition;
	let chance_snow;
	let sunrise;
	let sunset;
	

xhr.withCredentials = true;
xhr.addEventListener("readystatechange", function () {//await data from API GET request
	if (this.readyState === this.DONE) {
		console.log(this.responseText);
		 myStr = this.responseText;
console.log(myStr);
//parse JSON data and populate variables to be passed to display function
	myParse = JSON.parse(myStr)
	myLocation = myParse.location.name;
	myRegion = myParse.location.region;
	myCountry = myParse.location.country;
	myTemp_c = myParse.current.temp_c;
	myTemp_f = myParse.current.temp_f;
	condition = myParse.current.condition.text;
	chance_rain = myParse.forecast["forecastday"][1].day.daily_chance_of_rain;
	tomorrow_max_temp_c = myParse.forecast["forecastday"][1].day.maxtemp_c;
	tomorrow_max_temp_f = myParse.forecast["forecastday"][1].day.maxtemp_f;
	tomorrow_min_temp_c = myParse.forecast["forecastday"][1].day.mintemp_c;
	tomorrow_min_temp_f = myParse.forecast["forecastday"][1].day.mintemp_f;
	tomorrow_condition = myParse.forecast["forecastday"][1].day.condition.text;
	sunrise=myParse.forecast["forecastday"][1].astro.sunrise;
	sunset=myParse.forecast["forecastday"][1].astro.sunset;
	chance_snow=myParse.forecast["forecastday"][1].day.daily_chance_of_snow;
	console.log(sunrise +" "+sunset);

	console.log(myParse.forecast["forecastday"][1]);
	console.log(tomorrow_condition);

displayWeatherData();//call function to display object data

	}
});

//API with a GET method 
xhr.open("GET", "https://weatherapi-com.p.rapidapi.com/forecast.json?q="+myCity+"&days=3");//API call
xhr.setRequestHeader("x-rapidapi-host", "weatherapi-com.p.rapidapi.com");
xhr.setRequestHeader("x-rapidapi-key", "50ec1d7ee6msh459fcfbf83f7285p1812ccjsnc4cb67da2855");

xhr.send(data);

function displayWeatherData(){
	//display object data
	document.querySelector("#outer_wrapper").style.visibility="visible";
	document.querySelector("#date_location").style.visibility="visible";
	document.querySelector("#div_location").style.visibility="visible";
	document.querySelector("#div_time").style.visibility="visible";

	document.querySelector("#div_time").classList.add("scale-in-center");
	document.querySelector("#div_location").classList.add("scale-in-center");
	document.querySelector("#date_location").classList.add("scale-in-center");
	document.querySelector("#div_temp_c").classList.add("scale-in-center");
	document.querySelector("#div_temp_f").classList.add("scale-in-center");
	document.querySelector("#condition").classList.add("scale-in-center");
	document.querySelector("#chance_rain").classList.add("scale-in-center");
	document.querySelector("#max_temp_c").classList.add("scale-in-center");
	document.querySelector("#max_temp_f").classList.add("scale-in-center");
	document.querySelector("#min_temp_c").classList.add("scale-in-center");
	document.querySelector("#min_temp_f").classList.add("scale-in-center");
	document.querySelector("#sunrise").classList.add("scale-in-center");
	document.querySelector("#sunset").classList.add("scale-in-center");

	document.querySelector("#location").innerHTML=`${myLocation}, ${myRegion}, ${myCountry}`;
	document.querySelector("#temp_c").innerHTML=`${myTemp_c}`;
	document.querySelector("#temp_f").innerHTML=`${myTemp_f}`;
	document.querySelector("#cond").innerHTML=`${condition}`;
	document.querySelector("#tom_temp_c").innerHTML=`${tomorrow_max_temp_c}/${tomorrow_max_temp_f}`;
	document.querySelector("#tom_min_temp_c").innerHTML=`${tomorrow_min_temp_c}/${tomorrow_min_temp_f}`;
	document.querySelector("#rain").innerHTML=`${chance_rain}%/${chance_snow}%`;
	document.querySelector("#tom_sunrise").innerHTML=`${sunrise}`;
	document.querySelector("#tom_sunset").innerHTML=`${sunset}`;

	const myDate = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) ;
	console.log(myDate);
	document.querySelector("#date").innerHTML=`${myDate}`;

	clock();
	function clock(){
	let display = new Date().toLocaleTimeString();
	document.querySelector("#time").innerHTML = `${display}`;
	setTimeout(clock, 1000); 
	}
}
}
//reload window to refresh all inputs/display elements
function refresh(){
	window.location.reload();
};
