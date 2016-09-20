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
    
    self.visibility1 = ko.observable(false);
    self.visibility2 = ko.observable(false);
    self.visibility3 = ko.observable(false);
    self.visibility4 = ko.observable(false);
    self.visibility5 = ko.observable(false);
    self.visibility6 = ko.observable(true);
    self.visibility7 = ko.observable(true);
    
    self.bookdata = ko.observableArray();
    self.authordata = ko.observableArray();
    
    self.getlist=function(){
        $('#editauthorform').bootstrapValidator("resetForm",true); 
        self.visibility1(true);
        self.visibility7(false);
        self.visibility6(false);
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
    
    self.homepage=function(){
        self.visibility6(true);
        self.visibility7(true);
        self.visibility1(false);
        self.visibility4(false);
        self.visibility5(false);
    }
    
    //Function to add an author
    self.addauthor=function(){         
        $.ajax({
            url: 'http://172.27.12.104:3000/author/new',
            type: "post",
            contentType:'application/json',
            data: ko.toJSON({
				"empid": self.empid,   "name": self.name,   "email": self.email,   "website": self.website,   "department": self.department,   "skills": self.skills 
            }),
            success: function(data){
                $(function () {
                    $('#myModal1').modal('toggle');
                });
                self.getlist();
                $.notify("Successfully added author !!!",{delay:2000});
            },
        });
    }
    
    //Function to delete an author
    self.deleteauthor=function(author){                
        bootbox.confirm("Are you sure you want to delete the author?", function(result) {
            if (result == true) {
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
                        $.notify("Successfully deleted author !!!",{delay:2000});
                        self.getlist();  
				    },
            });
        } 
        else {
                return;
        }
        }); 
    }
    
    //Function to display author info
    self.showprofile=function(author){      
        self.visibility1(false);
        self.visibility5(true);
        self.visibility6(true);
        self.visibility4(false);
        self.visibility7(false);
        $("#editauthor").show();
        $("#deleteauthor").show();
        $("#saveauthor").hide();
        $("#inputempid").hide();
        $("#inputname").hide();
        $("#inputemail").hide();
        $("#inputwebsite").hide();
        $("#inputdepartment").hide();
        $("#skillsCheckbox1").hide();
        $("#skillsCheckbox2").hide();
        $("#skillsCheckbox3").hide();
        $("#labelempid").show();
        $("#labelname").show();
        $("#labelemail").show();
        $("#labelwebsite").show();
        $("#labeldepartment").show();
        $("#labelskills").show();
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
        self.visibility1(false);
        self.visibility5(true);
        self.visibility6(true);
        self.visibility4(false);
        self.visibility7(false);
        $("#saveauthor").show();
        $("#deleteauthor").hide();
        $("#editauthor").hide();
        $("#inputempid").show();
        $("#inputname").show();
        $("#inputemail").show();
        $("#inputwebsite").show();
        $("#inputdepartment").show();
        $("#skillsCheckbox1").show();
        $("#skillsCheckbox2").show();
        $("#skillsCheckbox3").show();
        $("#labelempid").hide();
        $("#labelname").hide();
        $("#labelemail").hide();
        $("#labelwebsite").hide();
        $("#labeldepartment").hide();
        $("#labelskills").hide();
    }
    
    //Function to save edited author details
    self.saveauthor=function(){                 
        $.ajax({
            url: 'http://172.27.12.104:3000/author/update',
            type: "put",
            contentType:'application/json',
            data: ko.toJSON({   
				"empid": self.empid,   "name": self.name,   "email": self.email,   "website": self.website  , "department": self.department  , "skills": self.skills 
            }) ,
            success: function(data){
                $.notify("Successfully saved author details !!!",{delay:2000});
                self.getlist();  
            },
        });
    }
	
    //Function to add a book
    self.addbook=function(){                    
        $.ajax({
            url: 'http://172.27.12.104:3000/book/new ',
            type: "post",
            contentType:'application/json',
            data: ko.toJSON({   
				"isbn": self.isbn,   "title": self.title,   "author": self.author,   "price": self.price,   "availableOn": self.availability
            }),
            success: function(data){
                $(function () {
                    $('#myModal').modal('toggle');
                });
                self.getlist();
                $.notify("Successfully added book !!!",{delay:2000});
            },
        });
    }
    
    //Function to delete book
    self.deletebook=function(){            
        bootbox.confirm("Are you sure you want to delete the book?", function(result) {
            if (result == true) {
            $.ajax({
                url: 'http://172.27.12.104:3000/book/remove',
                type: 'DELETE',
                data: { 
				    "isbn": self.bookdata()[self.booklocation()].isbn 
				} ,
                success: function(data){
                    $.notify("Successfully deleted book !!!",{delay:2000});
                    self.getlist(); 
                },
            });
        } 
        else {
            return;
        }
        }); 
    }
    
    //Function to edit book info
    self.editbookdetails=function(){
        self.visibility1(false);
        self.visibility5(false);
        self.visibility6(true);
        self.visibility4(true);
        self.visibility7(false);
        $("#savebook").show();
        $("#deletebook").hide();
        $("#editbook").hide();
        $("#inputisbn").show();
        $("#inputtitle").show();
        $("#inputauthor").show();
        $("#inputprice").show();
        $("#inputavailability").show();
        $("#availabilityCheckbox1").show();
        $("#availabilityCheckbox2").show();
        $("#availabilityCheckbox3").show();
        $("#labelisbn").hide();
        $("#labeltitle").hide();
        $("#labelauthor").hide();
        $("#labelprice").hide();
        $("#labelavailability").hide();
    }
	
    //Function to save edited book details
    self.savebook=function(){           
        $.ajax({
            url: 'http://172.27.12.104:3000/book/update',
            type: "put",
            contentType:'application/json',
            data: ko.toJSON({   
                "isbn": self.isbn,   "title": self.title,   "author": self.author,   "price": self.price,   "availableOn": self.availability 
            }),
            success: function(data){
                $.notify("Successfully saved book details !!!",{delay:2000});
                self.getlist();   
            },
        });
    }
    
    //Function to display book info
    self.bookinfo=function(book){  
        self.visibility1(false);
        self.visibility5(false);
        self.visibility4(true);
        self.visibility6(true);
        self.visibility7(false);
        $("#savebook").hide();
        $("#editbook").show();
        $("#deletebook").show();
        $("#inputisbn").hide();
        $("#inputtitle").hide();
        $("#inputauthor").hide();
        $("#inputprice").hide();
        $("#inputavailability").hide();
        $("#availabilityCheckbox1").hide();
        $("#availabilityCheckbox2").hide();
        $("#availabilityCheckbox3").hide();
        $("#labelisbn").show();
        $("#labeltitle").show();
        $("#labelauthor").show();
        $("#labelprice").show();
        $("#labelavailability").show();
        var context = ko.contextFor(event.target);
        self.booklocation(context.$index());
        self.isbn(book.isbn);
        self.title(book.title);
        self.author(book.author);
        self.price(book.price);
        self.availability(book.availableOn);
    }
};
ko.applyBindings(new viewModel());

//FORM VALIDATIONS 
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
});

$('#myModal1').on('shown.bs.modal', function() {
     $("#submitauthor").prop('disabled',true);
});
                           
$('#myModal').on('hidden.bs.modal', function () {
    $('#newbook').formValidation('resetForm', true);
});

$('#myModal').on('shown.bs.modal', function() {
     $("#submitbook").prop('disabled',true);
});

$('#editauthorform').formValidation({
    framework: 'bootstrap',
    excluded: ':disabled',
    icon: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
        email: {
            validators: {
                emailAddress: {
                    message: 'The value is not a valid email address'
                },
            }
        }
    }
});
