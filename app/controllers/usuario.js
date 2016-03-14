'use strict'
var models = require("../../models");
var moment = require('moment');
var cloudinary = require('cloudinary');
var crypto = require('crypto');
var settings = require('../../settings');
var service = require('../service/service');
var passport = require('passport');

cloudinary.config({
	cloud_name: process.env.CDN_NAME,
	api_key: process.env.CDN_API_KEY,
	api_secret: process.env.CDN_API_SECRET
})

var sendJSONresponse = function(res, status, content){
	res.status(status);
	res.json(content);
}

exports.getUsuarios = function (req, res, next){
	models.Usuario.findAll({
		where: {
			status: 1,
			padreId: null
		},
		attributes: ['id','padreId','userLogin','firstName','lastName','email','telefono1','telefono2','direccion',
					 'website','descripcion','createdAt','status', 'tipoUsuarioId', 'PaiId','estadoUsuarioId',
					 'avatar'],
		include: [
			{
				model: models.tipoUsuario,
				attributes: ['id','descripcion'],
				where:{
					status: 1
				}
			},
			{
				model: models.Pais,
				attributes: ['id', 'descripcion','flag'],
				where: {
					status: 1
				}
			},
			{
				model: models.estadoUsuario,
				attributes: ['id','descripcion'],
				where: {
					status: 1
				}
			}
		],
		order: 'PaiId'
	}).then(function (clientes){
		if(!clientes){
			res.status(500);
			res.json({
				type: false,
				data: "Error al obtener los clientes" + clientes
			});
		}else{
			res.status(200);
			res.json({
				type: true,
				data: clientes
			});
		};
	});
};

exports.getTotalVendedoresAgencia = function(req, res, next){
	models.Usuario.findAndCountAll({
		where: {
			status: 1,
			padreId: req.params.padreId
		}
	}).then(function (result){
		if(!result){
			service.sendJSONresponse(res,400,{"type":false,"message":"Error al obtener los registros", "data":result});
		}else{
			service.sendJSONresponse(res,200,{"type":true,"data":result.count});
		}
	})
}

exports.getVendedoresByPadre = function (req, res, next){
	models.Usuario.findAll({
		where: {
			status: 1,
			padreId: req.params.padreId
		},
		attributes: ['id','padreId','userLogin','firstName','lastName','email','telefono1','telefono2','direccion',
					 'website','descripcion','createdAt','status', 'tipoUsuarioId', 'PaiId','estadoUsuarioId',
					 'avatar'],
		include: [
			{
				model: models.tipoUsuario,
				attributes: ['id','descripcion'],
				where:{
					status: 1
				}
			},
			{
				model: models.Pais,
				attributes: ['id', 'descripcion','flag'],
				where: {
					status: 1
				}
			},
			{
				model: models.estadoUsuario,
				attributes: ['id','descripcion'],
				where: {
					status: 1
				}
			},
			{
				model: models.Usuario,
				as: 'Padre',
				attributes: ['id', 'firstName', 'userLogin'],
				where: {
					status: 1
				}
			}
		]
	}).then(function (clientes){
		if(!clientes){
			res.status(500);
			res.json({
				type: false,
				data: "Error al obtener los clientes" + clientes
			});
		}else{
			res.status(200);
			res.json({
				type: true,
				data: clientes
			});
		};
	});
};

exports.uploadAvatar = function(req, res, next){
	cloudinary.uploader.upload(req.files.avatar.path, function(result, callback){
		return callback(result);
	});
}

exports.getUsuarioById = function (req, res, next){
	models.Usuario.findOne({
		where: {
			id: req.params.id,
			status: 1
		},
		include: [
			{
				model: models.tipoUsuario,
				attributes: ['id','descripcion'],
				where:{
					status: 1
				}
			},
			{
				model: models.Pais,
				attributes: ['id', 'descripcion','flag'],
				where: {
					status: 1
				}
			},
			{
				model: models.estadoUsuario,
				attributes: ['id','descripcion'],
				where: {
					status: 1
				}
			}
		]
	}).then(function (cliente){
		if(!cliente){
			res.status(500);
			res.json({
				type: false,
				data: "Error al obtener el registro" + cliente
			});
		}else{
			res.status(200);
			res.json({
				type: true,
				data: cliente
			})
		}
	})
}

exports.getVendedorById = function (req, res, next){
	models.Usuario.findOne({
		where: {
			id: req.body.id,
			padreId: req.body.padreId,
			status: 1
		},
		include: [
			{
				model: models.tipoUsuario,
				attributes: ['id','descripcion'],
				where:{
					status: 1
				}
			},
			{
				model: models.Pais,
				attributes: ['id', 'descripcion','flag'],
				where: {
					status: 1
				}
			},
			{
				model: models.estadoUsuario,
				attributes: ['id','descripcion'],
				where: {
					status: 1
				}
			},
			{
				model: models.Usuario,
				as: 'Padre',
				attributes: ['id', 'firstName', 'userLogin'],
				where: {
					status: 1
					
				}
			}
		]
	}).then(function (cliente){
		if(!cliente){
			res.status(500);
			res.json({
				type: false,
				data: "Error al obtener el registro " + cliente
			});
		}else{
			res.status(200);
			res.json({
				type: true,
				data: cliente
			})
		}
	})
}


exports.postCliente = function (req, res, next){
	console.log('entro');
	models.Usuario.create({
		userLogin: req.body.userLogin,
		salt: crypto.randomBytes(16).toString('hex'),
		email: req.body.userLogin,
		verificadoEmail: 0,
		status: 1,
		tipoUsuarioId: req.body.tipoUsuarioId,
		PaiId: req.body.PaiId,
		estadoUsuarioId: req.body.estadoUsuarioId || 1
	}).then(function (user){
		if(!user){
			res.status(500);
			res.json({
				type: false,
				data: "Error al crear el registro: " + user
			});
		}else{
			var _token = service.createToken(user);
			user.update({
				hash: crypto.pbkdf2Sync(req.body.password, user.salt, 1000, 64).toString('hex')
			}).then(function(){
				sendJSONresponse(res, 200, {"type": true, "data": "Registro creado exitosamente", "token": _token})
			})
		};
	});
};

exports.postVendedor = function(req,res,next){
	models.Usuario.create({
		userLogin: req.body.userLogin,		
		firstName: req.body.firstName,
		lastName: req.body.lastName || null,
		salt: crypto.randomBytes(16).toString('hex'),
		email: req.body.userLogin,
		verificadoEmail: 0,
		status: 1,
		tipoUsuarioId: req.body.tipoUsuarioId,
		PaiId: req.body.PaiId,
		estadoUsuarioId: req.body.estadoUsuarioId || 1,
		padreId: req.body.padreId
	}).then(function (user){
		if(!user){
			res.status(500);
			res.json({
				type: false,
				data: "Error al crear el registro: " + user
			});
		}else{
			var _token = service.createToken(user);
			user.update({
				hash: crypto.pbkdf2Sync(req.body.password, user.salt, 1000, 64).toString('hex')
			}).then(function(){
				sendJSONresponse(res, 200, {"type": true, "data": "Registro creado exitosamente", "token": _token})
			})
		};
	});
};

exports.loginUser = function(req, res, next){
	if(!req.body.loginUser ||  !req.body.password){
		sendJSONresponse(res, 400, {"type": false, "data": "Todos los campos son requeridos"});
		return;
	}

	passport.authenticate('local', function(err, user, info){
		var _token;
		if(err){
			sendJSONresponse(res,404,err);
			return;
		}
		if(user){
			_token = service.createToken(user);
			sendJSONresponse(res,200, {"token": _token});
		}else{
			sendJSONresponse(res,401,info);
		}
	})(req, res);
}

exports.putVerificarEmailUsuario = function (req, res, next){
	models.Usuario.findOne({
		where: {
			id: req.params.id
		}
	}).then(function (cliente){
		if(!cliente){
			res.status(500);
			res.json({
				type: false,
				data: "Imposible verificar el Correo Electronico, usuaro no existe..."
			});
		}else{
			cliente.update({
				verificadoEmail: 1
			}).then(function (_cliente){
				if(!_cliente){
					res.status(500);
					res.json({
						type: false,
						data: "Error al intentar verificar el correo Electronico"
					});
				}else{
					res.status(200);
					res.json({
						type: true,
						data: "Email verificado..."
					});
				};
			});
		};
	});
};

exports.putUsuario = function(req, res, next){
	models.Usuario.findOne({
		where: {
			id: req.params.id
		}
	}).then(function (usuario){
		if(!usuario){
			res.status(500);
			res.json({
				type: false,
				data: "Registro no encontrado " + usuario
			});
		}else{
			Usuario.update({
				userLogin: req.body.userLogin,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				telefono1: req.body.telefono1,
				telefono2: req.body.telefono2,
				direccion: req.body.direccion,
				website: req.body.website,
				descripcion: req.body.descripcion,
				avatar: req.body.avatar,
				padreId: req.body.padreId,
			}).then(function (_usuario){
				if(!_usuario){
					res.status(500);
					res.json({
						type: false,
						data: "Error al actualizar el registro " + _usuario
					});
				}else{
					res.status(200);
					res.json({
						type: true,
						data: "Registro Actualizado exitosamente..."
					});
				};
			});
		};
	});
};

exports.changePassword = function (req, res, next){
	models.Usuario.findOne({
		where: {
			id: req.params.id
		}
	}).then(function (usuario){
		if(!usuario){
			res.status(500);
			res.json({
				type: false,
				data: "registro no encontrado"
			});
		}else{
			usuario.update({
				hash: crypto.pbkdf2Sync(req.body.password, usuario.salt, 1000, 64).toString('hex')
			}).then(function (_usuario){
				if(!_usuario){
					res.status(500);
					res.json({
						type: false,
						data: "Hubo un error al actualizar su Password: " + _usuario
					});
				}else{
					res.status(200);
					res.json({
						type: true,
						data: "Se ha cambiado el password exitosamente"
					});
				};
			});
		};
	});
};

exports.deleteUsuario = function (req, res, next){
	models.Usuario.findOne({
		where: {
			id: req.params.id
		}
	}).then(function (usuario){
		if(!usuario){
			res.status(500);
			res.json({
				type: false,
				data: "Registro no encontrado " + usuario
			});
		}else{
			Usuario.update({
				status: 0
			}).then(function (_usuario){
				if(!_usuario){
					res.status(500);
					res.json({
						type: false,
						data: "Error al eliminar el registro " + _usuario
					});
				}else{
					res.status(200);
					res.json({
						type: true,
						data: "Registro Eliminado exitosamente..."
					});
				};
			});
		};
	});
};
