app.component("normal-generators", {
  props: {
    generators: Array,
    cost: Function,
    mult: Function,
    format: Function
  },
  template: `<div><normal-generator
        v-for="generator in generators"
        :number="format(generator.number)"
        :amt="format(generator.amt.add(generator.trueAmt))"
        :trueAmt="format(generator.trueAmt)"
        :key="format(generator.number)"
        :cost="format(cost('normal', generator.number))"
        :mult="format(mult('normal', generator.number))"
      ></normal-generator></div>`
})

app.component("normal-generator", {
  props: {
    number: String,
    amt: String,
    cost: String,
    mult: String,
    trueAmt: String,
  },
  template: `<button style="display:block;" :number="number" onclick='player.buy("normal", this.attributes.number.value)'>
  <b>Generator {{number}}</b><br>
  Amount: {{amt}} ({{trueAmt}})<br>
  Cost: {{cost}}a<br>
  Multiplier: {{mult}}x
  </button>`
})