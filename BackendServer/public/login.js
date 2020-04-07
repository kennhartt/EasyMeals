function processLogin(username,password){
	$.ajax({
		url: '/api/user/login',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify({username,password}),
		success: function(res){
			localStorage.setItem("userInfo",JSON.stringify(res));
			window.location.href = "index.html";
		},
		error: function(res) {
			alert(res.responseText);
		}
		
	})	
}