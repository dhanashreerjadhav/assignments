var username=['Divya','Dhanashree','User1','User2'];
var user;
function userlogin()
{
    user=$('#username').val();
    for(var i=0;i<username.length;i++){
        if(username[i]==user){
            window.location.assign("users.html");
            break;
        }
    }
}

function listusers(){
    //console.log(user);
    for(var i=0;i<username.length;i++){
        if(username[i]!=user){
            var userl=$("<li></li>");
            //var uservalue=$("<button></button>").attr("onclick","openwindow()").attr("value",username[i]);
            var uservalue=$("<button></button>").attr("value",username[i]).attr("class","userbutton");
            uservalue.text(username[i]);
            uservalue.appendTo(userl);
            $('.userlist').append(userl);
        }
    }
}

/*function openwindow(){
    console.log($(this).attr("value"));
}*/