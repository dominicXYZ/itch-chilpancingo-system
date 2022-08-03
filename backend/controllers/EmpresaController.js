const Empresa = require('../models').Empresa
const Titular = require('../models').Titular
const Sequelize = require('../models').Sequelize
const sequelize = require('../models').sequelize
const asesor_externo = require('../models').asesor_externo

module.exports.findAll = (req, res) => {
    // {include: [{model: asesor_externo, as: 'asesores_externos'}]}
    Empresa.findAll({include: [{model: asesor_externo, as: 'asesor_externos'}, {model: Titular, as: 'titular'}, {model: Titular, as: 'representante_legal'}]})
        .then(empresas => {
            res.status(200).json({empresas})
        }).catch(err => {
            res.status(406).json({err})
        })
}

module.exports.add = (req, res) => {
    // console.log(req.body);
    const nombre= req.body.nombre,
        clasificacion= req.body.clasificacion,
        rfc= req.body.rfc,
        domicilio= req.body.domicilio || '',
        colonia= req.body.colonia || '',
        codigo_postal= req.body.codigo_postal || '',
        fax= req.body.fax || '',
        mision = req.body.mision || '',
        puesto_titular = req.body.puesto_titular,
        titulo_titular =req.body.titulo_titular,
        nombre_titular = req.body.nombre_titular,
        titulo_firma_acuerdo = req.body.titulo_firma_acuerdo,
        puesto_firma_acuerdo = req.body.puesto_firma_acuerdo,
        nombre_firma_acuerdo = req.body.nombre_firma_acuerdo;

    sequelize.transaction( t => {
        return Titular.create({ titulo: titulo_titular, nombre: nombre_titular, puesto: puesto_titular}, {transaction: t})
            .then(titular => {
                return Titular.create({ titulo: titulo_firma_acuerdo, nombre: nombre_firma_acuerdo, puesto: puesto_firma_acuerdo}, {transaction: t})
                .then(firma_acuerdo => {
                    return Empresa.create({
                        nombre,
                        clasificacion,
                        rfc,
                        domicilio,
                        colonia,
                        codigo_postal,
                        fax,
                        mision,
                        id_titular: titular.id,
                        id_representante_legal: firma_acuerdo.id
                    }, {transaction: t})
                })
            })
    }).then(empresa => {
        res.status(200).json(empresa)
    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        res.status(202).json({errores})
    }).catch((err) => {
        res.status(406).json({err: err})
    })
}

module.exports.update = (req, res) => {
    console.log(req.body);
    const id = req.params.id,
        rfc= req.body.rfc,
        domicilio= req.body.domicilio || '',
        colonia= req.body.colonia || '',
        codigo_postal= req.body.codigo_postal || '',
        fax= req.body.fax || '',
        mision = req.body.mision || '',
        id_titular = req.body.id_titular,
        titulo_titular =req.body.titulo_titular,
        puesto_titular = req.body.puesto_titular,
        nombre_titular = req.body.nombre_titular,
        id_firma_acuerdo = req.body.id_firma_acuerdo
        titulo_firma_acuerdo = req.body.titulo_firma_acuerdo,
        puesto_firma_acuerdo = req.body.puesto_firma_acuerdo,
        nombre_firma_acuerdo = req.body.nombre_firma_acuerdo
    sequelize.transaction(t => {
        return Titular.update({ titulo: titulo_titular, nombre: nombre_titular, puesto: puesto_titular}, {where: {id: id_titular}, transaction: t})
            .then(titular => {
                return Titular.update({ titulo: titulo_firma_acuerdo, nombre: nombre_firma_acuerdo, puesto: puesto_firma_acuerdo}, {where: {id: id_firma_acuerdo}, transaction: t})
                .then(representate => {
                    return Empresa.update({
                        rfc,
                        domicilio,
                        colonia,
                        codigo_postal,
                        fax,
                        mision,
                    }, {where: {id}});
                })
            })
    }).then(empresa => {
        res.status(200).json(empresa)
    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        res.status(202).json({errores})
    }).catch((err) => {
        res.status(406).json({err: err})
    })
}