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
  <h2> Please select customer group in this page </h2>
  <div class="container-fluid">
      <div class="row">
          <div class="col-md-4">
              <h5>Groups</h5>
              <div class="list-group" >
                <a href='#' class="list-group-item" v-for="group in custgroups">
                    <h4 class="list-group-item-heading">{{ group.name }}</h4>
                    <p class="list-group-item-text">{{ group.description }}</p>
                </a>
              </div>
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
    custgroups : [
      {id:1,name:"group-books-inside",description:"group for books sellers"},
      {id:2,name:"group-clothes",description:"group for clothes sellers"},
      {id:3,name:"group-electronics",description:"group for electron sellers"}
    ],
    customers : [
      {id:1,name:"Mr Hai",email:"test@139.com"},
      {id:2,name:"Mr Zhang",email:"daf@139.com"},
      {id:3,name:"Mr Wang",email:"dgad@139.com"},
      {id:4,name:"Mr Li",email:"lizhang@139.com"}
    ]
  }
},
methods: {
  select_group: function() {
  }
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
})

const app = new Vue({
  router,
  data: {
    
    message : "see my hello test",
    
  },
  methods: {
    sample_method: function() {
    }
}

}).$mount('#app')

// 