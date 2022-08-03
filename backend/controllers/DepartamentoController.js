const Departamento = require('../models').Departamento;
const Carrera = require('../models').Carrera;
const docente_carreras = require('../models').docente_carreras;
const Docente = require('../models').Docente;
const Usuario = require('../models').Usuario;
const Periodo = require('../models').Periodo;
const sequelize = require('../models').sequelize;
const Sequelize = require('../models').Sequelize;
const rol = {
    JEFE_PROYECTO: 'jefe_proyecto',
    DOCENTE: 'docente',
    JEFE_DEPARTAMENTO: 'jefe_departamento',
    PRESIDENTE_ACADEMIA: 'presidente_academia'
}
module.exports.findById = (req, res) => {
    Departamento.findOne({
        where: {id: req.params.id},
        include: [{model: Carrera, as: 'carreras', include: [{model: Periodo, as: 'periodos'}]}, {model: Docente, as: 'docentes', include: [{model: Usuario, as:'usuario', attributes: ['rol']}] } ]})
        .then((departamento) => {
            res.status(200).json(departamento);
        }).catch(err => {
            res.status(406).json({err: err})
        })
}
module.exports.findAll = (req, res) => {
    Departamento.findAll({include: [{model: Carrera, as: 'carreras'}, {model: Docente, as: 'docentes', include: [{model: Usuario, as: 'usuario', attributes: ['rol']}]}]})
        .then((departamentos) => {
            res.status(200).json(departamentos);
        }).catch(err => {
            // console.log(err)
            res.status(406).json({err: err});
        });
}

module.exports.findAll2 = (req, res) => {
    Departamento.findAll()
        .then((departamentos) => {
            res.status(200).json(departamentos);
        }).catch(err => {
            // console.log(err)
            res.status(406).json({err: err});
        });
}

module.exports.add = (req, res) => {
    Departamento.create({
        nombre: req.param('nombre')
    }).then(departamento => {
        // console.log('=>',departamento)
        res.status(200).json(departamento)
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
module.exports.test = (req, res) => {
    sequelize.query(`select * from usuarios right join docentes on usuarios.id = docentes.id_usuario where usuarios.rol='docente'`, {model: Usuario})
        .then(usuarios => {
            usuarios.forEach((usuario => {
                // console.log(usuario.id);
                usuario.update({rol: rol.JEFE_DEPARTAMENTO});
            }))
            
        })
}
module.exports.update = (req, res) => {
    // console.log(req.body);
    const id_departamento = req.params.id,  
        nombre = req.body.nombre_departamento,
        id_usuario = req.body.id_jefe_departamento;
    sequelize.transaction(t => {
        return Departamento.update({nombre}, {where: {id: id_departamento}}, {transaction: t})
            .then(departamento => {
                //console.log(id_departamento)
                return sequelize.query(`update usuarios, docentes set usuarios.rol='docente' where usuarios.id=docentes.id_usuario and usuarios.rol='jefe_departamento' and docentes.id_departamento = ${id_departamento};`,{type: sequelize.QueryTypes.UPDATE},{transaction: t})
                    .then(usuarios => {
                        return Usuario.update({rol: rol.JEFE_DEPARTAMENTO}, {where: {id: id_usuario}}, {transaction: t})
                    })
            })
    }).then((departamento)=>{
        // console.log('success=======>    ', result)
        res.status(200).json(departamento)
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

