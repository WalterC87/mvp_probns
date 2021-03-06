/*Tipo de Usuario (son todos los tipos de usuarios que tendra la plataforma)*/
INSERT INTO `probns_mvp`.`tipoUsuario`(`descripcion`,`status`,`createdAt`,`updatedAt`)
VALUES ('Agencia', 1, NOW(), NOW());

INSERT INTO `probns_mvp`.`tipoUsuario`(`descripcion`,`status`,`createdAt`,`updatedAt`)
VALUES ('Agente', 1, NOW(), NOW());

INSERT INTO `probns_mvp`.`tipoUsuario`(`descripcion`,`status`,`createdAt`,`updatedAt`)
VALUES ('Desarrolladora', 1, NOW(), NOW());

INSERT INTO `probns_mvp`.`tipoUsuario`(`descripcion`,`status`,`createdAt`,`updatedAt`)
VALUES ('Vendedor', 1, NOW(), NOW());

/*Paises (por el momento solo dejemos Guatemala, si te podes hacer el listado de los departamentos y municipios sera genial)*/
INSERT INTO `probns_mvp`.`pais` (`descripcion`,`status`,`createdAt`,`updatedAt`)
VALUES ('Guatemala', 1, NOW(), NOW());

/*Estados Usuario (todos los estados que un usuario tendra, si hacen falta agregalos)*/
INSERT INTO `probns_mvp`.`estadoUsuario` (`descripcion`,`status`,`createdAt`,`updatedAt`)
VALUES ('Habilitado', 1, NOW(), NOW());

INSERT INTO `probns_mvp`.`estadoUsuario` (`descripcion`,`status`,`createdAt`,`updatedAt`)
VALUES ('Inhabilitado', 1, NOW(), NOW());

INSERT INTO `probns_mvp`.`estadoUsuario` (`descripcion`,`status`,`createdAt`,`updatedAt`)
VALUES ('Suspendido', 1, NOW(), NOW());

INSERT INTO `probns_mvp`.`estadoUsuario` (`descripcion`,`status`,`createdAt`,`updatedAt`)
VALUES ('Moroso', 1, NOW(), NOW());

/*Estados Inmuebles (los diferentes estados en los que los inmuebles estaran, si hace falta agrearlos)*/
INSERT INTO `probns_mvp`.`estadoInmueble` (`descripcion`,`status`,`createdAt`,`updatedAt`)
VALUES ('Disponible',1, NOW(), NOW());

INSERT INTO `probns_mvp`.`estadoInmueble` (`descripcion`,`status`,`createdAt`,`updatedAt`)
VALUES ('Negociando',1, NOW(), NOW());

INSERT INTO `probns_mvp`.`estadoInmueble` (`descripcion`,`status`,`createdAt`,`updatedAt`)
VALUES ('Vendida',1, NOW(), NOW());

/* Estado de citas (los estados de las citas)*/
INSERT INTO `probns_mvp`.`estadoCita` (`descripcion`,`status`,`createdAt`,`updatedAt`)
VALUES ('Confirmada',1, NOW(), NOW());

INSERT INTO `probns_mvp`.`estadoCita` (`descripcion`,`status`,`createdAt`,`updatedAt`)
VALUES ('Por confirmar',1, NOW(), NOW());

/* Estados buscador (aca iran los estados del buscador dentro de la plataforma)*/
INSERT INTO `probns_mvp`.`estadoBuscador` (`descripcion`,`status`,`createdAt`,`updatedAt`)
VALUES ('Habilitado',1, NOW(), NOW());

INSERT INTO `probns_mvp`.`estadoBuscador` (`descripcion`,`status`,`createdAt`,`updatedAt`)
VALUES ('Interesado',1, NOW(), NOW());

/* Anunciantes (todos los anunciantes que tendra la plataforma disponibles)*/
INSERT INTO `probns_mvp`.`anunciantes` (`descripcion`,`status`,`createdAt`,`updatedAt`)
VALUES ('OLX', 1, NOW(), NOW());

INSERT INTO `probns_mvp`.`anunciantes` (`descripcion`,`status`,`createdAt`,`updatedAt`)
VALUES ('MANCRO', 1, NOW(), NOW());

/*Tipos de Inmueble (todos los tipos de inmuebles que se manejaran)*/
INSERT INTO `probns_mvp`.`tipoInmueble` (`descripcion`,`status`,`createdAt`,`updatedAt`)
VALUES('Casa',1, NOW(), NOW());

INSERT INTO `probns_mvp`.`tipoInmueble` (`descripcion`,`status`,`createdAt`,`updatedAt`)
VALUES('Apartamento',1, NOW(), NOW());

/*Tipo de Buscador (tipos de buscadores, se habia quedado en comprador y buscador, si hace falta otro agregarlo)*/
INSERT INTO `probns_mvp`.`tipoBuscador` (`descripcion`,`status`,`createdAt`,`updatedAt`)
VALUES ('Comprador', 1, NOW(), NOW());

INSERT INTO `probns_mvp`.`tipoBuscador` (`descripcion`,`status`,`createdAt`,`updatedAt`)
VALUES ('Vendedor', 1, NOW(), NOW());

/*Tipo de accionesBuscador (son las acciones que se haran sobre el buscador, agregar nota, llamada o mensaje)*/
INSERT INTO `probns_mvp`.`tipoAccion` (`descripcion`,`status`,`createdAt`,`updatedAt`)
VALUES ('Nota', 1, NOW(), NOW());

INSERT INTO `probns_mvp`.`tipoAccion` (`descripcion`,`status`,`createdAt`,`updatedAt`)
VALUES ('Llamada', 1, NOW(), NOW());

INSERT INTO `probns_mvp`.`tipoAccion` (`descripcion`,`status`,`createdAt`,`updatedAt`)
VALUES ('Mensaje', 1, NOW(), NOW());

/* Operaciones sobre Inmuebles (las diferentes operaciones que se hacen sobre inmuebles)*/
INSERT INTO `probns_mvp`.`operacionInmueble` (`descripcion`,`status`,`createdAt`,`updatedAt`)
VALUES ('Venta',1, NOW(), NOW());

INSERT INTO `probns_mvp`.`operacionInmueble` (`descripcion`,`status`,`createdAt`,`updatedAt`)
VALUES ('Renta',1, NOW(), NOW());

INSERT INTO probns_mvp.departamento (descripcion, status, createdAt, updatedAt, PaiId)
values('Guatemala', 1, now(), now(), 1);

INSERT INTO probns_mvp.municipio (descripcion, status, createdAt, updatedAt, DepartamentoId)
values('Mixco', 1,now(), now(), 1);

/*Estado de tareas*/
INSERT INTO `probns_mvp`.`estadoTarea` (`descripcion`,`status`,`createdAt`,`updatedAt`)
VALUES ('Pendiente',1, NOW(), NOW());

INSERT INTO `probns_mvp`.`estadoTarea` (`descripcion`,`status`,`createdAt`,`updatedAt`)
VALUES ('Finalizada',1, NOW(), NOW());