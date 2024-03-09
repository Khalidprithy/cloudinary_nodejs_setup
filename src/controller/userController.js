
exports.Login = (req, res) => {
    const { email, password } = req.body
    const user = {
        email: email,
        password: password
    }
    res.send({ message: 'User Logged In!', data: user });

};
