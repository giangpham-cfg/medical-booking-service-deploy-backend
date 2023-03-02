import specialtyService from '../services/specialtyService';

let createSpecialty = async (req, res) => {
    try {
        let info = await specialtyService.createSpecialty(req.body);
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

let getAllSpecialty = async (req, res) => {
    try {
        let info = await specialtyService.getAllSpecialty();
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

let handleEditSpecialty = async (req, res) => {
    try {
        let info = await specialtyService.updateSpecialtyData(req.body);
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

let handleDeleteSpecialty = async (req, res) => {
    try {
        let info = await specialtyService.deleteSpecialty(req.body.id);
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

module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    handleEditSpecialty: handleEditSpecialty,
    handleDeleteSpecialty: handleDeleteSpecialty
}