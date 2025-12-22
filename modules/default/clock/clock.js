/* global SunCalc, formatTime, moment */

Module.register("clock", {
	// Module config defaults.
	defaults: {
	  displayType: "digital",     // options: digital, analog, both
	  timeFormat: config.timeFormat,
	  timezone: null,
	  displaySeconds: true,
	  showPeriod: true,
	  showPeriodUpper: false,
	  clockBold: false,
	  showDate: true,
	  showTime: true,
	  showWeek: false,
	  dateFormat: "dddd, LL",     // e.g. "Thursday, May 8, 2025"
	  sendNotifications: false,
	  analogSize: "200px",
	  analogFace: "simple",
	  analogPlacement: "bottom",
	  analogShowDate: "top",
	  secondsColor: "#888888",
	  showSunTimes: false,
	  showMoonTimes: false,
	  lat: 47.630539,
	  lon: -122.344147
	},
  
	// Load scripts (including Moment-Hijri)
	getScripts() {
	  return [
		"moment.js",
		"moment-timezone.js",
		"moment-hijri.js",
		"suncalc.js"
	  ];
	},
  
	// Existing styles
	getStyles() {
	  return ["clock_styles.css"];
	},
  
	start() {
	  Log.info(`Starting module: ${this.name}`);
	  this._scheduleNextTick(moment().second());
	  moment.locale(config.language);
	},
  
	_scheduleNextTick(reducedSeconds) {
	  const EXTRA_DELAY = 50;
	  const delay = this.config.displaySeconds
		? 1000 - moment().milliseconds() + EXTRA_DELAY
		: (60 - reducedSeconds) * 1000 - moment().milliseconds() + EXTRA_DELAY;
  
	  setTimeout(() => {
		this.updateDom();
		this._scheduleNextTick(
		  this.config.displaySeconds ? moment().second() : 0
		);
	  }, delay);
	},
  
	getDom() {
	  const wrapper = document.createElement("div");
	  wrapper.classList.add("clock-grid");
  
	  // Digital container
	  const digitalWrapper = document.createElement("div");
	  digitalWrapper.className = "digital";
  
	  // Date element
	  const dateWrapper = document.createElement("div");
	  dateWrapper.className = "date normal medium";
  
	  // Time element
	  const timeWrapper = document.createElement("div");
	  timeWrapper.className = "time bright large light";
	  const hoursWrapper   = document.createElement("span");
	  const minutesWrapper = document.createElement("span");
	  const secondsWrapper = document.createElement("sup");
	  const periodWrapper  = document.createElement("span");
  
	  hoursWrapper.className   = "clock-hour-digital";
	  minutesWrapper.className = "clock-minute-digital";
	  secondsWrapper.className = "clock-second-digital dimmed";
	  periodWrapper.className  = "clock-period";
  
	  let now = moment();
	  if (this.config.timezone) {
		now = now.tz(this.config.timezone);
	  }
  
	  // — Gregorian + Hijri date (AH removed) —
	  if (this.config.showDate) {
		const gDate = now.format(this.config.dateFormat);
		const hDate = now.format("iD iMMMM iYYYY");  // e.g. "27 Ramadan 1446"
		dateWrapper.innerHTML = `${gDate} | ${hDate}`;  // <-- no "AH"
		digitalWrapper.appendChild(dateWrapper);
	  }
  
	  // Build the time display (hours, minutes, seconds, period)
	  if (this.config.showTime && this.config.displayType !== "analog") {
		const hourFmt = this.config.timeFormat === 24 ? "HH" : "h";
		hoursWrapper.innerHTML   = now.format(hourFmt);
		minutesWrapper.innerHTML = now.format("mm");
		secondsWrapper.innerHTML = now.format("ss");
		periodWrapper.innerHTML  = this.config.showPeriod
		  ? (this.config.showPeriodUpper ? now.format("A") : now.format("a"))
		  : "";
  
		timeWrapper.appendChild(hoursWrapper);
		if (!this.config.clockBold) timeWrapper.innerHTML += ":";
		timeWrapper.appendChild(minutesWrapper);
		if (this.config.displaySeconds) timeWrapper.appendChild(secondsWrapper);
		if (
		  this.config.showPeriod &&
		  this.config.timeFormat !== 24
		) {
		  timeWrapper.appendChild(periodWrapper);
		}
		digitalWrapper.appendChild(timeWrapper);
	  }
  
	  // (Analog clock code remains unchanged)
  
	  wrapper.appendChild(digitalWrapper);
	  return wrapper;
	}
  });
  