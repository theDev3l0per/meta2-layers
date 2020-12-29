const $ = id => document.getElementById(id)
const c = id => document.getElementsByClassName(id)
const t = id => document.getElementsByTagName(id)
const D = id => new Decimal(id)

const app = Vue.createApp({
  el: "#app",
  data() {return {
    generators: [],
    dngCap: 5,
    player:{
      pps: "1"
    }
  }}
})