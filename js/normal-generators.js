app.component("normal-generators", {
  props: {
    generators: Array,
    cost: Function,
    mult: Function
  },
  template: `<div><normal-generator
        v-for="generator in generators"
        :number="generator.number.round().toString()"
        :amt="generator.amt.add(generator.trueAmt).round().toString()"
        :trueAmt="generator.trueAmt.round().toString()"
        :key="generator.number.round().toString()"
        :cost="cost('normal', generator.number).toString()"
        :mult="mult('normal', generator.number).toString()"
      ></normal-generator></div>`
})

app.component("normal-generator", {
  props: {
    number: String,
    amt: String,
    cost: String,
    mult: String,
    trueAmt: String
  },
  template: `<button style="display:block;" :number="number" onclick='player.buy("normal", this.attributes.number.value)'>
  <b>Generator {{number}}</b><br>
  Amount: {{amt}} ({{trueAmt}})<br>
  Cost: {{cost}}a
  </button>`
})