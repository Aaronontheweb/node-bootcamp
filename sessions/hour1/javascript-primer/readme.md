# Quick overview of JavaScript

## Variables
- can start with a-z,A-Z, and "_"
- Weakly typed, as shown in the example below:

```JavaScript	
	var x = 5; //this just became an integer
	x = "seven"; //this just became a string
```

- accountNumber != AccountNumber
- types: integers, floating point, boolean, string, array, 

		
## Objects
- "special"/customized variable
- create by using keyword new
- inside the function, keyword this 

```JavaScript
	function customerobject() {
		this.id = 0;
		this.name = "default";
	}
		
	var mynewcustomer = new customerobject(); 
	mynewcustomer.id = 123456;
	mynewcustomer.name = "John Doe";
```

## Typing system
-  (covered in variables and objects?)

## Functions

- Functions in JavaScript are written very much like that of other languages, such as PHP:
```JavaScript
	function fakemathfunction(a,b){
		a++;
		b = b+3;
		return a * b;	
	}

	var c = fakemathfunction(4,5);

```
- but functions are objects in JavaScript

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


## Node.JS patterns for functions (every single request gets req object, resp object, etc)


## No DOM!
