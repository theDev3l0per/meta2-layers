const $ = id => document.getElementById(id)
const c = id => document.getElementsByClassName(id)
const t = id => document.getElementsByTagName(id)
const D = id => new Decimal(id)

const app = new Vue({
  el: "#app",
  data: {
    player:{}
  },
points: "0",
      pps: "1"})