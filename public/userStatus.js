var status = false;
function getUserStatus(){
	if(localStorage.getItem("userInfo")!=null){
		status = true;
		return status;
	}else{
		status = false;
		return status;
	}

}

function processLogOut(){
	localStorage.removeItem("userInfo");
	

}