var models = require('../../models');

exports.getMunicipios = function (req, res, next){
	models.Municipio.findAll({
		where: {
			DepartamentoId: req.params.DepartamentoId,
			status: 1
		},
		attributes: ['id','descripcion', 'status', 'DepartamentoId'],
		include: [
			{
				model: models.Departamento,
				attributes: ['descripcion'],
				where:{
					status: 1
				}
			}
		]
	}).then(function (municipios){
		if(!municipios){
			res.status(500);
			res.json({
				type: false,
				data: "No se pudieron encontrar los municipios."
			});
		}else{
			res.status(200);
			res.json({
				type: true,
				data: municipios
			});
		};
	});
};

exports.getMunicipioById = function (req, res, next){
	models.Municipio.findOne({
		where: {
			id : req.params.id,
			status: 1
		}
	}).then(function (municipio){
		if(!municipio){
			res.status(500);
			res.json({
				type: false,
				data: "Municipio no encontrado ..."
			});
		}else{
			res.status(200);
			res.json({
				type: true,
				data: municipio
			});
		};
	});
};

exports.postMunicipio = function (req, res, next){
	models.Municipio.create({
		DepartamentoId: req.body.DepartamentoId,
		descripcion : req.body.descripcion,
		status : 1
	}).then(function (municipio){
		if(!municipio){
			res.status(500);
			res.json({
				type : false,
				data : "Ha ocurrido un erro: " + municipio
			});
		}else{
			res.status(200);
			res.json({
				type : true,
				data : "Municipio agregado exitosamente ..."
			});
		};
	});
};

exports.putMunicipio = function (req, res, next){
	models.Municipio.findOne({
		where: {
			id: req.body.id
		}
	}).then(function (municipio){
		if(!municipio){
			res.status(500);
			res.json({
				type: false,
				data: "Municipio no encontrado."
			})
		}else{
			municipio.update({
				DepartamentoId: req.body.DepartamentoId,
				descripcion : req.body.descripcion,
				status : req.body.status
			}).then(function (_municipio){
				if(!_municipio){
					res.status(500);
					res.json({
						type: false,
						data: "Error al actualizar el Municipio: " + _municipio.descripcion
					});
				}else{
					res.status(200);
					res.json({
						type: true,
						data: "Municipio actualizado exitosamente ..."
					});
				};
			});
		};
	});
};

exports.deleteMunicipio = function (req, res, next){
	models.Municipio.findOne({
		where: {
			id: req.body.id
		}
	}).then(function (municipio){
		if(!municipio){
			res.status(500);
			res.json({
				type: false,
				data: "Municipio no encontrado."
			})
		}else{
			municipio.update({
				status: 0
			}).then(function (_municipio){
				if(!_municipio){
					res.status(500);
					res.json({
						type: false,
						data: "Ocurrio un error al intentar eliminar el registro..."
					});
				}else{
					res.status(200);
					res.json({
						type: true,
						data: "Municipio Eliminado exitósamente ..."
					});
				};
			});
		}
	})
};
