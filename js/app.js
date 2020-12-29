const $ = id => document.getElementById(id)
const c = id => document.getElementsByClassName(id)
const t = id => document.getElementsByTagName(id)
const D = id => new Decimal(id)

app = Vue.createApp({
  data() {return {
    normalGenerators: [],
    dngCap: D(5),
    a: D(10)
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
  player.createGenerators()
  load()
  setInterval(save, 10000)
}