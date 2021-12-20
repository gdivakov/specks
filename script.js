function Specks() {
	var squares = document.getElementsByClassName('square'),
		_moves = document.querySelector('#moves');
		_index = [],
		_isWin = false,
		_this = this;

	this.generateSpeckPlace = function() {
		_this.generateIndex();
		// generate for each squares except the last one
		for (var i = 0; i < squares.length - 1; i++) {
			var num = _this.createNewSpeck(_index[i]);
			squares[i].appendChild(num);
		}
	}

	this.generateIndex = function() {
		for (var i = 0; i < 15; i++) {
			_index.push(i + 1);
		}
		_index.sort(compareRandom);
	}

	this.createNewSpeck = function(index) {
		var newNum = document.createElement('div');
		newNum.classList.add('number');
		newNum.classList.add(index);
		newNum.innerHTML = index;

		return newNum;
	}

	this.searchFreeSpace = function(element) {
		var child = element.firstChild,
			elemIndex = element.classList[1],
			row = elemIndex[0],
			neighbElems = [],
			column = elemIndex[2],
			freeElem;

			switch (+row) {
				case (3):
					neighbElems.push((+row - 1) + "_" + column);
					neighbElems.push((+row + 1) + "_" + column);
					break;
				case (2):
					neighbElems.push((+row - 1) + "_" + column);
					neighbElems.push((+row + 1) + "_" + column);
					break;				
				case (1):
					neighbElems.push((+row + 1) + "_" + column);
					break;
				case (4):
					neighbElems.push((+row - 1) + "_" + column);
					break;
			}

			switch (+column) {
				case (3):
					neighbElems.push(+row + "_" + (+column + 1));
					neighbElems.push(+row + "_" + (+column - 1));
					break;
				case (2):
					neighbElems.push(+row + "_" + (+column + 1));
					neighbElems.push(+row + "_" + (+column - 1));
					break;						
				case (1):
					neighbElems.push(+row + "_" + (+column + 1));
					break;
				case (4):
					neighbElems.push(+row + "_" + (+column - 1));
					break;
			}			

			for (var i = 0; i < neighbElems.length; i++) {
				var possiblyFree = document.getElementsByClassName(neighbElems[i])[0];
				//find free elem
				if (possiblyFree.classList.contains('free')) {
					freeElem = possiblyFree;
					_this.replaceElems(child, freeElem.firstChild);
				}
			}
	}

	this.replaceElems = function(el, freeEl) {
		var parentEl = el.parentElement,
			parentFreeEl = freeEl.parentElement;

		parentEl.replaceChild(freeEl, el);
		parentFreeEl.appendChild(el);
		parentFreeEl.classList.remove('free');
		parentEl.classList.add('free');

		_this.refreshMoves();
		_this.checkWin();
	}

	//random comparing for _index
	function compareRandom(a, b) {
		return Math.random() - 0.5;
	}

	this.checkWin = function() {
		var _elems = document.getElementsByClassName('square');

		for (var i = 0; i < 15; i++) {
			if (_elems[i].firstChild.innerHTML != (i + 1)) {
				return;
			}
		}
		_isWin = true;
		alert("Win! Congratulations, you made " + _moves.innerHTML + " moves");
		_this.insertRestartButton();
	}

	this.insertRestartButton = function() {
		button = document.createElement("input");
		button.setAttribute("type", "button");
		button.setAttribute("value", "again");
		button.setAttribute("onclick", "location.reload(true);");
		button.classList.add("button");

		document.getElementById("score").appendChild(button);
	}

	this.refreshMoves = function() {
		_moves.innerHTML = +_moves.innerHTML + 1;
	}


	document.addEventListener('mousedown', function (e) {
		if (_isWin) return;

		var elem = e.target;

		if (!elem.classList.contains('square')) {
			if (elem.parentElement.classList.contains('square')) {
				elem = elem.parentElement;
			} else {
				return;
			}
		}

		if (!elem.firstChild.classList.contains('number')) {
			e.stopPropagation();
		} else {
			_this.searchFreeSpace(elem);
		}
	});	

}

var specks = new Specks;
specks.generateSpeckPlace();
