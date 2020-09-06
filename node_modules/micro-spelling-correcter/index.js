class MicroSpellingCorrecter {
	constructor(words, defaultDistance = 2) {
		this.words = new Set(words);

		const letters = new Set();
		words.forEach(word => word.split('').forEach(letter => letters.add(letter)));
		this.letters = [...letters];
		this.defaultDistance = defaultDistance;
	}

	edits(word) {
		const edits = [];
		const {length} = word;
		const {letters} = this;

		for (let i = 0; i < length; i++) {
			edits.push(word.slice(0, i) + word.slice(i + 1)); // Skip
			for (const letter of letters) {
				edits.push(word.slice(0, i) + letter + word.slice(i + 1)); // Replace
			}
		}

		for (let i = 1; i < length; i++) {
			edits.push(word.slice(0, i - 1) + word[i] + word[i - 1] + word.slice(i + 1)); // Transposition
		}

		for (let i = 0; i <= length; i++) {
			for (const letter of letters) {
				edits.push(word.slice(0, i) + letter + word.slice(i)); // Addition
			}
		}

		return edits;
	}

	correct(input, distance) {
		if (distance === undefined) {
			distance = this.defaultDistance;
		}

		if ((input.length >> 1) < distance) {
			distance = (input.length === 1) ? 1 : (input.length >> 1);
		}

		return this.findCorrection(input, distance);
	}

	findCorrection(word, distance) {
		const {words} = this;

		if (words.has(word)) {
			return word;
		}

		if (distance > 0) {
			const edits = this.edits(word);

			for (const edit of edits) {
				if (words.has(edit)) {
					return edit;
				}
			}

			if (distance > 1) {
				for (const edit of edits) {
					const correction = this.findCorrection(edit, distance - 1);
					if (correction !== undefined) {
						return correction;
					}
				}
			}
		}
	}
}

module.exports = MicroSpellingCorrecter;
