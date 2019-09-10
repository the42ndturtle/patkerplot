const data = {
  tab: 'chart',
  type: 'line',
  datasets: [
    [8, 3, 1, 2, 5, 5],
  ],
  datasetOptions: [fullDatasetOptions.line],
  options: fullOptions,
  selects: fullSelects,
}

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
      saveAs(blob, `${data.options.title.text}.png`);
    });
  },
}

const watch = {
  'options.type': function(val){
    methods.changeChartType(val);
  }
}

const vm = new Vue({
  el: '#app',
  data: data,
  methods: methods,
  watch: watch,
});
