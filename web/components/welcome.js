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
  <ul class="list-group" >
    <li class="list-group-item" v-for="group in custgroups"> {{ group.name }} </li>
  </ul>
</div>
`,
data: function () {
  return {
    custgroups : [
      {name:"group-books-inside"},
      {name:"group-clothes"},
      {name:"group-electronics"}
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