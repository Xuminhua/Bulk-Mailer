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
  <div class="container-fluid">
  <div class="row-fluid">
    <div class="col-sm-4">
    <h5>Groups</h5>
      <div class="list-group  column-list" >
      <div>  
      <a href='#' v-for="group in custgroups"  class="list-group-item "  :key="group.id" 
      style="height:60px"  @click.prevent="selectGroup(group)"  
      :class="groupClass(group.id)" >
        <div style="float:left" >  
        <h4 class="list-group-item-heading">{{ group.groupname }}</h4> 
        <p class="list-group-item-text"><i>{{ group.groupdesc }}</i></p>
        </div>
        <div style="text-align:right"> 
        <button @click="delgroup(group)" style=""> 
          <i class="glyphicon glyphicon-trash"></i>
          </button>
        </div>
        </a>
      </div>
      </div>    
        <form class="form-inline">
        <div class="form-group">
          <label class="sr-only" >Group Name</label>
          <input type="text" class="form-control"  placeholder="Group Name" v-model="newgroup.groupname">
        </div>
        <div class="form-group">
          <label class="sr-only" >Group Description</label>
          <input type="text" class="form-control"  placeholder="Group Description" v-model="newgroup.groupdesc" >
        </div>
        <button @click="addgroup" type="submit" class="btn btn-default">Add Group</button>
      </form>
      
      </div>
    </div>
    <div class="col-sm-8">
    <h5> Group details</h5>

    <p  v-if="!selectedIndex"> please select a group in the left to show details</p>
    
    <div v-if="selectedIndex" class="table-responsive">
    <table class="table table-striped" >
    <thead>
      <tr>
        <th>#</th>
        <th>Email</th>
        <th>Corp Name</th>
        <th>Customer Name</th>
        <th></th>
        </tr>
    </thead>
    <tbody>
      <tr v-for="cust in customers">
        <td>{{ cust.customer_id }}</td>
        <td>{{ cust.email }}</td>
        <td>{{ cust.corpname }}</td>
        <td>{{ cust.customername }}</td>
        <td> <button @click="delcustomer(cust)" style=""> 
        <i class="glyphicon glyphicon-trash"></i>
        </button></td>
      </tr>
    </tbody>
  </table>  
</div>



<div v-if="selectedIndex">
<ul class="nav nav-tabs">
  <li role="presentation" @click.prevent="show_add_cust('one')"  
  :class="addoneClass"><a >Add One</a></li>
  <li role="presentation" @click.prevent="show_add_cust('many')" 
  :class="addmanyClass"><a >Upload from a file</a></li>
</ul>
</div>

<form class="form-inline" v-if="selectedIndex && addoneClass">
 <div class="form-group" style="padding-top:10px">
    <label class="sr-only" >Email</label>
    <input type="email" class="form-control" placeholder="Email" v-model="newcustomer.email">
  </div>
  <div class="form-group">
    <label class="sr-only" >Corp Name</label>
    <input type="text" class="form-control"  placeholder="Corp Name" v-model="newcustomer.corpname" >
  </div>
  <div class="form-group">
  <label class="sr-only" >Customer Name</label>
  <input type="text" class="form-control"  placeholder="Customer Name" v-model="newcustomer.customername" >
</div>
  <button @click="addcustomer({group_id:selectedIndex})" type="submit" class="btn btn-default">Add Customer</button>
  </form>

    <div  v-if="selectedIndex && addmanyClass" class="row" style="float:left">

    <div class="input-group" style="padding-top:10px;padding-left:20px;padding-right: 20px">
      <span class="input-group-addon" id="basic-addon3">Path for your uploading file</span>
      <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" v-model="cust_file_path" placeholder='C:/Users/minhux/Downloads/Book2.csv'>
    </div>
    <div style="padding-top:10px;padding-left:20px;padding-right: 20px">
      <button @click="addcustomers(cust_file_path,selectedIndex)" type="submit" class="btn btn-default">Import Customer...</button>


    <div>
  </div>

  </div>
  </div>
</div>
</div>
`,
data() {
  return {
    //  selectedIndex: null
    cust_file_path: "",
    addoneClass : "",
    addmanyClass : ""
  }
},
methods: {
...Vuex.mapActions([
  'init_custgroups',
  'selectGroup',
  'addgroup',
  'delgroup',
  'init_customers',
  'delcustomer',
  'addcustomer',
  // ...
]),
groupClass(index) {
    let groupClass = ''
    if (this.selectedIndex === index ) {
      groupClass = 'active'
    } 
    // console.log(answerClass)
    return groupClass
},
get_file_path(e) {
  this.cust_file_path = e.target.files
},
show_add_cust(e){
  if(e == "one"){
    this.addoneClass = "active"
    this.addmanyClass = ""
  }
  else {
    this.addoneClass = ""
    this.addmanyClass = "active"
  }
},
addcustomers(filepath,selectedIndex) {
  eel.read_csv(filepath)()
    .then((resp) => {
    console.log(resp);
    newcustomers = JSON.parse(resp)

    for(var i=0; i<newcustomers.length;i++) {
      newcustomers[i]['group_id'] = selectedIndex
    }
    eel.insert_customers(newcustomers)()
      .then((resp) => {
        console.log(resp);
        // bootbox.alert(resp);
        // console.log(selectedIndex)
        alert(resp)
        this.init_customers({'group_id':selectedIndex});
      }) 
  })
}

},


computed: {
  ...Vuex.mapState([
    'custgroups',
    'newgroup',
    'customers',
    'newcustomer',
    'selectedIndex'
  ])
},
watch: {
},

created() {
  this.init_custgroups();
  // this.selectGroup(this.custgroups[0]);
  // this.init_customers(this.custgroups[0]);
},
mounted() {
 
  }
};


const MailItem = {
  template: `
 <div style="padding:20px">
  <H3>Mail Content Setting</H3>
  <div style="border:1px solid #eee"></div>
  <form style="padding-top:20px">
  <div class="form-group">
    <label for="exampleInputEmail1" >Mail Subject</label>
    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Mail Subject" v-model='mailitem.subject'>
  </div>

  <div class="form-group">
    <label for="exampleInputFile">Add Attachment Path</label>
    <ul>  
    <li v-for="attach in attachments">{{attach}}</li>
    </ul>
    </div>

  <form class="form-inline">
    <div class="form-group">
      <label class="sr-only" >Attachment Path</label>
      <input type="text" class="form-control"  placeholder="Attachment Path" v-model="mailitem.newAttachment">
    </div>
    <button @click="addattachment(mailitem.newAttachment)" type="submit" class="btn btn-default">Add Attachment</button>
</form>


  <div class="form-group">
    <label for="body">Mail Content</label>
    <textarea class="form-control" rows="10" v-model='mailitem.html_body'></textarea>
  </div>
  <a class="btn btn-primary btn-md" href="#/preview" >Next</a>
</form>
</div>
  `,
 
methods: {
  ...Vuex.mapActions([
    'addattachment'
  ])
},

  computed: {
    ...Vuex.mapState([
        'mailitem',
        'attachments'
    ])
  }

};


const Preview = { template: `
<div>
<div style="padding-left:20px;padding-right:20px">
  <nav aria-label="...">
    <ul class="pager">
      <li class="previous"><a href="#"><span aria-hidden="true">&larr;</span> Previous</a></li>
      <li class="next"><a href="#">Next <span aria-hidden="true">&rarr;</span></a></li>
    </ul>
  </nav>
</div>
<div style="padding-left:20px;padding-right:20px">
  <H3>Mail Preview</H3>
  <div style="border:1px solid #eee"></div>
  <form style="padding-top:20px">
  <div class="form-group ">
    <label for="exampleInputEmail1">Mail Subject</label>
    <p> {{mailitem.subject}}</p>
  </div>


  <div class="form-group">
  <label for="exampleInputEmail1">Mail Body Preview</label>
  <div v-html="mailitem.html_body">
  </div>
  </div>
  <a class="btn btn-primary btn-md" href="#/preview" >Send All Mail To</a>
</form>

<div class="form-group">
<p> 准备发送邮件{{customers.length}}个客户: </p> 
<span v-for="cust in customers"> {{cust.email}} |  </span>
</div>
</div>
</div>

`
,
data() {
  return{

  }
},
  computed: {
    ...Vuex.mapState([
        'mailitem',
        'customers'
    ])
  }
};

const routes = [
  { path: '/', component: Home } ,
  { path: '/home', component: Home },
  { path: '/customer', component: customer},
  { path: '/mailitem', component: MailItem },
  { path: '/preview', component: Preview }

]

const router = new VueRouter({
  // mode: 'history',
  routes: routes
});

const store = new Vuex.Store({
  state: {
      msg_store:'hello world',
      custgroups:[],
      newgroup:{},
      selectedIndex:null,
      customers:[],
      newcustomer:{},
      mailitem:{},
      attachments:[]
  },
  // getters放一些缓存数据，相当于compted
  getters:{

  },
  // 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
  mutations: {
     selectGroup(state,payload) {
      state.selectedIndex = payload.id;
     },
      init_custgroups(state) {
          eel.get_groups()()
          .then((resp)=>{
            state.custgroups = resp
          })                   
      },
      addgroup(state) {
        eel.insert_group(state.newgroup.groupname,state.newgroup.groupdesc)()
        .then((resp)=>{
        state.newgroup = {}
        })
      },
      delgroup(state,payload) {
        eel.delete_group(payload.id)()
        .then((resp)=>{
        console.log(resp);
        })      
      },
      init_customers(state, payload) {
        eel.get_customers(payload.group_id|payload.id)()
        .then((resp)=>{
          state.customers = resp
        }) 
      },
      delcustomer(state,payload) {
        eel.delete_customer(payload.customer_id)()
        .then((resp)=>{
        console.log(resp);
        })      
      },
      addcustomer(state) {
        eel.insert_customer(state.newcustomer.email,
                            state.newcustomer.corpname,
                            state.newcustomer.customername,
                            state.selectedIndex)()
        .then((resp)=>{
        state.newcustomer = {}
        })
      },
      addattachment(state,payload) {
        state.attachments.push(payload)
        state.mailitem.newAttachment=""
      }
  },
  // Action 提交的是 mutation，而不是直接变更状态。 通过 store.dispatch('increment',{amount:10})方法出发
  actions: {
    selectGroup(context,param) {
      context.commit('selectGroup',param)
      context.commit('init_customers',param)
    },
    init_custgroups (context) {
      context.commit('init_custgroups')
    },
    addgroup (context) {
      context.commit('addgroup');
      context.commit('init_custgroups')
    },
    delgroup (context,param) {
      context.commit('delgroup',param);
      context.commit('init_custgroups')
    },
    init_customers (context,param) {
      context.commit('init_customers',param)
    },
    delcustomer (context,param) {
      context.commit('delcustomer',param)
      context.commit('init_customers',param)
    },
    addcustomer (context,param) {
      context.commit('addcustomer');
      context.commit('init_customers',param)
    },
    addattachment (context,param) {
      context.commit('addattachment',param);
    }
  } 
});

const app = new Vue({
  router,
  store,
  strict: false,
  data: {   
    message : "see my hello test",
  },
  methods: {
    sample_method: function() {
    }
}

}).$mount('#app')


// 