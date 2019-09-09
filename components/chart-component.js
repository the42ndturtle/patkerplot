Vue.component('chart', {
  props: ['datasets', 'options', 'datasetoptions'],
  methods: {
    makeChart(data){
      const options = this.options;
      const thisDatasets = [];
      this.datasets.forEach((data, index) => {
        thisDatasets.push({data: data});
      });
      this.datasetoptions.forEach((option, index) => {
        thisDatasets[Object.keys(thisDatasets)[index]] = {...thisDatasets[Object.keys(thisDatasets)[index]], ...option}
      });
      new Chart(document.getElementById('chart'), {
        type: this.options.type,
          data: {
            labels: this.options.labels,
            datasets: thisDatasets,
          },
          options: options,
      });
      Chart.defaults.global.elements.point = this.options.elements;
      // Chart.defaults.global.animation = this.options.animation;
    },
  },
  mounted() {
    this.makeChart(this.$props.data);
  },
  template: `
    <div>
      <canvas id="chart" height="100"></canvas>
    </div>
  `
});
