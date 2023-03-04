const db = require("../models")

let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.image || !data.descriptionHTML
                || !data.descriptionMarkdown
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                await db.Specialty.create({
                    name: data.name,
                    image: data.image,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })

                resolve({
                    errCode: 0,
                    errMessage: 'Ok'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll();
            if (data && data.length > 0) {
                // console.log('check data:', data) //use postman to test and see log
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary'); //db save as binary data, html can only display with string data
                    return item;
                })
            }
            resolve({
                errCode: 0,
                errMessage: 'Ok',
                data
            })
        } catch (e) {
            reject(e)
        }
    })
}

let updateSpecialtyData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.name || !data.descriptionMarkdown || !data.descriptionHTML || !data.image) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters!'
                })
            }
            let specialty = await db.Specialty.findOne({
                where: { id: data.id },
                raw: false
            })
            if (specialty) {
                specialty.name = data.name;
                specialty.descriptionHTML = data.descriptionHTML;
                specialty.descriptionMarkdown = data.descriptionMarkdown;
                specialty.image = data.image;

                await specialty.save();
                resolve({
                    errCode: 0,
                    message: 'Update the specialty succeed!'
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'The specialty has not found!'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteSpecialty = (specialtyId) => {
    return new Promise(async (resolve, reject) => {
        let foundSpecialty = await db.Specialty.findOne({
            where: { id: specialtyId }
        })

        if (!foundSpecialty) {
            resolve({
                errCode: 2,
                errMessage: 'The specialty does not exist!'
            })
        }

        await db.Specialty.destroy({
            where: { id: specialtyId }

        });

        resolve({
            errCode: 0,
            message: 'The specialty has been deleted!'
        })
    })
}



module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    updateSpecialtyData: updateSpecialtyData,
    deleteSpecialty: deleteSpecialty
}