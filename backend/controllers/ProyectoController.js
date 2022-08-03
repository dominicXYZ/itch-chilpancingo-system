const Anteproyecto = require('../models').Anteproyecto;
const Proyecto = require('../models').Proyecto;
const Alumno = require('../models').Alumno;
const Usuario = require('../models').Usuario;
const asesor_externo = require('../models').asesor_externo;
const Empresa = require('../models').Empresa;
const Periodo = require('../models').Periodo;
const observaciones = require('../models').observaciones;
const Asesoria = require('../models').Asesoria;
const solucion_recomendada = require('../models').solucion_recomendada;
const Carrera = require('../models').Carrera;
const Departamento = require('../models').Departamento;
const Docente = require('../models').Docente;
const seguimiento_proyecto = require('../models').seguimiento_proyecto;
const revision_seguimiento = require('../models').revision_seguimiento;
const Seguimiento = require('../models').Seguimiento;
const criterio = require('../models').criterio;
const criterio_evaluacion = require('../models').criterio_evaluacion;
const evaluacion = require('../models').evaluacion;

const Sequelize = require('../models').Sequelize
const sequelize = require('../models').sequelize
const pdfs = require('../../config/pdfs');

const generateHash = (contrasenia) => {
  return bCrypt.hashSync(contrasenia, bCrypt.genSaltSync(8), null);
}

module.exports.getProyectosByAsesorInterno = (req, res) => {
    const id_asesor_interno = req.params.id_asesor_interno;
    Proyecto.findAll({ 
        include: [{model: Anteproyecto, as: 'anteproyecto', where: {id_asesor_interno}, include: [{model: Periodo, as: 'periodo'},{model: Alumno, as: 'alumno', include: [{model: Usuario, as: 'usuario'}]}, {model: asesor_externo, as: 'asesor_externo', include: [{model: Empresa, as: 'empresa'}] }]}]
    })
    .then(proyectos => {
        res.status(200).json(proyectos);
    }).catch(err => {
        console.log(err)
        res.status(406).json({err: err})
    })
}
module.exports.getProyectosByAsesorExterno = (req, res) => {
    const id_asesor_externo = req.params.id_asesor_externo;
    Proyecto.findAll({ 
        include: [{model: Anteproyecto, as: 'anteproyecto', where: {id_asesor_externo}, include: [{model: Periodo, as: 'periodo'},{model: Alumno, as: 'alumno', include: [{model: Usuario, as: 'usuario'}]}, {model: asesor_externo, as: 'asesor_externo', include: [{model: Empresa, as: 'empresa'}] }]}]
    })
    .then(proyectos => {
        res.status(200).json(proyectos);
    }).catch(err => {
        console.log(err)
        res.status(406).json({err: err})
    })
}
module.exports.updateTipoAsesoria = (req, res) => {
    const id_asesoria = req.body.id_asesoria,
        tipo = req.body.tipo;
    Asesoria.update({tipo}, {where: {id: id_asesoria}})
        .then((_asesoria)=>{
            // console.log('success=======>    ', result)
            res.status(200).json(_asesoria)
        }).catch(Sequelize.ValidationError, (err) => {
            var errores = err.errors.map((element) => {
                return `${element.path}: ${element.message}`
            })
            // console.log('==>', errores)
            res.status(202).json({errores})
        }).catch((err) => {
            console.log(err);
            res.status(406).json({err: err})
        })
}
module.exports.updateAutorizarFormatoAsesoria = (req, res) => {
    const id_asesoria = req.body.id_asesoria,
        permitir_generar_formato = req.body.permitir_generar_formato;

    Asesoria.update({permitir_generar_formato}, {where: {id: id_asesoria}})
        .then((_asesoria)=>{
            // console.log('success=======>    ', result)
            res.status(200).json(_asesoria)
        }).catch(Sequelize.ValidationError, (err) => {
            var errores = err.errors.map((element) => {
                return `${element.path}: ${element.message}`
            })
            // console.log('==>', errores)
            res.status(202).json({errores})
        }).catch((err) => {
            console.log(err);
            res.status(406).json({err: err})
        }) 

    
}
module.exports.addAsesoria = (req, res) => {
    const id_proyecto = req.body.id_proyecto,
        id_asesor_interno = req.body.id_asesor_interno,
        fecha = req.body.fecha,
        url_avance = req.body.url_avance,
        temas_a_asesorar = req.body.temas_a_asesorar;
    // console.log(')===========>', req.body)
    Asesoria.create({
        id_proyecto,
        id_asesor_interno,
        fecha,
        url_avance,
        temas_a_asesorar
    }).then((_asesoria)=>{
        res.status(200).json(_asesoria);
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
module.exports.findObservaciones = (req, res) => {
    const id_proyecto = req.params.id_proyecto;

    observaciones.findAll({
        where: {
            id_proyecto,
        }
    }).then(_observaciones => {
        res.status(200).json(_observaciones);
    }).catch(err => {
        console.log(err)
        res.status(406).json({err: err})
    })
}

module.exports.generarFormatoDeAsesoria = (req, res) => {
    const id_asesoria = req.params.id_asesoria;
    Asesoria.findOne({
        where: {id: id_asesoria},
        include: [{model: solucion_recomendada, as: 'soluciones_recomendadas'},{model: Proyecto, as:'proyecto', include: [{model: Anteproyecto, as: 'anteproyecto', include: [{model: Docente, as: 'asesor_interno'},{model: asesor_externo, as: 'asesor_externo', include: [{model: Empresa, as: 'empresa'}]},{model: Alumno, as: 'alumno'},{model: Periodo, as: 'periodo', include: [{model: Carrera, as: 'carrera', include: [{model: Departamento, as: 'departamento'}]}]}]}]}]
    }).then(_asesoria => {
        pdfs.generarFormatoAsesoria(_asesoria, res);
    }).catch(err => {
        console.log(err)
        res.status(406).json({err: err})
    })
}

module.exports.generarCartaLiberacionAsesorInterno = (req, res) => {
    const id_proyecto = req.params.id_proyecto;
    Proyecto.findOne({
        where: {id: id_proyecto},
        include: [{model: Anteproyecto, as: 'anteproyecto', include: [{model: Docente, as: 'asesor_interno'},{model: asesor_externo, as: 'asesor_externo'},{model: Alumno, as: 'alumno'},{model: Periodo, as: 'periodo', include: [{model: Carrera, as: 'carrera', include: [{model: Departamento, as: 'departamento', include: [{model: Docente, as: 'docentes', include: [{model: Usuario, as: 'usuario', where: {rol: 'jefe_departamento'} }]  }]}]}]}]}]
    }).then(_proyecto => {
        pdfs.generarCartaLiberacionAsesorInterno(_proyecto, res);
    }).catch(err => {
        console.log(err)
        res.status(406).json({err: err})
    })
}
module.exports.generarCartaLiberacionAsesorExterno = (req, res) => {
    const id_proyecto = req.params.id_proyecto;
    sequelize.transaction(t => {
        return Proyecto.findOne({
            where: {id: id_proyecto},
            include: [{model: Anteproyecto, as: 'anteproyecto', include: [{model: Docente, as: 'asesor_interno'},{model: asesor_externo, as: 'asesor_externo'},{model: Alumno, as: 'alumno'},{model: Periodo, as: 'periodo', include: [{model: Carrera, as: 'carrera', include: [{model: Departamento, as: 'departamento', include: [{model: Docente, as: 'docentes', include: [{model: Usuario, as: 'usuario', where: {rol: 'jefe_departamento'} }]  }]}]}]}]}]
        }, {transaction: t}).then(_proyecto => {
            return  Departamento.findOne({where: {nombre: 'Gestión tecnológica y vinculación'}, include: [{model: Docente, as: 'docentes', include: [{model: Usuario, as: 'usuario', where: {rol: 'jefe_departamento'}}]}]}, {transaction: t})
            .then(depto_vinculacion => {
                pdfs.generarCartaLiberacionAsesorExterno(_proyecto, depto_vinculacion, res);
            })
        })
    }).catch(err => {
        console.log(err)
        res.status(406).json({err: err})
    })
}
module.exports.generarFormatoDeEvaluacionAnexoIII = (req, res) => {
    const id_proyecto = req.params.id_proyecto;
    Proyecto.findOne({
        where: {id: id_proyecto},
        include: [{model: evaluacion, as: 'evaluacion_asesor_externo', include: [{model: criterio_evaluacion, as: 'criterios_de_evaluacion', include: [{model: criterio, as: 'ref_criterio'}]}]},{model: evaluacion, as: 'evaluacion_asesor_interno', include: [{model: criterio_evaluacion, as: 'criterios_de_evaluacion', include: [{model: criterio, as: 'ref_criterio'}]}]},{model: Anteproyecto, as: 'anteproyecto', include: [{model: Docente, as: 'asesor_interno'},{model: asesor_externo, as: 'asesor_externo'},{model: Alumno, as: 'alumno'},{model: Periodo, as: 'periodo', include: [{model: Carrera, as: 'carrera'}]}]}]
    }).then(_proyecto => {
        pdfs.generarFormatoEvaluacionAnexoIII(_proyecto, res);
    }).catch(err => {
        console.log(err)
        res.status(406).json({err: err})
    })
}

module.exports.generarFormatoDeEvaluacionAnexoXXX = (req, res) => {
    const id_proyecto = req.params.id_proyecto;
    Proyecto.findOne({
        where: {id: id_proyecto},
        include: [{model: evaluacion, as: 'evaluacion_asesor_externo', include: [{model: criterio_evaluacion, as: 'criterios_de_evaluacion', include: [{model: criterio, as: 'ref_criterio'}]}]},{model: evaluacion, as: 'evaluacion_asesor_interno', include: [{model: criterio_evaluacion, as: 'criterios_de_evaluacion', include: [{model: criterio, as: 'ref_criterio'}]}]},{model: Anteproyecto, as: 'anteproyecto', include: [{model: Docente, as: 'asesor_interno'},{model: asesor_externo, as: 'asesor_externo'},{model: Alumno, as: 'alumno'},{model: Periodo, as: 'periodo', include: [{model: Carrera, as: 'carrera'}]}]}]
    }).then(_proyecto => {
        pdfs.generarFormatoDeEvaluacionDeResidenciaAnexoXXX(_proyecto, res);
    }).catch(err => {
        console.log(err)
        res.status(406).json({err: err})
    })
}
module.exports.generarFormatoDeEvaluacionAnexoXXIX = (req, res) => {
    const id_seguimiento = req.params.id_seguimiento;
    seguimiento_proyecto.findOne({
        where: {id: id_seguimiento},
        include: [{model: evaluacion, as: 'evaluacion_asesor_interno', include: [{model: criterio_evaluacion, as: 'criterios_de_evaluacion', include: [{model: criterio, as: 'ref_criterio'}]}]},{model: evaluacion, as: 'evaluacion_asesor_externo', include: [{model: criterio_evaluacion, as: 'criterios_de_evaluacion', include: [{model: criterio, as: 'ref_criterio'}]}]},{model: Proyecto, as: 'proyecto', include: [{model: Anteproyecto, as: 'anteproyecto', include: [{model: asesor_externo, as: 'asesor_externo'},{model: Docente, as: 'asesor_interno'},{model: Alumno, as: 'alumno'}, {model: Periodo, as: 'periodo', include: [{model: Carrera, as: 'carrera'}]}]}]}]
    }).then(_seguimiento => {
        pdfs.generarFormatoEvaluacionDeSeguimientoAnexoXXIX(_seguimiento, res);
    }).catch(err => {
        console.log(err)
        res.status(406).json({err: err})
    })
}
module.exports.findAsesorias = (req, res) => {
    const id_proyecto = req.params.id_proyecto;

    Asesoria.findAll({
        where: {
            id_proyecto
        }
    }).then(asesorias => {
        res.status(200).json(asesorias);
    }).catch(err => {
        console.log(err)
        res.status(406).json({err: err})
    })
}
module.exports.findSeguimientos = (req, res) => {
    const id_proyecto = req.params.id_proyecto;
    seguimiento_proyecto.findAll({
        where: {id_proyecto},
        include: [{model: evaluacion, as: 'evaluacion_asesor_externo', include: [{model: criterio_evaluacion, as: 'criterios_de_evaluacion', include: [{model: criterio, as: 'ref_criterio'}]}]},{model: evaluacion, as: 'evaluacion_asesor_interno', include: [{model: criterio_evaluacion, as: 'criterios_de_evaluacion', include: [{model: criterio, as: 'ref_criterio'}]}]},{model: Proyecto, as: 'proyecto', include: [{model: Anteproyecto, as: 'anteproyecto', include: [{model: Alumno, as: 'alumno'}]}]},{model: revision_seguimiento, as: 'revisiones_seguimiento', include: [{model: Docente, as: 'docente'}]},{model: Seguimiento, as: 'seguimiento'}],
    }).then(seguimientos_proyecto => {
        res.status(200).json(seguimientos_proyecto);
    }).catch(err => {
        console.log(err)
        res.status(406).json({err: err})
    })
}

module.exports.getCriteriosEvaluacionAnexoIIIAsesorInterno = (req, res) => {
    criterio.findAll({where: {tipo: 'asesor_interno', anexo: 'III'}})
        .then(criterios => {
            res.status(200).json(criterios);
        }).catch(err => {
            console.log(err)
            res.status(406).json({err: err})
        })
}
module.exports.getCriteriosEvaluacionAnexoIIIAsesorExterno = (req, res) => {
    criterio.findAll({where: {tipo: 'asesor_externo', anexo: 'III'}})
        .then(criterios => {
            res.status(200).json(criterios);
        }).catch(err => {
            console.log(err)
            res.status(406).json({err: err})
        })
}
module.exports.getCriteriosEvaluacionAnexoXXXAsesorExterno = (req, res) => {
    criterio.findAll({where: {tipo: 'asesor_externo', anexo: 'XXX'}})
        .then(criterios => {
            res.status(200).json(criterios);
        }).catch(err => {
            console.log(err)
            res.status(406).json({err: err})
        })
}
module.exports.getCriteriosEvaluacionAnexoXXXAsesorInterno = (req, res) => {
    criterio.findAll({where: {tipo: 'asesor_interno', anexo: 'XXX'}})
        .then(criterios => {
            res.status(200).json(criterios);
        }).catch(err => {
            console.log(err)
            res.status(406).json({err: err})
        })
}
module.exports.getCriteriosEvaluacionAnexoXXIXAsesorExterno = (req, res) => {
    criterio.findAll({where: {tipo: 'asesor_externo', anexo: 'XXIX'}})
        .then(criterios => {
            res.status(200).json(criterios);
        }).catch(err => {
            console.log(err)
            res.status(406).json({err: err})
        })
}
module.exports.getCriteriosEvaluacionAnexoXXIXAsesorInterno = (req, res) => {
    criterio.findAll({where: {tipo: 'asesor_interno', anexo: 'XXIX'}})
        .then(criterios => {
            res.status(200).json(criterios);
        }).catch(err => {
            console.log(err)
            res.status(406).json({err: err})
        })
}
module.exports.findOrCreateSeguimientos = (req, res) => {
    const id_proyecto = req.body.id_proyecto,
        id_periodo = req.body.id_periodo;
    console.log(req.body)
    sequelize.transaction(t => {
        return Seguimiento.findAll({
            where: {id_periodo}
        }, {transaction: t}).then(_seguimientos => {
            // console.log('busca seguimeibtnp', _seguimientos)
            return sequelize.Promise.map(_seguimientos, (_seguimiento) => {
                // console.log('el map')
                return seguimiento_proyecto.findOrCreate({
                    where: {
                        id_seguimiento: _seguimiento.id,
                        id_proyecto: id_proyecto
                    },
                    include: [{model: Proyecto, as: 'proyecto', include: [{model: Anteproyecto, as: 'anteproyecto', include: [{model: Alumno, as: 'alumno'}, {model: Periodo, as: 'periodo'}]}]},{model: revision_seguimiento, as: 'revisiones_seguimiento', include: [{model: Docente, as: 'docente'}]},{model: Seguimiento, as: 'seguimiento'}],
                     transaction: t
                })
            })
        })
    }).then((seguimientos)=>{
        // console.log('success=======>    ', result)
        res.status(200).json(seguimientos)
    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        // console.log('==>', errores)
        res.status(202).json({errores})
    }).catch((err) => {
        console.log(err);
        res.status(406).json({err: err})
    })

}
module.exports.findSolucionesRecomendadas = (req, res) => {
    const id_asesoria = req.params.id_asesoria;
    
    solucion_recomendada.findAll({
        where: {id_asesoria}
    }).then(soluciones => {
        res.status(200).json(soluciones);
    }).catch(err => {
        console.log(err)
        res.status(406).json({err: err})
    })
}
module.exports.updateObservacion = (req, res) => {
    const id_observacion = req.body.id_observacion,
        solucionada = req.body.solucionada;

    observaciones.update({
        solucionada
    },{where: {id: id_observacion}}).then((_observacion)=>{
        // console.log('success=======>    ', result)
        res.status(200).json(_observacion)
    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        // console.log('==>', errores)
        res.status(202).json({errores})
    }).catch((err) => {
        console.log(err);
        res.status(406).json({err: err})
    }) 
}

module.exports.autorizarCartaDeLiberacionAsesorInterno = (req, res) => {
    const id_proyecto = req.body.id_proyecto,
        autorizar = req.body.autorizar;

    Proyecto.update({autorizar_carta_liberacion_asesor_interno: autorizar}, {where: {id: id_proyecto}})
        .then((_proyecto)=>{
            res.status(200).json(_proyecto);
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
module.exports.autorizarCartaDeLiberacionAsesorExterno = (req, res) => {
    const id_proyecto = req.body.id_proyecto,
        autorizar = req.body.autorizar;

    Proyecto.update({autorizar_carta_liberacion_asesor_externo: autorizar}, {where: {id: id_proyecto}})
        .then((_proyecto)=>{
            res.status(200).json(_proyecto);
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
module.exports.addObservacionSeguimiento = (req, res) => {
    const id_seguimiento_proyecto = req.body.id_seguimiento,
        id_docente = req.body.id_docente,
        observacion = req.body.observacion;
    revision_seguimiento.create({
        id_seguimiento_proyecto,
        id_docente,
        observacion,
    }).then((_observacion)=>{
        res.status(200).json(_observacion);
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
module.exports.addEvaluacionAsesorExterno = (req, res) => {
    const id_proyecto = req.body.id_proyecto,
        observaciones = req.body.observaciones,
        criterios_evaluacion = req.body.criterios_evaluacion,
        criterios = req.body.criterios;
        // console.log('=>>', criterios_evaluacion )
        // console.log('=>>', criterios )
    sequelize.transaction(t => {
        //Buscar proyecto
        return Proyecto.findOne({where: {id: id_proyecto}}, {transaction: t})
            .then(_proyecto => {
                // verificamos si ya existe una evaluacion
                if(_proyecto.id_evaluacion_asesor_externo === null){ // no existe, creamos evaluacion 
                    return evaluacion.create({tipo: 'asesor_externo', observaciones}, {transaction: t})
                        .then((_evaluacion) => {
                            // asociamos la evaluación con el proyecto
                            return _proyecto.update({id_evaluacion_asesor_externo: _evaluacion.id},{transaction: t})
                            .then(__proyecto => {
                                // creamos o actualizamos los criterios
                                return sequelize.Promise.map(criterios, (_criterio) => {

                                    return criterio_evaluacion.create({id_evaluacion: _evaluacion.id, id_criterio: _criterio.id,valor_de_evaluacion: criterios_evaluacion[_criterio.id]}, {transaction: t})
                                })   
                            })
                        })
                }else{ // ya existe solo actualizamos
                    return evaluacion.update({observaciones},{where: {id: _proyecto.id_evaluacion_asesor_externo}}, {transaction: t})
                        .then((updated) => {
                            return evaluacion.findOne({where: {id: _proyecto.id_evaluacion_asesor_externo}}, {transaction: t})
                                .then(_evaluacion => {
                                    // creamos o actualizamos los criterios
                                    return sequelize.Promise.map(criterios, (_criterio) => {
                                        return criterio_evaluacion.update({valor_de_evaluacion: criterios_evaluacion[_criterio.id]}, {where: {id_evaluacion: _evaluacion.id, id_criterio: _criterio.id}}, {transaction: t})
                                    })
                                })
                              
                        })
                }
                

            })
        
    }).then((evaluacion)=>{
        // console.log('success=======>    ', result)
        res.status(200).json(evaluacion)
    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        // console.log('==>', errores)
        res.status(202).json({errores})
    }).catch((err) => {
        console.log(err);
        res.status(406).json({err: err})
    })
}
module.exports.addEvaluacionAsesorInterno = (req, res) => {
    const id_proyecto = req.body.id_proyecto,
        observaciones = req.body.observaciones,
        criterios_evaluacion = req.body.criterios_evaluacion,
        criterios = req.body.criterios;
        // console.log('=>>', criterios_evaluacion )
        // console.log('=>>', criterios )
    sequelize.transaction(t => {
        //Buscar proyecto
        return Proyecto.findOne({where: {id: id_proyecto}}, {transaction: t})
            .then(_proyecto => {
                // verificamos si ya existe una evaluacion
                if(_proyecto.id_evaluacion_asesor_interno === null){ // no existe, creamos evaluacion 
                    return evaluacion.create({tipo: 'asesor_interno', observaciones}, {transaction: t})
                        .then((_evaluacion) => {
                            // asociamos la evaluación con el proyecto
                            return _proyecto.update({id_evaluacion_asesor_interno: _evaluacion.id},{transaction: t})
                            .then(__proyecto => {
                                // creamos o actualizamos los criterios
                                return sequelize.Promise.map(criterios, (_criterio) => {

                                    return criterio_evaluacion.create({id_evaluacion: _evaluacion.id, id_criterio: _criterio.id,valor_de_evaluacion: criterios_evaluacion[_criterio.id]}, {transaction: t})
                                })   
                            })
                        })
                }else{ // ya existe solo actualizamos
                    return evaluacion.update({observaciones},{where: {id: _proyecto.id_evaluacion_asesor_interno}}, {transaction: t})
                        .then((updated) => {
                            return evaluacion.findOne({where: {id: _proyecto.id_evaluacion_asesor_interno}}, {transaction: t})
                                .then(_evaluacion => {
                                    // creamos o actualizamos los criterios
                                    return sequelize.Promise.map(criterios, (_criterio) => {
                                        return criterio_evaluacion.update({valor_de_evaluacion: criterios_evaluacion[_criterio.id]}, {where: {id_evaluacion: _evaluacion.id, id_criterio: _criterio.id}}, {transaction: t})
                                    })
                                })
                              
                        })
                }
                

            })
        
    }).then((evaluacion)=>{
        // console.log('success=======>    ', result)
        res.status(200).json(evaluacion)
    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        // console.log('==>', errores)
        res.status(202).json({errores})
    }).catch((err) => {
        console.log(err);
        res.status(406).json({err: err})
    })
}

module.exports.addEvaluacionSeguimientoAsesorInterno = (req, res) => {
    const id_seguimiento = req.body.id_seguimiento,
        observaciones = req.body.observaciones,
        criterios_evaluacion = req.body.criterios_evaluacion,
        criterios = req.body.criterios;
        // console.log('=>>', criterios_evaluacion )
        // console.log('=>>', criterios )
    sequelize.transaction(t => {
        //Buscar proyecto
        return seguimiento_proyecto.findOne({where: {id: id_seguimiento}}, {transaction: t})
            .then(_seguimiento => {
                // verificamos si ya existe una evaluacion
                if(_seguimiento.id_evaluacion_asesor_interno === null){ // no existe, creamos evaluacion 
                    return evaluacion.create({tipo: 'asesor_interno', observaciones}, {transaction: t})
                        .then((_evaluacion) => {
                            // asociamos la evaluación con el proyecto
                            return _seguimiento.update({id_evaluacion_asesor_interno: _evaluacion.id},{transaction: t})
                            .then(__seguimiento => {
                                // creamos o actualizamos los criterios
                                return sequelize.Promise.map(criterios, (_criterio) => {
                                    return criterio_evaluacion.create({id_evaluacion: _evaluacion.id, id_criterio: _criterio.id,valor_de_evaluacion: criterios_evaluacion[_criterio.id]}, {transaction: t})
                                })   
                            })
                        })
                }else{ // ya existe solo actualizamos
                    return evaluacion.update({observaciones},{where: {id: _seguimiento.id_evaluacion_asesor_interno}}, {transaction: t})
                        .then((updated) => {
                            return evaluacion.findOne({where: {id: _seguimiento.id_evaluacion_asesor_interno}}, {transaction: t})
                                .then(_evaluacion => {
                                    // creamos o actualizamos los criterios
                                    return sequelize.Promise.map(criterios, (_criterio) => {
                                        return criterio_evaluacion.update({valor_de_evaluacion: criterios_evaluacion[_criterio.id]}, {where: {id_evaluacion: _evaluacion.id, id_criterio: _criterio.id}}, {transaction: t})
                                    })
                                })
                              
                        })
                }
                

            })
        
    }).then((evaluacion)=>{
        // console.log('success=======>    ', result)
        res.status(200).json(evaluacion)
    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        // console.log('==>', errores)
        res.status(202).json({errores})
    }).catch((err) => {
        console.log(err);
        res.status(406).json({err: err})
    })
}
module.exports.addEvaluacionSeguimientoAsesorExterno = (req, res) => {
    const id_seguimiento = req.body.id_seguimiento,
        observaciones = req.body.observaciones,
        criterios_evaluacion = req.body.criterios_evaluacion,
        criterios = req.body.criterios;
        // console.log('=>>', criterios_evaluacion )
        // console.log('=>>', criterios )
    sequelize.transaction(t => {
        //Buscar proyecto
        return seguimiento_proyecto.findOne({where: {id: id_seguimiento}}, {transaction: t})
            .then(_seguimiento => {
                // verificamos si ya existe una evaluacion
                if(_seguimiento.id_evaluacion_asesor_externo === null){ // no existe, creamos evaluacion 
                    return evaluacion.create({tipo: 'asesor_externo', observaciones}, {transaction: t})
                        .then((_evaluacion) => {
                            // asociamos la evaluación con el proyecto
                            return _seguimiento.update({id_evaluacion_asesor_externo: _evaluacion.id},{transaction: t})
                            .then(__seguimiento => {
                                // creamos o actualizamos los criterios
                                return sequelize.Promise.map(criterios, (_criterio) => {
                                    return criterio_evaluacion.create({id_evaluacion: _evaluacion.id, id_criterio: _criterio.id,valor_de_evaluacion: criterios_evaluacion[_criterio.id]}, {transaction: t})
                                })   
                            })
                        })
                }else{ // ya existe solo actualizamos
                    return evaluacion.update({observaciones},{where: {id: _seguimiento.id_evaluacion_asesor_externo}}, {transaction: t})
                        .then((updated) => {
                            return evaluacion.findOne({where: {id: _seguimiento.id_evaluacion_asesor_externo}}, {transaction: t})
                                .then(_evaluacion => {
                                    // creamos o actualizamos los criterios
                                    return sequelize.Promise.map(criterios, (_criterio) => {
                                        return criterio_evaluacion.update({valor_de_evaluacion: criterios_evaluacion[_criterio.id]}, {where: {id_evaluacion: _evaluacion.id, id_criterio: _criterio.id}}, {transaction: t})
                                    })
                                })
                              
                        })
                }
                

            })
        
    }).then((evaluacion)=>{
        // console.log('success=======>    ', result)
        res.status(200).json(evaluacion)
    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        // console.log('==>', errores)
        res.status(202).json({errores})
    }).catch((err) => {
        console.log(err);
        res.status(406).json({err: err})
    })
}

module.exports.addObservacion = (req, res) => {
    // console.log('==========>',req.body)
    const id_proyecto = req.body.id_proyecto,
        id_asesor_interno = req.body.id_asesor_interno,
        tipo = req.body.tipo,
        observacion = req.body.observacion;

    observaciones.create({
        id_proyecto,
        id_asesor_interno,
        tipo,
        observacion
    }).then((_observacion)=>{
        res.status(200).json(_observacion);
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

module.exports.addSolucionRecomendada = (req, res) => {
    const id_asesoria = req.body.id_asesoria,
        solucion = req.body.solucion;
    solucion_recomendada.create({
        id_asesoria,
        solucion
    }).then((solucion) => {
        res.status(200).json(solucion)
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

module.exports.updateRevisionSeguimiento = (req, res) => {
    const id_revision_seguimiento = req.body.id_revision_seguimiento,
        solucionado = req.body.solucionado;
    revision_seguimiento.update(
        {solucionado},
        {where: {id: id_revision_seguimiento}}
    ).then((revision)=>{
        // console.log('success=======>    ', result)
        // console.log()
        res.status(200).json(revision)
    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        // console.log('==>', errores)
        res.status(202).json({errores})
    }).catch((err) => {
        console.log(err);
        res.status(406).json({err: err})
    }) 
}
module.exports.updateSeguimiento = (req, res) => {
    const id_seguimiento = req.body.id_seguimiento,
        url_seguimiento = req.body.url_seguimiento;
    // console.log('body', req.body);
    seguimiento_proyecto.update(
        {url_seguimiento}, {where: {id: id_seguimiento}}
    ).then((seguimiento)=>{
        // console.log('success=======>    ', result)
        console.log(seguimiento)
        res.status(200).json(seguimiento)
    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        // console.log('==>', errores)
        res.status(202).json({errores})
    }).catch((err) => {
        console.log(err);
        res.status(406).json({err: err})
    }) 
}
module.exports.updateInformeTecnico = (req, res) => {
    const id_proyecto = req.body.id_proyecto,
        url_informe_tecnico = req.body.url_informe_tecnico;
    Proyecto.update({url_informe_tecnico}, {where: {id: id_proyecto}})
        .then(proyecto => {
            res.status(200).json(proyecto);
        }).catch(Sequelize.ValidationError, (err) => {
            var errores = err.errors.map((element) => {
                return `${element.path}: ${element.message}`
            })
            // console.log('==>', errores)
            res.status(202).json({errores})
        }).catch((err) => {
            console.log(err);
            res.status(406).json({err: err})
        })
}
module.exports.updateSolucionRecomendada = (req, res) => {
    const id_solucion = req.body.id_solucion,
        solucionado = req.body.solucionado;
    solucion_recomendada.update(
        {solucionado}, 
        {where: {id: id_solucion}}
    ).then((solucion)=>{
        // console.log('success=======>    ', result)
        res.status(200).json(solucion)
    }).catch(Sequelize.ValidationError, (err) => {
        var errores = err.errors.map((element) => {
            return `${element.path}: ${element.message}`
        })
        // console.log('==>', errores)
        res.status(202).json({errores})
    }).catch((err) => {
        console.log(err);
        res.status(406).json({err: err})
    }) 
}