const User = require('../model/user');

module.exports = (roles) => {
    return async (req, res, next) => {
        const admin = await User.findById(req.userId);
        if (!admin) return res.status(400).send({ Error: 'User not found' });

        if (roles.includes(admin.typeUser)) next();
        else return res.status(403).send({ Error: 'Not authorized' });
    }
}