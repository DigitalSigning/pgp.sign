function saveTextAsFile(textToWrite, fileNameToSaveAs) {
	var textFileAsBlob = new Blob([textToWrite], { type: "text/plain" });

	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null) {
		// Chrome allows the link to be clicked without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	} else {
		// Firefox requires the link to be added to the DOM before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}

	downloadLink.click();
}

function passwordChecker(pwd) {
	var strongRegex = new RegExp(
		"^(?=.{10,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$",
		"g"
	);
	var mediumRegex = new RegExp(
		"^(?=.{8,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$",
		"g"
	);
	var enoughRegex = new RegExp("(?=.{8,}).*", "g");
	if (pwd.length == 0) {
		return '';
	} else if (false == enoughRegex.test(pwd)) {
		return '<span style="color:red">Very Weak!</span>';
	} else if (strongRegex.test(pwd)) {
		return '<span style="color:green">Strong!</span>';
	} else if (mediumRegex.test(pwd)) {
		return '<span style="color:orange">Medium!</span>';
	} else {
		return '<span style="color:red">Weak!</span>';
	}
}
