import eel

eel.init('web')                     # Give folder containing web files

# @eel.expose                         # Expose this function to Javascript
# def say_hello_py(x):
#     print('Hello from %s' % x)

@eel.expose
def sum_test(x,y):
    return x + y

# say_hello_py('Python World!')


# eel.say_hello_js('Python World!')   # Call a Javascript function

eel.start('hello.html')             # Start (this blocks and enters loop)