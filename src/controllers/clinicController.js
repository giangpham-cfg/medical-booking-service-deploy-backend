import clinicService from '../services/clinicService';

let createClinic = async (req, res) => {
    try {
        let info = await clinicService.createClinic(req.body);
        return res.status(200).json(
            info
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getAllClinic = async (req, res) => {
    try {
        let info = await clinicService.getAllClinic();
        return res.status(200).json(
            info
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let handleEditClinic = async (req, res) => {
    try {
        let info = await clinicService.updateClinicData(req.body);
        return res.status(200).json(
            info
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let handleDeleteClinic = async (req, res) => {
    try {
        let info = await clinicService.deleteClinic(req.body.id);
        return res.status(200).json(
            info
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

// let getDetailClinicById = async (req, res) => {
//     try {
//         let info = await clinicService.getDetailClinicById(req.query.id, req.query.location);
//         return res.status(200).json(
//             info
//         )
//     } catch (e) {
//         console.log(e);
//         return res.status(200).json({
//             errCode: -1,
//             errMessage: 'Error from the server'
//         })
//     }
// }

module.exports = {
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    handleEditClinic: handleEditClinic,
    handleDeleteClinic: handleDeleteClinic,
    // getDetailClinicById: getDetailClinicById,
}