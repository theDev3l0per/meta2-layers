Vue.component("normal-generators", {
  props: ["generators"],
  template: `<normal-generator
        v-for="generator in generators"
        :number="generator.number"
        :key="generator.number"
      ></normal-generator>`
})

Vue.component("normal-generator", {
  props: ["number", "amt"],
  template: `<button>
  Generator {{number}}<br>
  Amount: {{amt}}
  </button>`
})