const db = require("../models")

let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.address || !data.image
                || !data.descriptionHTML || !data.descriptionMarkdown
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                await db.Clinic.create({
                    name: data.name,
                    address: data.address,
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

let getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll();
            if (data && data.length > 0) {
                // console.log('check data:', data) //use postman to test and see log
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
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

let updateClinicData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.address || !data.name || !data.descriptionMarkdown || !data.descriptionHTML || !data.image) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters!'
                })
            }
            let clinic = await db.Clinic.findOne({
                where: { id: data.id },
                raw: false
            })
            if (clinic) {
                clinic.name = data.name;
                clinic.address = data.address
                clinic.descriptionHTML = data.descriptionHTML;
                clinic.descriptionMarkdown = data.descriptionMarkdown;
                clinic.image = data.image;

                await clinic.save();
                resolve({
                    errCode: 0,
                    message: 'Update the clinic succeed!'
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'The clinic has not found!'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteClinic = (clinicId) => {
    return new Promise(async (resolve, reject) => {
        let foundClinic = await db.Clinic.findOne({
            where: { id: clinicId }
        })

        if (!foundClinic) {
            resolve({
                errCode: 2,
                errMessage: 'The clinic does not exist!'
            })
        }

        await db.Clinic.destroy({
            where: { id: clinicId }

        });

        resolve({
            errCode: 0,
            message: 'The clinic has been deleted!'
        })
    })
}

let getDetailClinicById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let data = await db.Clinic.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['descriptionHTML', 'descriptionMarkdown', 'name', 'address'],
                })

                if (data) {
                    let doctorClinic = [];

                    doctorClinic = await db.Doctor_Info.findAll({
                        where: { clinicId: inputId },
                        attributes: ['doctorId', 'provinceId'],
                    })


                    data.doctorClinic = doctorClinic;
                } else data = {}

                resolve({
                    errCode: 0,
                    errMessage: 'Ok',
                    data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    updateClinicData: updateClinicData,
    deleteClinic: deleteClinic,
    getDetailClinicById: getDetailClinicById,
}