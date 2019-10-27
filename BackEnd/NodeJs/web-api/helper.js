emailValidator = (email) => {
    if (email.length > 5) {
        return true
    } else {
        return false
    }
};

nameValidator = (name) => {
    if (name == "GJorgji") {
        return true
    } else {
        return false
    }
};

ageValidator = (age) => {
    if (age >= 18) {
        return true
    }
    else {
        return false
    }
};

module.exports = {
    emailValidator,
    nameValidator,
    ageValidator
};