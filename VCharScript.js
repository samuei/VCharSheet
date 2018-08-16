// Once page is ready, start throwing javascript at it until it cries and goes home
window.addEventListener("load", function(event) {
	
	// Populate checkbox fields
	var checkboxdivs = document.querySelectorAll("div.checkboxes");
	for (var i = 0; i < checkboxdivs.length; i++) {
		generateCheckboxLabels(checkboxdivs[i]);
			
		generateCheckboxes(checkboxdivs[i]);
	}
	
	// Populate unlabeled checkbox fields
	var inputcheckboxdivs = document.querySelectorAll("div.input-with-checkboxes");
	for (var i = 0; i < inputcheckboxdivs.length; i++) {
		generateCheckboxInputs(inputcheckboxdivs[i]);
			
		generateCheckboxes(inputcheckboxdivs[i]);
	}
	
	// Populate special case checkbox fields
	var vitaecheckboxdiv = document.querySelector('div.vitae-checkboxes');
	generateVitaeCheckboxes(vitaecheckboxdiv);
});

// Magic number: change to have x checkboxes. Be wary of spacing. Default: 5
var numberOfCheckboxes = 5; 
// Magic number: change to have x rows of vitae checkboxes. There will be 10 boxes per row. Default: 2
var numberOfVitaeRows = 2;

// Creates pretty labels for stats and skills based off of the id field
function generateCheckboxLabels (element) {
	var label = document.createElement('label')
	label.htmlFor = element.id;
	
	// Capitalization
	label.appendChild(
		document.createTextNode(
			element.id.replace(/\b\w/g, function(txt){
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			})
		)
	); 
	
	label.className = 'names-label';
	element.appendChild(label);
}

// Creates text fields as labels for center-column values
function generateCheckboxInputs (element) {
	var input = document.createElement('input');
	input.setAttribute('type', 'text');
	input.className = 'names-input';
	element.appendChild(input);
}

// Creates the dots (really styled checkboxes) for a stat, skill, etc
function generateCheckboxes (element) {
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

// Creates two rows of checkboxes for the player's vitae tracker
function generateVitaeCheckboxes (element) {
	for (j = 0; j < numberOfVitaeRows; j++) { // Rows
		for (var i = 1; i <= 10; i++) { // Individual checkboxes
			var checkbox = document.createElement('input');
			checkbox.type = "checkbox";
			checkbox.name = element.id + '_' + (i + (j * 10));
			checkbox.value = 'value';
			checkbox.className = 'black-box-checkbox';
			checkbox.onclick = checkRelevantVitaeBoxes;
			element.appendChild(checkbox);
		}
		element.appendChild(document.createElement('br'));
	}
}

// Called when a dot is changed. Fills or unfills the other dots in the series as necessary
function checkRelevantBoxes (event) { 
	var eventName = event.currentTarget.name,
		prefix = eventName.substr(0, eventName.indexOf("_")), // e.g. computer
		position = eventName.substr(eventName.indexOf("_") + 1);
		
	for (var i = 1; i <= numberOfCheckboxes; i++) { 
		var underDotEl = document.getElementsByName(prefix + '_' + i)[0];
		
		if (underDotEl) { 
			if (i != position) { 
				underDotEl.checked = i < position;
			}
		}
	}
}

// Called when a vitae box is changed. Fills or unfills the other dots in the series as necessary
function checkRelevantVitaeBoxes (event) { 
	var eventName = event.currentTarget.name,
		position = eventName.substr(eventName.indexOf("_") + 1),
		numberOfVitaeBoxes = numberOfVitaeRows * 10;
		
	for (var i = 1; i <= numberOfVitaeBoxes; i++) { 
		var underDotEl = document.getElementsByName('vitae_' + i)[0];
		
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