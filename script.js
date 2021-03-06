const data = {
  tab: 'chart',
  type: 'line',
  datasets: [
    [8, 3, 1, 2, 5, 5],
  ],
  datasetOptions: [fullDatasetOptions.line],
  options: fullOptions,
  selects: fullSelects,
  rawDataMode: false,
  useMinAndMax: false,
  minAndMax: {
    min: 0,
    max: 9,
  }
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function getKeys(object) {
  let keys = [];
  if (typeof object == 'object') {
    for (let key in object) {
      let value = object[key];
      if (typeof value == 'object') {
        keys.push(key);
        keys = keys.concat(getKeys(value));
      }
    }
   }
   return keys;
}

const methods = {
  changeOption(path, value){
    const string = 'data["' + path.join('"]["') + '"]';
    if(['true', 'false'].indexOf(value) == -1) eval(string + ` =  '${value}'`);
    else eval(string + ` =  ${value}`);
  },
  gotoOptions(){
    data.tab = 'options';
    ids = getKeys(data.options);
    ids.forEach(id => {
      $(`#${id}`).collapse('show');
    });
    ids.forEach(id => {
      $(`#${id}`).collapse('hide');
    });
  },
  handleDataset(index, dataset){
    dataset = methods.makeArray(dataset);
    data.datasets[index] = eval(`[${dataset}]`);
  },
  changeChartType(type){
    data.datasetOptions = [],
    data.datasets.forEach(dataset => {
      data.datasetOptions.push(fullDatasetOptions[type]);
    });
  },
  addDataset(){
    data.datasets.push([]);
    const newOption = {}
    Object.keys(fullDatasetOptions[data.options.type]).forEach(attr => {
      newOption[attr] = fullDatasetOptions[data.options.type][attr];
    });
    data.datasetOptions.push(newOption);
  },
  removeDataset(){
    if(data.datasets.length > 0){
      data.datasets = data.datasets.slice(0, data.datasets.length-1);
      data.datasetOptions = data.datasetOptions.slice(0, data.datasetOptions.length-1);
    }
  },
  addElement(path){
    const string = 'data["' + path.join('"]["') + '"]';
    eval(`${string}.push(${string}[${string}.length-1])`);
  },
  removeElement(path){
    const string = 'data["' + path.join('"]["') + '"]';
    eval(`${string} = ${string}.splice(0, ${string}.length-1)`);
  },
  saveChart(){
    const canvas = document.getElementById("chart");
    canvas.toBlob(function(blob) {
      if(data.options.title.text.replace(' ', '') != "") saveAs(blob, `${data.options.title.text}.png`);
      else saveAs(blob, `chart.png`);
    });
  },
  switchDataMode(type){
    const numBuckets = computed.numBuckets()
    const smallestNum = Math.min(...computed.largestDataset())
    const labels = [smallestNum];
    const datasets = [];
    const biggestNum = Math.max(...computed.largestDataset())
    for(let i = 1; i <= numBuckets; i++){
      labels.push(Math.floor(smallestNum +(((1/numBuckets) * (biggestNum-smallestNum))*i)))
    }
    data.datasets.forEach(dataset => {
      const newSet = [];
      labels.reverse();
      labels.forEach(label => {newSet.push(0)});
      dataset.forEach(elem => {
        let done = false;
        labels.forEach((label, index) => {
          if(elem >= label && !done){
            newSet[index]++;
            done = true;
          }
        });
      });
      datasets.push(newSet.reverse());
    });
    labels.reverse();
    if(type == 'labels'){
      return methods.bucketify(labels);
    }
    else{
      return datasets;
    }
  },
  makeArray(string){
    return string.replace('\n',',');
  },
  bucketify(labels){
    const newLabels = [];
    for(let i = 0; i < labels.length-1; i++){
      newLabels.push(`${labels[i]}-${labels[i+1]}`);
    }
    const step = Math.abs(eval(newLabels[0]));
    newLabels.push(`${labels[labels.length-1]}-${labels[labels.length-1] + step}`);
    return newLabels;
  },
  average(dataset){
    const sum = dataset => dataset.reduce((a,b) => a + b, 0);
    return sum(dataset)/dataset.length;
  },
  standardDeviation(dataset){
    const avg = methods.average(dataset);
    const squareDiff = dataset.map(function(value){
      return (value - avg)**2;
    });
    return Math.sqrt(methods.average(squareDiff));
  },
  minimum(dataset){
    return Math.min(...dataset);
  },
  maximum(dataset){
    return Math.max(...dataset);
  },
  median(dataset){
    const mid = Math.floor(dataset.length / 2)
    const nums = [...dataset].sort((a, b) => a - b);
    return dataset.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
  },
  quartile(dataset, percentile) {
    dataset.sort((a, b) => (b.length - a.length));
    var index = (percentile/100) * dataset.length;
    var result;
    if (Math.floor(index) == index) {
         result = (dataset[(index-1)] + dataset[index])/2;
    }
    else {
        result = dataset[Math.floor(index)];
    }
    return result;
  },
  q1(dataset){
    // return methods.quartile(dataset, 25);
    return numbers.statistic.quantile(dataset, 1, 4);
  },
  q3(dataset){
    // return methods.quartile(dataset, 75);
    return numbers.statistic.quantile(dataset, 3, 4);
  }
}

const computed = {
  largestDataset: function(){
    let datasets = [];
    data.datasets.forEach(dataset => {
      datasets.push(dataset);
    });
    datasets.sort((a, b) => (b.length - a.length));
    return datasets[0];
  },
  numBuckets: function(){
    return numBuckets = Math.ceil(Math.sqrt(computed.largestDataset().length));
  },
  rawDataAdjusted: function(){
    return methods.switchDataMode('datasets');
  },
  rawDataLabels: function(){
    return methods.switchDataMode('labels');
  }
}

const watch = {
  'options.type': function(val){
    methods.changeChartType(val);
  },
  rawDataMode: function(val){
    // methods.switchDataMode(val);
  },
}

const vm = new Vue({
  el: '#app',
  data: data,
  methods: methods,
  computed: computed,
  watch: watch,
});
