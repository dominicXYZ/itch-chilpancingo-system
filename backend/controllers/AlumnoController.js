const Alumno = require('../models').Alumno;
const Periodo = require('../models').Periodo;
const Carrera = require('../models').Carrera;
const asesor_externo = require('../models').asesor_externo;
const Usuario = require('../models').Usuario;
const Docente = require('../models').Docente;


const Departamento = require('../models').Departamento;
const tipo_seguro = require('../models').tipo_seguro;
const Empresa = require('../models').Empresa;
const Anteproyecto = require('../models').Anteproyecto;
const Proyecto = require('../models').Proyecto;
const seguimiento_proyecto = require('../models').seguimiento_proyecto;
const observaciones = require('../models').observaciones;
const revision_anteproyecto = require('../models').revision_anteproyecto;
const Asesoria = require('../models').Asesoria;
const Actividad = require('../models').Actividad;
const solucion_recomendada = require('../models').solucion_recomendada;
const revision_seguimiento = require('../models').revision_seguimiento;
const Seguimiento = require('../models').Seguimiento;
const Sequelize = require('../models').Sequelize
const sequelize = require('../models').sequelize
const generator = require('generate-password');
const transporter = require('../../config/email');
const criterio = require('../models').criterio;
const criterio_evaluacion = require('../models').criterio_evaluacion;
const evaluacion = require('../models').evaluacion;
const cancelacion_proyecto = require('../models').cancelacion_proyecto;

const pdfs = require('../../config/pdfs');
const fs = require('fs');
const path = require('path');



// config upload files
const MAX_FILE_SIZE_ANTEPROYECTO = 10 * 1000 * 1000;
const multer = require('multer');
const uploadFileAnteproyecto = multer({
        dest: './storeFiles/anteproyectos', 
        limits: {fileSize: MAX_FILE_SIZE_ANTEPROYECTO, files: 1,}, 
        fileFilter: (req, file, cb) => (file.mimetype !== 'application/pdf')? cb(null, false, new Error('El archivo debe ser PDF')): cb(null, true) 
    }).single('fileAnteproyecto');

const uploadFilePlanTrabajo = multer({
    dest: './storeFiles/planes_de_trabajo',
    limits:  {fileSize: MAX_FILE_SIZE_ANTEPROYECTO, files: 1,}, 
    fileFilter: (req, file, cb) => (file.mimetype !== 'application/pdf')? cb(null, false, new Error('El archivo debe ser PDF')): cb(null, true)     
}).single('filePlanTrabajo');

const uploadFileCronograma = multer({
    dest: './storeFiles/cronogramas',
    limits:  {fileSize: MAX_FILE_SIZE_ANTEPROYECTO, files: 1,}, 
    fileFilter: (req, file, cb) => (file.mimetype !== 'application/pdf')? cb(null, false, new Error('El archivo debe ser PDF')): cb(null, true)     
}).single('fileCronograma');

module.exports.addCronograma = (req, res) => {
    const id_proyecto = req.params.id_proyecto;
    uploadFileCronograma(req, res, err => {
        if(err) {
            console.error(err);
            res.status(406).json(err);
        }else{
            sequelize.transaction(t => {
                return Proyecto.findOne({where: {id: id_proyecto}}, {transaction: t})
                    .then(_proyecto => {
                        // borramos el archivo del plan de trabajo si ya tiene uno
                        if(_proyecto.filename_cronograma){
                            fs.unlink(`./storeFiles/cronogramas/${_proyecto.filename_cronograma}`);
                        }
                        return Proyecto.update({filename_cronograma: req.file.filename}, {where: {id: id_proyecto}}, {transaction: t});
                    })
            }).then((_proyecto)=>{
                // console.log('success=======>    ', result)
                res.status(200).json(_proyecto)
            }).catch(Sequelize.ValidationError, (err) => {
                var errores = err.errors.map((element) => {
                    return `${element.path}: ${element.message}`
                })
                // console.log('==>', errores)
                res.status(202).json({errores})
            }).catch((err) => {
                res.status(406).json({err: err})
            }) 
        }
    })
}
module.exports.addFilePlanTrabajo = (req, res) => {
    const id_proyecto = req.params.id_proyecto;
    uploadFilePlanTrabajo(req, res, err => {
        if(err) {
            console.error(err);
            res.status(406).json(err);
        }else{
            sequelize.transaction(t => {
                return Proyecto.findOne({where: {id: id_proyecto}}, {transaction: t})
                    .then(_proyecto => {
                        // borramos el archivo del plan de trabajo si ya tiene uno
                        if(_proyecto.filename_plan_trabajo){
                            fs.unlink(`./storeFiles/planes_de_trabajo/${_proyecto.filename_plan_trabajo}`);
                        }
                        return Proyecto.update({filename_plan_trabajo: req.file.filename}, {where: {id: id_proyecto}}, {transaction: t});
                    })
            }).then((_proyecto)=>{
                // console.log('success=======>    ', result)
                res.status(200).json(_proyecto)
            }).catch(Sequelize.ValidationError, (err) => {
                var errores = err.errors.map((element) => {
                    return `${element.path}: ${element.message}`
                })
                // console.log('==>', errores)
                res.status(202).json({errores})
            }).catch((err) => {
                res.status(406).json({err: err})
            }) 
        }
    })
}

module.exports.addFileAnteproyecto = (req, res) => {
    const id_anteproyecto = req.params.id_anteproyecto;
    uploadFileAnteproyecto(req, res, (err => {
        if(err){
            console.error(err);
            res.status(406).json(err);
        }else{
            sequelize.transaction((t) => {
                return Anteproyecto.findOne({where: {id: id_anteproyecto}}, {transaction: t})
                .then(anteproyecto_record => {
                    // borramos el archivo del anteproyecto q ya tiene jejej
                    if(anteproyecto_record.path_file_anteproyecto){
                        console.log('ya existe el anteproyecto=========== lo borramos cues')
                        fs.unlink(`./storeFiles/anteproyectos/${anteproyecto_record.path_file_anteproyecto}`);
                    }
                    // console.log(req.file)
                    // console.log(anteproyecto_record)
                    return Anteproyecto.update({path_file_anteproyecto: req.file.filename},{where: {id: id_anteproyecto}}, {transaction: t});
                })
            }).then((anteproyecto)=>{
                // console.log('success=======>    ', result)
                res.status(200).json(anteproyecto)
            }).catch(Sequelize.ValidationError, (err) => {
                var errores = err.errors.map((element) => {
                    return `${element.path}: ${element.message}`
                })
                console.log('==>', errores)
                res.status(202).json({errores})
            }).catch((err) => {
                res.status(406).json({err: err})
            }) 
            
            // res.status(200).json({fileName: req.fileName})
            // console.log(req.file);
        }

    }));
    // console.log(req);
}

module.exports.getPlanDeTrabajoPDF = (req, res) => {
    const filename = req.params.filename;
    const ruta_pdf = path.join(__dirname, `../../storeFiles/planes_de_trabajo/${filename}`)
    var pdf = fs.readFileSync(ruta_pdf);
    res.contentType("application/pdf");
    res.send(pdf);
}

module.exports.getCronogramaPDF = (req, res) => {
    const filename = req.params.filename;
    const ruta_pdf = path.join(__dirname, `../../storeFiles/cronogramas/${filename}`)
    var pdf = fs.readFileSync(ruta_pdf);
    res.contentType("application/pdf");
    res.send(pdf);
}

module.exports.justificacionCancelacionProyecto = (req, res) => {
    const id_cancelacion = req.body.id_cancelacion,
        justificacion = req.body.justificacion;
    cancelacion_proyecto.update({justificacion},{where: {id: id_cancelacion}})
        .then((_cancelacion)=>{
            res.status(200).json(_cancelacion);
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
module.exports.cancelacionProyecto = (req, res) => {
    const id_alumno = req.body.id_alumno;
    sequelize.transaction(t => {
        return Anteproyecto.findOne({where: {id_alumno}},{transaction: t})
            .then(_anteproyecto => {
                return cancelacion_proyecto.create({
                    id_alumno,
                    id_asesor_interno: _anteproyecto.id_asesor_interno,
                    id_periodo: _anteproyecto.id_periodo,
                    nombre_proyecto: _anteproyecto.nombre
                }, {transaction: t}).then(_cancelacion => {
                    return Anteproyecto.destroy({where: {id_alumno}}, {transaction: t})
                })
            })
    }).then((_anteproyecto)=>{
        res.status(200).json(_anteproyecto);
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
module.exports.retryAnteproyecto = (req, res) => {
    const id_alumno = req.body.id_alumno,
        id_periodo = req.body.id_periodo;
    sequelize.transaction(t => {
        return Alumno.findOne({where: {id: id_alumno}}, {transaction: t})
            .then(_alumno => {
                return Usuario.update({rol: 'candidato_residente'}, {where: {id: _alumno.id_usuario}}, {transaction: t})
                    .then( _usuario => {
                        return Anteproyecto.create({
                            id_alumno,
                            id_periodo
                        },{transaction: t})
                    })
            })
    }).then((_anteproyecto)=>{
        res.status(200).json(_anteproyecto);
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

    // Anteproyecto.create({
    //         id_alumno,
    //         id_periodo
    //     }).then((_anteproyecto)=>{
    //     res.status(200).json(_anteproyecto)
    // }).catch(Sequelize.ValidationError, (err) => {
    //     var errores = err.errors.map((element) => {
    //         return `${element.path}: ${element.message}`
    //     })
    //     // console.log('==>', errores)
    //     res.status(202).json({errores})
    // }).catch((err) => {
    //     console.log(err)
    //     res.status(406).json({err: err})
    // }) 
    
}
module.exports.findAllRechazadosPorCarrera = (req, res) => {
    const id_carrera = req.params.id_carrera;
    // console.log('entaaa')
    Alumno.findAll({
        where: {
            id_carrera,
            id: {
                $notIn: [sequelize.literal(`select anteproyectos.id_alumno from anteproyectos join periodos on anteproyectos.id_periodo=periodos.id where periodos.id_carrera=${id_carrera}`)]
            }
        }
    }).then(_alumnos => {
        // console.log('ress', _alumnos)
        res.status(200).json({_alumnos})
    }).catch(err => {
        console.log(err)
        res.status(406).json({err: err})
    })
}
module.exports.updateDatosAnteproyecto = (req, res) => {
    const id_anteproyecto = req.params.id,
            id_asesor_externo = req.body.id_asesor_externo,
            id_asesor_interno=req.body.id_asesor_interno,
            nombre = req.body.nombre,
            origen = req.body.origen,
            objetivo_general = req.body.objetivo_general
            tipo= req.body.tipo;
    Anteproyecto.update({id_asesor_externo, id_asesor_interno, nombre, objetivo_general, origen, tipo}, {where: {id: id_anteproyecto}})
        .then((anteproyecto)=>{
            // console.log('success=======>    ', result)
            res.status(200).json(anteproyecto)
        }).catch(Sequelize.ValidationError, (err) => {
            var errores = err.errors.map((element) => {
                return `${element.path}: ${element.message}`
            })
            // console.log('==>', errores)
            res.status(202).json({errores})
        }).catch((err) => {
            res.status(406).json({err: err})
        })  
}


module.exports.getAnteproyecto = (req, res) => {
    const id_alumno = req.params.id;
    Anteproyecto.findOne({where: {id_alumno}, include: [{model: revision_anteproyecto, as: 'revisiones', include: [{model: Docente, as: 'docente'}]},{model: Alumno, as: 'alumno'}, {model: Periodo, as: 'periodo'}, {model: asesor_externo, as: 'asesor_externo'}]})
        .then(anteproyecto => {
            res.status(200).json(anteproyecto);
        }).catch(err => {
            console.log(err)
            res.status(406).json({err: err})
        })
}
//                     include: [{model: Anteproyecto, as: 'anteproyecto', include: [{model: revision_anteproyecto, as: 'revisiones', include: [{model: Docente, as: 'docente'}]},{model: Alumno, as: 'alumno'}, {model: Periodo, as: 'periodo'}, {model: asesor_externo, as: 'asesor_externo'}] }]

module.exports.getCancelacionProyecto = (req, res) => {
    const id_alumno = req.params.id_alumno;
    cancelacion_proyecto.findOne({where: {id_alumno}, include: [{model: Alumno, as: 'alumno',}, {model: Docente, as: 'asesor_interno'}, {model: Periodo, as: 'periodo'}]})
        .then(_cancelacion => {
            res.status(200).json(_cancelacion)
        }).catch((err) => {
            console.log(err)
            res.status(406).json({err: err})
        })
}
module.exports.generarFormatoDeCancelacion = (req, res) => {
    const id_cancelacion = req.params.id_cancelacion;
    cancelacion_proyecto.findOne({where: {id: id_cancelacion}, include: [{model: Alumno, as: 'alumno', include: [{model: Carrera, as: 'carrera', include: [{model: Departamento, as: 'departamento', include: [{model: Docente, as: 'docentes', include: [{model: Usuario, as: 'usuario', where: {rol: 'jefe_departamento'} }]}]}]}]}, {model: Docente, as: 'asesor_interno'}, {model: Periodo, as: 'periodo'}]})
        .then(_cancelacion => {
            pdfs.generarFormatoDeCancelacion(_cancelacion, res);
        }).catch((err) => {
            console.log(err)
            res.status(406).json({err: err})
        })
}

module.exports.generarSolicitudDeResidencia = (req, res) => {
    const id_alumno = req.params.id_alumno;
    sequelize.transaction(t => {
        return Anteproyecto.findOne({where: {id_alumno}, include: [{model: asesor_externo, as: 'asesor_externo', include: [{model: Empresa, as: 'empresa'}]},{model: Periodo, as: 'periodo'},{model: Alumno, as: 'alumno', include: [{model: tipo_seguro, as: 'seguro'},{model: Usuario, as: 'usuario'},{model: Carrera, as: 'carrera'}]}]}, {transaction: t})
        .then(_anteproyecto => {
            return  Departamento.findOne({where: {nombre: 'Division de estudios profesionales'}, include: [{model: Docente, as: 'docentes', include: [{model: Usuario, as: 'usuario', where: {rol: 'jefe_departamento'}}]}]}, {transaction: t})
                .then(division_estudios => {
                    pdfs.generarSolicitudDeResidencia(_anteproyecto, division_estudios,res);
                })
        })
    }).catch(err => {
        console.log(err);
        res.status(406).json({err: err});
    })
}
module.exports.get_Proyecto = (req, res) => {
    const id_alumno = req.params.id;
    sequelize.transaction( t => {
        return Anteproyecto.findOne({where: {id_alumno: id_alumno}}, {transaction: t})
            .then(_anteproyecto => {
                // console.log('========>', _anteproyecto)
                return Proyecto.findOrCreate({
                    where: {id_anteproyecto: _anteproyecto.id},
                    include: [{model: seguimiento_proyecto, as: 'seguimientos_proyecto', include: [{model: Seguimiento, as: 'seguimiento'},{model: revision_seguimiento, as: 'revisiones_seguimiento', include: [{model: Docente, as: 'docente'}]}]},{model: Asesoria, as: 'asesorias', include: {model: solucion_recomendada, as: 'soluciones_recomendadas'}}, {model: observaciones, as: 'observaciones'},{model: Anteproyecto, as: 'anteproyecto', include: [{model: revision_anteproyecto, as: 'revisiones', include: [{model: Docente, as: 'docente'}]},{model: Alumno, as: 'alumno'}, {model: Periodo, as: 'periodo'}, {model: asesor_externo, as: 'asesor_externo'}] }],                    
                    transaction: t
                }).spread((proyecto_find, created) => {
                    if(created){
                        // buscar el proyecto :c
                        return Proyecto.findOne({
                            where: {id_anteproyecto: _anteproyecto.id},
                            include: [{model: seguimiento_proyecto, as: 'seguimientos_proyecto', include: [{model: Seguimiento, as: 'seguimiento'},{model: revision_seguimiento, as: 'revisiones_seguimiento', include: [{model: Docente, as: 'docente'}]}]},{model: Asesoria, as: 'asesorias', include: {model: solucion_recomendada, as: 'soluciones_recomendadas'}},{model: observaciones, as: 'observaciones'},{model: Anteproyecto, as: 'anteproyecto', include: [{model: revision_anteproyecto, as: 'revisiones', include: [{model: Docente, as: 'docente'}]},{model: Alumno, as: 'alumno'}, {model: Periodo, as: 'periodo'}, {model: asesor_externo, as: 'asesor_externo'}] }],                    
                        }, {transaction: t})
                    }else {
                        return proyecto_find;
                    }
                });
            })

    }).then((_proyecto)=>{
        res.status(200).json(_proyecto)
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
module.exports.getProyectoFindOrCreate = (req, res) => {
    const id_alumno = req.params.id;
    sequelize.transaction( t => {
        return Anteproyecto.findOne({where: {id_alumno: id_alumno}}, {transaction: t})
            .then(_anteproyecto => {
                // console.log('========>', _anteproyecto)
                return Proyecto.findOrCreate({
                    where: {id_anteproyecto: _anteproyecto.id},
                    include: [{model: evaluacion, as: 'evaluacion_asesor_interno', include: [{model: criterio_evaluacion, as: 'criterios_de_evaluacion', include: [{model: criterio, as: 'ref_criterio'}]}]},{model: evaluacion, as: 'evaluacion_asesor_externo', include: [{model: criterio_evaluacion, as: 'criterios_de_evaluacion', include: [{model: criterio, as: 'ref_criterio'}]}]},{model: seguimiento_proyecto, as: 'seguimientos_proyecto', include: [{model: evaluacion, as: 'evaluacion_asesor_externo', include: [{model: criterio_evaluacion, as: 'criterios_de_evaluacion', include: [{model: criterio, as: 'ref_criterio'}]}]},{model: evaluacion, as: 'evaluacion_asesor_interno', include: [{model: criterio_evaluacion, as: 'criterios_de_evaluacion', include: [{model: criterio, as: 'ref_criterio'}]}]},{model: Seguimiento, as: 'seguimiento'},{model: revision_seguimiento, as: 'revisiones_seguimiento', include: [{model: Docente, as: 'docente'}]}]},{model: Asesoria, as: 'asesorias', include: {model: solucion_recomendada, as: 'soluciones_recomendadas'}},{model: observaciones, as: 'observaciones'},{model: Anteproyecto, as: 'anteproyecto', include: [{model: revision_anteproyecto, as: 'revisiones', include: [{model: Docente, as: 'docente'}]},{model: Alumno, as: 'alumno'}, {model: Periodo, as: 'periodo'}, {model: asesor_externo, as: 'asesor_externo'}] }],                    
                    transaction: t
                }).spread((proyecto_find, created) => {
                    if(created){
                        // buscar el proyecto :c
                        return Proyecto.findOne({
                            where: {id_anteproyecto: _anteproyecto.id},
                            include: [{model: seguimiento_proyecto, as: 'seguimientos_proyecto', include: [{model: Seguimiento, as: 'seguimiento'},{model: revision_seguimiento, as: 'revisiones_seguimiento', include: [{model: Docente, as: 'docente'}]}]},{model: Anteproyecto, as: 'anteproyecto', include: [{model: revision_anteproyecto, as: 'revisiones', include: [{model: Docente, as: 'docente'}]},{model: Alumno, as: 'alumno'}, {model: Periodo, as: 'periodo'}, {model: asesor_externo, as: 'asesor_externo'}] }],                    
                        }, {transaction: t})
                    }else {
                        return proyecto_find;
                    }
                });
            })

    }).then((_proyecto)=>{
        res.status(200).json(_proyecto)
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
module.exports.getProyectoAsesorExterno = (req, res) => {
    const id_proyecto = req.params.id_proyecto;
    // console.log('AQUINOMAS');
    Proyecto.findOne({
        where: {id: id_proyecto},
        include: [{model: evaluacion, as: 'evaluacion_asesor_externo', include: [{model: criterio_evaluacion, as: 'criterios_de_evaluacion', include: [{model: criterio, as: 'ref_criterio'}]}]},{model: seguimiento_proyecto, as: 'seguimientos_proyecto', include: [{model: evaluacion, as: 'evaluacion_asesor_externo', include: [{model: criterio_evaluacion, as: 'criterios_de_evaluacion', include: [{model: criterio, as: 'ref_criterio'}]}]} , {model: Seguimiento, as: 'seguimiento'}]},{model: Anteproyecto, as: 'anteproyecto', include: [{model: Alumno, as: 'alumno'}, {model: Periodo, as: 'periodo'}]}]
    }).then(_proyecto => {
        res.status(200).json(_proyecto)
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
module.exports.getProyectoAsesorInterno = (req, res) => {
    const id_proyecto = req.params.id_proyecto;
    // console.log('AQUINOMAS');
    Proyecto.findOne({
        where: {id: id_proyecto},
        include: [{model: evaluacion, as: 'evaluacion_asesor_interno', include: [{model: criterio_evaluacion, as: 'criterios_de_evaluacion', include: [{model: criterio, as: 'ref_criterio'}]}]},{model: seguimiento_proyecto, as: 'seguimientos_proyecto', include: [{model: evaluacion, as: 'evaluacion_asesor_interno', include: [{model: criterio_evaluacion, as: 'criterios_de_evaluacion', include: [{model: criterio, as: 'ref_criterio'}]}]} , {model: Seguimiento, as: 'seguimiento'}, {model: revision_seguimiento, as: 'revisiones_seguimiento', include: [{model: Docente, as: 'docente'}]}]}, {model: Asesoria, as: 'asesorias', include: {model: solucion_recomendada, as: 'soluciones_recomendadas'}}, {model: observaciones, as: 'observaciones'}, {model: Anteproyecto, as: 'anteproyecto', include: [{model: Alumno, as: 'alumno'}, {model: Periodo, as: 'periodo'}]}]
    }).then(_proyecto => {
        res.status(200).json(_proyecto)
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

module.exports.getProyectoRevisionSeguimientos = (req, res) => {
    const id_proyecto = req.params.id_proyecto;
    // console.log('AQUINOMAS');
    Proyecto.findOne({
        where: {id: id_proyecto},
        include: [{model: seguimiento_proyecto, as: 'seguimientos_proyecto', include: [{model: Seguimiento, as: 'seguimiento'}, {model: revision_seguimiento, as: 'revisiones_seguimiento', include: [{model: Docente, as: 'docente'}]}]}, {model: Asesoria, as: 'asesorias', include: {model: solucion_recomendada, as: 'soluciones_recomendadas'}}, {model: observaciones, as: 'observaciones'}, {model: Anteproyecto, as: 'anteproyecto', include: [{model: Alumno, as: 'alumno'}, {model: Periodo, as: 'periodo'}]}]
    }).then(_proyecto => {
        res.status(200).json(_proyecto)
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

module.exports.getProyectoRevisionSeguimientos2 = (req, res) => {
    const id_proyecto = req.params.id_proyecto;
    // console.log('AQUINOMAS');
    Proyecto.findOne({
        where: {id_anteproyecto: id_proyecto},
        include: [{model: seguimiento_proyecto, as: 'seguimientos_proyecto', include: [{model: Seguimiento, as: 'seguimiento'}, {model: revision_seguimiento, as: 'revisiones_seguimiento', include: [{model: Docente, as: 'docente'}]}]}, {model: Asesoria, as: 'asesorias', include: {model: solucion_recomendada, as: 'soluciones_recomendadas'}}, {model: observaciones, as: 'observaciones'}, {model: Anteproyecto, as: 'anteproyecto', include: [{model: Alumno, as: 'alumno'}, {model: Periodo, as: 'periodo'}]}]
    }).then(_proyecto => {
        res.status(200).json(_proyecto)
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

module.exports.getProyecto = (req, res) => {
    const id_alumno = req.params.id;
    sequelize.transaction( t => {
        return Anteproyecto.findOne({where: {id_alumno: id_alumno}}, {transaction: t})
            .then(_anteproyecto => {
                return Proyecto.findOne({
                    where: {id_anteproyecto: _anteproyecto.id},
                    include: [{model: evaluacion, as: 'evaluacion_asesor_interno', include: [{model: criterio_evaluacion, as: 'criterios_de_evaluacion', include: [{model: criterio, as: 'ref_criterio'}]}]},{model: evaluacion, as: 'evaluacion_asesor_externo', include: [{model: criterio_evaluacion, as: 'criterios_de_evaluacion', include: [{model: criterio, as: 'ref_criterio'}]}]},{model: seguimiento_proyecto, as: 'seguimientos_proyecto', include: [{model: evaluacion, as: 'evaluacion_asesor_externo', include: [{model: criterio_evaluacion, as: 'criterios_de_evaluacion', include: [{model: criterio, as: 'ref_criterio'}]}]},{model: evaluacion, as: 'evaluacion_asesor_interno', include: [{model: criterio_evaluacion, as: 'criterios_de_evaluacion', include: [{model: criterio, as: 'ref_criterio'}]}]},{model: Seguimiento, as: 'seguimiento'},{model: revision_seguimiento, as: 'revisiones_seguimiento', include: [{model: Docente, as: 'docente'}]}]},{model: Asesoria, as: 'asesorias', include: {model: solucion_recomendada, as: 'soluciones_recomendadas'}},{model: observaciones, as: 'observaciones'},{model: Anteproyecto, as: 'anteproyecto', include: [{model: revision_anteproyecto, as: 'revisiones', include: [{model: Docente, as: 'docente'}]},{model: Alumno, as: 'alumno'}, {model: Periodo, as: 'periodo'}, {model: asesor_externo, as: 'asesor_externo'}] }],                    
                    transaction: t
                })
            })
    }).then((_proyecto)=>{
        res.status(200).json(_proyecto)
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
module.exports.add = (req, res) => {
    const no_control = req.body.no_control,
        nombre = req.body.nombre,
        ap_paterno = req.body.ap_paterno,
        ap_materno = req.body.ap_materno,
        id_carrera = req.body.id_carrera,
        correo = req.body.correo,
        sexo = req.body.sexo,
        numero_celular = req.body.numero_celular,
        id_periodo = req.body.id_periodo,
        domicilio = req.body.domicilio,
        ciudad = req.body.ciudad,
        no_seguro = req.body.no_seguro,
        id_tipo_seguro = req.body.id_tipo_seguro,
        plan_estudios = req.body.plan_estudios;

    const contrasenia = generator.generate({length: 8});

    sequelize.transaction((t) => {
        return Usuario.create({
            correo,
            contrasenia: contrasenia,
            rol: 'candidato_residente',
            status: 'activo'
            
        }, {transaction: t}).then((usuario) => {
            return Alumno.create({
                no_control,
                nombre,
                ap_paterno,
                ap_materno,
                id_carrera,
                sexo,
                domicilio,
                ciudad,
                numero_celular,
                no_seguro,
                id_tipo_seguro,
                id_usuario: usuario.id,
                plan_estudios
            }, {transaction: t}).then(alumno => {
                return Anteproyecto.create({
                    id_alumno: alumno.id,
                    id_periodo: id_periodo
                },{transaction: t});
            })
        });
    }).then((alumno)=>{
        // console.log('success=======>    ', alumno)
        // enviar email con contraseña al alumno
        const mailOptions = {
            from: 'seguimientoresidenciasitch@gmail.com',
            to: correo,
            subject: 'Contraseña para acceder al sistema de seguimiento de residencias ITCH',
            text: `Usuario: ${correo}, contraseña: ${contrasenia}`
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if(err){
                console.error('EMAIL', err)
            }else{
                console.log('EMAIL', 'contraseña enviada!');
            }
        })
        res.status(200).json(alumno)
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