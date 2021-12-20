class Specks {
	constructor() {
		this.squares = document.getElementsByClassName('square');
		this.moves = document.querySelector('#moves');
		this.numbers = [];
		this.isWin = false;

		this.prepareMatrix();
		this.startListeners();
	}

	prepareMatrix() {
		this.generateNumbers();

		for (let i = 0; i < this.squares.length - 1; i++) {
			const num = this.createNewSpeck(this.numbers[i]);
			this.squares[i].appendChild(num);
		}
	}

	generateNumbers() {
		let i = 0

		while (i < 15) {
			this.numbers.push(++i);
		}

		// Randomize for each new session
		this.numbers.sort(() => Math.random() - 0.5);
	}

	createNewSpeck(index) {
		const newCell = document.createElement('div');
		newCell.classList.add('number');
		newCell.classList.add(index);
		newCell.innerHTML = index;

		return newCell;
	}

	move(element) {
		let cell = element.firstChild;
		let position = element.classList[1];
		let freeCell = this.getNextCell(position);

		if (!freeCell) {
			return
		}

		this.replaceElems(cell, freeCell);
	}

	getNextCell(position) {
		let [ row, column ] = position.split("_").map(value => +value);
		let neighbElems = [];

		// Find candidates
		switch (row) {
			case (1):
				neighbElems.push(`${row + 1}_${column}`);
				break;
			case (2):
				neighbElems.push(`${row - 1}_${column}`);
				neighbElems.push(`${row + 1}_${column}`);
				break;
			case (3):
				neighbElems.push(`${row - 1}_${column}`);
				neighbElems.push(`${row + 1}_${column}`);
				break;
			case (4):
				neighbElems.push(`${row - 1}_${column}`);
				break;
		}

		switch (column) {
			case (1):
				neighbElems.push(`${row}_${column + 1}`);
				break;
			case (2):
				neighbElems.push(`${row}_${column + 1}`);
				neighbElems.push(`${row}_${column - 1}`);
				break;
			case (3):
				neighbElems.push(`${row}_${column + 1}`);
				neighbElems.push(`${row}_${column - 1}`);
				break;
			case (4):
				neighbElems.push(`${row}_${column - 1}`);
				break;
		}

		for (let i = 0; i < neighbElems.length; i++) {
			const possiblyFree = document.getElementsByClassName(neighbElems[i])[0];

			if (!possiblyFree.classList.contains('free')) {
				continue;
			}

			return possiblyFree.firstChild;
		}

		return null
	}

	replaceElems (prevCell, nextCell) {
		const parentPrev = prevCell.parentElement;
		const parentNext = nextCell.parentElement;

		parentPrev.replaceChild(nextCell, prevCell);
		parentPrev.classList.add('free');

		parentNext.appendChild(prevCell);
		parentNext.classList.remove('free');

		moves.innerHTML++;
		this.checkWin();
	}

	checkWin() {
		const squares = document.getElementsByClassName('square');

		for (let i = 0; i < 15; i++) {
			if (squares[i].firstChild.innerHTML != (i + 1)) {
				return;
			}
		}
		this.isWin = true;

		alert("Win! Congratulations, you made " + this.moves.innerHTML + " moves");
		this.insertRestartButton();
	}

	insertRestartButton() {
		const hasButton = document.querySelector(".button");
		if (hasButton) {
			return;
		}

		const button = document.createElement("input");
		button.setAttribute("type", "button");
		button.setAttribute("value", "again");
		button.setAttribute("onclick", "location.reload(true);");
		button.classList.add("button");

		document.getElementById("score").appendChild(button);
	}

	startListeners() {
		const handleClick = ({ target, stopPropagation }) => {
			const square = target.closest('.square');

			if (this.isWin || !square || square.classList.contains('free')) {
				return
			}

			this.move(square);
		}

		document.addEventListener('mousedown', handleClick);
	}
}

const game = new Specks();
