const $ = id => document.getElementById(id)
const c = id => document.getElementsByClassName(id)
const t = id => document.getElementsByTagName(id)
const D = id => new Decimal(id)

const app = Vue.createApp({
  el: "#app",
  data() {return {
    player:{
      generators: [],
      dngCap: D(5),
      pps: D(1)
    }
  }},
  methods: {
    createGenerators() {
      for (var i = D(1); i.lte(this.player.dngCap); i = i.add(1)) {
        this.player.generators.push({number: i, amt: D(0)})
      }
    }
  }
})

function init() {
  app.mount("#app")
  app.createGenerators()
}