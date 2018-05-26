// Once page is ready, start throwing javascript at it until it cries and goes home
window.addEventListener("load", function(event) {
	
	// Populate checkbox fields
	var checkboxdivs = document.querySelectorAll("div.checkboxes");
	for (var i = 0; i < checkboxdivs.length; i++) { // A nice foreach or for/of loop would be great, but Edge has no support for them. Yay.
		generateCheckboxes(checkboxdivs[i]);
	}
});

function generateCheckboxes (element) {
	// Create label for checkboxes based off of id
	var label = document.createElement('label')
	label.htmlFor = element.id;
	label.appendChild(document.createTextNode(element.id[0].toUpperCase() + element.id.slice(1)));
	label.className = 'names-label';
	element.appendChild(label);
	
	// Create actual checkboxes
	for (var i = 1; i <= 5; i++) { // Magic number: change 5 -> x to have x checkboxes. Be wary of spacing.
		var checkbox = document.createElement('input');
		checkbox.type = "checkbox";
		checkbox.name = element.id + '_' + i;
		checkbox.value = 'value';
		checkbox.className = 'dot-checkbox';
		element.appendChild(checkbox);
	}
}