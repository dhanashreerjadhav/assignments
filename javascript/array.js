//Create an array		
var noiseArray=["quack","roar"];							
document.writeln("Elements of noiseArray : ");
document.writeln(noiseArray);
document.writeln("<br>");
document.writeln("<br>");

//Using a native array method
noiseArray.unshift("sneeze");						
document.writeln("Elements of noiseArray when element added to the front : ");
document.writeln(noiseArray);
document.writeln("<br>");
document.writeln("<br>");

noiseArray.push("chirp");
document.writeln("Elements of noiseArray when element added at the end : ");
document.writeln(noiseArray);
document.writeln("<br>");
document.writeln("<br>");

//Using Bracket Notation
var add="bark";
var length=noiseArray.length;
noiseArray[length]=add;
document.writeln("Elements of noiseArray when element added at the end using bracket notation : ");
document.writeln(noiseArray);
document.writeln("<br>");
document.writeln("<br>");

//Inspect the noiseArray
document.writeln("Length of noiseArray : ");
document.writeln(noiseArray.length);
document.writeln("<br>");
document.writeln("<br>");

document.writeln("Last index of noiseArray : ");
document.writeln(noiseArray.indexOf("bark"));

//Nest the Array in the Object
var animal={username: 'DaffyDuck', tagline: 'Yippeee!', noises:noiseArray};
document.writeln("<br>");
//document.writeln(animal.noises);
console.log(animal);

//Create a variable called animals and set it equal to an empty array
var animals=[];
animals.push(animal);
console.log(animals);

//Create a variable called quackers and assign it to this example object
var quackers={ username: 'DaffyDuck', tagline: 'Yippeee!', noises: ['quack', 'honk', 'sneeze', 'growl'] };
animals.unshift(quackers);
console.log(animals);

//Create two more animal objects and add them to your animals array
animals.push({username:'David', tagline:'Yayyy',noises:['moo','chirp','bark']});
animals.push({username:'Javed', tagline:'Hello',noises:['trumpet','neigh','scream']});
console.log(animals);

//Check the length property of your array
document.writeln("<br>");
document.writeln("Length of animals collection : ");
document.writeln(animals.length);
