# Quick overview of JavaScript

## Variables
- can start with a-z,A-Z, and "_"
- Weakly typed, as shown in the example below:

```JavaScript	
	var x = 5; //this just became an integer
	x = "seven"; //this just became a string
	//note that these are still typed
	//you just don't have to tell JavaScript what the type is

	var b; //has default value of *undefined*
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
```

## Objects
- "special"/customized variable
- create by using keyword new on a function

- inside the function, keyword this 

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
	//so obj could be used anywhere a "customerobject" was expected
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
	document.domain
	document.cookie
	document.body
	// no document . anything!
	// or any other DOM object ...
	// (event, HTMLElement, Body, etc.)
```
- Node has different idioms for these types of things

## Node.JS patterns for functions (every single request gets req object, resp object, etc)



- Node uses various modules that people have written for common tasks


