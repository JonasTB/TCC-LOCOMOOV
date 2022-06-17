const Scooter = require('../model/scooter');
const Locality = require('../model/locality');

module.exports = {
    create: async(req, res) => {
        const { code } = req.body;
        if(await Scooter.findOne({ code: code })) return res.status(409).send({ error: 'Scooter already exists in the bank' });
        try {
            const create = await Scooter.create(req.body);
            
            return res.status(201).send(create);
        } catch (err) {
            return res.status(400).send({ error: 'Failed on create scooter' });
        }
    },

    getMany: async(req, res) => {
        try {
            const getMany = await Scooter.find();

            return res.status(200).send(getMany);
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Failed on get many scooters' });
        }
    },

    getOne: async(req, res) => {
        try {
            if(!await Scooter.findById(req.params.id)) return res.status(404).send({ error: 'Scooter not found' });

            const getOne = await Scooter.findById(req.params.id);

            return res.status(200).send(getOne);
        } catch (err) {
            return res.status(400).send({ error: 'Failed on get one scooter' });
        }
    },

    delete: async(req, res) => {
        try {
            if(!await Scooter.findById(req.params.id)) return res.status(404).send({ error: 'Scooter not found' });
            
            await Scooter.findByIdAndDelete(req.params.id);

            return res.status(200).send({ OK: 'Successfully deleting scooter' });
        } catch (err) {
            return res.status(400).send({ error : 'Failed on deleting scooter' });
        }
    },

    localityByScooters: async(req, res) => {
        const { id } = req.params.id;
        try {
            const scooter = await Scooter.findById(id).populate('locality');

            return res.status(200).send(scooter.locality);
        } catch (err) {
            return res.status(400).send({ error: 'Failed on getting locality' });
        }
    }
}