const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../util/mailer');
const { cpf } = require('cpf-cnpj-validator');

module.exports = {
    login: async(req, res, next) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email }).select('+password');

            if(!user)
                return res.status(400).send('User not found!');

            if(!await bcrypt.compare(password, user.password))
                return res.status(400).send('Invalid credentials!');

            user.password = undefined;

            return res.status(200).send({
                user,
                token: jwt.sign({ id: user.id }, process.env.SECRET, { 
                    expiresIn: 86400,
                }),
            });
        } catch (err) {
            console.log(err);
            return res.status(403).send({ error: 'Failed on login' });
        }
    },

    create: async(req, res) => {
        const { typeUser, name, email, cpfUser, matriculation, password } = req.body;
        try {
            if(!cpf.isValid(cpfUser))
                return res.status(400).send('CPF is not valid!');

            if (await User.findOne({ email }))
                return res.status(400).send({ error: 'User already exists' });

            const user = await User.create({ typeUser, name, email, cpfUser, matriculation, password });
            return res.status(201).send(user);
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Failed on create user, try again' });
        }
    },

    forgotPassword: async(req, res) => {
        const { email } = req.body;
        try {
            const token = crypto.randomBytes(20).toString('hex');
            const now = new Date();
            now.setHours(now.getHours() + 1);

            const user = await User.findOne({ email });
            
            if(!user)
                return res.status(400).send({ error: 'User not found' });
                
            await User.findByIdAndUpdate(user.id, {
                '$set': {
                    passwordResetToken: token,
                    passwordResetExpires: now,
                }
            });

            await mailer.transport.sendMail({
                from: mailer.addresses,
                to: user.email,
                subject: 'LOCOMOV redefinição de senha',
                text: `Clique aqui para resetar sua senha ${process.env.RESET_URL}?token=${token}&id=${user.id}`,
                html: `Clique aqui para resetar sua senha <a href="${process.env.RESET_URL}?token=${token}&id=${user.id}" >${process.env.RESET_URL}?token=${token}&id=${user.id}</a>`
            });

            return res.status(200).send({ OK: 'Email with instructions sent' });
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Failed on send email recovery password, try again.' });
        }
    },

    resetPassword: async(req, res) => {
        const { password, id, token } = req.body;
        try {
            const user = await User.findById(id).select('+passwordResetToken passwordResetExpires');

            if(!user)
                return res.status(404).send({ error: 'User not found.' });

            if(user.passwordResetToken != token)
                return res.status(400).send({ error: 'Token invalid' });

            if(user.passwordResetExpires < Date.now())
                return res.status(403).send({ error: 'Token expired' });

            user.password = password;
            user.passwordResetExpires = null;
            user.passwordResetToken = null;
            await user.save();

            return res.status(200).send({ OK: 'Password has been modified' });
        } catch (err) {
            return res.status(400).send({ error: 'Failed on reset password, try again' });
        }
    }
}  