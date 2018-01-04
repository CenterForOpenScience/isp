javascript:(function(){
	function getRandomInt(min, max) {
		min = Math.ceil(min);max = Math.floor(max);return Math.floor(Math.random() * (max - min)) + min;
	}
	var radioElements = document.getElementsByClassName("isp-radio-group");
	for (var i=0; i<radioElements.length; i++){
		childAmount = radioElements[i].children.length;
		randomNum = getRandomInt(0,childAmount);
		radioElements[i].children[randomNum].click();
	}
	var inputElements = document.getElementsByTagName("input");
	for (var i=0; i<inputElements.length; i++) {
		if(inputElements[i].getAttribute('type') == 'text'){
			inputElements[i].click();
			inputElements[i].value = 'autoFill';
			inputElements[i].focus();
		}
	}
	var textElements = document.getElementsByClassName('ember-text-area');
	for (var i=0; i<textElements.length; i++) {
		textElements[i].click();
		textElements[i].value = 'autoFill';
		textElements[i].focus();
	}
})();

