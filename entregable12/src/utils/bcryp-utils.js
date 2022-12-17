import bCrypt from "bcrypt"

const createHash = function (password) {
	return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

const validatePassword = (user, password) => {
	return bCrypt.compareSync(password, user.password);
};

export const BCRYPT_UTILS = {createHash, validatePassword}