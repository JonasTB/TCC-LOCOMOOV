const Displacement = require('../model/displacement');

module.exports = {
    create: async(req, res) => {
        try {
            const create = await Displacement.create(req.body);

            return res.status(201).send(create);
        } catch (err) {
            return res.status(400).send({ error: 'Failed on create displacement' });
        }
    },

    getMany: async(req, res) => {
        try {
            const getMany = await Displacement.find();

            return res.status(200).send(getMany);
        } catch (err) {
            return res.status(400).send({ error: 'Failed on get many displacement' });
        }
    },

    getOne: async(req, res) => {
        try {
            const getOne = await Displacement.findById(req.params.id);

            return res.status(200).send(getOne);
        } catch (err) {
            return res.status(400).send({ error: 'Failed on get one displacement' });
        }
    },

    disassociate: async(req, res) => {
        try {
            const disassociate = await Displacement.findByIdAndUpdate(req.params.id, { status: 'inactive'}, { new: true });

            return res.status(200).send(disassociate);
        } catch (err) {
            return res.status(400).send({ error: 'Failed on disassociate' });
        }
    }
}