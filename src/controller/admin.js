const User = require('../model/user');
const { cpf } = require('cpf-cnpj-validator');

module.exports = {
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

    getManySuperAdmins: async(req, res) => {
        try {
            const getMany = await User.find({ typeUser: 0 });
            return res.status(200).json(getMany);
        } catch (err) {
            return res.status(400).send({ error: 'Failed on get many admins' });
        }
    },

    getManyAdmin: async(req, res) => {
        try {
            const getMany = await User.find({ typeUser: 1 });
            // const getMany = await User.find();

            return res.status(200).send(getMany);
        } catch (err) {
            return res.status(400).send({ error: 'Failed on get many admins' });
        }
    },

    getManyUsers: async(req, res) => {
        try {
            const getManyUsers = await User.find({ typeUser: 2 });

            return res.status(200).send(getManyUsers);
        } catch (err) {
            return res.status(400).send({ error: 'Failed on get many users' });
        }
    },

    getOne: async(req, res) => {
        try {
            if(!await User.findById(req.params.id)) return res.status(404).send('User not found!');

            const getOne = await User.findById(req.params.id);

            return res.status(200).send(getOne);
        } catch (err) {
            return res.status(400).send({ error: 'Failed on get one user' });
        }
    },

    delete: async(req, res) => {
        try {
            if(!await User.findById(req.params.id)) return res.status(404).send('User not found!');

            await User.findByIdAndDelete(req.params.id);

            return res.status(200).send('Successfully on deleting user');
        } catch (err) {
            return res.status(400).send({ error: 'Failed on delete user' });
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
    },

    changePassword: async (req, res) => {
        const { id, password } = req.body;
        try {
            const user = await User.findById(id).select('+password')

            user.password = password;
            await user.save();

            return res.status(200).send({ OK: 'Password changed' });
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Erro on change password, try again' });
        }
    }
}