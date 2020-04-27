const wordRegex = /^[a-zA-Z0-9_$#&]*$/;

const commonValid = (word, len = 6) => {
	if (word.length < len) return `Length is less then ${len} symbols!`;
	if (!wordRegex.test(word)) return 'Only letters, numbers or _, $, #, & symbols are allowed!'
};

export const validateUsername = (word) => {
	return commonValid(word);
};

export const validatePassword = (word, word2) => {
	const commonChecks = commonValid(word);

	if (commonChecks) return commonChecks;
	if (word2 && word2 !== word) return 'Passwords are not equal!';
};
