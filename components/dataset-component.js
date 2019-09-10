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
    data: function(data){
      this.data = data.replace('\n',',');
      console.log(this.data);
    }
  },
  template: `
    <textarea :value="data" @input="handleDataset(index, $event.target.value)">
      {{data}}
    </textarea>
  `
});
