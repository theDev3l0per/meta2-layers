const $ = id => document.getElementById(id)
const c = id => document.getElementsByClassName(id)
const t = id => document.getElementsByTagName(id)
const D = id => new Decimal(id)

const app = new Vue({
  el: "#app",
  data: {
    generators:[{number: 1}, {number: 2}, {number: 3}],
    player:{
      pps: "1"
    }
  }
})