const $ = id => document.getElementById(id)
const c = id => document.getElementsByClassName(id)
const t = id => document.getElementsByTagName(id)
const D = id => new Decimal(id)

app = Vue.createApp({
  data() {return {
    generators: [],
    dngCap: D(5),
    pps: D(1)
  }},
  methods: {
    createGenerators() {
      for (var i = D(1); i.lte(this.dngCap); i = i.add(1)) {
        this.generators.push({number: i.round(), amt: D(0).round()})
      }
    },
    cost(x) {
      return Decimal.pow(10, x).pow(this.generators[x-1].amt.add(1))
    }
  }
})

function init() {
  player = app.mount("#app")
  player.createGenerators()
}