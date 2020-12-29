app.component("normal-generators", {
  props: ["generators"],
  template: `<div><normal-generator
        v-for="generator in generators"
        :number="generator.number"
        :amt="generator.amt.toString()"
        :key="generator.number.toString()"
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