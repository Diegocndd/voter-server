const isEmailValid = (email) => {
    const regExEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email.match(regExEmail)) {
        return true;
    }

    return false;
}

const register = (userData) => {
    const {name, surname, username, birth, email, password} = userData;
    const regEx = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

    if (password.length < 6) {
        return "The password cannot be shorter than 6 characters.";
    }

    if (!birth.match(regEx)) {
        return "The date format does not match the YYYY-MM-DD format.";
    }

    if (!isEmailValid(email)) {
        return "The email format does not match the xxxx@yyy.xyz format.";
    }

    return true;
};

const createPoll = (pollData) => {
    const {qty_options} = pollData;

    if(!Number.isInteger(qty_options)) {
        return false;
    }

    return true;
};

module.exports = {
    register,
    createPoll,
};
