/* global Log, Module */

Module.register("MMM-IslamicPrayerTimes", {
    getStyles() {
      return ["MMM-IslamicPrayerTimes.css"];
    },
  
    defaults: {
      latitude: 43.8486,             // Pickering, ON
      longitude: -79.1069,
      timeFormat: 12,                // 12-hour
      showCountdown: true,
      fetchInterval: 60 * 60 * 1000, // hourly refresh
      countdownInterval: 1000        // per-second countdown
    },
  
    start() {
      Log.info(this.name + " module started.");
      this.rawTimings = null;
      this.prayerTimes = [];
      this.nextPrayerName = "";
      this.nextPrayerCountdown = "";
      this.getPrayerTimes();
      setInterval(() => this.getPrayerTimes(), this.config.fetchInterval);
      this._startCountdownLoop();
    },
  
    getDom() {
      const wrapper = document.createElement("div");
      wrapper.className = "MMM-IslamicPrayerTimes";
  
      if (!this.rawTimings) {
        wrapper.innerHTML = "Loading Prayer Times…";
        return wrapper;
      }
  
      // 1) Countdown label
      if (this.config.showCountdown && this.nextPrayerCountdown) {
        const cd = document.createElement("div");
        cd.className = "countdown";
        const label = `${this.nextPrayerName} in:`;
        cd.innerHTML = `<span class="label">${label}</span> <span class="value">${this.nextPrayerCountdown}</span>`;
        wrapper.appendChild(cd);
      }
  
      // 2) Prayer times list
      const timesWrapper = document.createElement("div");
      timesWrapper.className = "prayerTimes";
  
      // Unique image URL map for each prayer
      const iconMap = {
        Fajr:    "https://img.icons8.com/fluency/48/moon-symbol.png",
        Sunrise: "https://img.icons8.com/fluency/48/sunrise.png",
        Dhuhr:   "https://img.icons8.com/fluency/48/sun.png",
        Asr:     "https://img.icons8.com/fluency/48/partly-cloudy-day.png",
        Maghrib: "https://img.icons8.com/fluency/48/sunset.png",
        Isha:    "https://img.icons8.com/fluency/48/star.png"
      };
  
      this.prayerTimes.forEach(pt => {
        const row = document.createElement("div");
        row.className = "prayerTime";
  
        // Left: image + name
        const left = document.createElement("div");
        left.className = "left";
        const img = document.createElement("img");
        img.className = "prayer-img";
        img.src = iconMap[pt.name];
        img.alt = pt.name;
        left.appendChild(img);
        const name = document.createElement("span");
        name.className = "name";
        name.textContent = pt.name;
        left.appendChild(name);
  
        // Right: time
        const time = document.createElement("span");
        time.className = "time";
        time.textContent = pt.time;
  
        row.appendChild(left);
        row.appendChild(time);
        timesWrapper.appendChild(row);
      });
  
      wrapper.appendChild(timesWrapper);
      return wrapper;
    },
  
    getPrayerTimes() {
      const url = `http://api.aladhan.com/v1/timings?latitude=${this.config.latitude}` +
                  `&longitude=${this.config.longitude}&method=2`;
      fetch(url)
        .then(res => res.json())
        .then(data => {
          this.rawTimings = data.data.timings;
          this.prayerTimes = [
            { name: "Fajr",    time: this._to12(this.rawTimings.Fajr)    },
            { name: "Sunrise", time: this._to12(this.rawTimings.Sunrise) },
            { name: "Dhuhr",   time: this._to12(this.rawTimings.Dhuhr)   },
            { name: "Asr",     time: this._to12(this.rawTimings.Asr)     },
            { name: "Maghrib", time: this._to12(this.rawTimings.Maghrib) },
            { name: "Isha",    time: this._to12(this.rawTimings.Isha)    }
          ];
          this._calcCountdown();
          this.updateDom();
        })
        .catch(e => Log.error(this.name + " error fetching prayer times:", e));
    },
  
    _to12(time24) {
      const [h, m] = time24.split(":").map(Number);
      const period = h >= 12 ? "PM" : "AM";
      let hours = h % 12 || 12;
      const mins = m < 10 ? "0" + m : m;
      return `${hours}:${mins} ${period}`;
    },
  
    _startCountdownLoop() {
      const EXTRA_DELAY = 50;
      const tick = () => {
        if (this.rawTimings) {
          this._calcCountdown();
          this.updateDom();
        }
        const now = new Date();
        const delay = this.config.countdownInterval - now.getMilliseconds() + EXTRA_DELAY;
        setTimeout(tick, delay);
      };
      const now = new Date();
      const initialDelay = this.config.countdownInterval - now.getMilliseconds() + EXTRA_DELAY;
      setTimeout(tick, initialDelay);
    },
  
    _calcCountdown() {
      const now = new Date();
      const names = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
      let nextTimeStr = null, nextName = null;
      const baseDate = new Date(now.toDateString());
  
      for (let name of names) {
        const [h, m] = this.rawTimings[name].split(":").map(Number);
        const dt = new Date(baseDate);
        dt.setHours(h, m, 0, 0);
        if (dt > now) { nextTimeStr = this.rawTimings[name]; nextName = name; break; }
      }
      if (!nextTimeStr) {
        nextTimeStr = this.rawTimings.Fajr;
        nextName = "Fajr";
        baseDate.setDate(baseDate.getDate() + 1);
      }
      this.nextPrayerName = nextName;
  
      const [nh, nm] = nextTimeStr.split(":").map(Number);
      const nextDt = new Date(baseDate);
      nextDt.setHours(nh, nm, 0, 0);
      const diff = nextDt - new Date();
  
      const hrs = Math.floor(diff / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
  
      this.nextPrayerCountdown = `${hrs}h ${mins}m ${secs}s`;
    }
  });
  