"use strict"
export default class Utilities {

static validateEmailAndPassword(email:string,password: string){
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
	if(email=="" || password==""){
     return 1;
    }
   	if(password.length < 6){
    	return 2;
    }
	if (!re.test(email)) {
		return 3;
	}
	return 0;
}
}