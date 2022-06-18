// we always start with a module to encapsulate our own code
// is is called an IIFE (Immediately-Invoked Function Expression)

(() => {
	// collect ALL of the elements that we want the user to interact with and also elements that to change
	// JS holds these in memory so that it can access them later (these are elements in the HTML)
	let theThumbnails = document.querySelectorAll('#buttonHolder img'),
		gameBoard = document.querySelector('.puzzle-board'),
		pzlPieces = document.querySelectorAll('.puzzle-pieces img'),
		dropZones = document.querySelectorAll('.drop-zone');

	/*
	theThumbnails = [
			<img src="images/buttonZero.jpg" data-bgref="0" alt="thumbnail">
			<img src="images/buttonOne.jpg" data-bgref="1" alt="thumbnail">
	    	<img src="images/buttonTwo.jpg" data-bgref="2" alt="thumbnail">
			<img src="images/buttonThree.jpg" data-bgref="3" alt="thumbnail">
	]
	*/

	const imageNames = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];
	
	function changeImageSet() {
		gameBoard.style.backgroundImage = `url(images/backGround${this.dataset.bgref}.jpg)`;

		let clickedThumb = this; // this is the element (thumbnail) we clicked on

		// debugger; 
		// this will pause code execution on this line. like pushing pause on Netflix / Amazon Prime

		// update the draggable piece's src attribute one at a time
		pzlPieces.forEach((piece, index) => {
			piece.src = `images/${imageNames[index] + clickedThumb.dataset.bgref}.jpg`;
		});
	}

	function allowDrag(event) {
		console.log('started draggin me');

		// create a reference to the element we're dragging so we can retrieve it later
		event.dataTransfer.setData('draggedEl', this.id);
	}

	function allowDragOver(event) {
		// override default behaviour on certain elements when an event happens
		event.preventDefault();
		console.log('started draggin over me');
	}

	function allowDrop(event) {
		event.preventDefault();
		let droppedElId = event.dataTransfer.getData('draggedEl');

		// retrieve the dragged el by its ID, and then put it inside the current drop zone
		this.appendChild(document.querySelector(`#${droppedElId}`));

		// MDN JavaScript template string
	}

	// how to we want the user to interact with the elements that we collected earlier?
	// events are things like clikcs, drags, double-clicks, keypresses... all the ways that a user can interact with a mouse, a keyboard etc
 
	theThumbnails.forEach(image => image.addEventListener('click', changeImageSet));
	pzlPieces.forEach(piece => piece.addEventListener('dragstart', allowDrag));

	// set up the drop zone event handling
	dropZones.forEach(zone => {
		zone.addEventListener('dragover', allowDragOver);
		zone.addEventListener('drop', allowDrop);
	});
})();
