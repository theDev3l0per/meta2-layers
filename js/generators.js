app.component("normal-generators", {
  props: ["generators", "cost"],
  template: `<div><normal-generator
        v-for="generator in generators"
        :number="generator.number.toString()"
        :amt="generator.amt.toString()"
        :key="generator.number.toString()"
        :cost="cost('normal', generator.amt).toString()"
      ></normal-generator></div>`
})

app.component("normal-generator", {
  props: {
    number: String,
    amt: String,
    cost: String
  },
  template: `<button style="display:block;">
  <b>Generator {{number}}</b><br>
  Amount: {{amt}}
  </button>`
})