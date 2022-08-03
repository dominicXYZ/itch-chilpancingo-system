const Anteproyecto = require('../models').Anteproyecto;
const Alumno = require('../models').Alumno;
const Usuario = require('../models').Usuario;

const Docente = require('../models').Docente;
const Periodo = require('../models').Periodo;
const Carrera = require('../models').Carrera;
const docentes_carrera = require('../models').docentes_carrera;

const asesor_externo = require('../models').asesor_externo;
const Empresa = require('../models').Empresa;
const revision_anteproyecto = require('../models').revision_anteproyecto;

const Sequelize = require('../models').Sequelize
const sequelize = require('../models').sequelize
const fs = require('fs')
const path = require('path')
const transporter = require('../../config/email');




module.exports.setAsesorInterno = (req, res) => {
    const id_anteproyecto = req.body.id_anteproyecto,
        id_asesor_interno = req.body.id_asesor_interno;
    Anteproyecto.update({id_asesor_interno}, {where: {id: id_anteproyecto}})
        .then(anteproyecto => {
            // console.log('=>',departamento)
            res.status(200).json(anteproyecto)
        }).catch(Sequelize.ValidationError, (err) => {
            var errores = err.errors.map((element) => {
                return `${element.path}: ${element.message}`
            })
            // console.log('==>', errores)
            res.status(202).json({errores})
        }).catch((err) => {
            console.log(err)
            res.status(406).json({err: err})
        })
}
module.exports.setDictamen = (req, res) => {
    const id_anteproyecto = req.body.id_anteproyecto,
        dictamen = req.body.dictamen;

    Anteproyecto.update({dictamen}, {where: {id: id_anteproyecto}})
        .then(anteproyecto => {
            // console.log('=>',departamento)
            res.status(200).json(anteproyecto)
        }).catch(Sequelize.ValidationError, (err) => {
            var errores = err.errors.map((element) => {
                return `${element.path}: ${element.message}`
            })
            // console.log('==>', errores)
            res.status(202).json({errores})
        }).catch((err) => {
            console.log(err)
            res.status(406).json({err: err})
        })
}

module.exports.addFactibilidadCorrecciones = (req, res) => {
    const id_docente = req.body.id_docente,
        id_anteproyecto = req.body.id_anteproyecto,
        comentario = req.body.comentario,
        correo_alumno= req.body.correo_alumno;

    revision_anteproyecto.upsert(
        {id_docente, id_anteproyecto, esFactible:'correccion', comentario}
    ).then(rev_anteproyecto => {
        // console.log('=>',departamento)
        // enviar correo con las corecciones al alumno
        const mailOptions = {
            from: 'seguimientoresidenciasitch@gmail.com',
            to: correo_alumno,
            subject: 'Un revisor ha hecho correcciones a su proyecto, favor de revisar y actualizarlo en el sistema',
            text: `correcciones: ${comentario}`
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if(err){
                console.error('EMAIL', err)
            }else{
                console.log('EMAIL', 'Correcciones enviadas!');
            }
        })
        res.status(200).json(rev_anteproyecto)
    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        // console.log('==>', errores)
        res.status(202).json({errores})
    }).catch((err) => {
        console.log(err)
        res.status(406).json({err: err})
    })
}

module.exports.addFactibilidad = (req, res) => {
    const id_docente = req.body.id_docente,
        id_anteproyecto = req.body.id_anteproyecto,
        esFactible = req.body.esFactible;
    revision_anteproyecto.upsert(
        {id_docente, id_anteproyecto, esFactible}
    ).then(rev_anteproyecto => {
        // console.log('=>',departamento)
        res.status(200).json(rev_anteproyecto)
    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        // console.log('==>', errores)
        res.status(202).json({errores})
    }).catch((err) => {
        console.log(err)
        res.status(406).json({err: err})
    })
}


module.exports.findByPeriodo = (req, res) => {
    const id_periodo = req.params.id_periodo;
    Anteproyecto.findAll({
            where: {id_periodo},
            include: [{model: revision_anteproyecto, as: 'revisiones', include: [{model: Docente, as:'docente'}]},{model: Alumno, as: 'alumno', include: [{model: Usuario, as: 'usuario'}]}, {model: asesor_externo, as: 'asesor_externo', include: [{model: Empresa, as: 'empresa'}] }]
        })
        .then(anteproyectos => {
            res.status(200).json(anteproyectos);
        }).catch(err => {
            console.log(err)
            res.status(406).json({err: err})
        })
}

module.exports.getAnteproyectoPDF = (req, res) => {
    const filename = req.params.filename;
    const ruta_pdf = path.join(__dirname, `../../storeFiles/anteproyectos/${filename}`)
    var pdf = fs.readFileSync(ruta_pdf);
    res.contentType("application/pdf");
    res.send(pdf);
}