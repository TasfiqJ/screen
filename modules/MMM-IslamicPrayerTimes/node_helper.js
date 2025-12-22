const NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
    start: function() {
        console.log("MMM-IslamicPrayerTimes helper started.");
    },

    getPrayerTimes: function(latitude, longitude) {
        const axios = require("axios");
        const url = `http://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`;

        axios.get(url)
            .then(response => {
                this.sendSocketNotification("PRAYER_TIMES", response.data.data.timings);
            })
            .catch(error => {
                console.error("Error fetching prayer times:", error);
            });
    }
});
