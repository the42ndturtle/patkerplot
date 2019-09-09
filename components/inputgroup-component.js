Vue.component('inputgroup', {
  props: ['append', 'prepend', 'type', 'datakey', 'index', 'data', 'path', 'options'],
  model: {
    event: 'change'
  },
  computed: {
    newPath: function(){
      let path = this.path
      path = path.slice(0, path.length);
      path.push(this.datakey);
      const newPath = [];
      path.forEach(step  => {
        newPath.push(step);
      })
      return newPath;
    },
    indexPath: function(){
      let path = this.newPath;
      let stringPath = "this." + path[0];
      path = path.slice(1, path.length);
      stringPath += '["' + path.join('"]["') + '"]';
      console.log(eval(stringPath));

      return stringPath;
    }
  },
  methods: {
    evaluate(string){
      return eval(string);
    },
    changeOption: methods.changeOption,
    addElement: methods.addElement,
    removeElement: methods.removeElement,
    handle(path, value, type){
      let thisType = typeof(this.data);
      if(thisType == 'number') thisType = 'string';
      if(thisType == type) methods.changeOption(path, `${value}`);
    }
  },
  template: `
    <div class="input-group" v-if="typeof(data) != 'object'">
      <div class="input-group-prepend">
        <span class="input-group-text">{{datakey}}</span>
      </div>
      <input
        class="form-control"
        :type="(typeof(data) == 'boolean')? 'checkbox': 'text'"
        :debug="typeof(data)"
        :value="data"
        :checked="data"
        @input="handle(newPath, $event.target.value, 'string')"
        @change="handle(newPath, $event.target.checked, 'boolean')"
      />
      <div class="input-group-append" v-if="append">
        <span class="input-group-text">{{append}}</span>
      </div>
    </div>
    <div v-else class="accordion">
      <div class="card">
        <div class="card-header">
          <h2 class="mb-0">
            <button v-if="datakey.constructor.name == 'Number'" class="btn btn-link" type="button" data-toggle="collapse" :data-target="'#' + path.join('') + datakey" >
              {{datakey}}
            </button>
            <button v-else class="btn btn-link" type="button" data-toggle="collapse" :data-target="'#' + datakey" :debug="datakey.constructor.name">
              {{datakey}}
            </button>
          </h2>
        </div>
      </div>
      <div :id="(datakey.constructor.name == 'Number'? path.join(''): '') + datakey" :class="(datakey == 'options'? 'show': '') + ' panel-collapse collapse'">
        <div class="card-body">
          <inputgroup
          v-for="(option, key, index) in data"
          :datakey="key"
          :index="index"
          :data="option"
          :path="newPath"
          ></inputgroup>
          <div v-if="data.constructor.name == 'Array'">
            <button type="button" class="btn btn-success" @click="addElement(newPath)">
              Add element
            </button>
            <button type="button" class="btn btn-outline-danger" @click="removeElement(newPath)">
              Remove element
            </button>
          </div>
        </div>
      </div>
    </div>
  `
});
