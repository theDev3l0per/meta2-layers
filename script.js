const $ = id => document.getElementById(id)
const c = id => document.getElementsByClassName(id)
const t = id => document.getElementsByTagName(id)
const D = id => new Decimal(id)

var app = new Vue({
  el: "#app",
  data: {
    player:{}
  },
}) 