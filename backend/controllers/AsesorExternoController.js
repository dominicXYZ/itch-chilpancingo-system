const AsesorExterno = require('../models').asesor_externo;
const Usuario = require('../models').Usuario;
const Sequelize = require('../models').Sequelize
const sequelize = require('../models').sequelize;
const generator = require('generate-password');
const transporter = require('../../config/email');

module.exports.add = (req, res) => {
    // Tenemos que crear el usuario y el correo se debe de quitar
    const contrasenia = generator.generate({length: 8});
    const nombre = req.body.nombre,
        puesto = req.body.puesto,
        id_empresa = req.body.id_empresa,
        correo = req.body.correo;
    sequelize.transaction((t) => {
        return Usuario.create({
            correo,
            contrasenia,
            rol: 'asesor_externo'
        }, {transaction: t}).then((usuario) => {
            return AsesorExterno.create({
                nombre,
                puesto,
                id_empresa,
                id_usuario: usuario.id
            }, {transaction: t})
        })
    }).then((asesor_externo)=>{
        // console.log('success=======>    ', result)
        // enviar email con contraseña del candidato a residente
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
        res.status(200).json(asesor_externo)
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