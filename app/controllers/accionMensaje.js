var models = require('../../models');

exports.getAccionesMensaje = function(req, res, next){
	models.accionMensaje.findAll({
		where:{
			status: 1
		}
	}).then(function (response){
		if(!response){
			res.status(500);
			res.json({
				type:false,
				data: "Error al obtener las acciones para Mensajes: " + response
			});
		}else{
			res.status(200);
			res.json({
				type: true,
				data: response
			});
		};
	});
};

exports.getAccionMensajeById = function(req, res, next){
	models.accionMensaje.findOne({
		where:{
			id: req.params.id
		}
	}).then(function (response){
		if(!response){
			res.status(500);
			res.json({
				type: false,
				data: "Error al obtener la accion de mensaje solicitada"
			});
		}else{
			res.status(200);
			res.json({
				type: true,
				data: response
			});
		};
	});
};

exports.postAccionMensaje = function(req, res, next){
	models.accionMensaje.create({
		descripcion: req.body.descripcion,
		status: 1
	}).then(function (response){
		if(!response){
			res.status(500);
			res.json({
				type: false,
				data: "Ha ocurrido un Error: " + response
			});
		}else{
			res.status(200);
			res.json({
				type: true,
				data: "Accion de Mensaje creada Exitosamente"
			});
		};
	});
};

exports.putAccionMensaje = function(req, res, next){
	models.accionMensaje.findOne({
		where:{
			id: req.params.id,
			status: 1
		}
	}).then(function (accionMensaje){
		if(!accionMensaje){
			res.status(500);
			res.json({
				type: false,
				data: "Accion de mensaje no encontrada"
			});
		}else{
			accionMensaje.update({
				descripcion: req.body.descripcion,
				status: req.body.status
			}).then(function (_accionMensaje){
				if(!_accionMensaje){
					res.status(500);
					res.json({
						type: false,
						data: "Error al actualizar la Accion de Mensaje: " + accionMensaje.descripcion
					});
				}else{
					res.status(200);
					res.json({
						type: true,
						data: "Accion de Mensaje actualizada Exitosamente..."
					});
				};
			});
		};
	});
};

exports.deleteTipoUsuario = function(req, res, next){
	models.accionMensaje.findOne({
		where:{
			id: req.params.id,
			status: 1
		}
	}).then(function (accionMensaje){
		if(!accionMensaje){
			res.status(500);
			res.json({
				type: false,
				data: "Error al encontrar la Accion de Mensaje"
			});
		}else{
			accionMensaje.update({
				status: 0
			}).then(function (_accionMensaje){
				if(!_accionMensaje){
					res.status(500);
					res.json({
						type: false,
						data: "Error al Eliminar la Accion de Mensaje: " + accionMensaje.descripcion
					});
				}else{
					res.status(200);
					res.json({
						type: true,
						data: "La Accion de Mensaje: " + accionMensaje.descripcion + " ha sido eliminado exitosamente."
					});
				};
			});
		};
	});
};