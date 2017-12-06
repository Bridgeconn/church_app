"use strict"
export default class Utilities {

	static validateEmailAndPassword(email:string, password:string){
		if(email=="" || password==""){
	     return 1;
	    }
	    
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
		if (!re.test(email)) {
			return 3;
		}

	    if(password.length < 6){
			return 4;
		}

		return 0;
	}

	static formValidationAlerts(value:number) {
		switch(value) {
			case 1:{
	        	return "Email and Password must be filled";
      		}
	        case 2:{
	        	return "Please enter a valid email and the password length is too short. Minimum Password length should be 6 characters";
	      	}
	      	case 3:{
		        return "Please enter a valid email";
	      	}
	      	case 4: {
		        return "You have entered less than 6 characters for password";
	      	}
  		}
	}
}