//Base Class:
function employee(){
                this.name="";
                this.dept="engineering";
}

//Derived class:level 1
function manager(){
                employee.call(this);
                this.reports=[];
}
manager.prototype=new employee();

function engineer(){
                employee.call(this);
                this.projects=[];
                
}
engineer.prototype=Object.create(employee.prototype);

//Derived class:level 2:- derived from the engineer class

function software(){
                engineer.call(this);
                this.paypackage="4 lpa";
                this.timings="8";
                this.dept="development";
}
software.prototype=Object.create(engineer.prototype);

function quality(){
                engineer.call(this);
                this.paypackage="7";
                this.timings="9";
                this.dept="testing";
}
quality.prototype=Object.create(engineer.prototype);


//Objects:

var Amol=new employee(); //Employee
var Brian=new manager(); //manager
var Chetan=new engineer(); //engineer
var Diksha=new software(); //software
var Esha=new quality(); //quality
