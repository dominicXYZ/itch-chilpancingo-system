var bCrypt = require('bcrypt-nodejs');
const Usuario = require('../../backend/models').Usuario;
const LocalStrategy = require('passport-local').Strategy;
const UUID = "efda6eec-c3d4-414d-8c1e-eede8c03a2b3";

module.exports = (passport) =>{    
    passport.serializeUser((usuario, done) => {
        done(null, usuario.id);
    });
	passport.deserializeUser((id, done) => {
        Usuario.findById(id).then(usuario => {
            done(null, {id: usuario.id, rol: usuario.rol})
        })
    });
    passport.use('local-login', new LocalStrategy({
        usernameField: 'correo',
        passwordField: 'contrasenia',
        passReqToCallback: true
    }, 
        (req, correo, contrasenia, done) => {
            req.logout();
            // console.log('======>', req.body.UUID);
            if(req.body.UUID === UUID){
                var isValidContrasenia = (usuario_contrasenia, contrasenia) => {
                    return bCrypt.compareSync(contrasenia, usuario_contrasenia);
                }
                Usuario.findOne({ where: { correo: correo}})
                    .then(usuario => {
                        if(!usuario){
                            return done(null, false, {message: 'El correo no existe'})
                        }
                        if(!isValidContrasenia(usuario.contrasenia, contrasenia)){
                            return done(null, false, {message: 'Contraseña incorrecta'});
                        }
                        return done(null, usuario);})
                    .catch(err => {
                        console.error("Error: ", err);
                        return done(null, false, {message: 'Algo salio mal en la autenticación :O'})
                    });
            }else{
                return done(null, false, {message: 'Aplicación no identificada'});
            }
        }
    ))
}

