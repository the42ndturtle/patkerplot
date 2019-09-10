Vue.component('dataset', {
  props: ['data', 'index'],
  computed: {
    correctData: function(){
      console.log(this.data);
    }
  },
  methods: {
    handleDataset(index, e){
      e = e.replaceAll('\n', ',');
      console.log(e);
      methods.handleDataset(index, e);
    },
  },
  watch: {
    
  },
  template: `
    <textarea :value="data" @input="handleDataset(index, $event.target.value)">
      {{data}}
    </textarea>
  `
});
