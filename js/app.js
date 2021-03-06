const $ = id => document.getElementById(id)
const c = id => document.getElementsByClassName(id)
const t = id => document.getElementsByTagName(id)
const D = id => new Decimal(id)
var player

function loopAssign(x, y) {
  
    for (var key in y) {
        if (!y.hasOwnProperty(key)) continue;
        if (typeof y[key] == "object" && !(y[key] instanceof Decimal) && !(y[key] instanceof Array)) {
            loopAssign(x[key],y[key])
        }
        else {
            x[key] = y[key]
        }
    }
    return x
}

function decimalize(x) { // imma continue working
  for (var i in x) {
    if (typeof x[i] == "object") {
      decimalize(x[i])
    }
    else {
      x[i] = D(x[i])
    }
  }
  return x
}

function save() {
  localStorage.layers1 = JSON.stringify(player.$data)
}

var app = Vue.createApp({
  data() {
    var x = {
    dark: true,
    tab: "1",
    normalGenerators: [],
    normalDupes: D(0),
    a: D(10)
    }
    if (typeof localStorage.layers1 != "undefined") x = decimalize(loopAssign(x, JSON.parse(localStorage.layers1)))
    return x
  },
  methods: {
    maxAll() {
        for (var i in this.normalGenerators) {
          i = Number(i)
          while (true) {
           var canBuy = this.buy("normal", i+1)
           if (!canBuy) break
          }
        }
      },
    dngCap() {return D(5).add(this.normalDupes)},
    createGenerators() {
      for (var i = D(1); i.lte(this.dngCap()); i = i.add(1)) {
        this.normalGenerators.push({number: i.round(), amt: D(0).round(), trueAmt: D(0).round()})
      }
    },
    canNormalDupe() {
      var distinct = D(5).add(this.normalDupes)
      if (!this.normalGenerators[distinct.toNumber()-1]) return
      //var amt = D(5).times(Decimal.pow(2, this.normalDupes))
      return this.normalGenerators[distinct.toNumber()-1].trueAmt.gte(distinct)
    },
    cost(type, distinct) {
      return Decimal.pow(10, distinct).pow(this[`${type}Generators`][distinct-1].trueAmt.add(1)).round()
    },
    buy(type, distinct) {
      if (type == "normal" && this.a.gte(this.cost(type, distinct))) {
        this.a = this.a.sub(this.cost(type, distinct))
        this[`${type}Generators`][distinct-1].trueAmt = this[`${type}Generators`][distinct-1].trueAmt.add(1).round()
        return true
      }
      else return false
    },
    mult(type, distinct) {
      return Decimal.pow(2, this[`${type}Generators`][distinct-1].trueAmt).times(Decimal.pow(1.1, this.normalDupes)).times(this.tickspeed())
    },
    format(decimal, precision=2,) {
      decimal = new Decimal(decimal)
      if (decimal.sign<0) return "-"+format(decimal.neg(), precision)
      if (decimal.mag == Number.POSITIVE_INFINITY) return "Infinity"
      if (decimal.gte("eeee1000")) {
        var slog = decimal.slog()
        if (slog.gte(1e6)) return "F" + format(slog.floor())
        else return Decimal.pow(10, slog.sub(slog.floor())).toStringWithDecimalPlaces(3) + "F" + commaFormat(slog.floor(), 0)
      }
      else if (decimal.gte("1e100000")) return exponentialFormat(decimal, 0, false)
      else if (decimal.gte("1e1000")) return exponentialFormat(decimal, 0)
      else if (decimal.gte(1e9)) return exponentialFormat(decimal, precision)
      else if (decimal.gte(1e3)) return commaFormat(decimal, 0)
      else return regularFormat(decimal, precision)
    },
    tickspeed() {
      return new Decimal(1/20).times(Decimal.pow(1.1, this.normalDupes))
    }
  }
})

function init() {
  player = app.mount("#app")
  if (typeof localStorage.layers1 == "undefined") player.createGenerators()
  setInterval(save, 10000)
  setInterval(tick, 50)
  window.addEventListener("keypress",function(keyp){
    let key = keyp.key.toLowerCase()
    if(key=="m"){
      player.maxAll()
    }
    if(key=="d"){
      if(player.canNormalDupe())normalDupe()
    } // nice
},false)
}

function tick() {
  player.a = player.normalGenerators[0].amt.add(player.normalGenerators[0].trueAmt).times(player.mult("normal", 1)).add(player.a)
  for (var i in player.normalGenerators) {
    i = Number(i)
    if (D(i).neq(player.dngCap().sub(1))) {
      player.normalGenerators[i].amt = player.normalGenerators[i+1].amt.add(player.normalGenerators[i+1].trueAmt).times(player.mult("normal", i+2)).add(player.normalGenerators[i].amt)
    }
  }
}
function exponentialFormat(num, precision, mantissa = true) { // the one you pasted here
	let e = num.log10().floor()
	let m = num.div(Decimal.pow(10, e))
	if(m.toStringWithDecimalPlaces(precision) == 10) {
		m = new Decimal(1)
		e = e.add(1)
	}
	e = (e.gte(10000) ? commaFormat(e, 0) : e.toStringWithDecimalPlaces(0))
	if (mantissa)
		return m.toStringWithDecimalPlaces(precision)+"e"+e
		else return "e"+e
	}
function commaFormat(num, precision) {
	if (num === null || num === undefined) return "NaN"
	if (num.mag < 0.001) return (0).toFixed(precision)
	return num.toStringWithDecimalPlaces(precision).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}

function regularFormat(num, precision) {
	if (num === null || num === undefined) return "NaN"
	if (num.mag < 0.001) return (0).toFixed(precision)
	return num.toStringWithDecimalPlaces(precision)
}

function normalDupe() {
  player.a = D(10)
  player.normalGenerators = []
  player.normalDupes = player.normalDupes.add(1).round()
  player.createGenerators()
}