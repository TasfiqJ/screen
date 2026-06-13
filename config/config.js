/* Config Sample
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/configuration/introduction.html
 * and https://docs.magicmirror.builders/modules/configuration.html
 *
 * You can use environment variables using a config.js.template file instead of config.js
 * which will be converted to config.js while starting. For more information
 * see https://docs.magicmirror.builders/configuration/introduction.html#enviromnent-variables
 */
let config = {
	address: "localhost",	// Address to listen on, can be:
							// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
							// - another specific IPv4/6 to listen on a specific interface
							// - "0.0.0.0", "::" to listen on any interface
							// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/",	// The URL path where MagicMirror² is hosted. If you are using a Reverse proxy
									// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"],	// Set [] to allow all IP addresses
									// or add a specific IPv4 of 192.168.1.5 :
									// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
									// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
									// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false,			// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "",	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "",	// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	locale: "en-US",   // this variable is provided as a consistent location
			   // it is currently only used by 3rd party modules. no MagicMirror code uses this value
			   // as we have no usage, we  have no constraints on what this field holds
			   // see https://en.wikipedia.org/wiki/Locale_(computer_software) for the possibilities

	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 12,
	units: "metric",

	modules: [
		{
			module: "alert",
		},


		// {
		// 	module: "custom", // Add the custom module
		// 	position: "top_bar",
		// 	config: {
		// 	  dateFormat: "dddd, MMMM Do YYYY", // Gregorian Date format
		// 	  hijriDateFormat: "iDD iMMMM iYYYY", // Islamic Date format
		// 	}
		//   },  
		  
		  
		  {
			module: "clock",
			position: "top_right",
		},

		{
			module: "MMM-IslamicPrayerTimes",
			position: "bottom_right", // Modify to your desired position
			config: {
				latitude: 43.8390,    // Example: Latitude for Toronto
				longitude: -79.0868,  // Example: Longitude for Toronto
				timeFormat: 12,       // 12-hour format
				showCountdown: true,  // Show countdown to next prayer
				updateInterval: 60000 // Update every 60 seconds
			}
		},		
		
		// {
		// 	module: "clock",
		// 	position: "top_right",
		// 	config: {
		// 	  displayType: "analog",
		// 	  analogSize: "-1px",
		// 	  showDate: true
		// 	}
		//   },

		{
			module: "weather",
			position: "top_left",
			config: {
				weatherProvider: "openmeteo",
				type: "current",
				lat: 43.8390,
				lon: -79.0868,
			}
		},
		{
			module: "weather",
			position: "top_left",
			header: "Weather Forecast",
			config: {
				weatherProvider: "openmeteo",
				type: "forecast",
				lat: 43.8390,
                lon: -79.0868
			}
		},
		{
			module: "calendar",
			header: "My Calender",
			position: "top_left",
			config: {
				calendars: [
					{
						fetchInterval: 7 * 24 * 60 * 60 * 1000,
						symbol: "calendar-check",
						url: "https://calendar.google.com/calendar/u/0?cid=amFzaW11ZGRpbnRhc2ZpcUBnbWFpbC5jb20"
					},
					// {
					// 	fetchInterval: 7 * 24 * 60 * 60 * 1000, // Fetch every week
					// 	symbol: "calendar-check", // Symbol for the second calendar
					// 	url: "webcal://p154-caldav.icloud.com/published/2/MjUxMjI2NDYxMTMyNTEyMouTZchWyyOGrsUmGdY1N8pAM9r3SEWYRW2SjaX0kP41" // Replace with your second Google calendar ICS URL
					// },
					// {
					// 	fetchInterval: 7 * 24 * 60 * 60 * 1000, // Fetch every week
					// 	symbol: "calendar-check", // Symbol for the second calendar
					// 	url: "webcal://p154-caldav.icloud.com/published/2/MjUxMjI2NDYxMTMyNTEyMouTZchWyyOGrsUmGdY1N8oMLJkHbJPx7HpbTexxACqm" // Replace with your second Google calendar ICS URL
					// },
					// {
					// 	fetchInterval: 7 * 24 * 60 * 60 * 1000, // Fetch every week
					// 	symbol: "calendar-check", // Symbol for the second calendar
					// 	url: "https://calendar.google.com/calendar/ical/en.canadian%23holiday%40group.v.calendar.google.com/public/basic.ics" // Replace with your second Google calendar ICS URL
					// },
					// {
					// 	fetchInterval: 7 * 24 * 60 * 60 * 1000, // Fetch every week
					// 	symbol: "calendar-check", // Symbol for the second calendar
					// 	url: "https://calendar.google.com/calendar/ical/en.islamic%23holiday%40group.v.calendar.google.com/public/basic.ics" // Replace with your second Google calendar ICS URL
					// },
					// {
					// 	fetchInterval: 7 * 24 * 60 * 60 * 1000, // Fetch every week
					// 	symbol: "calendar-check", // Symbol for the second calendar
					// 	url: "https://calendar.google.com/calendar/ical/ht3jlfaac5lfd6263ulfh4tql8%40group.calendar.google.com/public/basic.ics" // Replace with your second Google calendar ICS URL
					// },
					// {
					// 	fetchInterval: 7 * 24 * 60 * 60 * 1000, // Fetch every week
					// 	symbol: "calendar-check", // Symbol for the second calendar
					// 	url: "https://calendar.google.com/calendar/u/1?cid=dGFzZmlxLmphc2ltdWRkaW5AdG9yb250b211LmNh" // Replace with your second Google calendar ICS URL
					// },

				]
			}
		},
		// {
		// 	module: "MMM-GoogleFit",
		// 	position: "top_right",   // or wherever you like
		// 	config: {
		// 	  updateInterval: 15,    // minutes
		// 	  stepGoal: 10000,
		// 	  displayWeight: true,
		// 	  chartWidth: 200,
		// 	  fontSize: 16,
		// 	  stepCountLabel: true,
		// 	  useIcons: true,
		// 	  colors: [
		// 		"#EEEEEE", "#1E88E5", "#9CCC65",
		// 		"#5E35B1", "#FFB300", "#F4511E"
		// 	  ]
		// 	}
		//   },

		// {
		// 	module: 'MMM-RTSPStream',
		// 	position: 'top_right',    // wherever you want it
		// 	config: {
		// 	  autoStart:    true,
		// 	  rotateStreams:      false,   // only one feed runs at once :contentReference[oaicite:3]{index=3}

		// 	  localPlayer: 'ffmpeg',   // inline, no VLC windows
		// 	  moduleWidth:  '800px',
		// 	  moduleHeight: '600px',
		  
		// 	  // now four separate streams, each with its own ffmpegPort
		// 	  stream1: {
		// 		name:       'Lorex Cam 5',
		// 		url:        'rtsp://admin:Camera123@192.168.2.109:554/cam/realmonitor?channel=5&subtype=0',
		// 		protocol:   'tcp',
		// 		ffmpegPort: 8888,        // unique port for this feed
		// 		frameRate: '10',
		// 		width:      320,
		// 		height:     240
		// 	  },
		// 	  stream2: {
		// 		name:       'Lorex Cam 6',
		// 		url:        'rtsp://admin:Camera123@192.168.2.109:554/cam/realmonitor?channel=6&subtype=0',
		// 		protocol:   'tcp',
		// 		ffmpegPort: 8889,
		// 		frameRate: '10',
		// 		width:      320,
		// 		height:     240
		// 	  },
		// 	  stream3: {
		// 		name:       'Lorex Cam 7',
		// 		url:        'rtsp://admin:Camera123@192.168.2.109:554/cam/realmonitor?channel=7&subtype=0',
		// 		protocol:   'tcp',
		// 		ffmpegPort: 8890,
		// 		frameRate: '10',
		// 		width:      320,
		// 		height:     240
		// 	  },
		// 	  stream4: {
		// 		name:       'Lorex Cam 8',
		// 		url:        'rtsp://admin:Camera123@192.168.2.109:554/cam/realmonitor?channel=8&subtype=0',
		// 		protocol:   'tcp',
		// 		ffmpegPort: 8891,
		// 		frameRate: '10',
		// 		width:      320,
		// 		height:     240
		// 	  }
		// 	}
		//   },
		  
				



		  
		  
		  
		  

		//   {
		// 	module: 'MMM-GoogleMapsTraffic',
		// 	position: 'bottom_left',
		// 	header: 'Traffic',
		// 	config: {
		// 	  key: 'AIzaSyAieyUw5vqL3NUncpBAkORO7YmkuYLt14A',        // ← Replace this
		// 	  lat:  43.7498,  
		// 	  lng: -79.2260,
		// 	  zoom: 9,                           // zoom out a little to cover the whole corridor
		  
		// 	  height: '350px',
		// 	  width:  '600px',
		  
		// 	  mapTypeId:     'roadmap',
		// 	  styledMapType: 'dark',              // built-in “dark” style :contentReference[oaicite:0]{index=0}
		  
		// 	  disableDefaultUI: true,
		// 	  backgroundColor: 'hsla(0, 0.00%, 100.00%, 0.51)',
		// 	  updateInterval: 15 * 60 * 1000,     // refresh every 15 minutes
		// 	  markers: [
		// 		{
		// 		  lat: 43.871283821535854,                   // ← Replace with your Home’s lat/lng
		// 		  lng: -79.11747777314692,
		// 		  title: 'Home',
		// 		  fillColor: '#ff0000'
		// 		},
		// 		{
		// 		  lat: 43.6445,                   // ← Replace with your Work’s lat/lng
		// 		  lng: -79.38476358664738,
		// 		  title: 'Work',
		// 		  fillColor: '#00ff00'
		// 		},
		// 		{
		// 		  lat: 43.6596,                   // ← Replace with your School’s lat/lng
		// 		  lng: -79.3800,
		// 		  title: 'School',
		// 		  fillColor: '#0000ff'
		// 		}
		// 	  ]
		// 	}
		//   },
		  
		  
		  
		{
			module: "newsfeed",
			position: "bottom_bar",
			config: {
			  feeds: [
				// General News
				{
					title: "New York Times",
					url: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml"
				  },
				  {
					title: "CBC News",
					url: "https://rss.cbc.ca/lineup/topstories.xml"
				  },
				  {
					title: "Insauga - Durham",
					url: "https://www.insauga.com/feed/"
				  },								
				  // Gaming Feeds
				  {
					title: "PC Gamer",
					url: "https://www.pcgamer.com/rss/"
				  },
				  {
					title: "Gaza Post",
					url: "https://gazaapost.com/en/rss"
				  },


			  ],
			  showSourceTitle: true,
			  showPublishDate: true,
			  broadcastNewsFeeds: true,
			  broadcastNewsUpdates: true
			}
		  },		  
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") { module.exports = config; }