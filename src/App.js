
import React, {useEffect, useState} from 'react';
import './App.css';

/*
    One Thing We Doing Extra here, is
    Open Weather thodi complex Api hai isme, array , objects sb hai
     
    to agar hum saara data city ka le lenge city me , to agar punjab ke liye p bas likhoge to blak ya error aa jayega.. pura hone he nhi dega
    isse bachne ke liye, hume jisse kamm hai, like city.main bas usko he lenge aur 

    OPTION 1
    jahan pehle "city.main.temp" likhre the       weather is array of objects cretaing problem
    ab bas "city.temp" likhnge , kyunki city me actually me city.temp api ka data hai

    OPTION 2
    const search = e =>{
      if( e.key === "Enter" )
      {
        then fetch...
      }
    }

    convert temp in Celcius , its in Farenheit.. Api me changes hai kuch


*/
const App  = ()=> {
  
  // always on top
  const [city, setCity] = useState('');
  const [search, setSearch] = useState("sri ganganagar");  // for user jo enter krra textfield me
  


  // by default agar user first time visit krra hai to render krega ek baar atleast
  useEffect( ()=>{

    const fetchApi = async ()=> {

        // andar template lteral use kkrre ho ${} to "" nhi `` hoga
        // added &units=metric   its provided by api only
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=9c295b624c15708edb473eb1279cb171`;
        const response = await fetch(url); // eitheer fulfilled or reject promise return because
        // console.log(response);
        const resJson = await response.json(); // json me krna padega taki properly use kr skein
        // console.log(response);  
        
        // extra data chahiye he nhi
        setCity(resJson.main);  // for storing the states we are getting // city me ye sb aa gya data 
        // setWeather(resJson.weather); // alag se handle
    };

    fetchApi();

  }, [search]); // humesha nhi but jab jab search change krenge tab tab fetch ya jo iske andar likha hai usko call kro


  const dateBuilder = (d)=>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octobar", "November", "December"];

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()]; // return numbe rfrom 0 to ..
    let date = d.getDate();
    let month = months[d.getMonth()]; 
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  
  

  return (

    
    <div className={ city ? ( (city.temp > 16) ? 'app warm' : 'app' ) : 'app'}>
      <main>
        <div className="search_box">
          {/*  value={search}  its by default agar humko mumbai rakhna hai */}
          <input type="text" placeholder="Search..." value={search} className="search_bar" onChange = { (e)=>{ setSearch(e.target.value) } }/>
        </div>

      {/* IMPORTANT-- agar data city ka nhi mile phir??  */}

      {!city? (  <p className="error_msg" > No Data Found</p> ) : (

          <div>
            <div className="location-box">
              <div className="location">{ search } </div>
              <div className="date">{ dateBuilder(new Date() ) } </div>
            </div>

            <div className = "weather-box">
              <div className="temp">{city.temp}° C </div>
              <div className="temp_min_max"> Min: {city.temp_min}°C | Max : {city.temp_max}°C </div>
            </div>
          </div>
      ) }
        
        


      </main>
    </div>
  );
}

export default App;
