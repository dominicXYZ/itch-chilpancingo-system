
// Controllers
const usuarioController = require('./controllers/UsuarioController');
const departamentoController = require('./controllers/DepartamentoController');
const docenteController = require('./controllers/DocenteController');
const EmpresaController = require('./controllers/EmpresaController');
const AsesorController = require('./controllers/AsesorExternoController');
const carreraController = require('./controllers/CarreraController');
const alumnoController = require('./controllers/AlumnoController');
const periodoController = require('./controllers/PeriodoController');
const anteproyectoController = require('./controllers/AnteproyectoController')
const proyectoController = require('./controllers/ProyectoController');

module.exports = (app, express, passport) => {

    const router = express.Router();
    // USUARIO
    router.post('/usuario/auth', passport.authenticate('local-login',
        {
            successRedirect: '/api/usuario/isAuth',
            failureRedirect: '/api/usuario/isAuth'
        }
    ))

    router.get('/usuario/isAuth', usuarioController.isAuth);
    router.get('/usuario/logout', usuarioController.logout);

    router.put('/usuario/cambiar_contrasenia', isAuth, usuarioController.updateContrasenia);
    router.put('/usuario/cambiar_contrasenia/email', isAuth, isAdmin, usuarioController.updateContraseniaEmail); // isAuth
    router.route('/usuarios')
        .get(isAuth, isAdmin, usuarioController.findAll)
        .post(isAuth, isAdmin, usuarioController.add);

    router.route('/usuario/:id')
        .put(isAuth, isAdmin, usuarioController.update);

    // DEPARTAMENTO
    router.route('/departamento')
        .get(isAuth, departamentoController.findAll)
        .post(isAuth, isAdmin, departamentoController.add)

    router.route('/departamento2')
        .get(isAuth, departamentoController.findAll2)

    router.route('/departamento/:id')
        .get(isAuth, departamentoController.findById)
        .put(isAuth, isAdmin, departamentoController.update)

    // CARRERA
    router.route('/carrera')
        .post(isAuth, carreraController.add)

    router.route('/carrera/asignar_encargados')
        .post(isAuth, isJefeDepartamento, carreraController.asignarEncargados)

    router.route('/carrera/asignar_docentes')
        .post(isAuth, isJefeDepartamento, carreraController.asignarDocentes)

    router.route('/carrera/:id_carrera/docentes_asignados')
        .get(isAuth, carreraController.docentesAsignados);

    router.route('/carrera/periodo')
        .post(isAuth, isJefeDepartamento, carreraController.addPeriodo)

    router.route('/carrera/:id_carrera/periodos')
        .get(carreraController.findById)

    router.route('/carrera/docente_habilitado')
        .put(isAuth, carreraController.docenteHabilitado)
    // EMPRESAS
    router.route('/empresa')
        .get(isAuth, EmpresaController.findAll)
        .post(isAuth, isJefeDeptoOrAdmin, EmpresaController.add)

    router.route('/empresa/:id')
        .put(isAuth, isJefeDeptoOrAdmin, EmpresaController.update);

    // DOCENTE
    router.route('/docente')
        .post(isAuth, isJefeDeptoOrAdmin, docenteController.add)
    router.route('/docentes')
        .get(isAuth, docenteController.findAll)
    router.route('/docentesI')
        .get(isAuth, docenteController.findAll1)
    router.route('/docentesA')
        .get(isAuth, docenteController.findAll2)
    router.route('/docente/subdirector_academico')
        .put(isAuth, isAdmin, docenteController.updateSubdirectorAcademico);

    router.route('/docente/:id')
        .put(isAuth, isJefeDeptoOrAdmin, docenteController.eliminarDocente);

    router.route('/docenteA/:id')
        .put(isAuth, isJefeDeptoOrAdmin, docenteController.activarDocente);

    router.route('/docenteU/:id')
        .get(isAuth, docenteController.findById)
        .put(isAuth, isJefeDeptoOrAdmin, docenteController.update);


    // ASESOR EXTERNO
    router.route('/asesor_externo')
        .post(isAuth, isJefeDeptoOrAdmin, AsesorController.add)
    //Anteproyectos por periodo
    router.route('/periodo/:id_periodo/anteproyectos')
        .get(isAuth, carreraController.findAnteproyectosByPeriodo);
    // ALUMNOS
    router.route('/alumno')
        .post(isAuth, isJefeDeptoOrDocente, alumnoController.add)

    router.route('/alumno/cancelacion')
        .put(isAuth, isJefeDeptoOrDocente, alumnoController.cancelacionProyecto);

    router.route('/alumno/:id_alumno/cancelacion')
        .get(isAuth, alumnoController.getCancelacionProyecto);

    router.route('/alumno/cancelacion_justificacion')
        .put(isAuth, isResidente, alumnoController.justificacionCancelacionProyecto);

    router.route('/alumno/:id_cancelacion/generarFormatoDeCancelacion')
        .get(isAuth, isResidente, alumnoController.generarFormatoDeCancelacion);

    router.route('/alumno/:id/anteproyecto')
        .get(isAuth, alumnoController.getAnteproyecto)
        .put(isAuth, isCandidatoAResidente, alumnoController.updateDatosAnteproyecto);

    router.route('/alumno/:id_alumno/solicitud_residencia')
        .get(isAuth, isCandidatoAResidente, alumnoController.generarSolicitudDeResidencia);

    router.route('/alumno/:id/proyecto')
        .get(isAuth, alumnoController.getProyecto)

    router.route('/alumno/proyecto_para_asesor_externo/:id_proyecto')
        .get(isAuth, alumnoController.getProyectoAsesorExterno)

    router.route('/alumno/proyecto_para_asesor_interno/:id_proyecto')
        .get(isAuth, alumnoController.getProyectoAsesorInterno)

    router.route('/alumno/revision_seguimiento/:id_proyecto')
        .get(isAuth, alumnoController.getProyectoRevisionSeguimientos)

    router.route('/alumno/revision_seguimiento2/:id_proyecto')
        .get(isAuth, alumnoController.getProyectoRevisionSeguimientos2)

    router.route('/alumno/:id/proyecto_find_or_create')
        .get(isAuth, alumnoController.getProyectoFindOrCreate)

    router.route('/alumno/:id/_proyecto')
        .get(isAuth, alumnoController.get_Proyecto);

    router.route('/alumno/file_anteproyecto/:id_anteproyecto')
        .post(isAuth, isCandidatoAResidente, alumnoController.addFileAnteproyecto);

    router.route('/alumno/file_plan_trabajo/:id_proyecto')
        .post(isAuth, isResidente, alumnoController.addFilePlanTrabajo)

    router.route('/plan_de_trabajo/pdf/:filename')
        .get(isAuth, isJefeDeptoOrDocenteOrResidente, alumnoController.getPlanDeTrabajoPDF)

    router.route('/alumno/cronograma/:id_proyecto')
        .post(isAuth, isResidente, alumnoController.addCronograma)

    router.route('/cronograma/pdf/:filename')
        .get(isAuth, isJefeDeptoOrDocenteOrResidente, alumnoController.getCronogramaPDF)

    router.route('/alumnos/:id_carrera/rechazados')
        .get(isAuth, alumnoController.findAllRechazadosPorCarrera)

    router.route('/alumno/retry_anteproyecto')
        .put(isAuth, isJefeDeptoOrDocente, alumnoController.retryAnteproyecto)

    // PROYECTO
    router.route('/proyectos/asesor_interno/:id_asesor_interno')
        .get(isAuth, proyectoController.getProyectosByAsesorInterno)
    router.route('/proyectos/asesor_externo/:id_asesor_externo')
        .get(isAuth, proyectoController.getProyectosByAsesorExterno)

    router.route('/proyecto/observacion')
        .post(isAuth, isJefeDeptoOrDocente, proyectoController.addObservacion)
        .put(isAuth, isJefeDeptoOrDocente, proyectoController.updateObservacion)

    router.route('/proyecto/:id_proyecto/observaciones')
        .get(isAuth, proyectoController.findObservaciones)

    router.route('/proyecto/:id_proyecto/asesorias')
        .get(isAuth, proyectoController.findAsesorias)

    router.route('/proyecto/asesoria/solucion_recomendada')
        .post(isAuth, isJefeDeptoOrDocente, proyectoController.addSolucionRecomendada)
        .put(isAuth, isJefeDeptoOrDocente, proyectoController.updateSolucionRecomendada)

    router.route('/proyecto/evaluacionAnexoIII/criterios/asesor_interno')
        .get(isAuth, isJefeDeptoOrDocente, proyectoController.getCriteriosEvaluacionAnexoIIIAsesorInterno);

    router.route('/proyecto/evaluacionAnexoIII/criterios/asesor_externo')
        .get(isAuth, isAsesorExterno, proyectoController.getCriteriosEvaluacionAnexoIIIAsesorExterno);

    router.route('/proyecto/evaluacionAnexoXXX/criterios/asesor_interno')
        .get(isAuth, isJefeDeptoOrDocente, proyectoController.getCriteriosEvaluacionAnexoXXXAsesorInterno);
    router.route('/proyecto/evaluacionAnexoXXX/criterios/asesor_externo')
        .get(isAuth, isAsesorExterno, proyectoController.getCriteriosEvaluacionAnexoXXXAsesorExterno);

    router.route('/proyecto/evaluacionAnexoXXIX/criterios/asesor_interno')
        .get(isAuth, isJefeDeptoOrDocente, proyectoController.getCriteriosEvaluacionAnexoXXIXAsesorInterno);
    router.route('/proyecto/evaluacionAnexoXXIX/criterios/asesor_externo')
        .get(isAuth, isAsesorExterno, proyectoController.getCriteriosEvaluacionAnexoXXIXAsesorExterno);



    router.route('/proyecto/evaluacion/asesor_interno')
        .put(isAuth, isJefeDeptoOrDocente, proyectoController.addEvaluacionAsesorInterno);

    router.route('/proyecto/evaluacion/asesor_externo')
        .put(isAuth, isAsesorExterno, proyectoController.addEvaluacionAsesorExterno);

    router.route('/proyecto/evaluacion_seguimiento/asesor_interno')
        .put(isAuth, isJefeDeptoOrDocente, proyectoController.addEvaluacionSeguimientoAsesorInterno);
    router.route('/proyecto/evaluacion_seguimiento/asesor_externo')
        .put(isAuth, isAsesorExterno, proyectoController.addEvaluacionSeguimientoAsesorExterno);

    router.route('/proyecto/autorizar_carta_liberacion/asesor_interno')
        .put(isAuth, isJefeDeptoOrDocente, proyectoController.autorizarCartaDeLiberacionAsesorInterno);
    router.route('/proyecto/autorizar_carta_liberacion/asesor_externo')
        .put(isAuth, isAsesorExterno, proyectoController.autorizarCartaDeLiberacionAsesorExterno);


    router.route('/proyecto/seguimientos')
        .put(isAuth, isJefeDeptoOrDocenteOrResidente, proyectoController.findOrCreateSeguimientos) // is jefe depto docente y residente
    router.route('/proyecto/informe_tecnico')
        .put(isAuth, isResidente, proyectoController.updateInformeTecnico)

    router.route('/proyecto/:id_proyecto/seguimientos')
        .get(isAuth, proyectoController.findSeguimientos);

    router.route('/proyecto/seguimiento')
        .put(isAuth, isResidente, proyectoController.updateSeguimiento);

    router.route('/proyecto/seguimiento/observacion')
        .post(isAuth, isJefeDeptoOrDocente, proyectoController.addObservacionSeguimiento)

    router.route('/proyecto/revision_seguimiento')
        .put(isAuth, isJefeDeptoOrDocente, proyectoController.updateRevisionSeguimiento)

    router.route('/proyecto/asesoria/:id_asesoria/soluciones_recomendadas')
        .get(isAuth, proyectoController.findSolucionesRecomendadas)

    router.route('/proyecto/asesoria')
        .post(isAuth, isResidente, proyectoController.addAsesoria)
    router.route('/proyecto/asesoria_autorizar_formato')
        .put(isAuth, isJefeDeptoOrDocente, proyectoController.updateAutorizarFormatoAsesoria)

    router.route('/asesoria/:id_asesoria/generar_formato/')
        .get(isAuth, isResidente, proyectoController.generarFormatoDeAsesoria)

    router.route('/proyecto/:id_proyecto/formato_evaluacion/anexoIII')
        .get(isAuth, isResidente, proyectoController.generarFormatoDeEvaluacionAnexoIII)

    router.route('/proyecto/:id_proyecto/formato_evaluacion/anexoXXX')
        .get(isAuth, isResidente, proyectoController.generarFormatoDeEvaluacionAnexoXXX)

    router.route('/proyecto/:id_seguimiento/formato_evaluacion/anexoXXIX')
        .get(isAuth, isResidente, proyectoController.generarFormatoDeEvaluacionAnexoXXIX)

    router.route('/proyecto/:id_proyecto/carta_liberacion/asesor_externo')
        .get(isAuth, isResidente, proyectoController.generarCartaLiberacionAsesorExterno)

    router.route('/proyecto/:id_proyecto/carta_liberacion/asesor_interno')
        .get(isAuth, isResidente, proyectoController.generarCartaLiberacionAsesorInterno)

    router.route('/asesoria/tipo')
        .put(isAuth, isJefeDeptoOrDocente, proyectoController.updateTipoAsesoria);
    // ANTEPROYECTO
    router.route('/anteproyectos/:id_periodo')
        .get(isAuth, anteproyectoController.findByPeriodo)

    router.route('/anteproyecto/pdf/:filename')
        .get(isAuth, anteproyectoController.getAnteproyectoPDF)

    router.route('/anteproyecto/factibilidad')
        .put(isAuth, isJefeDeptoOrDocente, anteproyectoController.addFactibilidad)

    router.route('/anteproyecto/factibilidad/correciones')
        .put(isAuth, isJefeDeptoOrDocente, anteproyectoController.addFactibilidadCorrecciones)

    router.route('/anteproyecto/set_dictamen')
        .put(isAuth, isJefeDeptoOrDocente, anteproyectoController.setDictamen);
    router.route('/anteproyecto/set_asesor_interno')
        .put(isAuth, isJefeDeptoOrDocente, anteproyectoController.setAsesorInterno);
    // PERIODO
    router.route('/periodo/:id/')
        .get(isAuth, periodoController.findById);

    router.route('/periodo/:id/dictamen')
        .get(isAuth, periodoController.findDictamen);

    router.route('/periodo/fecha_fin_entrega_anteproyecto')
        .put(isAuth, isJefeDepartamento, periodoController.updateFechaFinEntregaAnteproyectos);

    router.route('/dictamen/pdf/:filename')
        .get(isAuth, periodoController.getDictamenPDF);

    router.route('/periodo/generar_dictamen')
        .post(isAuth, isJefeDepartamento, periodoController.generarDictamen)

    router.route('/periodo/seguimiento')
        .post(isAuth, isJefeDepartamento, periodoController.addSeguimiento);

    router.route('/periodo/:id_periodo/proyectos')
        .get(isAuth, periodoController.getProyectos);




    app.use('/api', router);
    // Redirect trafict to react app
    app.get('*', (req, res) => {
        res.render('index');
    });

    function isJefeDeptoOrDocenteOrResidente(req, res, next) {
        if (req.user.rol === 'jefe_departamento' || req.user.rol === 'docente' || req.user.rol === 'residente')
            return next();
        res.status(203).json({ error: "Acceso denegado debe tener permisos de jefe de departamento o presidente de academia." })
    }
    function isJefeDeptoOrDocente(req, res, next) {
        if (req.user.rol === 'jefe_departamento' || req.user.rol === 'docente')
            return next();
        res.status(203).json({ error: "Acceso denegado debe tener permisos de jefe de departamento o presidente de academia." })
    }
    function isJefeDeptoOrAdmin(req, res, next) {
        if (req.user.rol === 'jefe_departamento' || req.user.rol === 'admin')
            return next()
        res.status(203).json({ error: "Acceso denegado debe tener permisos de jefe de departamento o administrador." })
    }

    function isDocente(req, res, next) {
        if (req.user.rol === 'docente')
            return next()
        res.status(203).json({ error: "Acceso denegado debe tener permisos de docente en el sistema." })
    }
    function isResidente(req, res, next) {
        if (req.user.rol === 'residente')
            return next()
        res.status(203).json({ error: "Acceso denegado debe tener permisos de docente en el sistema." })
    }
    function isJefeDepartamento(req, res, next) {
        if (req.user.rol === 'jefe_departamento')
            return next()
        res.status(203).json({ error: "Acceso denegado debe tener permisos de docente en el sistema." })
    }
    function isCandidatoAResidente(req, res, next) {
        if (req.user.rol === 'candidato_residente')
            return next()
        res.status(203).json({ error: "Acceso denegado debe tener permisos de docente en el sistema." })
    }
    function isAsesorExterno(req, res, next) {
        if (req.user.rol === 'asesor_externo')
            return next()
        res.status(203).json({ error: "Acceso denegado debe tener permisos de docente en el sistema." })
    }
    function isAdmin(req, res, next) {
        if (req.user.rol === 'admin')
            return next()
        res.status(203).json({ error: "Acceso denegado debe tener permisos de docente en el sistema." })
    }

    function isAuth(req, res, next) {
        if (req.isAuthenticated())
            return next()
        res.status(203).json({ error: "Necesita autenticarse" });
    }
}