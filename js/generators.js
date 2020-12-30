app.component("normal-generators", {
  props: {
    generators: Array,
    cost: Function
  },
  template: `<div><normal-generator
        v-for="generator in generators"
        :number="generator.number.toString()"
        :amt="generator.amt.toString()"
        :key="generator.number.toString()"
        :cost="cost('normal', generator.number).toString()"
      ></normal-generator></div>`
})

app.component("normal-generator", {
  props: {
    number: String,
    amt: String,
    cost: String
  },
  template: `<button style="display:block; onclick="b()">
  <b>Generator {{number}}</b><br>
  Amount: {{amt}}<br>
  Cost: {{cost}}a
  </button>`
})