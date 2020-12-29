const $ = id => document.getElementById(id)
const c = id => document.getElementsByClassName(id)
const t = id => document.getElementsByTagName(id)
const D = id => new Decimal(id)

function loopAssign(x, y) {
  
    for (var key in y) {
        if (!y.hasOwnProperty(key)) continue;
        if (typeof y[key] == "object") {
            loopAssign(x[key],y[key])
        }
        else {
            x[key] = y[key]
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
    normalGenerators: [],
    dngCap: D(5),
    a: D(10)
    }
    if (typeof localStorage.game != "undefined") x = loopAssign(x, JSON.parse(localStorage.game))
    else createGenerators()
    return x
  }},
  methods: {
    createGenerators() {
      for (var i = D(1); i.lte(this.dngCap); i = i.add(1)) {
        this.normalGenerators.push({number: i.round(), amt: D(0).round()})
      }
    },
    cost(type, distinct) {
      return Decimal.pow(10, distinct).pow(this[`${type}Generators`][distinct-1].amt.add(1))
    }
  }
})

function init() {
  player = app.mount("#app")

  setInterval(save, 10000)
}