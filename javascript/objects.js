//	Create a variable, name it animal, and assign it an object literal.
var animal={'noise':"roar"};
console.log(animal);

//Add a property with Dot notation
Object.defineProperty(animal,'username',{enumerable:true,value:"Daffy Duck"});
console.log(animal);

//Add a property with Bracket notation
var tagline='tagline';
animal[tagline]="Yippeee";
console.log(animal);

//Add noisesarray to the object
var noisearray=["sneeze","bark","chirp"];
Object.defineProperty(animal,'noises',{enumerable:true,value:noisearray});
console.log(animal);

var count=0;
//Loop through properties of animal object and count the number of properties
for(var prop in animal)
{
	console.log("animal." + prop + " = " + animal[prop]);
	count++;
	if(prop=="username")           //If property is username print the message
	{
		var string='Hi my name is '+animal.username;
		return string; 
	}
	if(prop=="tagline")           //If property is tagline print the message
	{
		console.log('I like to say '+animal.tagline) 
	}
}

