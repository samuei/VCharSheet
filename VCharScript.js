// Once page is ready, start throwing javascript at it until it cries and goes home
window.addEventListener("load", function(event) {
	
	// Populate checkbox fields
	var checkboxdivs = document.querySelectorAll("div.checkboxes");
	for (var i = 0; i < checkboxdivs.length; i++) {
		generateCheckboxLabels(checkboxdivs[i]);
			
		generateCheckboxes(checkboxdivs[i]);
	}
	
	var inputcheckboxdivs = document.querySelectorAll("div.input-with-checkboxes");
	for (var i = 0; i < inputcheckboxdivs.length; i++) {
		generateCheckboxInputs(inputcheckboxdivs[i]);
			
		generateCheckboxes(inputcheckboxdivs[i]);
	}
});

var numberOfCheckboxes = 5; // Magic number: change to have x checkboxes. Be wary of spacing. Default: 5

function generateCheckboxLabels (element) {
	// Create label for checkboxes based off of id
	var label = document.createElement('label')
	label.htmlFor = element.id;
	label.appendChild(
		document.createTextNode(
			element.id.replace(/\b\w/g, function(txt){
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			})
		)
	); // Capitalization
	label.className = 'names-label';
	element.appendChild(label);
}

function generateCheckboxInputs (element) {
	// Create input to name checkboxes
	var input = document.createElement('input');
	input.setAttribute('type', 'text');
	input.className = 'names-input';
	element.appendChild(input);
}
	
function generateCheckboxes (element) {
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
			if (i != position) { 
				underDotEl.checked = i < position;
			}
		}
	}
}

// Called when the character's name is changed
function updateTitle() {
	var curName = document.getElementsByName('character-name')[0].value;
	if (curName) {
		document.title = 'Vampire: The Requiem (' + curName + ')';
	}
	else {
		document.title = 'Vampire: The Requiem';
	}
}