function validateInput(body, register = false) {
    let fields = {"email": "email address", "password": "password"};

    if (register) {
        fields["firstName"] = "first name";
        fields["lastName"] = "last name";
    }

    let error = {};
    let success = true;

    Object.keys(fields).map((field, idx) => {
        if (!body[field]) {
            error[field] = `Your ${field.toLowerCase()} is required`;
            success = false;
        }
    });

    return {error, success};
}


module.exports = validateInput;