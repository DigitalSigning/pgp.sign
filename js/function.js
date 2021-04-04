function saveTextAsFile(textToWrite, fileNameToSaveAs) {
	var textFileAsBlob = new Blob([textToWrite], { type: "application/pgpsign" });

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

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
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


function readChunked(file, chunkCallback, endCallback) {
    var fileSize = file.size;
    var chunkSize = 4 * 1024 * 1024; // 4MB
    var offset = 0;
    var reader = new FileReader();
    reader.onload = function () {
        if (reader.error) {
            endCallback(reader.error || {});
            return;
        }
        offset += reader.result.length;
        chunkCallback(reader.result, offset, fileSize);
        if (offset >= fileSize) {
            endCallback(null);
            return;
        }
        readNext();
    };

    reader.onerror = function (err) {
        endCallback(err || {});
    };

    function readNext() {
        var fileSlice = file.slice(offset, offset + chunkSize);
        reader.readAsBinaryString(fileSlice);
    }
    readNext();
}
