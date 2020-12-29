Vue.component("normal-generator", {
  props: ["number", "amt"],
  template: `<button>
  Generator {{number}}<br>
  Amount: {{amt}}
  </button>`
})