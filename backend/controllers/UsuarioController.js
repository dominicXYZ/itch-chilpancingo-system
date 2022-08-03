const Usuario = require('../models/index').Usuario;
const Alumno = require('../models').Alumno;
const AsesorExterno = require('../models').asesor_externo;
const docente_carreras = require('../models').docente_carreras;
const Docente = require('../models').Docente
const Sequelize = require('../models/index').Sequelize;
const bCrypt = require('bcrypt-nodejs');
const generator = require('generate-password');
const { element } = require('prop-types');
const { ValidationError } = require('webpack');
const transporter = require('../../config/email');

const rol = {
    JEFE_PROYECTO: 'jefe_proyecto',
    DOCENTE: 'docente',
    JEFE_DEPARTAMENTO: 'jefe_departamento',
	PRESIDENTE_ACADEMIA: 'presidente_academia',
	CANDIDATO_RESIDENTE: 'candidato_residente',
	RESIDENTE: 'residente',
	ADMIN: 'admin',
	ASESOR_EXTERNO: 'asesor_externo'
}

const generateHash = (contrasenia) => {
  return bCrypt.hashSync(contrasenia, bCrypt.genSaltSync(8), null);
}

module.exports.findJefeDepartamento = (req, res) => {
    const id_usuario = req.user.id;
    Docente.findOne({where: {id_usuario}})
		.then((docente) => {
			res.status(200).json(docente);
		}).catch(err => {
			res.status(406).json({err: err})
		})
}
module.exports.updateContrasenia = (req, res) => {
	const contrasenia = req.body.nueva_contrasenia;
	const id_usuario = req.user.id;
	if(req.user.rol === 'admin' || req.user.id === id_usuario){
		const contraseniaHash = generateHash(contrasenia)
		// console.log(id_usuario, contrasenia);
		Usuario.update({contrasenia: contraseniaHash}, {where: {id: id_usuario}})
			.then(usuario => {
				// console.log('=>',departamento)
				res.status(200).json(usuario)
			}).catch(Sequelize.ValidationError, (err) => {
				var errores = err.errors.map((element) => {
					return `${element.path}: ${element.message}`
				})
				// console.log('==>', errores)
				res.status(202).json({errores})
			}).catch((err) => {
				res.status(406).json({err: err})
			})
	}else{
		res.status(406).json({err: 'Error no le pertenece esta cuenta :@'});
	}
}

module.exports.updateContraseniaEmail = (req, res) => {
	const contrasenia = generator.generate({length: 8});
	const contraseniaHash = generateHash(contrasenia);
	const id_usuario = req.body.id_usuario,
		correo = req.body.correo;
	Usuario.update({contrasenia: contraseniaHash}, {where: {id: id_usuario}})
		.then(_usuario => {
			// enviar email con contraseña al docente
			// console.log('ASdasd',_usuario)
			const mailOptions = {
				from: 'seguimientoresidenciasitch@gmail.com',
				to: correo,
				subject: 'Nueva contraseña para acceder al sistema de seguimiento de residencias ITCH',
				text: `Correo: ${correo}, Contraseña: ${contrasenia}`
			}
			transporter.sendMail(mailOptions, (err, info) => {
				if(err){
					console.error('EMAIL', err)
				}else{
					console.log('EMAIL', 'contraseña enviada!');
				}
			})
			res.status(200).json(_usuario)
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

module.exports.findAll = (req, res) => {
	Usuario.findAll({where: {rol: {$notIn: ['admin']}, status: {$notIn: ['inactivo']}}})
		.then(usuarios => {
			res.status(200).json(usuarios);
		}).catch(err => {
			res.status(406).json({err: err});
		})
}

module.exports.add = (req, res) => {
	Usuario.create({
		correo: req.param('correo'),
		contrasenia: generateHash('123456'),
		rol: req.param('rol')
	}).then(usuario =>{
		//console.log('aqui manda 200=>',usuario)
		res.status(200).json(usuario)
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


module.exports.isAuth = (req, res) => {
	if(req.isAuthenticated()){
		console.warn('auth: ', req.user)
		if(req.user.rol === rol.JEFE_DEPARTAMENTO || req.user.rol === rol.DOCENTE || req.user.rol==='subdirector_academico'){
			// Buscar el docente
			const id_usuario = req.user.id;
			Docente.findOne({where: {id_usuario}, include: [{model: docente_carreras, as: 'docente_carrera'}]})
				.then((docente) => {
					res.status(200).json({isAuth: true, rol: req.user.rol, id_docente: docente.id,docente_carrera: docente.docente_carrera, id_departamento: docente.id_departamento});				
				}).catch(err => {
					res.status(406).json({err: err})
				})
		}else if(req.user.rol === rol.CANDIDATO_RESIDENTE || req.user.rol === rol.RESIDENTE){
			// Buscar el alumno jejeje
			const id_usuario = req.user.id;
			Alumno.findOne({where: {id_usuario}})
				.then(alumno => {
					res.status(200).json({isAuth: true, rol: req.user.rol, id_alumno: alumno.id, id_carrera: alumno.id_carrera});
				}).catch(err => {
					res.status(406).json({err: err})
				})
		}else if(req.user.rol === rol.ASESOR_EXTERNO){
			const id_usuario = req.user.id;
			AsesorExterno.findOne({where: {id_usuario}})
				.then(asesor_externo => {
					res.status(200).json({id_usuario,isAuth: true, rol: req.user.rol, id_asesor_externo: asesor_externo.id, id_empresa: asesor_externo.id_empresa})
				}).catch(err => {
					res.status(406).json({err: err})
				})
		}else if(req.user.rol === 'admin'){
			res.status(200).json({isAuth: true, rol: req.user.rol});
		}else{
			res.status(203).json({isAuth: false});
		}
	}else{
		res.status(203).json({isAuth: false});
	}
}

module.exports.updateRol = (req, res) => {
	if(req.body.rol === 'admin'){
		res.staus(203).json({errores: 'No puede dar el rol de administrador del sistema'});
	}else{
		Usuario.findById(req.body.id_usuario)
			.then(usuario => {
				return usuario.update({rol: req.body.rol})
					.then(usuario => {
						res.status(200).json({usuario})
					})
			}).catch(err => {
				res.status(203).json({err});
			})
	}
}


module.exports.update = (req, res) => {
	//console.log("actualizar user: ", req);
	if(req.body.rol === 'admin'){
		res.staus(203).json({errores: 'No puede dar el rol de administrador del sistema'});
	}else{
		//console.log("no es admin el rol y el id: ", req.body);
		
		const contraseniaHash = generateHash(req.param('contrasenia'));
		Usuario.findById(req.body.usuario_id)
			.then(usuario => {
				return usuario.update({rol: req.body.rol, correo: req.body.correo, contrasenia: contraseniaHash })
					.then(usuario => {
						res.status(200).json({usuario})
					})
			}).catch(err => {
				res.status(203).json({err});
			})
	}
}




module.exports.logout = (req, res) => {
    req.logout();
    res.redirect('/usuario/auth');
}