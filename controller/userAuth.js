const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient({})

const UserLogin = (req, res) => {
    prisma.users.findUnique({
        where: {
            email: req.body.email
        }
    }).then(
        (user) => {
            if (!user) {
                res.render('login', { errror: true });
            } else {
                // bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (req.body.password === user.password) {
                    res.redirect('/home');
                }
                else {
                   res.redirect('/', {error: true})
                }

            }
        }
    )
}

module.exports = { UserLogin }