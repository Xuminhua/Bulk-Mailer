const Home = { template: ` 
<div class="jumbotron">
  <h1 class="display-4">Sending Email!</h1>
  <p class="lead">This is a simple email tool, help you manage customer information and sending customerlize email to them.</p>
  <hr class="my-4">
  <p>Any question, feel free to contact minhux@amazon.com please</p>
  <a class="btn btn-primary btn-lg" href="#/customer" role="button">Start</a>
</div> 
`};

// ---below is for customer page----------------------------------------------

const customer = { 
  // props: ['custgroups'],
  template: `
<div >
  
  <div class="container-fluid">
  <h2> Please select customer group in this page </h2>    
    <div class="row">
          <div class="col-md-4">
              <h5>Groups</h5>
              

<div class="list-group" >
  <a href='#' class="list-group-item" v-for="group in custgroups" v-bind:key="group.id">
    <h4 class="list-group-item-heading">{{ group.groupname }}</h4> 
    <p class="list-group-item-text"><i>{{ group.groupdesc }}</i></p>

    <button @click="delgroup(group)"> 
    <i class="glyphicon glyphicon-trash"></i>
    </button>
  </a>
</div>    


              <input type="text" v-model="newgroup.groupname" >
              <input type="text" v-model="newgroup.groupdesc" >
              <button @click="addgroup" type="button" class="btn btn-default">Add</button>
          </div>
          <div class="col-md-8">
              <h5>Group details</h5>
              <table class="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Email</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="cust in customers">
                  <td>{{ cust.id }}</td>
                  <td>{{ cust.email }}</td>
                  <td>{{ cust.name }}</td>
                </tr>
              </tbody>
      </table>  
          </div>
      </div>
  </div>
</div>
`,
data: function () {
  return {
    customers : [
      {id:1,name:"Mr Hai",email:"test@139.com"},
      {id:2,name:"Mr Zhang",email:"daf@139.com"},
      {id:3,name:"Mr Wang",email:"dgad@139.com"},
      {id:4,name:"Mr Li",email:"lizhang@139.com"}
    ]
  }
},
methods: {
...Vuex.mapActions([
  'init_custgroups',
  'addgroup',
  'delgroup'
  // ...
])
},


computed: {
  ...Vuex.mapState([
    'custgroups',
    'newgroup'
  ])
},
created() {
  this.init_custgroups();
},
mounted() {
 
  }
};


const Bar = { template: '<div>bar</div>' }

const routes = [
  { path: '/', component: Home } ,
  { path: '/home', component: Home },
  { path: '/customer', component: customer },
  { path: '/bar', component: Bar }

]

const router = new VueRouter({
  // mode: 'history',
  routes: routes
});

const store = new Vuex.Store({
  state: {
      msg_store:'hello world',
      custgroups:[],
      newgroup:{}
  },
  // getters放一些缓存数据，相当于compted
  getters:{

  },
  // 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
  mutations: {
      init_custgroups(state) {
          state.msg_store = '111';
          eel.get_groups()()
          .then((resp)=>{
            state.custgroups = resp
          }) 
      },
      addgroup(state) {
        eel.insert_group(state.newgroup.groupname,state.newgroup.groupdesc)()
        .then((resp)=>{
        // state.custgroups.push(resp);
        // init_custgroups();
        state.newgroup = {}
        })
      },
      delgroup(state,payload) {
        eel.delete_group(payload.id)()
        .then((resp)=>{
        console.log(resp);
        const groupIndex = state.custgroups.indexOf(payload);
        state.custgroups.splice(groupIndex, 1);
        // init_custgroups()
        })
      
      }
  },
  // Action 提交的是 mutation，而不是直接变更状态。 通过 store.dispatch('increment',{amount:10})方法出发
  actions: {
    init_custgroups (context) {
      context.commit('init_custgroups')
    },
    addgroup (context) {
      context.commit('addgroup')
      context.commit('init_custgroups')
    },
    delgroup (context,param) {
      context.commit('delgroup',param);
    }
  } 
});

const app = new Vue({
  router,
  store,
  data: {
    
    message : "see my hello test",
    
  },
  methods: {
    sample_method: function() {
    }
}

}).$mount('#app')


// 