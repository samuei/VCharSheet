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
	// Health
	var healthcheckboxdiv = document.querySelector('div.health-checkboxes');
	generateHealthCheckboxes(healthcheckboxdiv);
	// Willpower
	var willpowercheckboxdiv = document.querySelector('div.willpower-checkboxes');
	generateWillpowerCheckboxes(willpowercheckboxdiv);
	// Blood Potency
	var bpcheckboxdiv = document.querySelector('div.blood-potency-checkboxes');
	generateBPCheckboxes(bpcheckboxdiv);
	// Vitae
	var vitaecheckboxdiv = document.querySelector('div.vitae-checkboxes');
	generateVitaeCheckboxes(vitaecheckboxdiv);
});

// Magic number: change to have x checkboxes. Be wary of spacing. Default: 5
var numberOfCheckboxes = 5;
// Magic number: change to have x rows on the health tracker. There will be 12 boxes per row. Default: 1
var numberofHealthRows = 1;
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

// Creates the dots (really styled checkboxes) for the blood potency tracker
function generateBPCheckboxes (element) {
	for (var i = 1; i <= 10; i++) { // Magic number: The max BP is 10, always.
		var checkbox = document.createElement('input');
		checkbox.type = "checkbox";
		checkbox.name = element.id + '_' + i;
		checkbox.value = 'value';
		checkbox.className = 'dot-checkbox';
		checkbox.onclick = checkRelevantBPBoxes;
		element.appendChild(checkbox);
	}
}

// Creates the dots and checkboxes for the Willpower tracker
function generateWillpowerCheckboxes (element) {
	// Dots
	for (var i = 1; i <= 10; i++) { // Magic number: The max willpower is 10, always.
		var checkbox = document.createElement('input');
		checkbox.type = "checkbox";
		checkbox.name = element.id + '-dots_' + i;
		checkbox.value = 'value';
		checkbox.className = 'dot-checkbox';
		checkbox.onclick = checkRelevantWillpowerBoxes;
		element.appendChild(checkbox);
	}
	element.appendChild(document.createElement('br'));
	// Boxes
	for (var i = 1; i <= 10; i++) { // Magic number: The max willpower is 10, always.
		var checkbox = document.createElement('input');
		checkbox.type = "checkbox";
		checkbox.name = element.id + '-boxes_' + i;
		checkbox.value = 'value';
		checkbox.className = 'black-box-checkbox';
		checkbox.onclick = checkRelevantWillpowerBoxes;
		element.appendChild(checkbox);
	}
}

// Creates the dots and checkboxes for the Health tracker
function generateHealthCheckboxes (element) {
	for (var j = 0; j < numberofHealthRows; j++) {
		// Dots
		for (var i = 1; i <= 12; i++) { // Magic number: There are 12 boxes per row, per the official sheet
			var checkbox = document.createElement('input');
			checkbox.type = "checkbox";
			checkbox.name = element.id + '-dots_' + (i + (j * 12));
			checkbox.value = 'value';
			checkbox.className = 'dot-checkbox';
			checkbox.onclick = checkRelevantHealthDots;
			element.appendChild(checkbox);
		}
		element.appendChild(document.createElement('br'));
		// Boxes
		for (var i = 1; i <= 12; i++) { // Magic number: There are 12 boxes per row, per the official sheet
			var checkbox = document.createElement('input');
			checkbox.type = "checkbox";
			checkbox.name = element.id + '-boxes_' + (i + (j * 12));
			checkbox.value = 'value';
			checkbox.className = 'health-checkbox health-empty-checkbox'; // initialize to no damage
			checkbox.onclick = rotateHealthBoxLevel;
			element.appendChild(checkbox);
		}
		if (j != numberofHealthRows - 1) { // Spaceing makes it look prettier
			element.appendChild(document.createElement('br'));
			element.appendChild(document.createElement('br'));
		}
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

// Called when a blood potency dot is changed. Fills or unfills the other dots in the series as necessary
function checkRelevantBPBoxes (event) { 
	var eventName = event.currentTarget.name,
		position = eventName.substr(eventName.indexOf("_") + 1);
		
	for (var i = 1; i <= 10; i++) { 
		var underDotEl = document.getElementsByName('blood potency_' + i)[0];
		
		if (underDotEl) { 
			if (i != position) { 
				underDotEl.checked = i < position;
			}
		}
	}
}

// Called when a willpower dot or box is changed. Fills or unfills the other dots in the series as necessary
function checkRelevantWillpowerBoxes (event) { 
	var eventName = event.currentTarget.name,
		prefix = eventName.substr(0, eventName.indexOf("_")),
		position = eventName.substr(eventName.indexOf("_") + 1);
		
	for (var i = 1; i <= 10; i++) { 
		var underDotEl = document.getElementsByName(prefix + '_' + i)[0];
		
		if (underDotEl) { 
			if (i != position) { 
				underDotEl.checked = i < position;
			}
		}
	}
}

// Called when a health dot is changed. Fills or unfills the other dots in the series as necessary
function checkRelevantHealthDots (event) { 
	var eventName = event.currentTarget.name,
		prefix = eventName.substr(0, eventName.indexOf("_")),
		position = eventName.substr(eventName.indexOf("_") + 1);
		
	for (var i = 1; i <= (numberofHealthRows * 12); i++) { 
		var underDotEl = document.getElementsByName(prefix + '_' + i)[0];
		
		if (underDotEl) { 
			if (i != position) { 
				underDotEl.checked = i < position;
			}
		}
	}
}

// Called when a health box is changed. Changes the box's display, but leaves the other boxes alone
function rotateHealthBoxLevel (event) { 
	var thisBox = document.getElementsByName(event.currentTarget.name)[0],
		oldClassName = event.currentTarget.className,
		newClassName = 'health-empty-checkbox'; // Default to empty
	
	// Removes the current condition and adds the next level
	// Assumes it will only have one at a time.
	if (thisBox.classList.contains('health-empty-checkbox')) {
		thisBox.classList.remove('health-empty-checkbox');
		thisBox.classList.add('health-bashing-checkbox');
	}
	else if (thisBox.classList.contains('health-bashing-checkbox')) {
		thisBox.classList.remove('health-bashing-checkbox');
		thisBox.classList.add('health-lethal-checkbox');
	}
	else if (thisBox.classList.contains('health-lethal-checkbox')) {
		thisBox.classList.remove('health-lethal-checkbox');
		thisBox.classList.add('health-aggravated-checkbox');
	}
	else if (thisBox.classList.contains('health-aggravated-checkbox')) {
		thisBox.classList.remove('health-aggravated-checkbox');
		thisBox.classList.add('health-empty-checkbox');
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