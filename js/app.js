const $ = id => document.getElementById(id)
const c = id => document.getElementsByClassName(id)
const t = id => document.getElementsByTagName(id)
const D = id => new Decimal(id)

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
  localStorage.game = JSON.stringify(player.$data)
}

var app = Vue.createApp({
  data() {
    var x = {
    dark: true,
    tab: "1",
    normalGenerators: [],
    dngCap: D(5),
    a: D(10)
    }
    if (typeof localStorage.game != "undefined") x = decimalize(loopAssign(x, JSON.parse(localStorage.game)))
    return x
  },
  methods: {
    createGenerators() {
      for (var i = D(1); i.lte(this.dngCap); i = i.add(1)) {
        this.normalGenerators.push({number: i.round(), amt: D(0).round(), trueAmt: D(0).round()})
      }
    },
    cost(type, distinct) {
      return Decimal.pow(10, distinct).pow(this[`${type}Generators`][distinct-1].trueAmt.add(1)).round()
    },
    buy(type, distinct) {
      if (type == "normal" && this.a.gte(this.cost(type, distinct))) {
        this.a = this.a.sub(this.cost(type, distinct))
        this[`${type}Generators`][distinct-1].trueAmt = this[`${type}Generators`][distinct-1].trueAmt.add(1).round()
      }
    },
  }
})

function init() {
  player = app.mount("#app")
  if (typeof localStorage.game == "undefined") player.createGenerators()
  setInterval(save, 10000)
  setInterval(tick, 50)
}

function tick() {
  player.a = player.normalGenerators[0].amt.add(player.normalGenerators[0].trueAmt).div(20).add(player.a)
  for (var i in player.normalGenerators) {
    i = Number(i)
    if (D(i).neq(player.dngCap.sub(1))) {
      player.normalGenerators[i].amt = player.normalGenerators[i+1].amt.add(player.normalGenerators[i+1].trueAmt).div(20).add(player.normalGenerators[i].amt)
    }
  }
}