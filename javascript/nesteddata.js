var animals=[];
var friends=[];
var relationships={};
var matches=[]; 
	
//Function AnimalCreator
function AnimalCreator(){
		var username=arguments[0];   //first argument to function as a value to username property.
		var species=arguments[1];	//second argument to function as a value to species property.
		var tagline=arguments[2];   //third argument to function as a value to tagline property.
		var noises=arguments[3];	//fourth argument to function as a value to noises property.
		var friends=[];            //fifth property as an empty array.
		var animal={'username':username,'species':species,'noises':noises,'tagline':tagline,'friends':friends};  //Assign values to the properties.
		return animal;    //return object.
		
	}
	
	var sheep = AnimalCreator('Cloud', 'sheep', 'You can count on me!', ['baahhh', 'arrgg', 'chewchewchew']);
	//console.log(sheep);
	var cow = AnimalCreator('Moo', 'cow', 'Yipppee!', ['mahh', 'mooo', 'booo']);
	var llama = AnimalCreator('Zeny', 'llama', 'Yeaaahh!', ['sneigh', 'bark', 'sigh']);
	
	//Animals Collection of the animal objects.
	animals=[sheep,cow,llama];
	
	//Friends array consisting of the usernames of the animals. 
	friends[0]=animals[0].username;
	friends[1]=animals[1].username;
	console.log(friends);
	
	//Relationships object consisting of the friends array.
	relationships={'friends':friends};
	console.log(relationships);
	
	//Create new property matches to the relationships object.
	Object.defineProperty(relationships,'matches',{value:matches});
	console.log(relationships);
	
	//Give friends array value to the matches property.
	relationships.matches[0]=relationships.friends[0];
    console.log(relationships);
	
	//Add the relationships object as a property to every element of the animals collection.
	for(i=0;i<animals.length;i++)
	{
		Object.defineProperty(animals[i],'relationships',{value:relationships});
	}
	console.log(animals);