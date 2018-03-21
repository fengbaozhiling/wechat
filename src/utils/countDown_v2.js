class Countdown {
    /* 
    {
        date: 日期
        offset: 间隔
        refresh: 500,  刷新频率
		offset: 0, 
    }
    */
    options = {}
    constructor(options, callBack) {
        this.interval = null;
        this.options = Object.assign({}, this.deFaultOptioins(), options)
        if (typeof this.options.date !== `object`) {
			this.options.date = new Date(this.options.date)
        }
        this.start(callBack)
    }
    stop() {
        if (this.interval) {
			clearInterval(this.interval)
			this.interval = null;
		}
    }
    deFaultOptioins() {
        return  {
			date: `June 7, 2087 15:03:25`, 
			refresh: 500, 
			offset: 0
		}
    }
        /**
	 * 计算日期差
	 */
	getDiffDate() {
		let diff = (this.options.date.getTime() - Date.now() + this.options.offset) / 1000

		let dateData = {
			years: 0,
			days: 0,
			hours: 0,
			min: 0,
			sec: 0,
			millisec: 0,
		}

		if (diff <= 0) {
			if (this.interval) {
                console.log('stop')
				this.stop()
			}
			return dateData
		}

		if (diff >= (365.25 * 86400)) {
			dateData.years = Math.floor(diff / (365.25 * 86400))
			diff -= dateData.years * 365.25 * 86400
		}

		if (diff >= 86400) {
			dateData.days = Math.floor(diff / 86400)
			diff -= dateData.days * 86400
		}

		if (diff >= 3600) {
			dateData.hours = Math.floor(diff / 3600)
			diff -= dateData.hours * 3600
		}

		if (diff >= 60) {
			dateData.min = Math.floor(diff / 60)
			diff -= dateData.min * 60
		}

		dateData.sec = Math.round(diff)

		dateData.millisec = diff % 1 * 1000
		return dateData
	}
    start ( callBack) {
        var _this = this;
        this.interval = setInterval(() => {
            console.log(this.interval,'this.interval')
            if (callBack) callBack(_this.getDiffDate());
        }, _this.options.refresh)
       
    }

}
export default Countdown