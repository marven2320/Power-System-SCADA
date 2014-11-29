$(function(){

	$('form').submit(function(){

		if (validateUsername() && validateUserPassword()){
			alert("Success!");
		}

		function validateUsername(){
			if($("#username").val().length ==0) {
				alert("Username cannot be emptied!");
				return false;
			}
			else {
				return true;
			}
		}

		function validateUserPassword () {
			if($("#password").val().length ==0) {
					alert("Password cannot be emptied!");
					return false;
				}
				else {
					return true;
				}
			}
		return false;
	})
})