  function viewModel() {
    
    //AJAX call to get book list
    $.ajax({
        url: 'http://172.27.12.104:3000/book/list',          
        dataType: 'json',
        success: function (data) {
            console.log(data);
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
    
    //Function to add an author
    self.addauthor=function(){                      
        $.ajax({
            url: 'http://172.27.12.104:3000/author/new',
            type: "post",
            data: {   
				"empid": self.empid,   "name": self.name,   "email": self.email,   "website": self.website,   "department": self.department,   "skills": self.skills 
            },
            success: function(data){
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
                        location.reload();   
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
        self.visibility3(true);
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
        self.visibility3(false);
        self.visibility5(true);
    }
    
    //Function to save edited author details
    self.saveauthor=function(){                 
        console.log(self.author());
        $.ajax({
            url: 'http://172.27.12.104:3000/author/update',
            type: "put",
            data: {   
				"empid": self.empid,   "name": self.name,   "email": self.email,   "website": self.website  , "department": self.department  , "skills": self.skills 
            } ,
            success: function(data){
                location.reload();   
            },
        });
    }
	
    //Function to add a book
    self.addbook=function(){                    
        console.log(self.availability());
        $.ajax({
            url: 'http://172.27.12.104:3000/book/new ',
            type: "post",
            data: {   
				"isbn": self.isbn,   "title": self.title,   "author": self.author,   "price": self.price,   "availableOn": self.availability 
            },
            success: function(data){
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
                    location.reload();   
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
        console.log(self.availability()+self.isbn()+self.title()+self.author()+self.price());
        $.ajax({
            url: 'http://172.27.12.104:3000/book/update',
            type: "put",
            data: {   
                "isbn": self.isbn,   "title": self.title,   "author": self.author,   "price": self.price,   "availableOn": self.availability 
            },
            success: function(data){
                console.log(data);
                //location.reload();   
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
        self.isbn(book.isbn)
        self.title(book.title);
        self.author(book.author);
        self.price(book.price);
        self.availability(book.availableOn);
    }
               
};
ko.applyBindings(new viewModel());


$("#newbook").validate({
                rules: {
                    inputisbn: {
                        required: true
                    },
                    inputtitle:{
                        required: true,
                    },
                    inputauthor: {
                        required: true
                    },
                    inputprice: {
                        required: true,
                    },
                },
                submitHandler: function(form) {
                     form.submit();
                 }
      });