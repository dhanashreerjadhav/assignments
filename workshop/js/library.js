function viewModel() {
    
    var self=this;
    self.isbn= ko.observable(" ");
    self.title= ko.observable(" ");
    self.author= ko.observable(" ");
    self.price = ko.observable(" ");
    self.availability =ko.observableArray();
    self.booklocation = ko.observable();
    
    self.empid = ko.observable(" ");
    self.name = ko.observable(" ");
    self.email = ko.observable(" ");
    self.website = ko.observable(" ");
    self.department = ko.observable(" ");
    self.skills = ko.observableArray();
    self.authorlocation = ko.observable();
    
    self.visibility1 = ko.observable(true);
    self.visibility2 = ko.observable(false);
    self.visibility3 = ko.observable(false);
    self.visibility4 = ko.observable(false);
    self.visibility5 = ko.observable(false);
    
    self.bookdata = ko.observableArray();
    self.authordata = ko.observableArray();
    
    self.homepage=function(){
        self.visibility1(true);
        self.visibility2(false);
        self.visibility3(false);
        self.visibility4(false);
        self.visibility5(false);
        //AJAX call to get book list
        $.ajax({
            url: 'http://172.27.12.104:3000/book/list',          
            dataType: 'json',
            success: function (data) {
                self.bookdata(data);
            }
        });

        //AJAX call to get author list
        $.ajax({
            url: 'http://172.27.12.104:3000/author/list',       
            dataType: 'json',
            success: function (data) {
                self.authordata(data);
            }
        });
        self.isbn(" ");
        self.title(" ");
        self.author(" ");
        self.price(" ");
        self.availability([]);
        self.booklocation();

        self.empid(" ");
        self.name(" ");
        self.email(" ");
        self.website(" ");
        self.department(" ");
        self.skills([]);
        self.authorlocation();
    }
    
    //Function to add an author
    self.addauthor=function(){         
        $.ajax({
            url: 'http://172.27.12.104:3000/author/new',
            type: "post",
            data: {   
				"empid": self.empid,   "name": self.name,   "email": self.email,   "website": self.website,   "department": self.department,   "skills": self.skills 
            },
            success: function(data){
                alert("Successfully added author !!!");
                location.reload(); 
            },
        });
    }
    
    //Function to delete an author
    self.deleteauthor=function(author){                
        var r = confirm("Are you sure you want to delete record?");
        if (r == true) {
            $.ajax({
				url: 'http://172.27.12.104:3000/author/byname',
				type: "post",
				data: {   
				    "name": author.author 
				},
				success: function(data){
				    self.empid(data.empid);
				},
            });
            $.ajax({
                    url: 'http://172.27.12.104:3000/author/remove ',
                    type: 'DELETE',
                    data: { 
				        "empid": self.empid 
				    } ,
                    success: function(data){
                        alert("Successfully deleted author !!!");
                        self.homepage();  
				    },
            });
        } 
        else {
                return;
        }
    }
    
    //Function to display author info
    self.showprofile=function(author){      
        self.visibility1(false);
        self.visibility5(true);
        $("#saveauthor").hide();
        console.log(author.author);
        $.ajax({
            url: 'http://172.27.12.104:3000/author/byname',
            type: "post",
            data: {   
                "name": author.author 
            },
            success: function(data){
                self.empid(data.empid);
                self.name(data.name);
				self.skills(data.skills);
				self.email(data.email);
				self.department(data.department);
				self.website(data.website);
            },
        });
    }
    
    //Function to edit author info
    self.editauthordetails=function(){  
        $("#saveauthor").show();
        $("#deleteauthor").hide();
        $("#inputname").prop('disabled',false);
        $("#inputemail").prop('disabled',false);
        $("#inputwebsite").prop('disabled',false);
        $("#inputdepartment").prop('disabled',false);
    }
    
    //Function to save edited author details
    self.saveauthor=function(){                 
        console.log(self.website());
        $.ajax({
            url: 'http://172.27.12.104:3000/author/update',
            type: "put",
            data: {   
				"empid": self.empid,   "name": self.name,   "email": self.email,   "website": self.website  , "department": self.department  , "skills": self.skills 
            } ,
            success: function(data){
                alert("Successfully saved author details !!!");
                self.homepage();  
            },
        });
    }
	
    //Function to add a book
    self.addbook=function(){                    
        console.log(self.availability());
        $.ajax({
            url: 'http://172.27.12.104:3000/book/new ',
            type: "post",
            //contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            data: {   
				"isbn": self.isbn,   "title": self.title,   "author": self.author,   "price": self.price,   "availableOn": self.availability
            },
            success: function(data){
                alert("Successfully added book !!!");
                location.reload();
            },
        });
    }
    
    //Function to delete book
    self.deletebook=function(){            
        console.log(self.bookdata()[self.booklocation()].isbn);
        var r = confirm("Are you sure you want to delete record?");
        if (r == true) {
            $.ajax({
                url: 'http://172.27.12.104:3000/book/remove',
                type: 'DELETE',
                data: { 
				    "isbn": self.bookdata()[self.booklocation()].isbn 
				} ,
                success: function(data){
                    alert("Successfully deleted book !!!");
                    self.homepage(); 
                },
            });
        } 
        else {
            return;
        }
    }
    
    //Function to edit book info
    self.editbookdetails=function(){    
        self.visibility2(false);
        self.visibility4(true);
    }
	
    //Function to save edited book details
    self.savebook=function(){           
        console.log(self.availability());
        $.ajax({
            url: 'http://172.27.12.104:3000/book/update',
            type: "put",
            data: {   
                "isbn": self.isbn,   "title": self.title,   "author": self.author,   "price": self.price,   "availableOn": self.availability 
            },
            success: function(data){
                alert("Successfully saved book details !!!");
                self.homepage();   
            },
        });
    }
    
    //Function to display book info
    self.bookinfo=function(book){     
        self.visibility1(false);
        self.visibility2(true);
        console.log(book);
        var context = ko.contextFor(event.target);
        self.booklocation(context.$index());
        console.log(self.booklocation());
        self.isbn(book.isbn);
        self.title(book.title);
        self.author(book.author);
        self.price(book.price);
        self.availability(book.availableOn);
    }
    
    //AJAX call to get book list
    $.ajax({
        url: 'http://172.27.12.104:3000/book/list',          
        dataType: 'json',
        success: function (data) {
            self.bookdata(data);
        }
    });
    
    
    //AJAX call to get author list
    $.ajax({
        url: 'http://172.27.12.104:3000/author/list',       
        dataType: 'json',
        success: function (data) {
            self.authordata(data);
        }
    });
};

ko.applyBindings(new viewModel());

$('#newbook').formValidation({
    framework: 'bootstrap',
    excluded: ':disabled',
    icon: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
        
    fields: {
        inputisbn: {
            validators: {
                notEmpty: {
                    message: 'ISBN is required'
                }
            }
        },
        inputtitle: {
            validators: {
                notEmpty: {
                    message: 'Title is required'
                }
            }
        },
        inputauthor: {
            validators: {
                notEmpty: {
                    message: 'Author name is required'
                }
             }
        },
        inputprice: {
            validators: {
                notEmpty: {
                    message: 'Book price is required'
                }
            }
        },
        inputavailability: {
            validators: {
                notEmpty: {
                    message: 'Book availability is required'
                }
            }
        }
    }
});

$('#newauthor').formValidation({
    framework: 'bootstrap',
    excluded: ':disabled',
    icon: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
        
    fields: {
        inputempid: {
            validators: {
                notEmpty: {
                     message: 'Employee ID is required'
                }
            }
        },
        inputname: {
            validators: {
                notEmpty: {
                    message: 'Author name is required'
                }
            }
        },
        inputemail: {
            validators: {
                notEmpty: {
                    message: 'Author email is required'
                }
            }
        },
        inputskills: {
            validators: {
                notEmpty: {
                    message: 'Author skills is required'
                }
            }
        }
    }
});

$('#myModal1').on('hidden.bs.modal', function () {
    $('#newauthor').formValidation('resetForm', true);
    location.reload();
});
                           
$('#myModal').on('hidden.bs.modal', function () {
    $('#newbook').formValidation('resetForm', true);
    location.reload();
});