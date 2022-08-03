const path = require('path');
const fs = require('fs');
const moment = require('moment');
// moment.locale(path.join(__dirname, '/../node_modules/moment/locale/es'));
moment.locale('es');
const fonts = {
    Roboto: {
        normal: path.join(__dirname, '/fonts/arial.ttf'),
        bold: path.join(__dirname, '/fonts/arial-bold.ttf'),
        italics: path.join(__dirname, '/fonts/Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname, '/fonts/Roboto-MediumItalic.ttf')
    }
}
var params = require(__dirname + '/../config/params.json');

const pdfmake = require('pdfmake');
const PdfPrinter = require(path.join(__dirname,'/../node_modules/pdfmake/src/printer'));
const printer = new PdfPrinter(fonts);

function nivelDeDesempenio(calificacion_final) {
    if(calificacion_final >= 95 && calificacion_final <= 100){
        return 'Excelente (Competencia alcanzada)'
    }else if(calificacion_final >= 85 && calificacion_final <= 94){
        return 'Notable (Competencia alcanzada)'
    }else if(calificacion_final >= 75 && calificacion_final <= 84){
        return 'Bueno (Competencia alcanzada)'
    }else if(calificacion_final >= 70 && calificacion_final <= 74){
        return 'Suficiente (Competencia alcanzada)'
    }else {
        return 'Insufuciente (Competencia no alcanzada)'
    }
}


module.exports = {
    generarSolicitudDeResidencia: (anteproyecto, division_estudios, res) => {
        var docDefinition = {
            pageSize: 'LETTER',
            pageMargins: [40, 125, 40, 50],
            header: (currentPage, pageCount) => {
                return {
                        margin: [40, 45, 40, 20],
                        columns: [
                            {
                                table: {
                                    widths: [100, '*', '*', 100],
                                    body: [
                                        [{image: __dirname+'/../public/img/tecnologicos.png', width: 80, height: 45, alignment: 'center', rowSpan: 2}, {text: 'Solicitud de Residencias Profesionales ', style: 'titulo', alignment: 'center', bold: true, colSpan: 2},'', {image: __dirname+'/../public/img/tec_Logo.png', width: 45, height: 45, alignment: 'center', rowSpan: 2}],
                                        ['',{text: 'Referencia a la Norma ISO 9001:2008  7.5.1', alignment: 'center', colSpan: 2, style: 'subtitulo'},'',''],
                                        [{text: 'Revisión 2', alignment: 'center', style: 'min'}, {text: 'Código: ITCHILPO-AC-PO-007-01', alignment: 'center', bold:true,style: 'min'}, {text: 'Fecha de aplicación: 16-junio-2011', alignment: 'center', style: 'min'}, {text: `Página ${currentPage} de ${pageCount}`, alignment: 'center', style: 'min'}]
                                    ]
                                }
                            }
                            
                        ]
                    }
                
            },
            content: [
                {
                    alignment: 'center',
                    width: '*',
                    text: [
                        {text: 'INSTITUTO TECNOLÓGICO DE CHILPANCINGO\nDIVISIÓN DE ESTUDIOS PROFESIONALES\nRESIDENCIAS PROFESIONALES ', style: 'normal', bold: true}
                    ]   
                },
                {
                    alignment: 'justify',
                    width: '*',
                    margin: [0, 20, 0, 0],
                    columns: [
                        {
                            alignment: 'justify',
                            text: [
                                {text: 'Lugar     ', style: 'subtitulo'},
                                {text: 'Chilpancingo de los Bravo, Guerrero', style: 'subtitulo', decoration: 'underline'},
                                {text: '            Fecha     ', style: 'subtitulo'},
                                {text: `           ${moment().format('LL')}          `, style: 'subtitulo', decoration: 'underline'}
                            ]
                        }
                    ]
                },
                {
                    margin: [0, 20, 0, 0],
                    columns: [
                        {
                            alignment: 'justify',
                            text: [
                                {text: 'C.', style: 'subtitulo'},
                                {text: `${division_estudios.docentes[0].titulo} ${division_estudios.docentes[0].nombre} ${division_estudios.docentes[0].ap_paterno} ${division_estudios.docentes[0].ap_materno}`, style: 'titulo', decoration: 'underline', bold: true},
                                {text: '\nJefe de la Div. de Estudios Profesionales', style: 'titulo'},
                            ]
                        },
                        {
                            alignment: 'justify',
                            text: [
                                {text: `AT'N: C. ` , style: 'subtitulo'},
                                {text: `${division_estudios.docentes[0].titulo} ${division_estudios.docentes[0].nombre} ${division_estudios.docentes[0].ap_paterno} ${division_estudios.docentes[0].ap_materno}`, style: 'titulo', decoration: 'underline', bold: true},
                                {text: `\nCoord. de la Carrera de  `, style: 'titulo'},
                                {text: `${anteproyecto.alumno.carrera.nombre}`, style: 'titulo', decoration: 'underline', bold: true}
                            ]
                        }
                    ]   
                },
                {
                    margin: [0, 20, 0, 0],
                    alignment: 'left',
                    columns: [
                        {
                            width: 200,
                            table: {
                                widths: [180],
                                body: [
                                    [{text: 'NOMBRE DEL PROYECTO:', alignment: 'center', style: 'titulo', bold: true, fillColor: '#e3e3e3'}]
                                ]
                            }
                        },
                        {
                            width: 323,
                            table: {
                                widths: [323],
                                body: [
                                    [{text: `${anteproyecto.nombre}`, style: 'titulo', alignment: 'justify'}]
                                ]
                            }
                        }
                    ]
                },
                {
                    margin: [0, 20, 0, 0],
                    columns: [
                        {
                            width: 140,
                            table: {
                                widths: [120],
                                body: [
                                    [{text: 'OPCIÓN ELEGIDA:', alignment: 'center', style: 'titulo', bold: true, fillColor: '#e3e3e3'}]
                                ]
                            }
                        },
                        {
                            columns: [
                                {
                                    margin: [5, 0, 5, 0],
                                    table: {
                                        widths: ['*', 10],
                                        body: [
                                            [{text: `Banco de proyectos`, style: 'min', alignment: 'center'}, {text:`${anteproyecto.origen == 'Banco de proyectos' ? 'X' : ''}` , bold: true, style: 'min'}]
                                        ]
                                    }
                                },
                                {
                                    margin: [5, 0, 5, 0],
                                    table: {
                                        
                                        widths: ['*', 10],
                                        body: [
                                            [{text: `Propuesta propia`, style: 'min', alignment: 'center'}, {text:`${anteproyecto.origen == 'Propuesta propia' ? 'X' : ''}` , bold: true, style: 'min'}]
                                        ]
                                    }
                                },
                                {
                                    margin: [5, 0, 0, 0],
                                    table: {
                                        widths: ['*', 10],
                                        body: [
                                            [{text: `Trabajador`, style: 'min', alignment: 'center'}, {text:`${anteproyecto.origen == 'Trabajador' ? 'X' : ''}` , bold: true, style: 'min'}]
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    margin: [0, 20, 0, 0],
                    columns: [
                        {
                            width: 200,
                            table: {
                                widths: [180],
                                body: [
                                    [{text: 'PERIODO PROYECTADO:', alignment: 'center', style: 'titulo', bold: true, fillColor: '#e3e3e3'}]
                                ]
                            }
                        },
                        {
                            width: ['*'],
                            table: {
                                widths: [200, 95, 10],
                                body: [
                                    [{text: `${anteproyecto.periodo.periodo} ${anteproyecto.periodo.ciclo}`, style: 'min', alignment: 'left'}, {text: 'Número de residentes', style: 'min'}, {text: '1', style: 'min'}]
                                ]
                            }
                        }
                    ]
                },
                {
                    margin: [0, 20, 0, 0],
                    text: 'Datos de la empresa',
                    style: 'subtitulo',
                    bold: true
                },
                {
                    table: {
                        widths: [100, '*', '*', '*', '*', '*'],
                        body: [
                            [{text: 'Nombre:', style: 'subtitulo'}, {text: `${anteproyecto.asesor_externo.empresa.nombre}`, style: 'subtitulo',colSpan: 5}, '', '', '', ''],
                            [{text: 'Giro, Ramo o Sector:', style: 'subtitulo'}, {text: `Industrial (${anteproyecto.asesor_externo.empresa.clasificacion=='industrial'?'X':' '})  Servicios (${anteproyecto.asesor_externo.empresa.clasificacion=='servicios'?'X':' '})  Otro (${anteproyecto.asesor_externo.empresa.clasificacion=='otro'?'X':' '})  \nPúblico (${anteproyecto.asesor_externo.empresa.clasificacion=='público'?'X':' '})  Privado (${anteproyecto.asesor_externo.empresa.clasificacion=='privado'?'X':''})`, style: 'min',colSpan: 3, alignment: 'center'},'', '',{text: 'R.F.C.', style: 'subtitulo'}, {text: `${anteproyecto.asesor_externo.empresa.rfc}`, style: 'min'}],
                            [{text: 'Domicilio:', style: 'subtitulo'}, {text: `${anteproyecto.asesor_externo.empresa.domicilio}`, style: 'subtitulo',colSpan: 5}, '', '', '', ''],
                            [{text: 'Colonia:', style: 'subtitulo'}, {text: `${anteproyecto.asesor_externo.empresa.colonia}`, style: 'subtitulo'},{text: `C.P.`, style: 'subtitulo'} , {text: `${anteproyecto.asesor_externo.empresa.codigo_postal}`, style: 'subtitulo'}, {text: `Fax`, style: 'subtitulo'}, {text: `${anteproyecto.asesor_externo.empresa.fax}`, style: 'subtitulo'}],
                            [{text: 'Misión de la empresa:\n\n\n', style: 'subtitulo'}, {text: `${anteproyecto.asesor_externo.empresa.mision}`, style: 'subtitulo',colSpan: 5}, '', '', '', ''],
                            [{text: 'Nombre del titular\n de la empresa:', style: 'subtitulo'}, {text: `${anteproyecto.asesor_externo.empresa.nombre_titular}`, style: 'subtitulo', colSpan: 2},'', {text: 'Puesto:', style: 'subtitulo'}, {text: `${anteproyecto.asesor_externo.empresa.puesto_titular}`, style: 'subtitulo',colSpan: 2}, ''],
                            [{text: 'Nombre del Asesor\n Externo:', style: 'subtitulo'}, {text: `${anteproyecto.asesor_externo.nombre}`, style: 'subtitulo', colSpan: 2},'', {text: 'Puesto:', style: 'subtitulo'}, {text: `${anteproyecto.asesor_externo.puesto}`, style: 'subtitulo',colSpan: 2}, ''],
                            [{text: 'Nombre de la persona que\n firmará el acuerdo de trabajo.\nEstudiante-Escuela-Empresa:', style: 'subtitulo', colSpan: 2},'', {text: `${anteproyecto.asesor_externo.empresa.nombre_firma_acuerdo}`, style: 'subtitulo',}, {text: 'Puesto:', style: 'subtitulo'}, {text: `${anteproyecto.asesor_externo.empresa.puesto_firma_acuerdo}`, style: 'subtitulo',colSpan: 2}, ''],
                        ]
                    }
                },
                {
                    margin: [0, 20, 0, 0],
                    text: 'Datos del Residente',
                    style: 'subtitulo',
                    bold: true,
                    pageBreak: 'before'
                },
                {
                    table: {
                        widths: [100, '*', '*', '*', '*'],
                        body: [
                            [{text: 'Nombre:', style: 'subtitulo'}, {text: `${anteproyecto.alumno.nombre} ${anteproyecto.alumno.ap_paterno} ${anteproyecto.alumno.ap_materno}`, style: 'subtitulo',colSpan: 4}, '', '', ''],
                            [{text: 'Carrera:', style: 'subtitulo'}, {text: `${anteproyecto.alumno.carrera.nombre}`, style: 'subtitulo',colSpan: 2}, '', {text: 'No. de\n control:', style: 'subtitulo', fillColor: '#e3e3e3'}, {text: `${anteproyecto.alumno.no_control}`, style: 'subtitulo'}],
                            [{text: 'Domicilio:', style: 'subtitulo'}, {text: `${anteproyecto.alumno.domicilio}`, style: 'subtitulo',colSpan: 4}, '', '', ''],
                            [{text: 'E-mail:', style: 'subtitulo', rowSpan: 2}, {text: `${anteproyecto.alumno.usuario.correo}`, style: 'subtitulo', colSpan: 2, rowSpan: 2},{text: '', rowSpan: 2}, {text: 'Para Seguridad\n Social acudir', style: 'subtitulo', rowSpan: 2}, {text: `${anteproyecto.alumno.seguro.nombre}(X)`, style: 'subtitulo', fillColor: '#e3e3e3'}],                          
                            ['', '', '', '', {text: `No. : ${anteproyecto.alumno.no_seguro}`, style: 'subtitulo'}],
                            [{text: 'Ciudad:', style: 'subtitulo'}, {text: `${anteproyecto.alumno.ciudad}`, style: 'subtitulo',colSpan: 2}, '', {text: 'Teléfono\n (no. celular):', style: 'subtitulo', fillColor: '#e3e3e3'}, {text: `${anteproyecto.alumno.numero_celular}`, style: 'subtitulo'}],
                            

                        ]
                    }
                },
                {
                    margin: [0, 100, 0, 0],
                    alignment: 'center',
                    text: `                             Firma del estudiante                             `,
                    decoration: 'overline'
                }
            ],
            styles:{
                titulo: {
                    fontSize: 12,
                },
                subititulo: {
                    fontSize: 10,
                },
                min:{
                    fontSize: 9
                },
                header_table:{
                    fontSize: 10,
                    bold: true
                },
                row_table: {
                    fontSize: 9,
                    alignment: 'center'                    
                },
                firma: {
                    fontSize: 10,
                    color: '#505962',
                    alignment: 'center'
                }


            }
        }
        var pdfDoc = printer.createPdfKitDocument(docDefinition);
        pdfDoc.pipe(res);
        pdfDoc.end();
    },
    generarFormatoDeCancelacion: (cancelacion, res) => {
        // console.log(cancelacion.alumno.carrera.departamento.docentes[0].nombre)
        var docDefinition = {
            pageSize: 'LETTER',
            pageMargins: [40, 40, 40, 50],
            content: [
                {
                    alignment: 'right',
                    width: '*',
                    text: [
                        {text: 'Asunto: ', style: 'normal'},
                        {text: 'Cancelación de proyecto de residencia y nueva \nasignación de anteproyecto de residencia profesional', style: 'normal', bold: true}
                    ]   
                },
                {
                    margin: [0, 30, 0, 0],
                    alignment: 'right',
                    width: '*',
                    text: `Chilpancingo, Gro., ${moment().format('LL')}.`,
                    style: 'normal'   
                },
                {
                    margin: [0, 30, 0, 0],
                    alignment: 'left',
                    width: '*',
                    text: `${cancelacion.alumno.carrera.departamento.docentes[0].titulo} ${cancelacion.alumno.carrera.departamento.docentes[0].nombre} ${cancelacion.alumno.carrera.departamento.docentes[0].ap_paterno} ${cancelacion.alumno.carrera.departamento.docentes[0].ap_materno} \nJefe de departamento de ${cancelacion.alumno.carrera.departamento.nombre}\nPRESENTE`,
                    style: 'normal',
                    bold: true
                },
                {
                    margin: [0, 20, 0, 0],
                    alignment: 'justify',
                    width: '*',
                    text: [
                        {text: `El que subscribe `, style: 'normal'},
                        {text: `${cancelacion.asesor_interno.titulo} ${cancelacion.asesor_interno.nombre} ${cancelacion.asesor_interno.ap_paterno} ${cancelacion.asesor_interno.ap_materno}`, style: 'normal', bold: true},
                        {text: `, catedrático de este instituto y asesor interno ${cancelacion.alumno.sexo==='H'?'del': 'de la'} estudiante residente `, style: 'normal'},
                        {text: `C. ${cancelacion.alumno.nombre} ${cancelacion.alumno.ap_paterno} ${cancelacion.alumno.ap_materno} `, style: 'normal', bold: true},
                        {text: `con numero de control `, style: 'normal'},
                        {text: `${cancelacion.alumno.no_control}`, style: 'normal', bold: true},
                        {text: `, de la carrera `, style: 'normal'},
                        {text: `${cancelacion.alumno.carrera.nombre} `, style: 'normal', bold: true},
                        {text: `quien tiene asignado el proyecto denominado: `, style: 'normal'},
                        {text: `"${cancelacion.nombre_proyecto}",`, style: 'normal', bold: true},
                        {text: ` en el periodo `, style: 'normal'},
                        {text: `${cancelacion.periodo.periodo} ${cancelacion.periodo.ciclo}.`, style: 'normal', bold: true},
                        {text: `\n\nCon base en ello; me permito notificar y solicitar a usted. Que el estudiante ya citado no podrá concluir su residencia profesional en el periodo que le correspondió, debido a que le se le presentaron los siguientes percances:`, style: 'normal', bold: true},
                        {text: `\n\t- ${cancelacion.justificacion}`, style: 'normal'},
                        {text: `\n\nPor lo que solicito a usted de no existir inconveniente alguno, el gestionar ante el comité académico en coordinación con el departamento de la división de estudio profesionales, la cancelación de la residencia descrita y la autorización de un nuevo anteproyecto de residencia profesional para que pueda concluir su carrera satisfactoriamente.`, style: 'normal', bold: true},
                        {text: `\n\nEn base a lo antes expuesto y esperando contar con su apoyo para llevar a cabo la cancelación y asignación de residencia profesional, quedo de usted.`, style: 'normal'},
                    ]
                },
                {
                    margin: [0, 30, 0, 0],
                    alignment: 'center',
                    width: '*',
                    text: `Atentamente`,
                    style: 'normal'
                },
                {
                    margin: [0, 0, 0, 0],
                    alignment: 'center',
                    width: '*',
                    text: [
                        {text: `\n\n       ${cancelacion.asesor_interno.titulo} ${cancelacion.asesor_interno.nombre} ${cancelacion.asesor_interno.ap_paterno} ${cancelacion.asesor_interno.ap_materno}       `, style: 'normal', decoration: 'overline'},
                        {text: '\n       Asesor interno       ', style: 'normal'}
                    ]

                }
            ],
            styles: {
                normal: {
                    fontSize: 12,
                    lineHeight: 1.5
                }
            }

        }
        var pdfDoc = printer.createPdfKitDocument(docDefinition);
        pdfDoc.pipe(res);
        pdfDoc.end();
    },
    generarCartaLiberacionAsesorInterno: (proyecto, res) => {
        // console.log('ALV', proyecto.anteproyecto.periodo.carrera.departamento.docentes[0].nombre)
        var docDefinition = {
            pageSize: 'LETTER',
            pageMargins: [40, 80, 40, 100],
            content: [
                {
                    alignment: 'right',
                    width: '*',
                    text: `Chilpancingo, Gro., ${moment().format('LL')}.`,
                    style: 'normal'
                },
                {
                    alignment: 'left',
                    width: '*',
                    margin: [0, 50, 0, 0],
                    text: [
                        {text: `${proyecto.anteproyecto.periodo.carrera.departamento.docentes[0].titulo} ${proyecto.anteproyecto.periodo.carrera.departamento.docentes[0].nombre} ${proyecto.anteproyecto.periodo.carrera.departamento.docentes[0].ap_paterno} ${proyecto.anteproyecto.periodo.carrera.departamento.docentes[0].ap_materno}`.toUpperCase(), style: 'normal', bold: true},
                        {text: `\nJEFE DEL DEPARTAMENTO DE ${proyecto.anteproyecto.periodo.carrera.departamento.nombre}`.toUpperCase(), style: 'normal', bold: true},
                        {text: `\nINSTITUTO TECNOLÓGICO DE CHILPANCINGO\nPRESENTE`.toUpperCase(), style: 'normal', bold: true}
                    ]
                },
                {
                    alignment: 'justify',
                    width: '*',
                    margin: [0, 20, 0, 0],
                    text: [
                        {text: `Por este medio comunico a usted, que el Proyecto de Residencia Profesional denominado "${proyecto.anteproyecto.nombre}", realizado por ${proyecto.anteproyecto.alumno.sexo==='H'?'el': 'la'} estudiante ${proyecto.anteproyecto.alumno.nombre} ${proyecto.anteproyecto.alumno.ap_paterno} ${proyecto.anteproyecto.alumno.ap_materno} , No. control ${proyecto.anteproyecto.alumno.no_control}, del programa educativo de ${proyecto.anteproyecto.periodo.carrera.nombre}, del que fungí como Asesor interno; fue desarrollado en tiempo y forma de acuerdo a lo establecido en su programa de actividades.`, style: 'normal'},
                         {text: `\nPor lo anterior, una vez que ha sido revisado y avalado en informe técnico final del proyecto de residencia profesional mencionado, se da por concluido el proyecto quedando liberado ${proyecto.anteproyecto.alumno.sexo==='H'?'el': 'la'} estudiante que en el intervino.`, style: 'normal'},
                         {text: `\n\nSin otro particular por el momento, reciba un cordial saludo.`, style: 'normal'}
                    ]
                },
                {
                    alignment: 'center',
                    width: '*',
                    margin: [0, 20, 0, 0],
                    text: [
                        {text: 'Atentamente', style: 'normal'},
                        {text: `\n\n\n\n       ${proyecto.anteproyecto.asesor_interno.titulo} ${proyecto.anteproyecto.asesor_interno.nombre} ${proyecto.anteproyecto.asesor_interno.ap_paterno} ${proyecto.anteproyecto.asesor_interno.ap_materno}       `, style: 'normal', decoration: 'overline'},
                        {text: '\n       Asesor interno       ', style: 'normal'}
                    ]
                }
            ],
            styles: {
                normal: {
                    fontSize: 12,
                    lineHeight: 1.5
                }
            }
        }

        var pdfDoc = printer.createPdfKitDocument(docDefinition);
        pdfDoc.pipe(res);
        pdfDoc.end();
    },
    generarCartaLiberacionAsesorExterno: (proyecto, depto_vinculacion, res) => {
        var docDefinition = {
            pageSize: 'LETTER',
            pageMargins: [40, 80, 40, 100],
            content: [
                {
                    alignment: 'right',
                    width: '*',
                    text: `Chilpancingo, Gro., ${moment().format('LL')}.`,
                    style: 'normal'
                },
                {
                    alignment: 'left',
                    width: '*',
                    margin: [0, 50, 0, 0],
                    text: [
                        {text: `${depto_vinculacion.docentes[0].titulo} ${depto_vinculacion.docentes[0].nombre} ${depto_vinculacion.docentes[0].ap_paterno} ${depto_vinculacion.docentes[0].ap_materno}`.toUpperCase(), style: 'normal', bold: true},
                        {text: `\nJEFE DEL DEPARTAMENTO DE GESTIÓN TECNOLÓGICA Y VINCULACIÓN`.toUpperCase(), style: 'normal', bold: true},
                        {text: `\nINSTITUTO TECNOLÓGICO DE CHILPANCINGO\nPRESENTE`.toUpperCase(), style: 'normal', bold: true}
                    ]
                },
                {
                    alignment: 'justify',
                    width: '*',
                    margin: [0, 50, 0, 0],
                    text: [
                        {text: `Por este condicto le comunico, que ${proyecto.anteproyecto.alumno.sexo==='H'?'el': 'la'} estudiante del programa educativo de ${proyecto.anteproyecto.periodo.carrera.nombre} del Instituto Tecnológico de Chilpancingo `, style: 'normal'},
                        {text: `${proyecto.anteproyecto.alumno.nombre} ${proyecto.anteproyecto.alumno.ap_paterno} ${proyecto.anteproyecto.alumno.ap_materno} `, style: 'normal', bold: true},
                        {text: `No. de control `, style: 'normal'},
                        {text: `${proyecto.anteproyecto.alumno.no_control}, `, style: 'normal', bold: true},
                        {text: `concluyo el Proyecto de Residencia Profesional denominado: `, style: 'normal'},
                        {text: `"${proyecto.anteproyecto.nombre}", `, style: 'normal', bold: true},
                        {text: `cubriendo un total de 500 horas, en el período comprendido del ${moment(proyecto.anteproyecto.periodo.fecha_inicio, 'YYYY-MM-DD').format('LL')} al ${moment(proyecto.anteproyecto.periodo.fecha_fin, 'YYYY-MM-DD').format('LL')}.`, style: 'normal'},
                        {text: `\n\n\nHago de su conocimiento lo anterior, una vez que se ha recibido de ${proyecto.anteproyecto.alumno.sexo==='H'?'el': 'la'} estudiante el Informe Técnico del Proyecto de Residencia Profesional, en esta institución en la que fungí como asesor de dicho proyecto.`, style: 'normal'},
                        {text: `\n\nSin mas por el momemento, reciba un cordial saludo.`, style: 'normal'}
                    ]
                },
                {
                    alignment: 'center',
                    width: '*',
                    margin: [0, 50, 0, 0],
                    text: [
                        {text: 'Atentamente', style: 'normal'},
                        {text: `\n\n\n\n    ${proyecto.anteproyecto.asesor_externo.nombre}    `, style: 'normal', decoration: 'overline'}
                    ]
                }
            ],
            styles: {
                normal: {
                    fontSize: 10,
                    lineHeight: 1.5
                }
            }
        }

        var pdfDoc = printer.createPdfKitDocument(docDefinition);
        pdfDoc.pipe(res);
        pdfDoc.end();
    },
    generarFormatoEvaluacionAnexoIII: (proyecto, res) => {
        // evaluacion asesor externo
        var content_table = [];
        var calificacion_final = 0;
        proyecto.evaluacion_asesor_externo.criterios_de_evaluacion.map((criterio_evaluacion, index) => {
            content_table.push([ 
                {text: `${(index+1)}.- ${criterio_evaluacion.ref_criterio.descripcion}`, style: 'normal', alignment: 'left'},
                {text: `${criterio_evaluacion.ref_criterio.valor_max}`, style: 'normal', alignment: 'center'},
                {text: `${criterio_evaluacion.valor_de_evaluacion}`, style: 'normal', alignment: 'center'}
            ])
            calificacion_final += criterio_evaluacion.valor_de_evaluacion;
        })
        content_table.unshift([{text: 'Criterios a evaluar', style: 'normal', alignment: 'center', bold: true},{text: 'A\nValor', style: 'normal', alignment: 'center'},{text: 'B\nEvaluación', style: 'normal', alignment: 'center'}])
        content_table.unshift([{fillColor: '#d7d9db', text: 'Evaluación asesor externo', style: 'normal', bold: true, alignment: 'center', colSpan: 3}, '', ''])        
        content_table.unshift([{text: 'En qué medida el Residente cumple con lo siguiente:', style: 'normal', alignment: 'center', bold: true, colSpan: 3}, '', ''])
        content_table.push([{text: [
            {text: 'OBSERVACIONES:\n', style: 'normal', bold: true},
            {text: `${proyecto.evaluacion_asesor_externo.observaciones}`, style: 'normal', alignment: 'left'}
        ], colSpan: 3}, '', ''])

        // evaluacion asesor interno
        content_table.push([{fillColor: '#d7d9db', text: 'Evaluación asesor interno', style: 'normal', bold: true, alignment: 'center', colSpan: 3}, '', ''])        
        
        proyecto.evaluacion_asesor_interno.criterios_de_evaluacion.map((criterio_evaluacion, index) => {
            content_table.push([
                {text: `${(index+1)}.- ${criterio_evaluacion.ref_criterio.descripcion}`, style: 'normal', alignment: 'left'},
                {text: `${criterio_evaluacion.ref_criterio.valor_max}`, style: 'normal', alignment: 'center'},
                {text: `${criterio_evaluacion.valor_de_evaluacion}`, style: 'normal', alignment: 'center'}
            ])
            calificacion_final += criterio_evaluacion.valor_de_evaluacion;
        })
        content_table.push([{text: [
            {text: 'OBSERVACIONES:\n', style: 'normal', bold: true},
            {text: `${proyecto.evaluacion_asesor_interno.observaciones}`, style: 'normal', alignment: 'left'}
        ], colSpan: 3}, '', ''])

        content_table.push([{text: 'CALIFICACIÓN FINAL\n', style: 'normal', bold: true, colSpan: 2, alignment: 'center'}, '', {text: `${calificacion_final}`, style: 'normal', alignment: 'center'}])
        content_table.push([{text: [
            {text: 'NIVEL DE DESEMPEÑO:\n', style: 'normal', bold: true, alignment: 'center'},
            {text: `${nivelDeDesempenio(calificacion_final)}`, style: 'normal', alignment: 'center'}
        ], colSpan: 3}, '', ''])
        
        
        var docDefinition = {
            pageSize: 'LETTER',
            pageMargins: [40, 120, 40, 100],
            background: [
                {
                    margin: [0,250,0,0],
                    image: __dirname + '/../public/img/escudo.png',
                    width: 400,
                    height: 400,
                    alignment: 'center'
                }
            ],
            header: (currentPage, pageCount) => {
                return {
                    margin: [40, 20, 40, 0],
                    alignment: 'justify',
                    columns: [
                        {
                            table: {
                                widths: ['*','*'],
                                body: [
                                    [{image: __dirname+'/../public/img/sep-tec.png', width: 200, height: 70,alignment: 'left', },{margin: [0,25,0,0],alignment: 'right',text: [{text: 'TECNOLÓGICO NACIONAL DE MEXICO\n', bold: true, style: 'header_tecnm'},{text: 'Instituto Tecnológico de Chilpancingo', bold: true, style: 'header_itch'}]}],
                                    [{text: '“2015, Año del Generalísimo José María Morelos y Pavón”', alignment: 'center', style: 'header_bottom', colSpan: 2}]
                                ]
                            },
                            layout: 'noBorders'
                        }
                        
                        
                    ]
                }
            },
            content: [
                {
                    alignment: 'center',
                    width: '*',
                    bold: true,
                    text: `Anexo III \n Formato de evaluación`
                },
                {
                    alignment: 'left',
                    width: '*',
                    margin: [0, 10, 0,0],
                    text: [
                        {text: `Nombre del residente: `, style: 'normal'},
                        {text: `${proyecto.anteproyecto.alumno.nombre}  ${proyecto.anteproyecto.alumno.ap_paterno}  ${proyecto.anteproyecto.alumno.ap_materno}`, style: 'normal', decoration: 'underline'},
                        
                    ]
                },
                {
                    alignment: 'left',
                    width: '*',
                    margin: [0, 10, 0,0],
                    text: [
                        {text: `Número de control: `, style: 'normal'},
                        {text: `${proyecto.anteproyecto.alumno.no_control}`, style: 'normal', decoration: 'underline'},
                    ]
                },
                {
                    alignment: 'left',
                    width: '*',
                    margin: [0, 10, 0,0],
                    text: [
                        {text: `Nombre del proyecto: `, style: 'normal'},
                        {text: `${proyecto.anteproyecto.nombre}`, style: 'normal', decoration: 'underline'},
                    ]
                },
                {
                    alignment: 'left',
                    width: '*',
                    margin: [0, 10, 0,0],
                    text: [
                        {text: `Carrera: `, style: 'normal'},
                        {text: `${proyecto.anteproyecto.periodo.carrera.nombre}`, style: 'normal', decoration: 'underline'},
                    ]
                },
                {
                    alignment: 'left',
                    width: '*',
                    margin: [0, 10, 0,0],
                    text: [
                        {text: `Periodo de realización de la Residencia Profesional: `, style: 'normal'},
                        {text: `${proyecto.anteproyecto.periodo.periodo} ${proyecto.anteproyecto.periodo.ciclo}`, style: 'normal', decoration: 'underline'},
                    ]
                },
                {
                    margin: [0, 20, 0, 0],
                    table: {
                        widths: ['*', 'auto', 'auto'],
                        body: content_table
                    }
                },
                {
                    margin: [0,10, 0,0],
                    table: {
                        widths: ['*','*'],
                        alignment: 'center',
                        body: [
                            [{alignment: 'center',style: 'normal', text: `           ${proyecto.anteproyecto.asesor_interno.titulo} ${proyecto.anteproyecto.asesor_interno.nombre} ${proyecto.anteproyecto.asesor_interno.ap_paterno} ${proyecto.anteproyecto.asesor_interno.ap_materno}           `, decoration: 'underline'}, {alignment: 'center',text: `           ${proyecto.anteproyecto.asesor_externo.nombre}           `, style:'normal', decoration: 'underline'}],
                            [{alignment: 'center',text: 'Nombre y firma del asesor interno', style:'normal'}, {alignment: 'center',text: 'Nombre y firma del asesor externo', style:'normal'}],
                        ]
                    },
                    layout: 'noBorders'              
                },
            ],
            footer: (currentPage, pageCount) => {
                return {
                    margin: [40, 20, 40, 0],
                    alignment: 'justify',
                    columns: [
                        {
                            table: {
                                widths: [40, '*', 40, 40,40],
                                body: [
                                    [
                                        {image: __dirname+'/../public/img/tec_Logo.png', width: 40, height: 40 },
                                        {alignment: 'center',text: [
                                            {text: 'Av. José Francisco Ruíz Massieu No. 5, Colonia Villa Moderna, C.P.  39090 Chilpancingo, Guerrero.', style: 'footer_text'},
                                            {text: '\nTeléfono: (747) 48 01022, Tel/Fax: 47 2 10 14 ', style: 'footer_text'},
                                            {text: 'www.itchilpancingo.edu.mx', link: 'http://www.itchilpancingo.edu.mx',style: 'link_footer'},
                                            {text: ', email: ', style: 'footer_text'},
                                            {text: 'itchilpancingo@hotmail.com', style:'link_footer'},
                                            {text: '\nFacebook: ', style: 'footer_text'},
                                            {text: 'Tecnológico de Chilpancingo Comunicación',link: 'https://www.facebook.com/Tecnológico-de-Chilpancingo-Comunicación-131577620223301/', decoration:'underline', style:'link_footer'}

                                        ]},
                                        {image: __dirname+'/../public/img/footer_2.png', width: 40, height: 40},
                                        {image: __dirname+'/../public/img/footer_3.png', width: 40, height: 40},
                                        {image: __dirname+'/../public/img/footer_4.png', width: 40, height: 40},

                                    
                                    ],
                                ]
                            },
                            layout: 'noBorders'
                        }
                        
                        
                    ]
                }
            },
            styles: {
                normal: {
                    fontSize: 10
                },
                header_tecnm: {
                    color: '#bababa',
                    fontSize: 12
                },
                header_itch: {
                    color: '#bababa',
                    fontSize: 11
                },
                header_bottom: {
                    color: '#bababa',
                    fontSize: 9
                },
                footer_text: {
                    color: '#bababa',
                    fontSize: 7.5
                },
                link_footer: {
                    color: '#0b24fb',
                    fontSize: 7.5
                }
            }
        };
        var pdfDoc = printer.createPdfKitDocument(docDefinition);
        pdfDoc.pipe(res);
        pdfDoc.end();
    },
    generarFormatoDeEvaluacionDeResidenciaAnexoXXX: (proyecto, res) => {
        // evaluacion asesor externo
        var evaluacion_asesor_interno = [], evaluacion_asesor_externo = [];
        var calificacion_final = 0;
        var calificacion_total = 0;
        var promedio = 0;
        proyecto.evaluacion_asesor_externo.criterios_de_evaluacion.map((criterio_evaluacion, index) => {
            evaluacion_asesor_externo.push([ 
                {text: `${criterio_evaluacion.ref_criterio.descripcion}`, style: 'normal', alignment: 'left'},
                {text: `${criterio_evaluacion.ref_criterio.valor_max}`, style: 'normal', alignment: 'center'},
                {text: `${criterio_evaluacion.valor_de_evaluacion}`, style: 'normal', alignment: 'center'}
            ])
            calificacion_total += criterio_evaluacion.ref_criterio.valor_max;
            calificacion_final += criterio_evaluacion.valor_de_evaluacion;
        })
        evaluacion_asesor_externo.unshift([{text: 'Criterios a evaluar', style: 'normal', alignment: 'center', bold: true},{text: 'Valor', style: 'normal', alignment: 'center'},{text: 'Evaluación', style: 'normal', alignment: 'center'}])
        evaluacion_asesor_externo.unshift([{text: 'En qué medida el Residente cumple con lo siguiente', style: 'normal', alignment: 'center', bold: true, colSpan: 3}, '', ''])
        evaluacion_asesor_externo.unshift([{fillColor: '#d7d9db', text: 'Evaluación asesor externo', style: 'normal', bold: true, alignment: 'center', colSpan: 3}, '', ''])                        
        evaluacion_asesor_externo.push([{text: 'Calificación total\n', style: 'normal', bold: true, alignment: 'right'}, {text: `${calificacion_total}`, style: 'normal', alignment: 'center'}, {text: `${calificacion_final}`, style: 'normal', alignment: 'center'}])
        // evaluacion asesor interno
        promedio += calificacion_final;
        calificacion_final = 0;
        calificacion_total = 0;
        evaluacion_asesor_interno.push([{fillColor: '#d7d9db', text: 'Evaluación asesor interno', style: 'normal', bold: true, alignment: 'center', colSpan: 3}, '', ''])                
        evaluacion_asesor_interno.push([{text: 'En qué medida el Residente cumple con lo siguiente', style: 'normal', alignment: 'center', bold: true, colSpan: 3}, '', ''])
        evaluacion_asesor_interno.push([{text: 'Criterios a evaluar', style: 'normal', alignment: 'center', bold: true},{text: 'Valor', style: 'normal', alignment: 'center'},{text: 'Evaluación', style: 'normal', alignment: 'center'}]);
        
        proyecto.evaluacion_asesor_interno.criterios_de_evaluacion.map((criterio_evaluacion, index) => {
            evaluacion_asesor_interno.push([
                {text: `${criterio_evaluacion.ref_criterio.descripcion}`, style: 'normal', alignment: 'left'},
                {text: `${criterio_evaluacion.ref_criterio.valor_max}`, style: 'normal', alignment: 'center'},
                {text: `${criterio_evaluacion.valor_de_evaluacion}`, style: 'normal', alignment: 'center'}
            ])
            calificacion_final += criterio_evaluacion.valor_de_evaluacion;
            calificacion_total += criterio_evaluacion.ref_criterio.valor_max;
        })
        evaluacion_asesor_interno.push([{text: 'Calificación total\n', style: 'normal', bold: true, alignment: 'right'}, {text: `${calificacion_total}`, style: 'normal', alignment: 'center'}, {text: `${calificacion_final}`, style: 'normal', alignment: 'center'}])
        promedio += calificacion_final;
        promedio = (promedio / 2);

        var docDefinition = {
            pageSize: 'LETTER',
            pageMargins: [40, 110, 40, 80],
            background: [
                {
                    margin: [0,250,0,0],
                    image: __dirname + '/../public/img/escudo.png',
                    width: 400,
                    height: 400,
                    alignment: 'center'
                }
            ],
            header: (currentPage, pageCount) => {
                return {
                    margin: [40, 20, 40, 0],
                    alignment: 'justify',
                    columns: [
                        {
                            table: {
                                widths: ['*','*'],
                                body: [
                                    [{image: __dirname+'/../public/img/sep-tec.png', width: 200, height: 70,alignment: 'left', },{margin: [0,25,0,0],alignment: 'right',text: [{text: 'TECNOLÓGICO NACIONAL DE MEXICO\n', bold: true, style: 'header_tecnm'},{text: 'Instituto Tecnológico de Chilpancingo', bold: true, style: 'header_itch'}]}],
                                    [{text: '“2015, Año del Generalísimo José María Morelos y Pavón”', alignment: 'center', style: 'header_bottom', colSpan: 2}]
                                ]
                            },
                            layout: 'noBorders'
                        }
                        
                        
                    ]
                }
            },
            content: [
                {
                    alignment: 'center',
                    width: '*',
                    bold: true,
                    text: `ANEXO XXX. FORMATO DE EVALUACIÓN DE REPORTE DE RESIDENCIA PROFESIONAL`,
                    style: '_normal'
                },
                {
                    margin: [0, 15, 0,0],
                    columns: [
                        {
                            alignment: 'left',
                            width: '*',
                            text: [
                                {text: `Nombre del residente: `, style: '_normal',},
                                {text: `     ${proyecto.anteproyecto.alumno.nombre}  ${proyecto.anteproyecto.alumno.ap_paterno}  ${proyecto.anteproyecto.alumno.ap_materno}     `, style: '_normal', decoration: 'underline'},
                                
                            ]
                        },
                        {
                            alignment: 'right',
                            width: '*',
                            text: [
                                {text: ` Número de control: `, style: '_normal'},
                                {text: `     ${proyecto.anteproyecto.alumno.no_control}     `, style: '_normal', decoration: 'underline'},
                            ]
                        }
                    ]
                },
                {
                    alignment: 'left',
                    width: '*',
                    margin: [0, 10, 0,0],
                    text: [
                        {text: `Programa educativo: `, style: '_normal'},
                        {text: `${proyecto.anteproyecto.periodo.carrera.nombre}`, style: '_normal', decoration: 'underline'},
                    ]
                },
                {
                    alignment: 'left',
                    width: '*',
                    margin: [0, 10, 0,0],
                    text: [
                        {text: `Periodo de realización de la Residencia Profesional: `, style: '_normal'},
                        {text: `${proyecto.anteproyecto.periodo.periodo} ${proyecto.anteproyecto.periodo.ciclo}`, style: '_normal', decoration: 'underline'},
                    ]
                },
                {
                    alignment: 'left',
                    width: '*',
                    margin: [0, 10, 0,0],
                    text: [
                        {text: `Calificación parcial (promedio de ambas evaluaciones): `, style: '_normal'},
                        {text: `${promedio}`, style: '_normal', decoration: 'underline'},
                    ]
                },
                {
                    margin: [0, 15, 0, 0],
                    table: {
                        widths: ['*', 'auto', 'auto'],
                        body: evaluacion_asesor_externo
                    }
                },
                {
                    alignment: 'left',
                    width: '*',
                    margin: [0, 5, 0, 0],
                    text: [
                        {text: `Observaciones: `, style: 'normal', bold: true},
                        {text: `${proyecto.evaluacion_asesor_externo.observaciones}`, style: 'normal', decoration: 'underline'}
                    ]
                },
                {
                    margin: [0, 10, 0, 0],
                    table: {
                        widths: ['*', '*', '*'],
                        body: [
                            [{text: [{text: `\n   ${proyecto.anteproyecto.asesor_externo.nombre}    `, style: 'normal', decoration: 'underline'},{text: `\nNombre y firma del asesor externo`, style: 'normal'}], style: 'normal', alignment: 'center'}, {text: `Sello de la empresa, organismo o dependencia`, style: 'normal',alignment: 'center'}, {text: `Fecha de evaluación\n ${moment(proyecto.evaluacion_asesor_externo.createdAt).utc().format('LL')}`, style: 'normal', alignment: 'center'}]
                        ]
                    }
                },
                {
                    margin: [0, 20, 0, 0],
                    table: {
                        widths: ['*', 'auto', 'auto'],
                        body: evaluacion_asesor_interno
                    }
                },
                {
                    alignment: 'left',
                    width: '*',
                    margin: [0, 10, 0, 0],
                    text: [
                        {text: `Observaciones: `, style: 'normal', bold: true},
                        {text: `${proyecto.evaluacion_asesor_interno.observaciones}`, style: 'normal', decoration: 'underline'}
                    ]
                },
                {
                    margin: [0, 15, 0, 0],
                    table: {
                        widths: ['*', '*', '*'],
                        body: [
                            [{text: [{text: `\n   ${proyecto.anteproyecto.asesor_interno.titulo} ${proyecto.anteproyecto.asesor_interno.nombre} ${proyecto.anteproyecto.asesor_interno.ap_paterno} ${proyecto.anteproyecto.asesor_interno.ap_materno}   `, style: 'normal', decoration: 'underline'},{text: `\nNombre y firma del asesor interno`, style: 'normal'}], style: 'normal', alignment: 'center'}, {text: `Sello de la empresa, organismo o dependencia`, style: 'normal',alignment: 'center'}, {text: `Fecha de evaluación\n ${moment(proyecto.evaluacion_asesor_interno.createdAt).utc().format('LL')}`, style: 'normal', alignment: 'center'}]
                        ]
                    }
                }

                
            ],
            footer: (currentPage, pageCount) => {
                return {
                    margin: [40, 20, 40, 0],
                    alignment: 'justify',
                    columns: [
                        {
                            table: {
                                widths: [40, '*', 40, 40,40],
                                body: [
                                    [
                                        {image: __dirname+'/../public/img/tec_Logo.png', width: 40, height: 40 },
                                        {alignment: 'center',text: [
                                            {text: 'Av. José Francisco Ruíz Massieu No. 5, Colonia Villa Moderna, C.P.  39090 Chilpancingo, Guerrero.', style: 'footer_text'},
                                            {text: '\nTeléfono: (747) 48 01022, Tel/Fax: 47 2 10 14 ', style: 'footer_text'},
                                            {text: 'www.itchilpancingo.edu.mx', link: 'http://www.itchilpancingo.edu.mx',style: 'link_footer'},
                                            {text: ', email: ', style: 'footer_text'},
                                            {text: 'itchilpancingo@hotmail.com', style:'link_footer'},
                                            {text: '\nFacebook: ', style: 'footer_text'},
                                            {text: 'Tecnológico de Chilpancingo Comunicación',link: 'https://www.facebook.com/Tecnológico-de-Chilpancingo-Comunicación-131577620223301/', decoration:'underline', style:'link_footer'}

                                        ]},
                                        {image: __dirname+'/../public/img/footer_2.png', width: 40, height: 40},
                                        {image: __dirname+'/../public/img/footer_3.png', width: 40, height: 40},
                                        {image: __dirname+'/../public/img/footer_4.png', width: 40, height: 40},

                                    
                                    ],
                                ]
                            },
                            layout: 'noBorders'
                        }
                        
                        
                    ]
                }
            },
            styles: {
                _normal: {
                    fontSize: 10
                },
                normal: {
                    fontSize: 8
                },
                header_tecnm: {
                    color: '#bababa',
                    fontSize: 12
                },
                header_itch: {
                    color: '#bababa',
                    fontSize: 11
                },
                header_bottom: {
                    color: '#bababa',
                    fontSize: 9
                },
                footer_text: {
                    color: '#bababa',
                    fontSize: 7.5
                },
                link_footer: {
                    color: '#0b24fb',
                    fontSize: 7.5
                }
            }

       }
        
        var pdfDoc = printer.createPdfKitDocument(docDefinition);
        pdfDoc.pipe(res);
        pdfDoc.end();
    },
    generarFormatoEvaluacionDeSeguimientoAnexoXXIX: (seguimiento, res) => {
        // evaluacion asesor externo
        var evaluacion_asesor_interno = [], evaluacion_asesor_externo = [];
        var calificacion_final = 0;
        var calificacion_total = 0;
        var promedio = 0;
        seguimiento.evaluacion_asesor_externo.criterios_de_evaluacion.map((criterio_evaluacion, index) => {
            evaluacion_asesor_externo.push([ 
                {text: `${criterio_evaluacion.ref_criterio.descripcion}`, style: 'normal', alignment: 'left'},
                {text: `${criterio_evaluacion.ref_criterio.valor_max}`, style: 'normal', alignment: 'center'},
                {text: `${criterio_evaluacion.valor_de_evaluacion}`, style: 'normal', alignment: 'center'}
            ])
            calificacion_total += criterio_evaluacion.ref_criterio.valor_max;
            calificacion_final += criterio_evaluacion.valor_de_evaluacion;
        })
        evaluacion_asesor_externo.unshift([{text: 'Criterios a evaluar', style: 'normal', alignment: 'center', bold: true},{text: 'Valor', style: 'normal', alignment: 'center'},{text: 'Evaluación', style: 'normal', alignment: 'center'}])
        evaluacion_asesor_externo.unshift([{text: 'En qué medida el Residente cumple con lo siguiente', style: 'normal', alignment: 'center', bold: true, colSpan: 3}, '', ''])
        evaluacion_asesor_externo.unshift([{fillColor: '#d7d9db', text: 'Evaluación asesor externo', style: 'normal', bold: true, alignment: 'center', colSpan: 3}, '', ''])                        
        evaluacion_asesor_externo.push([{text: 'Calificación total\n', style: 'normal', bold: true, alignment: 'right'}, {text: `${calificacion_total}`, style: 'normal', alignment: 'center'}, {text: `${calificacion_final}`, style: 'normal', alignment: 'center'}])

        // evaluacion asesor interno
        promedio += calificacion_final;
        calificacion_final = 0;
        calificacion_total = 0;
        evaluacion_asesor_interno.push([{fillColor: '#d7d9db', text: 'Evaluación asesor interno', style: 'normal', bold: true, alignment: 'center', colSpan: 3}, '', ''])                
        evaluacion_asesor_interno.push([{text: 'En qué medida el Residente cumple con lo siguiente', style: 'normal', alignment: 'center', bold: true, colSpan: 3}, '', ''])
        evaluacion_asesor_interno.push([{text: 'Criterios a evaluar', style: 'normal', alignment: 'center', bold: true},{text: 'Valor', style: 'normal', alignment: 'center'},{text: 'Evaluación', style: 'normal', alignment: 'center'}]);
        
        seguimiento.evaluacion_asesor_interno.criterios_de_evaluacion.map((criterio_evaluacion, index) => {
            evaluacion_asesor_interno.push([
                {text: `${criterio_evaluacion.ref_criterio.descripcion}`, style: 'normal', alignment: 'left'},
                {text: `${criterio_evaluacion.ref_criterio.valor_max}`, style: 'normal', alignment: 'center'},
                {text: `${criterio_evaluacion.valor_de_evaluacion}`, style: 'normal', alignment: 'center'}
            ])
            calificacion_final += criterio_evaluacion.valor_de_evaluacion;
            calificacion_total += criterio_evaluacion.ref_criterio.valor_max;
        })
        evaluacion_asesor_interno.push([{text: 'Calificación total\n', style: 'normal', bold: true, alignment: 'right'}, {text: `${calificacion_total}`, style: 'normal', alignment: 'center'}, {text: `${calificacion_final}`, style: 'normal', alignment: 'center'}])
        promedio += calificacion_final;
        promedio = (promedio / 2);
        
        var docDefinition = {
            pageSize: 'LETTER',
            pageMargins: [40, 110, 40, 80],
            background: [
                {
                    margin: [0,250,0,0],
                    image: __dirname + '/../public/img/escudo.png',
                    width: 400,
                    height: 400,
                    alignment: 'center'
                }
            ],
            header: (currentPage, pageCount) => {
                return {
                    margin: [40, 20, 40, 0],
                    alignment: 'justify',
                    columns: [
                        {
                            table: {
                                widths: ['*','*'],
                                body: [
                                    [{image: __dirname+'/../public/img/sep-tec.png', width: 200, height: 70,alignment: 'left', },{margin: [0,25,0,0],alignment: 'right',text: [{text: 'TECNOLÓGICO NACIONAL DE MEXICO\n', bold: true, style: 'header_tecnm'},{text: 'Instituto Tecnológico de Chilpancingo', bold: true, style: 'header_itch'}]}],
                                    [{text: '“2015, Año del Generalísimo José María Morelos y Pavón”', alignment: 'center', style: 'header_bottom', colSpan: 2}]
                                ]
                            },
                            layout: 'noBorders'
                        }
                        
                        
                    ]
                }
            },
            content: [
                {
                    alignment: 'center',
                    width: '*',
                    bold: true,
                    text: `ANEXO XXIX. FORMATO DE EVALUACIÓN Y SEGUIMIENTO DE RESIDENCIA PROFESIONAL`,
                    style: 'normal'
                },
                {
                    width: '*',
                    margin: [0, 15, 0,0],
                    columns: [
                        {
                            alignment: 'left',
                            text: [
                                {text: `Nombre del residente: `, style: 'normal'},
                                {text: `    ${seguimiento.proyecto.anteproyecto.alumno.nombre}  ${seguimiento.proyecto.anteproyecto.alumno.ap_paterno}  ${seguimiento.proyecto.anteproyecto.alumno.ap_materno}    `, style: 'normal', decoration: 'underline'},
                                
                            ]
                        },
                        {
                            alignment: 'right',
                            text: [
                                {text: ` Número de control: `, style: 'normal'},
                                {text: `   ${seguimiento.proyecto.anteproyecto.alumno.no_control}   `, style: 'normal', decoration: 'underline'},
                                
                            ]
                        },
                    ]
                },
                {
                    alignment: 'left',
                    width: '*',
                    margin: [0, 10, 0,0],
                    text: [
                        {text: `Nombre del proyecto: `, style: 'normal'},
                        {text: `${seguimiento.proyecto.anteproyecto.nombre}`, style: 'normal', decoration: 'underline'},
                    ]
                },
                {
                    alignment: 'left',
                    width: '*',
                    margin: [0, 10, 0,0],
                    text: [
                        {text: `Programa educativo: `, style: 'normal'},
                        {text: `${seguimiento.proyecto.anteproyecto.periodo.carrera.nombre}`, style: 'normal', decoration: 'underline'},
                    ]
                },
                {
                    alignment: 'left',
                    width: '*',
                    margin: [0, 10, 0,0],
                    text: [
                        {text: `Periodo de realización de la Residencia Profesional: `, style: 'normal'},
                        {text: `${seguimiento.proyecto.anteproyecto.periodo.periodo} ${seguimiento.proyecto.anteproyecto.periodo.ciclo}`, style: 'normal', decoration: 'underline'},
                    ]
                },
                {
                    alignment: 'left',
                    width: '*',
                    margin: [0, 10, 0,0],
                    text: [
                        {text: `Calificación parcial (promedio de ambas evaluaciones): `, style: 'normal'},
                        {text: `${promedio}`, style: 'normal', decoration: 'underline'},
                    ]
                },
                {
                    margin: [0, 15, 0, 0],
                    table: {
                        widths: ['*', 'auto', 'auto'],
                        body: evaluacion_asesor_externo
                    }
                },
                {
                    alignment: 'left',
                    width: '*',
                    margin: [0, 5, 0, 0],
                    text: [
                        {text: `Observaciones: `, style: 'normal', bold: true},
                        {text: `${seguimiento.evaluacion_asesor_externo.observaciones}`, style: 'normal', decoration: 'underline'}
                    ]
                },
                {
                    margin: [0, 10, 0, 0],
                    table: {
                        widths: ['*', '*', '*'],
                        body: [
                            [{text: [{text: `\n   ${seguimiento.proyecto.anteproyecto.asesor_externo.nombre}    `, style: 'normal', decoration: 'underline'},{text: `\nNombre y firma del asesor externo`, style: 'normal'}], style: 'normal', alignment: 'center'}, {text: `Sello de la empresa, organismo o dependencia`, style: 'normal',alignment: 'center'}, {text: `Fecha de evaluación\n ${moment(seguimiento.evaluacion_asesor_externo.createdAt).utc().format('LL')}`, style: 'normal', alignment: 'center'}]
                        ]
                    }
                },
                {
                    margin: [0, 20, 0, 0],
                    table: {
                        widths: ['*', 'auto', 'auto'],
                        body: evaluacion_asesor_interno
                    }
                },
                {
                    alignment: 'left',
                    width: '*',
                    margin: [0, 10, 0, 0],
                    text: [
                        {text: `Observaciones: `, style: 'normal', bold: true},
                        {text: `${seguimiento.evaluacion_asesor_interno.observaciones}`, style: 'normal', decoration: 'underline'}
                    ]
                },
                {
                    margin: [0, 15, 0, 0],
                    table: {
                        widths: ['*', '*', '*'],
                        body: [
                            [{text: [{text: `\n   ${seguimiento.proyecto.anteproyecto.asesor_interno.titulo} ${seguimiento.proyecto.anteproyecto.asesor_interno.nombre} ${seguimiento.proyecto.anteproyecto.asesor_interno.ap_paterno} ${seguimiento.proyecto.anteproyecto.asesor_interno.ap_materno}   `, style: 'normal', decoration: 'underline'},{text: `\nNombre y firma del asesor interno`, style: 'normal'}], style: 'normal', alignment: 'center'}, {text: `Sello de la empresa, organismo o dependencia`, style: 'normal',alignment: 'center'}, {text: `Fecha de evaluación\n ${moment(seguimiento.evaluacion_asesor_interno.createdAt).utc().format('LL')}`, style: 'normal', alignment: 'center'}]
                        ]
                    }
                }
            ],
            footer: (currentPage, pageCount) => {
                return {
                    margin: [40, 20, 40, 0],
                    alignment: 'justify',
                    columns: [
                        {
                            table: {
                                widths: [40, '*', 40, 40,40],
                                body: [
                                    [
                                        {image: __dirname+'/../public/img/tec_Logo.png', width: 40, height: 40 },
                                        {alignment: 'center',text: [
                                            {text: 'Av. José Francisco Ruíz Massieu No. 5, Colonia Villa Moderna, C.P.  39090 Chilpancingo, Guerrero.', style: 'footer_text'},
                                            {text: '\nTeléfono: (747) 48 01022, Tel/Fax: 47 2 10 14 ', style: 'footer_text'},
                                            {text: 'www.itchilpancingo.edu.mx', link: 'http://www.itchilpancingo.edu.mx',style: 'link_footer'},
                                            {text: ', email: ', style: 'footer_text'},
                                            {text: 'itchilpancingo@hotmail.com', style:'link_footer'},
                                            {text: '\nFacebook: ', style: 'footer_text'},
                                            {text: 'Tecnológico de Chilpancingo Comunicación',link: 'https://www.facebook.com/Tecnológico-de-Chilpancingo-Comunicación-131577620223301/', decoration:'underline', style:'link_footer'}

                                        ]},
                                        {image: __dirname+'/../public/img/footer_2.png', width: 40, height: 40},
                                        {image: __dirname+'/../public/img/footer_3.png', width: 40, height: 40},
                                        {image: __dirname+'/../public/img/footer_4.png', width: 40, height: 40},

                                    
                                    ],
                                ]
                            },
                            layout: 'noBorders'
                        }
                        
                        
                    ]
                }
            },
            styles: {
                normal: {
                    fontSize: 8
                },
                header_tecnm: {
                    color: '#bababa',
                    fontSize: 12
                },
                header_itch: {
                    color: '#bababa',
                    fontSize: 11
                },
                header_bottom: {
                    color: '#bababa',
                    fontSize: 9
                },
                footer_text: {
                    color: '#bababa',
                    fontSize: 7.5
                },
                link_footer: {
                    color: '#0b24fb',
                    fontSize: 7.5
                }
            }
        };
        var pdfDoc = printer.createPdfKitDocument(docDefinition);
        pdfDoc.pipe(res);
        pdfDoc.end();
    },
    generarFormatoAsesoria: (asesoria, res) => {
        var asesor_interno = `      ${asesoria.proyecto.anteproyecto.asesor_interno.titulo} ${asesoria.proyecto.anteproyecto.asesor_interno.nombre} ${asesoria.proyecto.anteproyecto.asesor_interno.ap_materno} ${asesoria.proyecto.anteproyecto.asesor_interno.ap_materno}      `;
        var residente = `      ${asesoria.proyecto.anteproyecto.alumno.nombre} ${asesoria.proyecto.anteproyecto.alumno.ap_paterno} ${asesoria.proyecto.anteproyecto.alumno.ap_materno}      `;
        var docDefinition = {
            background: [
                {
                    margin: [0,250,0,0],
                    image: __dirname + '/../public/img/escudo.png',
                    width: 400,
                    height: 400,
                    alignment: 'center'
                }
            ],
            pageSize: 'A4',
            pageMargins: [40, 150, 40, 100],
            header: (currentPage, pageCount) => {
                return {
                    margin: [40, 20, 40, 0],
                    alignment: 'justify',
                    columns: [
                        {
                            table: {
                                widths: ['*','*'],
                                body: [
                                    [{image: __dirname+'/../public/img/sep-tec.png', width: 200, height: 70,alignment: 'left', },{margin: [0,25,0,0],alignment: 'right',text: [{text: 'TECNOLÓGICO NACIONAL DE MEXICO\n', bold: true, style: 'header_tecnm'},{text: 'Instituto Tecnológico de Chilpancingo', bold: true, style: 'header_itch'}]}],
                                    [{text: '“2015, Año del Generalísimo José María Morelos y Pavón”', alignment: 'center', style: 'header_bottom', colSpan: 2}]
                                ]
                            },
                            layout: 'noBorders'
                        }
                        
                        
                    ]
                }
            },
            footer: (currentPage, pageCount) => {
                return {
                    margin: [40, 20, 40, 0],
                    alignment: 'justify',
                    columns: [
                        {
                            table: {
                                widths: [40, '*', 40, 40,40],
                                body: [
                                    [
                                        {image: __dirname+'/../public/img/tec_Logo.png', width: 40, height: 40 },
                                        {alignment: 'center',text: [
                                            {text: 'Av. José Francisco Ruíz Massieu No. 5, Colonia Villa Moderna, C.P.  39090 Chilpancingo, Guerrero.', style: 'footer_text'},
                                            {text: '\nTeléfono: (747) 48 01022, Tel/Fax: 47 2 10 14 ', style: 'footer_text'},
                                            {text: 'www.itchilpancingo.edu.mx', link: 'http://www.itchilpancingo.edu.mx',style: 'link_footer'},
                                            {text: ', email: ', style: 'footer_text'},
                                            {text: 'itchilpancingo@hotmail.com', style:'link_footer'},
                                            {text: '\nFacebook: ', style: 'footer_text'},
                                            {text: 'Tecnológico de Chilpancingo Comunicación',link: 'https://www.facebook.com/Tecnológico-de-Chilpancingo-Comunicación-131577620223301/', decoration:'underline', style:'link_footer'}

                                        ]},
                                        {image: __dirname+'/../public/img/footer_2.png', width: 40, height: 40},
                                        {image: __dirname+'/../public/img/footer_3.png', width: 40, height: 40},
                                        {image: __dirname+'/../public/img/footer_4.png', width: 40, height: 40},

                                    
                                    ],
                                ]
                            },
                            layout: 'noBorders'
                        }
                        
                        
                    ]
                }
            },
            content: [
                {
                    alignment: 'center',
                    width: '*',
                    bold: true,
                    text: `Anexo V \n Formato de registro de asesoría`
                },
                {
                    margin: [0, 50, 0,0],
                    alignment: 'right',
                    width: '*',
                    text: `Chilpancingo, Guerrero. A ${moment(asesoria.fecha, 'YYYY-MM-DD').format('LL')}`,
                    decoration: 'underline',
                    style: 'normal'                    
                },
                {
                    margin: [0, 20, 0,0],
                    alignment: 'left',
                    width: '*',
                    text: [
                        {text: 'Departamento Académico: ', style: 'normal'},
                        {text: asesoria.proyecto.anteproyecto.periodo.carrera.departamento.nombre, style: 'normal', decoration: 'underline'},
                    ],                
                },
                {
                    margin: [0, 15, 0,0],
                    alignment: 'left',
                    width: '*',
                    text: [
                        {text: 'Nombre del Residente: ', style: 'normal'},
                        {text: `${asesoria.proyecto.anteproyecto.alumno.nombre} ${asesoria.proyecto.anteproyecto.alumno.ap_paterno} ${asesoria.proyecto.anteproyecto.alumno.ap_materno} `, style: 'normal', decoration: 'underline'},
                    ],                
                },
                {
                    margin: [0, 15, 0,0],
                    alignment: 'justify',
                    width: '*',
                    text: [
                        {text: 'Número de Control: ', style: 'normal'},
                        {text: `${asesoria.proyecto.anteproyecto.alumno.no_control}`, style: 'normal', decoration: 'underline'},
                        {text: ' Carrera: ', style: 'normal'},
                        {text: `${asesoria.proyecto.anteproyecto.periodo.carrera.nombre}`, style: 'normal', decoration: 'underline'},
                    ],                
                },
                {
                    margin: [0, 15, 0,0],
                    alignment: 'left',
                    width: '*',
                    text: [
                        {text: 'Nombre del Proyecto: ', style: 'normal'},
                        {text: `${asesoria.proyecto.anteproyecto.nombre}`, style: 'normal', decoration: 'underline'},
                    ],                
                },
                {
                    margin: [0, 15, 0,0],
                    alignment: 'left',
                    width: '*',
                    text: [
                        {text: 'Periodo de realización de residencia profesional: ', style: 'normal'},
                        {text: `${asesoria.proyecto.anteproyecto.periodo.periodo} ${asesoria.proyecto.anteproyecto.periodo.ciclo}`, style: 'normal', decoration: 'underline'},
                    ],                
                },
                {
                    margin: [0, 15, 0,0],
                    alignment: 'left',
                    width: '*',
                    text: [
                        {text: 'Empresa, organismo o dependencia: ', style: 'normal'},
                        {text: `${asesoria.proyecto.anteproyecto.asesor_externo.empresa.nombre}`, style: 'normal', decoration: 'underline'},
                    ],                
                },
                {
                    margin: [0, 15, 0,0],
                    alignment: 'left',
                    width: '*',
                    text: [
                        {text: 'Asesoría número: ', style: 'normal'},
                        {text: `${asesoria.id}`, style: 'normal', decoration: 'underline'},
                        {text: ' Tipo de asesoría: ', style: 'normal'},
                        {text: `${asesoria.tipo}`, style: 'normal', decoration: 'underline'},
                    ],                
                },
                {
                    margin: [0, 15, 0,0],
                    alignment: 'left',
                    width: '*',
                    text: [
                        {text: 'Temas a asesorar: ', style: 'normal'},
                        {text: `${asesoria.temas_a_asesorar}`, style: 'normal', decoration: 'underline'},
                    ],                
                },
                {
                    margin: [0, 15, 0,0],
                    alignment: 'left',
                    width: '*',
                    text: [
                        {text: 'Solución recomendada: ', style: 'normal'},
                        {text: `${asesoria.soluciones_recomendadas.map(solucion => `${solucion.solucion} `)}`, style: 'normal', decoration: 'underline'},
                    ],                
                },
                {
                    margin: [0,100, 0,0],
                    table: {
                        widths: ['*','*'],
                        alignment: 'center',
                        body: [
                            [{alignment: 'center',style: 'normal', text: asesor_interno, decoration: 'overline'}, {alignment: 'center',text: residente, style:'normal', decoration: 'overline'}],
                            [{alignment: 'center',text: 'Asesor interno', style:'normal'}, {alignment: 'center',text: 'Residente', style:'normal'}],
                        ]
                    },
                    layout: 'noBorders'              
                },


            ],
            styles: {
                normal: {
                    fontSize: 11.5
                },
                header_tecnm: {
                    color: '#bababa',
                    fontSize: 12
                },
                header_itch: {
                    color: '#bababa',
                    fontSize: 11
                },
                header_bottom: {
                    color: '#bababa',
                    fontSize: 9
                },
                footer_text: {
                    color: '#bababa',
                    fontSize: 7.5
                },
                link_footer: {
                    color: '#0b24fb',
                    fontSize: 7.5
                }
            }
        }
        var pdfDoc = printer.createPdfKitDocument(docDefinition);
        pdfDoc.pipe(res);
        pdfDoc.end();
    },
    generarDictamen: (periodo, subdirector) => {
        var content_table = periodo.anteproyectos.map((anteproyecto, index) => {
            return [
                {text: `${(index+1)}`, style: 'row_table'},
                {text: `${anteproyecto.alumno.no_control}`, style: 'row_table'},
                {text: `${anteproyecto.alumno.nombre} ${anteproyecto.alumno.ap_paterno} ${anteproyecto.alumno.ap_materno}`, style: 'row_table'},
                {text: `${anteproyecto.alumno.sexo}`, style: 'row_table'},
                {text: `${anteproyecto.nombre}`, style: 'row_table'},
                {text: `${anteproyecto.asesor_externo.empresa.nombre_titular} \n ${anteproyecto.asesor_externo.empresa.puesto_titular}`, style: 'row_table'},        
                {text: `${anteproyecto.asesor_interno.titulo} ${anteproyecto.asesor_interno.nombre} ${anteproyecto.asesor_interno.ap_paterno} ${anteproyecto.asesor_interno.ap_materno}`, style: 'row_table'},
                {text: `${anteproyecto.asesor_externo.nombre}`, style: 'row_table'},
                {text: `${anteproyecto.dictamen.toUpperCase()}`, style: 'row_table'},
                {text: `${moment(anteproyecto.updatedAt,"YYYY-MM-DD HH:mm:ss").format('DD-MMMM-YYYY')}`, style: 'row_table'}
            ]
        });
        content_table.unshift(['', '', '', '', '', '', {text: 'INTERNO', alignment: 'center', style: 'header_table'}, {text: 'EXTERNO', alignment: 'center', style: 'header_table'}, '', ''])
        content_table.unshift([{text: 'NUM.', alignment: 'center', rowSpan: 2, style: 'header_table'}, {text: 'CONTROL', alignment: 'center', rowSpan: 2, style: 'header_table'}, {text: 'NOMBRE DEL ESTUDIANTE', alignment: 'center', rowSpan: 2, style: 'header_table'}, {text: 'S', alignment: 'center', rowSpan: 2, style: 'header_table'}, {text: 'ANTEPROYECTO', alignment: 'center', rowSpan: 2, style: 'header_table'}, {text: 'NOMBRE Y CARGO DEL TITULAR DE LA EMPRESA', alignment: 'center', rowSpan: 2, style: 'header_table'}, {text: 'ASESOR', alignment: 'center', colSpan: 2, style: 'header_table'},'',{text: 'DICTAMEN', alignment: 'center', rowSpan: 2, style: 'header_table'}, {text: 'FECHA DE DICTAMEN', alignment: 'center', rowSpan: 2, style: 'header_table'}])
        

        var docDefinition = {
            pageSize: 'A4',
            pageOrientation: 'landscape',
            pageMargins: [40, 100, 40, 60],
            header: (currentPage, pageCount) => {
                return {
                        margin: [40, 20, 40, 20],
                        columns: [
                            {
                                table: {
                                    widths: [100, '*', '*', 100],
                                    body: [
                                        [{image: __dirname+'/../public/img/tecnologicos.png', width: 80, height: 45, alignment: 'center', rowSpan: 2}, {text: 'Dictamen de Anteproyecto de Residencias Profesionales', style: 'titulo', alignment: 'center', bold: true, colSpan: 2},'', {image: __dirname+'/../public/img/tec_Logo.png', width: 45, height: 45, alignment: 'center', rowSpan: 2}],
                                        ['',{text: 'Referencia a la Norma ISO 9001:2008  7.5.1', alignment: 'center', colSpan: 2, style: 'subtitulo'},'',''],
                                        [{text: 'Revisión 2', alignment: 'center', style: 'min'}, {text: 'Código: ITCHILPO-AC-PO-007-04', alignment: 'center', bold:true,style: 'min'}, {text: 'Fecha de aplicación: 16-junio-2011', alignment: 'center', style: 'min'}, {text: `Página ${currentPage} de ${pageCount}`, alignment: 'center', style: 'min'}]
                                    ]
                                }
                            }
                            
                        ]
                    }
                
            },
            content: [
                {
                    alignment: 'center',
                    width: '*',
                    bold: true,
                    text: `INSTITUTO TECNOLÓGICO DE CHILPANCINGO \n DEPARTAMENTO DE ${periodo.carrera.departamento.nombre.toUpperCase()}`
                },
                {
                    alignment: 'center',
                    width: '*',
                    bold: true,
                    margin: [0,10,0,20],
                    text: 'DICTAMEN DE ANTEPROYECTOS DE RESIDENCIAS PROFESIONALES'
                },{
                    alignment: 'justify',
                    margin: [20, 0, 20, 20],
                    columns: [
                        {
                            margin: [0,22,0,0],
                            text: [
                                {text: 'CARRERA: ', bold: true},
                                {text: `${periodo.carrera.nombre.toUpperCase()}`, bold: true, decoration: 'underline'}
                            ],
                        },
                        {
                            margin: [180, 0, 0, 0],
                            table: {
                                widths: 'auto',
                                body: [
                                    [{  text: 'SEMESTRE', bold: true, alignment: 'center', rowSpan: 2}, {text: 'FEB-JUN', alignment: 'center', fillColor: (periodo.periodo==='FEBRERO-JUNIO') ? '#d7d9db': ''}, {text: (periodo.periodo==='FEBRERO-JUNIO') ? 'X': '' , alignment: 'center', fillColor: (periodo.periodo==='FEBRERO-JUNIO') ? '#d7d9db': ''}],
                                    ['', {text: 'AGO-DIC', alignment: 'center', fillColor: (periodo.periodo==='AGOSTO-DICIEMBRE') ? '#d7d9db': ''}, {text: (periodo.periodo==='AGOSTO-DICIEMBRE') ? 'X': '' , alignment: 'center', fillColor: (periodo.periodo==='AGOSTO-DICIEMBRE') ? '#d7d9db': ''}]

                                ]
                            }
                        },
                    ]
                },
                {
                    table: {
                        headerRows: 2,
                        widths: [30 ,50, 70, 5, '*', 70, 70, 70, 70,70],
                        body: content_table
                    }
                },
                {
                    margin: [0, 50, 0, 0],
                    columns: [
                        {
                            text: [
                                {text: (periodo.carrera.docentes_carreras) ? `${periodo.carrera.docentes_carreras[0].docente.titulo} ${periodo.carrera.docentes_carreras[0].docente.nombre} ${periodo.carrera.docentes_carreras[0].docente.ap_paterno} ${periodo.carrera.docentes_carreras[0].docente.ap_materno}` :'', style: 'firma', bold: true},
                                {text: '\nNOMBRE Y FIRMA DEL PRESIDENTE DE ACADEMIA', style: 'firma'}
                            ]
                        },
                        {
                            text: [
                                {text: (periodo.carrera.departamento.docentes) ? `${periodo.carrera.departamento.docentes[0].titulo} ${periodo.carrera.departamento.docentes[0].nombre} ${periodo.carrera.departamento.docentes[0].ap_materno} ${periodo.carrera.departamento.docentes[0].ap_paterno}` : '', style: 'firma', bold: true},
                                {text: '\nNOMBRE Y FIRMA DEL JEFE DEL DEPTO. ACADEMICO', style: 'firma'}
                            ]
                        },
                        {
                            text: [
                                {text: (subdirector)?`${subdirector.titulo} ${subdirector.nombre} ${subdirector.ap_materno} ${subdirector.ap_paterno}`: '',style: 'firma', bold: true },
                                {text: '\nNOMBRE Y FIRMA DEL SUBDIRECTOR ACADEMICO \nVo. Bo.', style: 'firma'}
                            ]
                        }
                    ]
                }
                
            ],
            styles:{
                titulo: {
                    fontSize: 12,
                },
                subititulo: {
                    fontSize: 10,
                },
                min:{
                    fontSize: 9
                },
                header_table:{
                    fontSize: 10,
                    bold: true
                },
                row_table: {
                    fontSize: 9,
                    alignment: 'center'                    
                },
                firma: {
                    fontSize: 10,
                    color: '#505962',
                    alignment: 'center'
                }


            }
        }
        var pdfDoc = printer.createPdfKitDocument(docDefinition);
        pdfDoc.pipe(fs.createWriteStream(`storeFiles/dictamenes/${periodo.id}-${periodo.periodo}-${periodo.ciclo}.pdf`));
        pdfDoc.end();
    }
}