const Docente = require('../models').Docente;
const docente_carreras = require('../models').docente_carreras;
const Departamento = require('../models').Departamento;

const Usuario = require('../models').Usuario;
const sequelize = require('../models').sequelize;
const Sequelize = require('../models').Sequelize;
const generator = require('generate-password');
const transporter = require('../../config/email');


module.exports.updateSubdirectorAcademico = (req, res) => {
    const id_usuario = req.body.id_usuario;
    sequelize.transaction(t => {
        return Usuario.update({rol: 'docente'},{where: {rol: 'subdirector_academico'}}, {transaction: t})
            .then(affectedRows => {
                return Usuario.update({rol: 'subdirector_academico'}, {where: {id: id_usuario}}, {transaction:t});
            })
    }).then((_usuario)=>{
        // console.log('success=======>    ', result)
        res.status(200).json(_usuario)
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

module.exports.findById = (req, res) => {
    Docente.findOne({
        where: {id: req.params.id},
        include: [{model: Usuario, as: 'usuario'}, {model: Departamento, as: 'departamento'}],
    }).then((docentes) => {
            res.status(200).json(docentes);
        }).catch(err => {
            res.status(406).json({err: err})
        })
}


module.exports.findAll = (req, res) => {
    Docente.findAll({
        include: [{model: Usuario, as: 'usuario'}, {model: Departamento, as: 'departamento'}],
    }).then(docentes => {
        res.status(200).json(docentes)
    }).catch((err) => {
        res.status(406).json({err: err})
    })  
}
module.exports.findAll1 = (req, res) => {
    Docente.findAll({where: {status: {$notIn: ['inactivo']}},
        include: [{model: Usuario, as: 'usuario'}, {model: Departamento, as: 'departamento'}],
    }).then(docentes => {
        res.status(200).json(docentes)
    }).catch((err) => {
        res.status(406).json({err: err})
    })  
}
module.exports.findAll2 = (req, res) => {
    Docente.findAll({where: {status: {$notIn: ['activo']}},
        include: [{model: Usuario, as: 'usuario'}, {model: Departamento, as: 'departamento'}],
    }).then(docentes => {
        res.status(200).json(docentes)
    }).catch((err) => {
        res.status(406).json({err: err})
    })  
}

module.exports.eliminarDocente = (req, res) => {
    	//console.log("actualizar docente: ", req);
        const estado = 'inactivo';
	if(req.body.rol === 'admin'){
		res.staus(203).json({errores: 'No puede dar el rol de administrador del sistema'});
	}else{
		//console.log("no es admin el rol y el id: ", req.body);
		
		
		Docente.findById(req.body.docente_id)
			.then(docente => {
                console.log("body: ", req.body);
				return docente.update({status: estado})
					.then(docente => {
						res.status(200).json({docente})
                        return Usuario.update({status: estado}, {where: {id: req.body.usuario_id}})
                        
					})
			}).catch(err => {
				res.status(203).json({err});
			})
	}

}


module.exports.activarDocente = (req, res) => {
    //console.log("actualizar docente: ", req);
    const estado = 'activo';
if(req.body.rol === 'admin'){
    res.staus(203).json({errores: 'No puede dar el rol de administrador del sistema'});
}else{
    //console.log("no es admin el rol y el id: ", req.body);
    
    
    Docente.findById(req.body.docente_id)
        .then(docente => {
            console.log("body: ", req.body);
            return docente.update({status: estado})
                .then(docente => {
                    res.status(200).json({docente})
                    return Usuario.update({status: estado}, {where: {id: req.body.usuario_id}})
                    
                })
        }).catch(err => {
            res.status(203).json({err});
        })
}

}

module.exports.update = (req, res) => {
    
	if(req.body.rol === 'admin'){
		res.staus(203).json({errores: 'No puede dar el rol de administrador del sistema'});
	}else{
		
		Docente.findById(req.body.docente_id)
			.then(docente => {
				return docente.update({nombre: req.body.nombre, ap_materno: req.body.ap_materno,
                     ap_paterno: req.body.ap_paterno, id_departamento: req.body.id_departamento, titulo: req.body.titulo})
					.then(docente => {
						res.status(200).json({docente})
					})
			}).catch(err => {
                console.log("errror: ", err)
				res.status(203).json({err});
			})
	}
}


module.exports.add = (req, res) => {
    // console.log(req.body)
    const contrasenia = generator.generate({length: 8});
    const correo = req.body.correo
    sequelize.transaction((t) => {
        console.log('contrasenia', contrasenia);
        return Usuario.create({
            correo,
            contrasenia: contrasenia,
            rol: 'docente'
        }, {transaction: t}).then((usuario) => {
            return Docente.create({
                titulo: req.body.titulo,
                nombre: req.body.nombre,
                ap_paterno: req.body.ap_paterno,
                ap_materno: req.body.ap_materno,
                id_departamento: req.body.id_departamento,
                id_usuario: usuario.id
            }, {transaction: t});
        });
    }).then((docente)=>{
        // console.log('success=======>    ', result)
        // enviar email con contraseña al docente
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
        res.status(200).json(docente)
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