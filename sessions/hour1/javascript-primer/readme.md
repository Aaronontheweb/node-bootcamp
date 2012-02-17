# Quick overview of JavaScript

## Variables
- can start with a-z,A-Z, and "_"
- Weakly typed, as shown in the example below:

```JavaScript	
	var x = 5; //this just became an integer
	x = "seven"; //this just became a string
	//note that these are still typed
	//you just don't have to tell JavaScript what the type is

	var b; //has default value of undefined
	b = true; //assigning boolean literal
	b = false;
```

- accountNumber != AccountNumber
- types: integers, floating point, boolean, string, array

## Functions

- Functions in JavaScript are written very much like that of other languages, such as PHP:

```JavaScript
	function fakemathfunction(a,b){
		a++;
		b = b+3;
		return a * b;	
	}

	var c = fakemathfunction(4,5);
	//functions are objects in JavaScript and are assignable
	var fmf = fakemathfunction;
	var d = fmf(5,6);
	
	//functions can be passed to other functions
	function callafunction(f) {
		return f(7,8);
	}
	var e = callafunction(fakemathfunction);
	
	//functions can be passed anonymously
	var f = callafunction( function(a,b) {
		return a+b;
	});
```

## Control Flow
- control flow is like most other languages as well

```JavaScript
    var a = true, b = false;
    if (b) {
        alert("you will never see this");
    }
    else if (a) {
        alert("you will always see this");
    }
    else {
        alert("you won't see this, either");
    }
    
    while (a) {
        alert("over and over");
		break; // breaks out of the loop
    }

    do {
        alert("over and over");
        break;
    } while (a);
	
    for (var i = 0; i<3; i++) {
        alert ('number of times: ' + (i+1));
    }
```

## Objects
- "special" variable that can have properties
- create by using keyword new on a function
- use keyword this to reference properties explicitly inside functions

```JavaScript
	function customerobject() {
		this.id = 0;
		this.name = "default";
	}
		
	var mynewcustomer = new customerobject(); 
	mynewcustomer.id = 123456;
	mynewcustomer.name = "John Doe";
	
	// or do this ...
	var obj = {id: 234567, name: "Jane Doe"};

	//JavaScript uses "duck typing" 
	//so obj could be used anywhere a customerobject was expected
```
- technically, there's no such thing as a class in JavaScript!
- but you can add "methods" in various ways:

```JavaScript
    function foo() {
        this.greeting = "hey";
        this.Hello = function() {
            return this.greeting;
        }
    }
    
    foo.prototype.Howdy = function () {
        return this.greeting;
    };
```

- objects are extremely flexible in JavaScript

```JavaScript
	// you can create an "empty" object
	var o = new Object();
	// you can add properties to an object at any time
	o.name = "Judy Doe"
	o.SayHello = function() {
		return this.name;
	};
	//special syntax lets you loop through all properties
    o.id = 25;
    o.foo = "bar";
    var z;
    for (z in o) {
        alert(z + ': ' + o[z]); // access properties with []
								// like . but can be referenced by variable
    }
```

## Arrays
- Arrays are a built-in object type

```JavaScript	
	var myArray = new Array();
	var yourArray = new Array(7, 14, "six"); // elements don't have to have same type
	var hisArray = [];
	var herArray = [1, true, 16.7, "howdy", yourArray];
	
	myArray[14] = "yup" // access using square brackets
						// arrays expand as needed and can be "sparse"
	var text = myArray[14];
	
    myArray['wow'] = 'wee'; //index doesn't have to be integer 
    text = myArray['wow'];
```

- "for .. in" works for arrays, too

```JavaScript	
    var x = [2, 7, "foo"];
    x[17] = "bar";
    var z;
    for (z in x) {
        alert(z + ': ' + x[z]);
    }
```

## JavaScript event model and callbacks

```JavaScript
// define function with the callback argument
function fakemathfunction(a, b, callback) {
      a++;
      b = b+3;
      var c = a * b;
      callback(c);
}

// call the function
fakemathfunction(5, 15, function(num) {
console.log("callback: " + num);
});
```

## Closures and passing arguments
- closure is a special type of function 
- can be passed around like an object
- values of variables in scope persist after the function was accessed

```JavaScript

function firstfunction(secondfunction) {
        secondfunction("changed value");
    }

    function test() {
        
        var value = "original value";

        alert(value); //first alert showing string 'original value'

        firstfunction(function(externalValue) {
            value = externalValue;
        });

        alert(value);  //second alert showing string 'changed value'
    }   
```

## JavaScript for Node.JS
- No cross-browser issues - you know it's going to be the V8 engine
- Not a client - No DOM!

```JavaScript
	//where would this go?
	alert("huh?");
	
	//none of these exists on the server
	window
	document.domain
	document.cookie
	document.body
	// no document . anything!
	// or any other DOM object ...
	// (event, HTMLElement, Body, etc.)
```
- Node has different idioms for these types of things

## Node.JS patterns for functions 

- Node uses various modules that people have written for common tasks

```JavaScript
	//Add modules by declaring variables
	//C'mon - use the same variable name as the module!
	var http = require("http");
	var url = require("url");
	
	var port = process.env.PORT; //some idioms are platform-specific 
								 //(determining port to listen on, in this case)
	//Node includes its own http server
	http.createServer(function(req,res) { //pass an anonymous function with request
										  //and response parms to createServer
										  //that function will be called on every 
										  //http request (that's the "event")
		res.writeHead(200, { 'Content-Type': 'text/plain' }); 
										  //that function calls methods on the response object
		res.end('Hello World'); //ultimately, Hello World gets sent to the browser
	}).listen(port); //the anonymous object returned from createServer 
					 //doesn't do anything until you call listen on it
```

- Every http request gets request object and response object

```JavaScript
	//We can make the event handler for the http request explicit
	function onRequest(request, response) {
		response.writeHead(200, { 'Content-Type': 'text/plain' });
		response.end('Hello World');
	}
	http.createServer(onRequest).listen(port);
```

- This will look different, depending on what libraries you use, but ultimately, node "wakes up" and calls a function 
(perhaps anonymous, perhaps not) every time an http request comes in. That function is expected to have two 
parameters (regardless of what they are named) - a request object and a response object - those objects are
defined in the http module.
