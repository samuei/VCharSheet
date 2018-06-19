// Once page is ready, start throwing javascript at it until it cries and goes home
window.addEventListener("load", function(event) {
	
	// Populate checkbox fields
	var checkboxdivs = document.querySelectorAll("div.checkboxes");
	for (var i = 0; i < checkboxdivs.length; i++) { // A nice foreach or for/of loop would be great, but Edge has no support for them. Yay.
		generateCheckboxes(checkboxdivs[i]);
	}
});

var numberOfCheckboxes = 5; // Magic number: change 5 -> x to have x checkboxes. Be wary of spacing.

function generateCheckboxes (element) {
	// Create label for checkboxes based off of id
	var label = document.createElement('label')
	label.htmlFor = element.id;
	label.appendChild(document.createTextNode(element.id[0].toUpperCase() + element.id.slice(1)));
	label.className = 'names-label';
	element.appendChild(label);
	
	// Create actual checkboxes
	for (var i = 1; i <= numberOfCheckboxes; i++) { 
		var checkbox = document.createElement('input');
		checkbox.type = "checkbox";
		checkbox.name = element.id + '_' + i;
		checkbox.value = 'value';
		checkbox.className = 'dot-checkbox';
		checkbox.onclick = checkRelevantBoxes;
		element.appendChild(checkbox);
	}
}

function checkRelevantBoxes (event) { 
	var prefix = event.currentTarget.name.substr(0, event.currentTarget.name.length - 1), // e.g. computer_
		position = event.currentTarget.name.substr(-1);
	
	for (var i = 1; i <= numberOfCheckboxes; i++) { 
		var underDotEl = document.getElementsByName(prefix + i)[0];
		
		if (underDotEl) { 
			underDotEl.checked = i <= position;
		}
	}
}

function updateTitle() {
	var curName = document.getElementsByName('character-name')[0].value;
	if (curName) {
		document.title = 'Vampire: The Requiem (' + curName + ')';
	}
	else {
		document.title = 'Vampire: The Requiem';
	}
}