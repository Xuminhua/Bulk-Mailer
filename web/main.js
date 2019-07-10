$(document).ready(function () {

eel.expose(say_hello_js);               // Expose this function to Python
function say_hello_js(x) {
    console.log("Hello from " + x);
}

say_hello_js("Javascript World!");

eel.sum_test(3,4)()
  .then( (response)  => {
    console.log(response);
  }, (error) => {
    console.log(error)
  }
  )

  
})