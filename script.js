let lastCity = ''
        $(document).on('click', '.search-button', async function () {
            var val = document.getElementById("cityname").value;
            lastCity = val
            const data = await getDatafromAPI(val);
            if(data){
                loadContent(data);
                displaySize()
            }
            else{
                document.getElementById("d1").innerHTML = "Error!"
            }
        });
        $(document).on('click','#rf',async function(){
            if(lastCity){
                const data = await getDatafromAPI(lastCity);
                if(data){
                    loadContent(data);
                    displaySize()
                }
                else{
                    document.getElementById("d1").innerHTML = "Error refreshing the data! try reloading this page!"
                }
            }
        })
        async function getDatafromAPI(val){
            
            var u = "http://api.weatherapi.com/v1/current.json?key=#your-api-key-here=" + val;
            var url = u + "&aqi=no";
    
            let headersList = {
                "Accept": "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)"
            }
            
            let response = await fetch(url, { 
                method: "GET",
                headers: headersList
            });
            var x = document.getElementById("d1")
            if(response.ok){
                let data = await response.json()
                return data
            }
            else{
                x.innerHTML = "Error occured somewhere!"
                return null
            }
        }
        function loadContent(data){
                var y = document.getElementById('location-name')
                y.innerHTML = data.location.name+" , "+data.location.region+" , "+data.location.country
                var imgdiv = document.getElementById("imagediv")
                var image = document.createElement("img")
                var imgurl = "https:"+data.current.condition.icon
                image.src = imgurl
                image.alt = " :( not found "
                image.width = 175
                image.height = 175
                imgdiv.innerHTML = ""
                imgdiv.appendChild(image)
                document.getElementById("temp").innerHTML = data.current.temp_c+"°"
                document.getElementById("feels-like").innerHTML = data.current.feelslike_c+"°"
                document.getElementById("condition").innerHTML = data.current.condition.text
                document.getElementById("humi").innerHTML = data.current.humidity
                document.getElementById("precip").innerHTML = data.current.precip_mm+" mm"
                document.getElementById("uv").innerHTML = data.current.uv
                document.getElementById("feels-text").innerHTML = "Feels like"
                document.getElementById('humi-text').innerHTML = "Humidity"
                document.getElementById('precip-text').innerHTML = "Precipitation"
                document.getElementById('uv-text').innerHTML = "UV Index"
                var dt = document.getElementById("date-time")
                var z = (data.location.localtime).split(" ")
                document.getElementById('winds').innerHTML = data.current.wind_kph+"kph"
                document.getElementById('wind-text').innerHTML = "Wind speed"
                document.getElementById('visibility').innerHTML = data.current.vis_km+"km"
                document.getElementById('visi-text').innerHTML = "Visiblility"
                const exp = (data.location.localtime).split(" ")
                const date_f = z[0].split("-")
                dt.innerHTML ="Local date: "+date_f[2]+"-"+date_f[1]+"-"+date_f[0]+"  "+"Local time: "+exp[1] 
                document.getElementById('l-up').innerHTML =""+" "+"Last updated: "+data.current.last_updated+" "+''
                document.getElementById('clouds').innerHTML = data.current.cloud+"%"
                document.getElementById('cloud-text').innerHTML = 'Clouds cover'
                document.getElementById('gust').innerHTML = data.current.gust_kph+"kph"
                document.getElementById('gust-text').innerHTML = "Gusts"
        }
        function displaySize(){
            var displayarea = document.getElementById('d1')
            if(displayarea){
                var contentHeight = displayarea.scrollHeight;
                displayarea.style.height = contentHeight+'px' 
                displayarea.style.width = displayarea.offsetWidth+'px'
            }
        }
   
   
   