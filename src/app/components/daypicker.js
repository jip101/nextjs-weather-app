import { Children, useState } from "react"

export function DayPicker ({ weather }) {

    return (
        <main className="flex flex-row justify-center gap-1">
            <DayIcon weather={weather} />
        </main>
    )
}



function DayIcon({ children, weather }) {
    const [isSelectedIndex, setIsSelectedIndex] = useState(0)

    
    if (weather) {
        const isDay = weather.current_weather.is_day
        return (
            <>
                {weather.daily.time.map((day, i) => {
                    return (
                    <section 
                    onClick={() => {
                        console.log(day)
                        setIsSelectedIndex(i)
                    }}
                    className={`grid bg-slate-700 border-4 border-transparent rounded-md hover:shadow-md hover:shadow-slate-500 cursor-pointer h-40 w-full items-center justify-stretch justify-items-center text-center min-w-[100px] max-w-[150px] ${isSelectedIndex === i ? 'shadow-orange-500 shadow-md hover:!shadow-orange-500' : ''}`}
                    key={i}>
                            <div className='col-span-2'>{i === 0 ? 'Today' : convertDate(day, {weekday : 'short', month : 'short', day : 'numeric'})}</div>
                            <img className='w-2/5 max-w-prose row-start-2 col-span-2' 
                                src={i === 0 ? 
                                    convertCodeToImageSrc(weather.current_weather.weathercode, isDay).image :
                                    convertCodeToImageSrc(weather.daily.weathercode[i]).image} 
                                alt={i === 0 ? 
                                    convertCodeToImageSrc(weather.current_weather.weathercode, isDay).description :
                                    convertCodeToImageSrc(weather.daily.weathercode[i]).description}/>

                                <div className='row-start-3 whitespace-pre-line'>Lo:{'\n' + weather.daily.temperature_2m_min[i]}</div>
                                <div className='row-start-3 whitespace-pre-line'>Hi:{'\n' + weather.daily.temperature_2m_max[i]}</div>

                        </section>
                    )
                })}
                {children}
            </>
        )
    }
}

function convertCodeToImageSrc(weatherCode, isDay = true) {
    let codeList = {
        "0":{
            "day":{
                "description":"Sunny",
                "image":"/weather-icons/clearday.svg"
            },
            "night":{
                "description":"Clear",
                "image":"/weather-icons/clearnight.svg"
            }
        },
        "1":{
            "day":{
                "description":"Mainly Sunny",
                "image":"/weather-icons/fewcloudsday.svg"
            },
            "night":{
                "description":"Mainly Clear",
                "image":"/weather-icons/fewcloudsnight.svg"
            }
        },
        "2":{
            "day":{
                "description":"Partly Cloudy",
                "image":"/weather-icons/partlycloudyday.svg"
            },
            "night":{
                "description":"Partly Cloudy",
                "image":"/weather-icons/partlycloudynight.svg"
            }
        },
        "3":{
            "day":{
                "description":"Cloudy",
                "image":"/weather-icons/cloudyday.svg"
            },
            "night":{
                "description":"Cloudy",
                "image":"/weather-icons/cloudynight.svg"
            }
        },
        "45":{
            "day":{
                "description":"Foggy",
                "image":"/weather-icons/foggy.svg"
            },
            "night":{
                "description":"Foggy",
                "image":"/weather-icons/foggy.svg"
            }
        },
        "48":{
            "day":{
                "description":"Rime Fog",
                "image":"/weather-icons/rimefog.svg"
            },
            "night":{
                "description":"Rime Fog",
                "image":"/weather-icons/rimefog.svg"
            }
        },
        "51":{
            "day":{
                "description":"Light Drizzle",
                "image":"/weather-icons/drizzle.svg"
            },
            "night":{
                "description":"Light Drizzle",
                "image":"/weather-icons/drizzle.svg"
            }
        },
        "53":{
            "day":{
                "description":"Drizzle",
                "image":"/weather-icons/drizzle.svg"
            },
            "night":{
                "description":"Drizzle",
                "image":"/weather-icons/drizzle.svg"
            }
        },
        "55":{
            "day":{
                "description":"Heavy Drizzle",
                "image":"/weather-icons/drizzle.svg"
            },
            "night":{
                "description":"Heavy Drizzle",
                "image":"/weather-icons/drizzle.svg"
            }
        },
        "56":{
            "day":{
                "description":"Light Freezing Drizzle",
                "image":"/weather-icons/freezingdrizzle.svg"
            },
            "night":{
                "description":"Light Freezing Drizzle",
                "image":"/weather-icons/freezingdrizzle.svg"
            }
        },
        "57":{
            "day":{
                "description":"Freezing Drizzle",
                "image":"/weather-icons/freezingdrizzle.svg"
            },
            "night":{
                "description":"Freezing Drizzle",
                "image":"/weather-icons/freezingdrizzle.svg"
            }
        },
        "61":{
            "day":{
                "description":"Light Rain",
                "image":"/weather-icons/lightrain.svg"
            },
            "night":{
                "description":"Light Rain",
                "image":"/weather-icons/lightrain.svg"
            }
        },
        "63":{
            "day":{
                "description":"Rain",
                "image":"/weather-icons/rain.svg"
            },
            "night":{
                "description":"Rain",
                "image":"/weather-icons/rain.svg"
            }
        },
        "65":{
            "day":{
                "description":"Heavy Rain",
                "image":"/weather-icons/heavyrain.svg"
            },
            "night":{
                "description":"Heavy Rain",
                "image":"/weather-icons/heavyrain.svg"
            }
        },
        "66":{
            "day":{
                "description":"Freezing Rain",
                "image":"/weather-icons/freezingrain.svg"
            },
            "night":{
                "description":"Freezing Rain",
                "image":"/weather-icons/freezingrain.svg"
            }
        },
        "67":{
            "day":{
                "description":"Freezing Rain",
                "image":"/weather-icons/freezingrain.svg"
            },
            "night":{
                "description":"Freezing Rain",
                "image":"/weather-icons/freezingrain.svg"
            }
        },
        "71":{
            "day":{
                "description":"Light Snow",
                "image":"/weather-icons/lightsnow.svg"
            },
            "night":{
                "description":"Light Snow",
                "image":"/weather-icons/lightsnow.svg"
            }
        },
        "73":{
            "day":{
                "description":"Snow",
                "image":"/weather-icons/snow.svg"
            },
            "night":{
                "description":"Snow",
                "image":"/weather-icons/snow.svg"
            }
        },
        "75":{
            "day":{
                "description":"Heavy Snow",
                "image":"/weather-icons/heavysnow.svg"
            },
            "night":{
                "description":"Heavy Snow",
                "image":"/weather-icons/heavysnow.svg"
            }
        },
        "77":{
            "day":{
                "description":"Snow Grains",
                "image":"/weather-icons/lightsnow.svg"
            },
            "night":{
                "description":"Snow Grains",
                "image":"/weather-icons/lightsnow.svg"
            }
        },
        "80":{
            "day":{
                "description":"Light Showers",
                "image":"/weather-icons/showerrainday.svg"
            },
            "night":{
                "description":"Light Showers",
                "image":"/weather-icons/showerrainnight.svg"
            }
        },
        "81":{
            "day":{
                "description":"Showers",
                "image":"/weather-icons/showerrainday.svg"
            },
            "night":{
                "description":"Showers",
                "image":"/weather-icons/showerrainnight.svg"
            }
        },
        "82":{
            "day":{
                "description":"Heavy Showers",
                "image":"/weather-icons/heavyshowerrainday.svg"
            },
            "night":{
                "description":"Heavy Showers",
                "image":"/weather-icons/heavyshowerrainnight.svg"
            }
        },
        "85":{
            "day":{
                "description":"Snow Showers",
                "image":"/weather-icons/snowshowerday.svg"
            },
            "night":{
                "description":"Snow Showers",
                "image":"/weather-icons/snowshowernight.svg"
            }
        },
        "86":{
            "day":{
                "description":"Snow Showers",
                "image":"/weather-icons/snowshowerday.svg"
            },
            "night":{
                "description":"Snow Showers",
                "image":"/weather-icons/snowshowernight.svg"
            }
        },
        "95":{
            "day":{
                "description":"Thunderstorm",
                "image":"/weather-icons/thunderstorm.svg"
            },
            "night":{
                "description":"Thunderstorm",
                "image":"/weather-icons/thunderstorm.svg"
            }
        },
        "96":{
            "day":{
                "description":"Thunderstorm With Hail",
                "image":"/weather-icons/thunderhail.svg"
            },
            "night":{
                "description":"Thunderstorm With Hail",
                "image":"/weather-icons/thunderhail.svg"
            }
        },
        "99":{
            "day":{
                "description":"Thunderstorm With Hail",
                "image":"/weather-icons/thunderhail.svg"
            },
            "night":{
                "description":"Thunderstorm With Hail",
                "image":"/weather-icons/thunderhail.svg"
            }
        }
    }

    if (isDay) {
        return codeList[weatherCode].day
    }
    else {
        return codeList[weatherCode].night
    }
}

function convertDate(isoDate, options) {
    if (isoDate){
        //replace is required for correct date
        //hyphens replaced with '/' for correct date
        const date = new Date(isoDate.replace(/-/g, '\/')) 
        const string = date.toLocaleString('default', options)

      //console.log(string)
        
        return string
    }
  }


  //{ weekday:'short', month: 'short', day: 'numeric' }