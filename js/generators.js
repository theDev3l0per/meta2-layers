app.component("normal-generators", {
  props: ["generators"],
  template: `<div><normal-generator
        v-for="generator in generators"
        :number="generator.number"
        :key="generator.number"
      ></normal-generator></div>`
})

app.component("normal-generator", {
  props: ["number", "amt"],
  template: `<button style="display:block;">
  Generator {{number}}<br>
  Amount: {{amt}}
  </button>`
})