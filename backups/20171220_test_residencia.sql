-- MySQL dump 10.13  Distrib 5.7.19, for macos10.12 (x86_64)
--
-- Host: localhost    Database: test_residencia
-- ------------------------------------------------------
-- Server version	5.7.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Alumnos`
--

DROP TABLE IF EXISTS `Alumnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Alumnos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `no_control` varchar(8) NOT NULL,
  `plan_estudios` enum('2009-2010','2015-2016') NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `ap_paterno` varchar(30) NOT NULL,
  `ap_materno` varchar(30) NOT NULL,
  `sexo` enum('H','M') DEFAULT NULL,
  `domicilio` varchar(200) DEFAULT NULL,
  `colonia` varchar(30) DEFAULT NULL,
  `codigo_postal` varchar(5) DEFAULT NULL,
  `no_seguro` varchar(20) DEFAULT NULL,
  `numero_celular` varchar(20) DEFAULT NULL,
  `ciudad` varchar(150) NOT NULL DEFAULT '',
  `id_tipo_seguro` int(11) DEFAULT NULL,
  `id_carrera` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `no_control` (`no_control`),
  UNIQUE KEY `id_usuario` (`id_usuario`),
  KEY `id_tipo_seguro` (`id_tipo_seguro`),
  KEY `id_carrera` (`id_carrera`),
  CONSTRAINT `alumnos_ibfk_1` FOREIGN KEY (`id_tipo_seguro`) REFERENCES `tipo_seguros` (`id`) ON DELETE CASCADE,
  CONSTRAINT `alumnos_ibfk_2` FOREIGN KEY (`id_carrera`) REFERENCES `carreras` (`id`) ON DELETE CASCADE,
  CONSTRAINT `alumnos_ibfk_3` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Alumnos`
--

LOCK TABLES `Alumnos` WRITE;
/*!40000 ALTER TABLE `Alumnos` DISABLE KEYS */;
INSERT INTO `Alumnos` VALUES (1,'13520232','2015-2016','Francisco','lanco','Romero','H','sdfhksdf',NULL,NULL,'2131334','123454545','ASdsadhkasd',1,1,25,'2017-12-14 00:39:28','2017-12-14 00:39:28'),(2,'13522373','2009-2010','Yaretzin','Martinez','Peralta','M','Olmecas #5',NULL,NULL,'12324324234','23425435345','Chilpancingo, Gro.',1,1,26,'2017-12-14 13:12:27','2017-12-14 13:12:27');
/*!40000 ALTER TABLE `Alumnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Anteproyectos`
--

DROP TABLE IF EXISTS `Anteproyectos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Anteproyectos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `objetivo_general` varchar(255) DEFAULT NULL,
  `origen` enum('Banco de proyectos','Propuesta propia','Trabajador') DEFAULT NULL,
  `dictamen` enum('aprobado','no aprobado') NOT NULL DEFAULT 'no aprobado',
  `path_file_anteproyecto` varchar(255) DEFAULT NULL,
  `id_alumno` int(11) NOT NULL,
  `id_periodo` int(11) NOT NULL,
  `id_asesor_externo` int(11) DEFAULT NULL,
  `id_asesor_interno` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_alumno` (`id_alumno`),
  KEY `id_periodo` (`id_periodo`),
  KEY `id_asesor_externo` (`id_asesor_externo`),
  KEY `id_asesor_interno` (`id_asesor_interno`),
  CONSTRAINT `anteproyectos_ibfk_1` FOREIGN KEY (`id_alumno`) REFERENCES `alumnos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `anteproyectos_ibfk_2` FOREIGN KEY (`id_periodo`) REFERENCES `periodos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `anteproyectos_ibfk_3` FOREIGN KEY (`id_asesor_externo`) REFERENCES `asesor_externos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `anteproyectos_ibfk_4` FOREIGN KEY (`id_asesor_interno`) REFERENCES `docentes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Anteproyectos`
--

LOCK TABLES `Anteproyectos` WRITE;
/*!40000 ALTER TABLE `Anteproyectos` DISABLE KEYS */;
INSERT INTO `Anteproyectos` VALUES (1,'Prueba','Prueba','Banco de proyectos','aprobado','7866e5fd3c0418af72c3790aeab94256',1,1,6,5,'2017-12-14 00:39:28','2017-12-14 00:40:35'),(2,'Desarrollo de proyecto web','Desarrollar el proyecto','Banco de proyectos','aprobado','a5b159f3c5b6c97dd27f2e13af5c630b',2,1,3,5,'2017-12-14 13:12:27','2017-12-14 13:39:53');
/*!40000 ALTER TABLE `Anteproyectos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Asesoria`
--

DROP TABLE IF EXISTS `Asesoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Asesoria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_proyecto` int(11) NOT NULL,
  `id_asesor_interno` int(11) NOT NULL,
  `permitir_generar_formato` tinyint(1) NOT NULL DEFAULT '0',
  `tipo` enum('presencial','virtual') NOT NULL DEFAULT 'virtual',
  `fecha` date NOT NULL,
  `url_avance` varchar(300) NOT NULL,
  `temas_a_asesorar` varchar(500) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_proyecto` (`id_proyecto`),
  KEY `id_asesor_interno` (`id_asesor_interno`),
  CONSTRAINT `asesoria_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `Proyectos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `asesoria_ibfk_2` FOREIGN KEY (`id_asesor_interno`) REFERENCES `Docentes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Asesoria`
--

LOCK TABLES `Asesoria` WRITE;
/*!40000 ALTER TABLE `Asesoria` DISABLE KEYS */;
INSERT INTO `Asesoria` VALUES (1,1,5,1,'presencial','2017-12-14','https://drive.google.com/open?id=0B-agd1bGfOTYX1ZoVTdpRmJFSFk','Actores del sistema','2017-12-14 15:02:11','2017-12-14 20:42:13');
/*!40000 ALTER TABLE `Asesoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Carreras`
--

DROP TABLE IF EXISTS `Carreras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Carreras` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_departamento` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`),
  KEY `id_departamento` (`id_departamento`),
  CONSTRAINT `carreras_ibfk_1` FOREIGN KEY (`id_departamento`) REFERENCES `Departamentos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Carreras`
--

LOCK TABLES `Carreras` WRITE;
/*!40000 ALTER TABLE `Carreras` DISABLE KEYS */;
INSERT INTO `Carreras` VALUES (1,'Ingeniería en sistemas computacionales ','2017-12-14 00:37:36','2017-12-14 00:37:36',1),(2,'Ingeniería informática','2017-12-14 00:37:36','2017-12-14 00:37:36',1),(3,'Ingeniería civil','2017-12-14 00:37:36','2017-12-14 00:37:36',2),(4,'Ingeniería en gestión empresarial','2017-12-14 00:37:36','2017-12-14 00:37:36',3),(5,'Contador público','2017-12-14 00:37:36','2017-12-14 00:37:36',3);
/*!40000 ALTER TABLE `Carreras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Departamentos`
--

DROP TABLE IF EXISTS `Departamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Departamentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Departamentos`
--

LOCK TABLES `Departamentos` WRITE;
/*!40000 ALTER TABLE `Departamentos` DISABLE KEYS */;
INSERT INTO `Departamentos` VALUES (1,'Sistemas y computación','2017-12-14 00:37:36','2017-12-14 00:37:36'),(2,'Ciencias de la tierra','2017-12-14 00:37:36','2017-12-14 00:37:36'),(3,'Ciencias económico-admisnitrativas','2017-12-14 00:37:36','2017-12-14 00:37:36'),(4,'Division de estudios profesionales','2017-12-14 00:37:36','2017-12-14 00:37:36'),(5,'Gestión tecnológica y vinculación','2017-12-14 00:37:36','2017-12-14 00:37:36');
/*!40000 ALTER TABLE `Departamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Docentes`
--

DROP TABLE IF EXISTS `Docentes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Docentes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  `ap_paterno` varchar(30) NOT NULL,
  `ap_materno` varchar(30) NOT NULL,
  `titulo` varchar(10) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_departamento` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_usuario` (`id_usuario`),
  KEY `id_departamento` (`id_departamento`),
  CONSTRAINT `docentes_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `Usuarios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `docentes_ibfk_2` FOREIGN KEY (`id_departamento`) REFERENCES `Departamentos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Docentes`
--

LOCK TABLES `Docentes` WRITE;
/*!40000 ALTER TABLE `Docentes` DISABLE KEYS */;
INSERT INTO `Docentes` VALUES (1,'Yanet','Evangelista','Alcocer','M.C.',2,1,'2017-12-14 00:37:37','2017-12-14 00:37:37'),(2,'José Daniel','Sanchéz','Rodríguez','ING.',3,1,'2017-12-14 00:37:37','2017-12-14 00:37:37'),(3,'Oscar Gabriel','Flores','Rodríguez','M.C.',4,1,'2017-12-14 00:37:37','2017-12-14 00:37:37'),(4,'Moises','Vázquez','Peña','M.C.',5,1,'2017-12-14 00:37:37','2017-12-14 00:37:37'),(5,'Mauricio','Cordova','Portillo','M.C.',6,1,'2017-12-14 00:37:37','2017-12-14 00:37:37'),(6,'José','Espinoza','Benitez','ING',7,2,'2017-12-14 00:37:37','2017-12-14 00:37:37'),(7,'Victor','García','Díaz','ING.',8,2,'2017-12-14 00:37:37','2017-12-14 00:37:37'),(8,'Ramiro','Ruiz','Silva','M.C.',9,2,'2017-12-14 00:37:37','2017-12-14 00:37:37'),(9,'Esmeralda','Hernández','Ramírez','LIC.',10,3,'2017-12-14 00:37:37','2017-12-14 00:37:37'),(10,'Toledo','Rodriguez','Corona','M.C.',11,4,'2017-12-14 00:37:37','2017-12-14 00:37:37'),(11,'Jesús','Marín','Robles','M.A.T.I',12,5,'2017-12-14 00:37:37','2017-12-14 00:37:37');
/*!40000 ALTER TABLE `Docentes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Empresas`
--

DROP TABLE IF EXISTS `Empresas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Empresas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `clasificacion` enum('industrial','servicios','público','privado','otro') NOT NULL,
  `rfc` varchar(13) DEFAULT NULL,
  `domicilio` varchar(50) DEFAULT NULL,
  `colonia` varchar(50) DEFAULT NULL,
  `mision` varchar(500) NOT NULL DEFAULT '',
  `codigo_postal` varchar(5) DEFAULT NULL,
  `fax` varchar(15) DEFAULT NULL,
  `nombre_titular` varchar(150) NOT NULL,
  `puesto_titular` varchar(50) NOT NULL,
  `nombre_firma_acuerdo` varchar(150) NOT NULL,
  `puesto_firma_acuerdo` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Empresas`
--

LOCK TABLES `Empresas` WRITE;
/*!40000 ALTER TABLE `Empresas` DISABLE KEYS */;
INSERT INTO `Empresas` VALUES (1,'Unidad de Especialidad Médica – Centro de Atención Primaria en Adicciones (UNEME-CAPA)','público','SES870401TX8','Venustiano Carranza No. 18','20 de noviembre','','39096','','Lic. Jesús Eduardo Tejada Herrera','Coordinador','Lic. Jesús Eduardo Tejada Herrera','Coordinador','2017-12-14 00:37:36','2017-12-14 00:37:36'),(2,'Secretaria de Comunicaciones y Transportes','servicios','NUF865849RR3','Dr. Gabriel Leyva Alarcón S.N.','Burócratas','','39091','4725227','Ing. Rigoberto Villegas Montoya','Director general','Lic. Leticia Hernández Gómez ','Jefe de departamento de recursos humanos','2017-12-14 00:37:36','2017-12-14 00:37:36'),(3,'Coordinación Estatal del Servicio Profesional Docente (CESPD)  del Estado de Guerrero','público','SPD547728CE4','Prolongación Valerio Trujano 5','Nicolás Bravo','','39050','4725227','Dra. Margarita Nava Nava','Coordinadora Estatal','Ing. José Alfredo Jiménez Campos','Jefe del departamento de recursos humanos','2017-12-14 00:37:36','2017-12-14 00:37:36'),(4,'Cafetalera los portales','privado','POR948394CF9','Heroico Colegio Militar 7','Centro','','39000','4723599','Lic. Juanita García León','Gerente general','Lic. Beatriz Cruz Morales','Coordinador general','2017-12-14 00:37:36','2017-12-14 00:37:36');
/*!40000 ALTER TABLE `Empresas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Periodos`
--

DROP TABLE IF EXISTS `Periodos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Periodos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `periodo` enum('FEBRERO-JUNIO','AGOSTO-DICIEMBRE') NOT NULL,
  `ciclo` varchar(4) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `fecha_inicio_entrega_anteproyecto` date NOT NULL,
  `fecha_fin_entrega_anteproyecto` date NOT NULL,
  `filename_dictamen` varchar(255) DEFAULT NULL,
  `id_carrera` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_uq_periodo_ciclo` (`periodo`,`ciclo`,`id_carrera`),
  KEY `id_carrera` (`id_carrera`),
  CONSTRAINT `periodos_ibfk_1` FOREIGN KEY (`id_carrera`) REFERENCES `carreras` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Periodos`
--

LOCK TABLES `Periodos` WRITE;
/*!40000 ALTER TABLE `Periodos` DISABLE KEYS */;
INSERT INTO `Periodos` VALUES (1,'AGOSTO-DICIEMBRE','2017','2017-12-13','2017-12-25','2017-12-13','2017-12-14','1-AGOSTO-DICIEMBRE-2017.pdf',1,'2017-12-14 00:38:14','2017-12-14 00:40:47');
/*!40000 ALTER TABLE `Periodos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Proyectos`
--

DROP TABLE IF EXISTS `Proyectos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Proyectos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename_plan_trabajo` varchar(200) DEFAULT NULL,
  `aprobacion_plan_trabajo` tinyint(1) DEFAULT '0',
  `filename_cronograma` varchar(200) DEFAULT NULL,
  `aprobacion_cronograma` tinyint(1) DEFAULT '0',
  `url_informe_tecnico` varchar(300) DEFAULT NULL,
  `autorizar_carta_liberacion_asesor_interno` tinyint(1) DEFAULT '0',
  `autorizar_carta_liberacion_asesor_externo` tinyint(1) DEFAULT '0',
  `id_anteproyecto` int(11) NOT NULL,
  `id_evaluacion_asesor_interno` int(11) DEFAULT NULL,
  `id_evaluacion_asesor_externo` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_anteproyecto` (`id_anteproyecto`),
  KEY `fkey_id_evaluacion_asesor_interno` (`id_evaluacion_asesor_interno`),
  KEY `fkey_id_evaluacion_asesor_externo` (`id_evaluacion_asesor_externo`),
  CONSTRAINT `fkey_id_evaluacion_asesor_externo` FOREIGN KEY (`id_evaluacion_asesor_externo`) REFERENCES `evaluaciones` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fkey_id_evaluacion_asesor_interno` FOREIGN KEY (`id_evaluacion_asesor_interno`) REFERENCES `evaluaciones` (`id`) ON DELETE CASCADE,
  CONSTRAINT `proyectos_ibfk_1` FOREIGN KEY (`id_anteproyecto`) REFERENCES `anteproyectos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Proyectos`
--

LOCK TABLES `Proyectos` WRITE;
/*!40000 ALTER TABLE `Proyectos` DISABLE KEYS */;
INSERT INTO `Proyectos` VALUES (1,'7449d2ee9e14fe56cc6aa39032ffc290',0,'9657c75031ff3fc3d438626dcf8ee419',0,'https://drive.google.com/open?id=0B-agd1bGfOTYX1ZoVTdpRmJFSFk',1,1,1,2,3,'2017-12-14 00:40:58','2017-12-14 20:41:17'),(2,'e30ad0712613ce92afd82bd39be73048',0,'e295461390bcc347706348818a3e77dc',0,NULL,0,0,2,NULL,NULL,'2017-12-14 13:48:42','2017-12-14 14:16:53');
/*!40000 ALTER TABLE `Proyectos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Seguimientos`
--

DROP TABLE IF EXISTS `Seguimientos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Seguimientos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_periodo` int(11) NOT NULL,
  `fecha_inicial` date NOT NULL,
  `fecha_final` date NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_periodo` (`id_periodo`),
  CONSTRAINT `seguimientos_ibfk_1` FOREIGN KEY (`id_periodo`) REFERENCES `periodos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Seguimientos`
--

LOCK TABLES `Seguimientos` WRITE;
/*!40000 ALTER TABLE `Seguimientos` DISABLE KEYS */;
INSERT INTO `Seguimientos` VALUES (1,1,'2017-12-13','2017-12-15','2017-12-14 00:41:17','2017-12-14 00:41:17'),(2,1,'2017-12-13','2017-12-15','2017-12-14 00:46:30','2017-12-14 00:46:30');
/*!40000 ALTER TABLE `Seguimientos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `SequelizeMeta_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20170918013002-create-usuario.js'),('20170918013227-create-departamento.js'),('20170918013844-create-carrera.js'),('20170918172201-create-docente.js'),('20170920205603-create-empresa.js'),('20170920210716-create-tipo-seguro.js'),('20170920211127-create-alumno.js'),('20170921002811-create-asesor-externo.js'),('20170921004100-create-periodo.js'),('20170921010430-create-anteproyecto.js'),('20170927205531-create-docente-carreras.js'),('20170927212730-add_index_to_docente_carreras.js'),('20170928165346-add_index_to_periodo.js'),('20171002145821-create-revision-anteproyecto.js'),('20171019185303-create-proyecto.js'),('20171019185626-create-asesoria.js'),('20171019185832-create-solucion-recomendada.js'),('20171019190006-create-seguimiento.js'),('20171019190119-create-seguimiento-proyecto.js'),('20171019190323-create-revision-seguimiento.js'),('20171023182138-create-observaciones.js'),('20171114194346-create-evaluacion.js'),('20171114204056-add_foreignkeys_evaluacion_to_proyecto.js'),('20171116024245-create-criterio.js'),('20171116031524-create-criterio-evaluacion.js'),('20171127225003-create-cancelacion-proyecto.js'),('20171206040123-add_fk_seguimiento_proyecto_to_evaluacion.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuarios`
--

DROP TABLE IF EXISTS `Usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `correo` varchar(60) NOT NULL,
  `contrasenia` varchar(100) NOT NULL,
  `rol` enum('candidato_residente','residente','docente','admin','jefe_departamento','asesor_externo','subdirector_academico') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuarios`
--

LOCK TABLES `Usuarios` WRITE;
/*!40000 ALTER TABLE `Usuarios` DISABLE KEYS */;
INSERT INTO `Usuarios` VALUES (1,'seguimientoresidenciasitch@gmail.com','$2a$08$9ZlPX9afiyXFWWnw/6CB2exbVjDU1/FUV0vXEnKsWlu0Qz643WdDm','admin','2017-12-14 00:37:36','2017-12-14 00:37:36'),(2,'yanet@gmail.com','$2a$08$slENBN1Qyt/sP/YLEXGP/u6Or7o0wVNRxrRJA9mMwAaR/mDjwU0ae','docente','2017-12-14 00:37:37','2017-12-14 00:37:37'),(3,'jose_daniel@gmail.com','$2a$08$P5dZC5aP3F7HMmjQ4jmq9uuRfPW29JoG6U4SDmUd5GamHTMcTSJ8a','docente','2017-12-14 00:37:37','2017-12-14 00:37:37'),(4,'oscar@gmail.com','$2a$08$kKXJ.JdKOams0k8WeULj5u6n72m72ABBk7z4ZjDptDSZkoCue7X8y','docente','2017-12-14 00:37:37','2017-12-14 00:37:37'),(5,'00fblanco@gmail.com','$2a$08$ySVNcAci6aY46em/sIhkpON03GkTIXyEiJ7tul99ACB0nIag0GwAy','jefe_departamento','2017-12-14 00:37:37','2017-12-14 00:37:37'),(6,'mauricio@gmail.com','$2a$08$3XduTs4OFNL.hMv64c71R.3khBjuqvRs2qs6RTx2qovowR3Ki2tIi','docente','2017-12-14 00:37:37','2017-12-14 00:37:37'),(7,'jose_expinoza@gmail.com','$2a$08$8LsVYTxMFuAPugC1ueM/QOrKUBkTaoPt60BZ5DOYDf6dmVJ3u3sUe','docente','2017-12-14 00:37:37','2017-12-14 00:37:37'),(8,'victor_garcia@gmail.com','$2a$08$Ds8RulPaG6Gh6WfIhRr7Je1tiKZLkpogMJU68XmMKrOVyV0a0tMl.','subdirector_academico','2017-12-14 00:37:37','2017-12-14 16:46:49'),(9,'ramiero_silva@gmail.com','$2a$08$st10t/1kHrK1EqKtwlvK2e6Ovpo2fJeYXc2LmhCKygSbvil0s5RJy','docente','2017-12-14 00:37:37','2017-12-14 00:37:37'),(10,'esmeralda_hernandez@gmail.com','$2a$08$ac1K8fblSqzKBTtuUe.p2OYaFnB9pD2NBHMM477z0b2RBssP7etuG','docente','2017-12-14 00:37:37','2017-12-14 00:37:37'),(11,'toledo@gmail.com','$2a$08$jEHyxuPX9DnqolOlHBGjP.3NrmHIZz/.hHonIGCTzQm1cQhRAGnBK','jefe_departamento','2017-12-14 00:37:37','2017-12-14 00:37:37'),(12,'jesus_marin@gmail.com','$2a$08$b3HxtEH2VAa3kdx6Ziako.B94pU1zGsjQGEnLJuyIXFsZKNYdNIFe','jefe_departamento','2017-12-14 00:37:37','2017-12-14 00:37:37'),(13,'norm-arig@gmail.com','$2a$08$B7sMaEMsnvZ4RFWbJNoV2eNGGwc7wDvE2L6mLEvgqbs0BlJ1JV6Qy','asesor_externo','2017-12-14 00:37:38','2017-12-14 00:37:38'),(14,'i_mper@gmail.com','$2a$08$LEGSmSTrSwxcQdnoWszpmuS4X4GeH1JyMDIhyzV/o2YvbHoeEq7he','asesor_externo','2017-12-14 00:37:38','2017-12-14 00:37:38'),(15,'vale-vv1@gmail.com','$2a$08$MfsJ9wdAAbpL96tRC6Zn2OckO3JBERoYkh2Q1VzGijrqnObNfX0cq','asesor_externo','2017-12-14 00:37:38','2017-12-14 00:37:38'),(16,'arturo_lop@gmail.com','$2a$08$086bXY.2zNVAvdYqqFXMC.0pVCNKTcmkswLA1oG91oNPwmo4c5Bvu','asesor_externo','2017-12-14 00:37:38','2017-12-14 00:37:38'),(17,'angel.pinv@gmail.com','$2a$08$MDmerGpOExdL2PkUdiTfR.WVXfKKD2c1Ei.luWR.88b5qb8rGYKfK','asesor_externo','2017-12-14 00:37:38','2017-12-14 00:37:38'),(18,'juca-gtz@gmail.com','$2a$08$xZPtqE0NBhGYTLih5DaPOus2neVX9W1aSXyM38L70K2PzBAC5upee','asesor_externo','2017-12-14 00:37:38','2017-12-14 00:37:38'),(19,'mir1221@gmail.com','$2a$08$VEDCIDLvpbSgQ/KIKDdI0.0c8.GjJ40F570/OjAk5DxZVu6Aqz/Z6','asesor_externo','2017-12-14 00:37:38','2017-12-14 00:37:38'),(20,'sbsal@gmail.com','$2a$08$.dEX361uNVSN/yuDi2J97OYhAucJh5wL3IRUtKyQppf.PRcRafojG','asesor_externo','2017-12-14 00:37:38','2017-12-14 00:37:38'),(21,'Anidom.10@gmail.com','$2a$08$oGHpMitk6dIUDYL/Mxy5m.4uhGXSw4KLqGPzar2JIb3fUfLYvR1h6','asesor_externo','2017-12-14 00:37:38','2017-12-14 00:37:38'),(22,'jufecaflo@gmail.com','$2a$08$Po3FU/ujyPQDwYl2BcMn4OhzbBg5vnSw3QzQdN1hj1uhUwkpT9LE2','asesor_externo','2017-12-14 00:37:38','2017-12-14 00:37:38'),(23,'mirna_santos@gmail.com','$2a$08$ZNx4HB7iyPOL.tNZRaCe7Ov6C60PdwIMXqhn1dGven9.xsnfbD93y','asesor_externo','2017-12-14 00:37:38','2017-12-14 00:37:38'),(24,'pagom_fr@gmail.com','$2a$08$nG0YBetN9.mhUEDJzi2AQ.wAE5F.AMXnKRU4OnfCjOC25GfxfYL32','asesor_externo','2017-12-14 00:37:38','2017-12-14 00:37:38'),(25,'francisco_bco@hotmail.com','$2a$08$ZNx4HB7iyPOL.tNZRaCe7Ov6C60PdwIMXqhn1dGven9.xsnfbD93y','residente','2017-12-14 00:39:28','2017-12-14 00:40:47'),(26,'yareemtz24@gmail.com','$2a$08$ZNx4HB7iyPOL.tNZRaCe7Ov6C60PdwIMXqhn1dGven9.xsnfbD93y','residente','2017-12-14 13:12:27','2017-12-14 13:40:07');
/*!40000 ALTER TABLE `Usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asesor_externos`
--

DROP TABLE IF EXISTS `asesor_externos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `asesor_externos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `puesto` varchar(100) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_empresa` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_usuario` (`id_usuario`),
  KEY `id_empresa` (`id_empresa`),
  CONSTRAINT `asesor_externos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `Usuarios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `asesor_externos_ibfk_2` FOREIGN KEY (`id_empresa`) REFERENCES `Empresas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asesor_externos`
--

LOCK TABLES `asesor_externos` WRITE;
/*!40000 ALTER TABLE `asesor_externos` DISABLE KEYS */;
INSERT INTO `asesor_externos` VALUES (1,'LIC. Norma Angélica Marino García','Psicóloga',13,1,'2017-12-14 00:37:38','2017-12-14 00:37:38'),(2,'LIC. Inés Mondragón Pérez','Contadora',14,1,'2017-12-14 00:37:38','2017-12-14 00:37:38'),(3,'ING. Valentina Valdez Valdivia','Jefa de informatica',15,1,'2017-12-14 00:37:38','2017-12-14 00:37:38'),(4,'ING. Arturo Valadez López','Residente gral. De carreteras federales',16,2,'2017-12-14 00:37:38','2017-12-14 00:37:38'),(5,'ISC. Miguel Ángel Pineda Velázquez','Jefe de la unidad de tecnologías de la información',17,2,'2017-12-14 00:37:38','2017-12-14 00:37:38'),(6,'LIC. Juan Carlos Salas Gutiérrez','Jefe del departamento de recursos financieros',18,2,'2017-12-14 00:37:38','2017-12-14 00:37:38'),(7,'ING. José Manuel Benítez Carranza','Jefe del departamento de Informática',19,3,'2017-12-14 00:37:38','2017-12-14 00:37:38'),(8,'MTRO. Sergio Brito Salas','Supervisor',20,3,'2017-12-14 00:37:38','2017-12-14 00:37:38'),(9,'LIC. Ana Luz Chávez Domínguez','Contadora',21,3,'2017-12-14 00:37:38','2017-12-14 00:37:38'),(10,'LIC. Juan Felipe Caballero Flores','Jefe del departamento de recursos financieros',22,4,'2017-12-14 00:37:38','2017-12-14 00:37:38'),(11,'LIC. Mirna Santos Oropeza','Jefe de recursos humanos',23,4,'2017-12-14 00:37:38','2017-12-14 00:37:38'),(12,'ING. Paola Gómez Farías','Jefe del área de desarrollo',24,4,'2017-12-14 00:37:38','2017-12-14 00:37:38');
/*!40000 ALTER TABLE `asesor_externos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cancelacion_proyectos`
--

DROP TABLE IF EXISTS `cancelacion_proyectos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cancelacion_proyectos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_proyecto` varchar(255) DEFAULT NULL,
  `justificacion` varchar(255) DEFAULT NULL,
  `id_alumno` int(11) NOT NULL,
  `id_asesor_interno` int(11) DEFAULT NULL,
  `id_periodo` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_alumno` (`id_alumno`),
  KEY `id_asesor_interno` (`id_asesor_interno`),
  KEY `id_periodo` (`id_periodo`),
  CONSTRAINT `cancelacion_proyectos_ibfk_1` FOREIGN KEY (`id_alumno`) REFERENCES `Alumnos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cancelacion_proyectos_ibfk_2` FOREIGN KEY (`id_asesor_interno`) REFERENCES `Docentes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cancelacion_proyectos_ibfk_3` FOREIGN KEY (`id_periodo`) REFERENCES `Periodos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cancelacion_proyectos`
--

LOCK TABLES `cancelacion_proyectos` WRITE;
/*!40000 ALTER TABLE `cancelacion_proyectos` DISABLE KEYS */;
/*!40000 ALTER TABLE `cancelacion_proyectos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `criterio_evaluacion`
--

DROP TABLE IF EXISTS `criterio_evaluacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `criterio_evaluacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_evaluacion` int(11) NOT NULL,
  `valor_de_evaluacion` int(11) NOT NULL,
  `id_criterio` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_evaluacion` (`id_evaluacion`),
  KEY `id_criterio` (`id_criterio`),
  CONSTRAINT `criterio_evaluacion_ibfk_1` FOREIGN KEY (`id_evaluacion`) REFERENCES `evaluaciones` (`id`) ON DELETE CASCADE,
  CONSTRAINT `criterio_evaluacion_ibfk_2` FOREIGN KEY (`id_criterio`) REFERENCES `criterios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `criterio_evaluacion`
--

LOCK TABLES `criterio_evaluacion` WRITE;
/*!40000 ALTER TABLE `criterio_evaluacion` DISABLE KEYS */;
INSERT INTO `criterio_evaluacion` VALUES (1,1,7,10,'2017-12-14 00:42:25','2017-12-14 20:15:41'),(2,1,19,11,'2017-12-14 00:42:25','2017-12-14 20:15:41'),(3,1,15,12,'2017-12-14 00:42:25','2017-12-14 20:15:41'),(4,1,19,13,'2017-12-14 00:42:25','2017-12-14 20:15:41'),(5,1,20,14,'2017-12-14 00:42:25','2017-12-14 20:15:41'),(6,1,15,15,'2017-12-14 00:42:25','2017-12-14 20:15:41'),(7,2,2,30,'2017-12-14 00:43:54','2017-12-14 20:16:29'),(8,2,1,31,'2017-12-14 00:43:54','2017-12-14 20:16:29'),(9,2,2,32,'2017-12-14 00:43:54','2017-12-14 20:16:29'),(10,2,2,33,'2017-12-14 00:43:54','2017-12-14 20:16:29'),(11,2,2,34,'2017-12-14 00:43:54','2017-12-14 20:16:29'),(12,2,5,35,'2017-12-14 00:43:54','2017-12-14 20:16:29'),(13,2,5,36,'2017-12-14 00:43:54','2017-12-14 20:16:29'),(14,2,0,37,'2017-12-14 00:43:54','2017-12-14 20:16:29'),(15,2,7,38,'2017-12-14 00:43:54','2017-12-14 20:16:29'),(16,2,5,39,'2017-12-14 00:43:54','2017-12-14 20:16:29'),(17,2,7,40,'2017-12-14 00:43:54','2017-12-14 20:16:29'),(18,2,7,41,'2017-12-14 00:43:54','2017-12-14 20:16:29'),(19,2,3,42,'2017-12-14 00:43:54','2017-12-14 20:16:29'),(20,2,2,43,'2017-12-14 00:43:54','2017-12-14 20:16:29'),(21,3,0,16,'2017-12-14 00:45:07','2017-12-14 19:51:45'),(22,3,2,17,'2017-12-14 00:45:07','2017-12-14 19:51:45'),(23,3,1,18,'2017-12-14 00:45:07','2017-12-14 19:51:45'),(24,3,2,19,'2017-12-14 00:45:07','2017-12-14 19:51:45'),(25,3,2,20,'2017-12-14 00:45:07','2017-12-14 19:51:45'),(26,3,4,21,'2017-12-14 00:45:07','2017-12-14 19:51:45'),(27,3,5,22,'2017-12-14 00:45:07','2017-12-14 19:51:45'),(28,3,0,23,'2017-12-14 00:45:07','2017-12-14 19:51:45'),(29,3,7,24,'2017-12-14 00:45:07','2017-12-14 19:51:45'),(30,3,5,25,'2017-12-14 00:45:07','2017-12-14 19:51:45'),(31,3,38,26,'2017-12-14 00:45:07','2017-12-14 19:51:45'),(32,3,7,27,'2017-12-14 00:45:07','2017-12-14 19:51:45'),(33,3,3,28,'2017-12-14 00:45:07','2017-12-14 19:51:45'),(34,3,2,29,'2017-12-14 00:45:07','2017-12-14 19:51:45'),(35,4,5,1,'2017-12-14 00:45:40','2017-12-14 19:51:10'),(36,4,7,2,'2017-12-14 00:45:40','2017-12-14 19:51:10'),(37,4,5,3,'2017-12-14 00:45:40','2017-12-14 19:51:10'),(38,4,10,4,'2017-12-14 00:45:40','2017-12-14 19:51:10'),(39,4,15,5,'2017-12-14 00:45:40','2017-12-14 19:51:10'),(40,4,15,6,'2017-12-14 00:45:40','2017-12-14 19:51:10'),(41,4,10,7,'2017-12-14 00:45:40','2017-12-14 19:51:10'),(42,4,20,8,'2017-12-14 00:45:40','2017-12-14 19:51:10'),(43,4,10,9,'2017-12-14 00:45:40','2017-12-14 19:51:10'),(44,5,7,10,'2017-12-14 00:47:31','2017-12-14 20:15:54'),(45,5,5,11,'2017-12-14 00:47:31','2017-12-14 20:15:54'),(46,5,6,12,'2017-12-14 00:47:31','2017-12-14 20:15:54'),(47,5,20,13,'2017-12-14 00:47:31','2017-12-14 20:15:54'),(48,5,20,14,'2017-12-14 00:47:31','2017-12-14 20:15:54'),(49,5,6,15,'2017-12-14 00:47:31','2017-12-14 20:15:54'),(50,6,0,1,'2017-12-14 00:57:33','2017-12-14 19:51:20'),(51,6,5,2,'2017-12-14 00:57:33','2017-12-14 19:51:20'),(52,6,5,3,'2017-12-14 00:57:33','2017-12-14 19:51:20'),(53,6,6,4,'2017-12-14 00:57:33','2017-12-14 19:51:20'),(54,6,14,5,'2017-12-14 00:57:33','2017-12-14 19:51:20'),(55,6,7,6,'2017-12-14 00:57:33','2017-12-14 19:51:20'),(56,6,7,7,'2017-12-14 00:57:33','2017-12-14 19:51:20'),(57,6,19,8,'2017-12-14 00:57:33','2017-12-14 19:51:20'),(58,6,6,9,'2017-12-14 00:57:33','2017-12-14 19:51:20');
/*!40000 ALTER TABLE `criterio_evaluacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `criterios`
--

DROP TABLE IF EXISTS `criterios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `criterios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(300) DEFAULT NULL,
  `valor_max` int(11) DEFAULT NULL,
  `tipo` enum('asesor_externo','asesor_interno') NOT NULL,
  `anexo` varchar(30) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `criterios`
--

LOCK TABLES `criterios` WRITE;
/*!40000 ALTER TABLE `criterios` DISABLE KEYS */;
INSERT INTO `criterios` VALUES (1,'Asiste puntualmente con el horario establecido',5,'asesor_externo','XXIX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(2,'Trabajo en equipo y se comunica de forma efectiva (oral y escrita)',10,'asesor_externo','XXIX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(3,'Tiene iniciativa para colaborar',5,'asesor_externo','XXIX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(4,'Propone mejoras al proyecto',10,'asesor_externo','XXIX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(5,'Cumple con los objetivos correspondientes al proyecto',15,'asesor_externo','XXIX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(6,'Es ordenado y cumple satisfactoriamente con las actividades encomendadas en los tiempos establecidos del cronograma',15,'asesor_externo','XXIX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(7,'Demuestra liderezgo en su actuar',10,'asesor_externo','XXIX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(8,'Demuestra conocimiento en el área de su especialidad',20,'asesor_externo','XXIX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(9,'Demuestra su comportamiento ético (es diciplinado, acata órdenes, respeta a sus compañeros de trabajo, entre otros)',10,'asesor_externo','XXIX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(10,'Asistió puntualmente a las reuniones de asesoría ',10,'asesor_interno','XXIX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(11,'Demuestra conocimiento en el área de su especialidad',20,'asesor_interno','XXIX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(12,'Trabaja en equipo y se comunica de forma efectiva (oral y escrita)',15,'asesor_interno','XXIX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(13,'Es dedicado y proactivo en las actividades encomendadas',20,'asesor_interno','XXIX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(14,'Es ordenado y cumple satisfactoriamente con las actividades encomendadas en los tiempos establecidos en el cronograma',20,'asesor_interno','XXIX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(15,'Propone mejoras al proyecto',15,'asesor_interno','XXIX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(16,'Portada',2,'asesor_externo','XXX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(17,'Agradecimientos',2,'asesor_externo','XXX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(18,'Resumen',2,'asesor_externo','XXX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(19,'Indice',2,'asesor_externo','XXX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(20,'Introducción',2,'asesor_externo','XXX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(21,'Problemas al resolver, priorizándolos',5,'asesor_externo','XXX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(22,'Objetivos',5,'asesor_externo','XXX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(23,'Justificación',0,'asesor_externo','XXX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(24,'Marco teórico (fundamentos teóricos)',10,'asesor_externo','XXX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(25,'Procedimiento y descripción de las actividades realizadas',5,'asesor_externo','XXX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(26,'Resultados, planos, gráficas, prototipos, manuales, programas, análisis estadísticos, modelos matemáticos, simulaciones, normativas, regulaciones, y restricciones, entre otros. Solo para proyectos que por su naturaleza lo requieran: estudio de mercado, estudio técnico y estudio economico.**',45,'asesor_externo','XXX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(27,'Conclusiones, recomendaciones y experiencia profesional adquirida',15,'asesor_externo','XXX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(28,'Competencias desarrolladas y/o aplicadas',3,'asesor_externo','XXX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(29,'Fuentes de información',2,'asesor_externo','XXX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(30,'Portada',2,'asesor_interno','XXX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(31,'Agradecimientos',2,'asesor_interno','XXX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(32,'Resumen',2,'asesor_interno','XXX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(33,'Indice',2,'asesor_interno','XXX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(34,'Introducción',2,'asesor_interno','XXX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(35,'Problemas al resolver, priorizándolos',5,'asesor_interno','XXX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(36,'Objetivos',5,'asesor_interno','XXX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(37,'Justificación',0,'asesor_interno','XXX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(38,'Marco teórico (fundamentos teóricos)',10,'asesor_interno','XXX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(39,'Procedimiento y descripción de las actividades realizadas',5,'asesor_interno','XXX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(40,'Resultados, planos, gráficas, prototipos, manuales, programas, análisis estadísticos, modelos matemáticos, simulaciones, normativas, regulaciones, y restricciones, entre otros. Solo para proyectos que por su naturaleza lo requieran: estudio de mercado, estudio técnico y estudio economico.**',45,'asesor_interno','XXX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(41,'Conclusiones, recomendaciones y experiencia profesional adquirida',15,'asesor_interno','XXX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(42,'Competencias desarrolladas y/o aplicadas',3,'asesor_interno','XXX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(43,'Fuentes de información',2,'asesor_interno','XXX','2017-12-14 00:37:38','2017-12-14 00:37:38'),(44,'Asiste puntualmente con el horario establecido',5,'asesor_externo','III','2017-12-14 00:37:38','2017-12-14 00:37:38'),(45,'Trabajo en equipo',10,'asesor_externo','III','2017-12-14 00:37:38','2017-12-14 00:37:38'),(46,'Tiene iniciativa para ayudar en las actividades encomendadas',10,'asesor_externo','III','2017-12-14 00:37:38','2017-12-14 00:37:38'),(47,'Organiza su tiempo y trabaja sin necesidad de una superación estrecha',5,'asesor_externo','III','2017-12-14 00:37:38','2017-12-14 00:37:38'),(48,'Realiza mejoras al proyecto',10,'asesor_externo','III','2017-12-14 00:37:38','2017-12-14 00:37:38'),(49,'Cumple con los objetivos correspondientes al proyecto',10,'asesor_externo','III','2017-12-14 00:37:38','2017-12-14 00:37:38'),(50,'Mostró responsabilidad y compromiso en la residencia profesional',5,'asesor_interno','III','2017-12-14 00:37:38','2017-12-14 00:37:38'),(51,'Realizó un trabajo innovador en su área de desempeño',10,'asesor_interno','III','2017-12-14 00:37:38','2017-12-14 00:37:38'),(52,'Aplica las competencias para la realización del proyecto',10,'asesor_interno','III','2017-12-14 00:37:38','2017-12-14 00:37:38'),(53,'Es dedicado y proactivo en los trabajos encomendados',10,'asesor_interno','III','2017-12-14 00:37:38','2017-12-14 00:37:38'),(54,'Cumple con los objetivos correspondiente al proyecto',10,'asesor_interno','III','2017-12-14 00:37:38','2017-12-14 00:37:38'),(55,'Entrega en tiempo y forma el informe técnico',5,'asesor_interno','III','2017-12-14 00:37:38','2017-12-14 00:37:38');
/*!40000 ALTER TABLE `criterios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `docente_carreras`
--

DROP TABLE IF EXISTS `docente_carreras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `docente_carreras` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_docente` int(11) NOT NULL,
  `id_carrera` int(11) NOT NULL,
  `rol` enum('docente','jefe_proyecto','presidente_academia','deshabilitado') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_uq_docente_carreras` (`id_docente`,`id_carrera`),
  KEY `id_carrera` (`id_carrera`),
  CONSTRAINT `docente_carreras_ibfk_1` FOREIGN KEY (`id_docente`) REFERENCES `Docentes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `docente_carreras_ibfk_2` FOREIGN KEY (`id_carrera`) REFERENCES `Carreras` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `docente_carreras`
--

LOCK TABLES `docente_carreras` WRITE;
/*!40000 ALTER TABLE `docente_carreras` DISABLE KEYS */;
INSERT INTO `docente_carreras` VALUES (1,5,1,'presidente_academia','2017-12-14 00:40:21','2017-12-14 12:48:58'),(2,1,1,'docente','2017-12-14 12:48:49','2017-12-14 12:48:51'),(4,3,1,'docente','2017-12-14 12:48:51','2017-12-14 12:48:51'),(6,2,1,'jefe_proyecto','2017-12-14 12:48:58','2017-12-14 12:48:58');
/*!40000 ALTER TABLE `docente_carreras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluaciones`
--

DROP TABLE IF EXISTS `evaluaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `evaluaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `observaciones` varchar(500) NOT NULL DEFAULT '',
  `tipo` enum('asesor_externo','asesor_interno') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluaciones`
--

LOCK TABLES `evaluaciones` WRITE;
/*!40000 ALTER TABLE `evaluaciones` DISABLE KEYS */;
INSERT INTO `evaluaciones` VALUES (1,'Ninguna, Seguimiento 1 updated','asesor_interno','2017-12-14 00:42:25','2017-12-14 20:15:41'),(2,'Nadaaa, seguimiento final','asesor_interno','2017-12-14 00:43:54','2017-12-14 20:16:29'),(3,'testss','asesor_externo','2017-12-14 00:45:06','2017-12-14 19:51:45'),(4,'nanananana modificado na','asesor_externo','2017-12-14 00:45:40','2017-12-14 19:51:10'),(5,'Ninguna, Seguimiento 2 updated','asesor_interno','2017-12-14 00:47:31','2017-12-14 20:15:54'),(6,'Seguimiento 2 modificado sin','asesor_externo','2017-12-14 00:57:33','2017-12-14 19:51:20');
/*!40000 ALTER TABLE `evaluaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `observaciones`
--

DROP TABLE IF EXISTS `observaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `observaciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_proyecto` int(11) NOT NULL,
  `id_asesor_interno` int(11) NOT NULL,
  `observacion` varchar(500) DEFAULT NULL,
  `solucionada` tinyint(1) DEFAULT '0',
  `tipo` enum('plan_de_trabajo','cronograma') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_proyecto` (`id_proyecto`),
  KEY `id_asesor_interno` (`id_asesor_interno`),
  CONSTRAINT `observaciones_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `Proyectos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `observaciones_ibfk_2` FOREIGN KEY (`id_asesor_interno`) REFERENCES `Docentes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `observaciones`
--

LOCK TABLES `observaciones` WRITE;
/*!40000 ALTER TABLE `observaciones` DISABLE KEYS */;
INSERT INTO `observaciones` VALUES (1,1,5,'Subir tu plan de trabajo',1,'plan_de_trabajo','2017-12-14 14:10:23','2017-12-14 20:07:52'),(2,1,5,'Tu cronograma subirlo de favor',1,'cronograma','2017-12-14 14:10:35','2017-12-14 20:08:02'),(3,2,5,'Cumplir 500 horas',0,'plan_de_trabajo','2017-12-14 14:17:28','2017-12-14 14:17:28'),(4,2,5,'Describir tus actividades del plan de trabajo',0,'cronograma','2017-12-14 14:17:43','2017-12-14 14:17:43'),(5,1,5,'Observación al plan de trabajo',0,'plan_de_trabajo','2017-12-14 20:07:46','2017-12-14 20:07:46'),(6,1,5,'Observación al cronograma',0,'cronograma','2017-12-14 20:08:00','2017-12-14 20:08:00');
/*!40000 ALTER TABLE `observaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `revision_anteproyectos`
--

DROP TABLE IF EXISTS `revision_anteproyectos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `revision_anteproyectos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `esFactible` enum('factible','no_factible','corrección') NOT NULL DEFAULT 'no_factible',
  `comentario` varchar(500) DEFAULT NULL,
  `id_docente` int(11) NOT NULL,
  `id_anteproyecto` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_revision_anteproyectos_id_docente_id_anteproyecto` (`id_docente`,`id_anteproyecto`),
  KEY `id_anteproyecto` (`id_anteproyecto`),
  CONSTRAINT `revision_anteproyectos_ibfk_1` FOREIGN KEY (`id_docente`) REFERENCES `Docentes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `revision_anteproyectos_ibfk_2` FOREIGN KEY (`id_anteproyecto`) REFERENCES `Anteproyectos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revision_anteproyectos`
--

LOCK TABLES `revision_anteproyectos` WRITE;
/*!40000 ALTER TABLE `revision_anteproyectos` DISABLE KEYS */;
INSERT INTO `revision_anteproyectos` VALUES (1,'factible',NULL,1,1,'2017-12-14 13:13:39','2017-12-14 13:13:39'),(2,'factible',NULL,1,2,'2017-12-14 13:13:40','2017-12-14 13:13:40'),(3,'factible',NULL,2,1,'2017-12-14 13:13:56','2017-12-14 13:13:56'),(4,'no_factible',NULL,2,2,'2017-12-14 13:13:57','2017-12-14 13:13:58');
/*!40000 ALTER TABLE `revision_anteproyectos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `revision_seguimientos`
--

DROP TABLE IF EXISTS `revision_seguimientos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `revision_seguimientos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_seguimiento_proyecto` int(11) NOT NULL,
  `id_docente` int(11) NOT NULL,
  `observacion` varchar(500) NOT NULL,
  `solucionado` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_seguimiento_proyecto` (`id_seguimiento_proyecto`),
  KEY `id_docente` (`id_docente`),
  CONSTRAINT `revision_seguimientos_ibfk_1` FOREIGN KEY (`id_seguimiento_proyecto`) REFERENCES `seguimiento_proyectos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `revision_seguimientos_ibfk_2` FOREIGN KEY (`id_docente`) REFERENCES `Docentes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revision_seguimientos`
--

LOCK TABLES `revision_seguimientos` WRITE;
/*!40000 ALTER TABLE `revision_seguimientos` DISABLE KEYS */;
INSERT INTO `revision_seguimientos` VALUES (1,1,5,'PRUEBA',1,'2017-12-14 13:57:41','2017-12-14 13:59:04'),(2,1,5,'Otra mas',0,'2017-12-14 13:58:16','2017-12-14 13:58:16'),(3,4,5,'Subelo\n',0,'2017-12-14 13:59:29','2017-12-14 13:59:29'),(4,2,5,'Add seguimiento 2',0,'2017-12-14 20:16:05','2017-12-14 20:16:05'),(5,1,4,'Prueba soluciones ',1,'2017-12-14 20:24:00','2017-12-14 20:24:08'),(6,2,2,'Prueba jefe de proyecto',0,'2017-12-14 20:25:59','2017-12-14 20:25:59'),(7,3,2,'Suba el seguimiento 2',1,'2017-12-14 20:26:30','2017-12-14 20:26:34');
/*!40000 ALTER TABLE `revision_seguimientos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seguimiento_proyectos`
--

DROP TABLE IF EXISTS `seguimiento_proyectos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `seguimiento_proyectos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url_seguimiento` varchar(300) DEFAULT NULL,
  `id_seguimiento` int(11) NOT NULL,
  `id_proyecto` int(11) DEFAULT NULL,
  `id_evaluacion_asesor_interno` int(11) DEFAULT NULL,
  `id_evaluacion_asesor_externo` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_seguimiento` (`id_seguimiento`),
  KEY `id_proyecto` (`id_proyecto`),
  KEY `fkey_id_evaluacion_asesor_interno_seguimiento` (`id_evaluacion_asesor_interno`),
  KEY `fkey_id_evaluacion_asesor_externo_seguimiento` (`id_evaluacion_asesor_externo`),
  CONSTRAINT `fkey_id_evaluacion_asesor_externo_seguimiento` FOREIGN KEY (`id_evaluacion_asesor_externo`) REFERENCES `evaluaciones` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fkey_id_evaluacion_asesor_interno_seguimiento` FOREIGN KEY (`id_evaluacion_asesor_interno`) REFERENCES `evaluaciones` (`id`) ON DELETE CASCADE,
  CONSTRAINT `seguimiento_proyectos_ibfk_1` FOREIGN KEY (`id_seguimiento`) REFERENCES `Seguimientos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `seguimiento_proyectos_ibfk_2` FOREIGN KEY (`id_proyecto`) REFERENCES `Proyectos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seguimiento_proyectos`
--

LOCK TABLES `seguimiento_proyectos` WRITE;
/*!40000 ALTER TABLE `seguimiento_proyectos` DISABLE KEYS */;
INSERT INTO `seguimiento_proyectos` VALUES (1,'https://drive.google.com/open?id=0B-agd1bGfOTYX1ZoVTdpRmJFSFk',1,1,1,4,'2017-12-14 00:41:26','2017-12-14 00:45:40'),(2,'https://drive.google.com/open?id=0B-agd1bGfOTYX1ZoVTdpRmJFSFk',2,1,5,6,'2017-12-14 00:46:34','2017-12-14 00:57:33'),(3,NULL,1,2,NULL,NULL,'2017-12-14 13:48:46','2017-12-14 13:48:46'),(4,NULL,2,2,NULL,NULL,'2017-12-14 13:48:46','2017-12-14 13:48:46');
/*!40000 ALTER TABLE `seguimiento_proyectos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solucion_recomendadas`
--

DROP TABLE IF EXISTS `solucion_recomendadas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `solucion_recomendadas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_asesoria` int(11) NOT NULL,
  `solucion` varchar(255) NOT NULL,
  `solucionado` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_asesoria` (`id_asesoria`),
  CONSTRAINT `solucion_recomendadas_ibfk_1` FOREIGN KEY (`id_asesoria`) REFERENCES `Asesoria` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solucion_recomendadas`
--

LOCK TABLES `solucion_recomendadas` WRITE;
/*!40000 ALTER TABLE `solucion_recomendadas` DISABLE KEYS */;
INSERT INTO `solucion_recomendadas` VALUES (1,1,'Modificar los margenes de las tablas',1,'2017-12-14 15:15:05','2017-12-14 20:14:19'),(2,1,'Una de prueba',0,'2017-12-14 20:08:16','2017-12-14 20:08:16');
/*!40000 ALTER TABLE `solucion_recomendadas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_seguros`
--

DROP TABLE IF EXISTS `tipo_seguros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_seguros` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_seguros`
--

LOCK TABLES `tipo_seguros` WRITE;
/*!40000 ALTER TABLE `tipo_seguros` DISABLE KEYS */;
INSERT INTO `tipo_seguros` VALUES (1,'IMMS','2017-12-14 00:37:36','2017-12-14 00:37:36'),(2,'ISSTE','2017-12-14 00:37:36','2017-12-14 00:37:36'),(3,'METLIFE','2017-12-14 00:37:36','2017-12-14 00:37:36'),(4,'GNP','2017-12-14 00:37:36','2017-12-14 00:37:36'),(5,'QUÁLITAS','2017-12-14 00:37:36','2017-12-14 00:37:36'),(6,'INBURSA','2017-12-14 00:37:36','2017-12-14 00:37:36'),(7,'OTRO','2017-12-14 00:37:36','2017-12-14 00:37:36');
/*!40000 ALTER TABLE `tipo_seguros` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-12-20  8:59:01
