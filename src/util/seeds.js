const User = require("../model/user");

module.exports = {
    defaultAdmin: async () => {
        const typeUser = 0;
        const name = "super admin";
        const email = "super@admin.com";
        const cpfUser = "00000000000";
        const matriculation = "12345678";
        const password = "super@admin.com";

        if (
            await User.findOne({
                email,
            })
        )
            return console.log("Standard user admin already created!");

        await User.create({
                typeUser,
                name,
                email,
                cpfUser,
                matriculation,
                password,
            })
            .then(() => {
                console.log("Super Admin created successfully!");
                console.log("email: " + email);
                console.log("password: " + password);
            })
            .catch((err) => {
                console.log(err);
                return console.log("Failed on register seed super admin!");
            });
    },
};