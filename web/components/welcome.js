const Home = { 
  name : "home",
  template: ` 
<div class="jumbotron">
  <h1 class="display-4">Sending Email!</h1>
  <p class="lead">This is a simple email tool, help you manage customer information and sending customerlize email to them.</p>
  <hr class="my-4">
  <p>Any question, feel free to contact minhux@amazon.com please</p>
  <a class="btn btn-primary btn-lg" href="#/customer" role="button">Start</a>
</div> 
`};


// Vue.component('cat-list',{
//   props: ['cats'],
//   template: `
//   <ul>
//       <li v-for='cate in cats'> {{cate}}</li>
//   </ul>
//   `
// })

const customer = { template: `
<div>
<ul class="list-group" >
  <li class="list-group-item" v-for="group in custgroups" v-bind="group.id">{{group.name}}</li>
</ul>
</div>
` };

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
  el:'#app',
  router,
  data() {
    return {
    test : "he2",
    custgroups =  [
      {id:1,name:'mail-books'},
      {id:2,name:'mail-shoes'},
      {id:3,name:'mail-cars'}
    ]
  }
  } ,
  methods: {
    go_to_href: function (href) {
      window.location.href = href
    }
  },

  mounted: function() {


  }
})

// .$mount()