const Locality = require('../model/locality');

module.exports = {
    create: async(req, res) => {
        try {
            const create = await Locality.create(req.body);

            return res.status(201).send(create);
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Failed on create locality' });
        }
    },

    getMany: async(req, res) => {
        try {
            const getMany = await Locality.find().populate('scooters');
            
            return res.status(200).send(getMany);
        } catch (err) {
            return res.status(400).send({ error: 'Failed on get many locality' });
        }
    },

    getOne: async(req, res) => {
        try {
            const getOne = await Locality.findById(req.params.id).populate('scooters');
            if(!getOne) return res.status(404).send({ error: 'Locality not found' });

            return res.status(200).send(getOne);
        } catch (err) {
            return res.status(400).send({ error: 'Failed on get one locality' });
        }
    },

    delete: async(req, res) => {
        try {
            if(!await Locality.findByIdAndDelete(req.params.id)) return res.status(404).send({ error: 'Locality not found' });
            await Locality.findByIdAndDelete(req.params.id);

            return res.status(200).send({ OK: 'Locality deleted successfully '});
        } catch (err) {
            return res.status(400).send({ error: 'Failed on deleting locality' });
        }
    },

    scootersByLocality: async(req, res) => {
        const { id } = req.params.id;
        try {
            const locality = await Locality.findById(id).populate('scooters');

            return res.status(200).send(locality);
        } catch (err) {
            return res.status(400).send({ error: 'Failed scooter by Locality' });
        }
    },
}