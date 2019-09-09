Vue.component('dataset', {
  props: ['data', 'index'],
  computed: {

  },
  methods: {
    handleDataset: methods.handleDataset,
  },
  template: `
    <textarea :value="data" @input="handleDataset(index, $event.target.value)">
      {{data}}
    </textarea>
  `
});
