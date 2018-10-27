function showPopup() { //弹出
	var objDiv = document.getElementById("popDiv");
	objDiv.style.top = "50px"; //设置弹出窗距离上边界的距离
	objDiv.style.left = "200px"; //设置弹出窗距离左边界的距离
	objDiv.style.width = "300px"; //设置弹出窗的宽度
	objDiv.style.height = "200px"; //设置弹出窗的高度
	//objDiv.style.display = "block";
	objDiv.style.visibility = "visible";
}

function hidePopup() { //关闭
	var objDiv = document.getElementById("popDiv");
	objDiv.style.visibility = "hidden";
}