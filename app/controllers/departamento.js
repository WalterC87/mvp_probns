var models = require('../../models');

exports.getDepartamentos = function (req, res, next){
	models.Departamento.findAll({
		where: {
			PaiId: req.params.paisId,
			status: 1
		},
		attributes: ['id','descripcion', 'status','PaiId'],
		include: [
			{
				model: models.Pais,
				attributes: ['descripcion'],
				where: {
					status: 1
				}
			}
		]

	}).then(function (departamentos){
		if(!departamentos){
			res.status(500);
			res.json({
				type: false,
				data: "no se pudieron encontrar los estados."
			});
		}else{
			res.status(200);
			res.json({
				type: true,
				data: departamentos
			});
		};
	});
};

exports.getDepartamentoById = function (req, res, next){
	models.Departamento.findOne({
		where: {
			id : req.params.id
		}
	}).then(function (departamento){
		if(!departamento){
			res.status(500);
			res.json({
				type: false,
				data: "Departamento no encontrado ..."
			});
		}else{
			res.status(200);
			res.json({
				type: true,
				data: departamento
			});
		};
	});
};

exports.postDepartamento = function (req, res, next){
	models.Departamento.create({
		PaiId: req.body.PaiId,
		descripcion : req.body.descripcion,
		status : 1
	}).then(function (departamento){
		if(!departamento){
			res.status(500);
			res.json({
				type : false,
				data : "Ha ocurrido un error: " + departamento
			});
		}else{
			res.status(200);
			res.json({
				type : true,
				data : "Departamento agregado exitosamente ..."
			});
		};
	});
};

exports.putDepartamento = function (req, res, next){
	models.Departamento.findOne({
		where: {
			id: req.body.id,
			status: 1
		}
	}).then(function (departamento){
		if(!departamento){
			res.status(500);
			res.json({
				type: false,
				data: "Departamento no encontrado."
			})
		}else{
			departamento.update({
				PaiId: req.body.PaiId,
				descripcion : req.body.descripcion,
				status : req.body.status
			}).then(function (_departamento){
				if(!_departamento){
					res.status(500);
					res.json({
						type: false,
						data: "Error al actualizar el Departamento: " + _departamento.descripcion
					});
				}else{
					res.status(200);
					res.json({
						type: true,
						data: "Departamento actualizado exitosamente ..."
					});
				};
			});
		};
	});
};

exports.deleteDepartamento = function (req, res, next){
	models.Departamento.findOne({
		where: {
			id: req.params.id
		}
	}).then(function (departamento){
		if(!departamento){
			res.status(500);
			res.json({
				type: false,
				data: "Departamento no encontrado."
			})
		}else{
			departamento.update({
				status: 0
			}).then(function (_departamento){
				if(!_departamento){
					res.status(500);
					res.json({
						type: false,
						data: "Ocurrio un error al intentar eliminar el registro..."
					});
				}else{
					res.status(200);
					res.json({
						type: true,
						data: "Departamento Eliminado exitósamente ..."
					});
				};
			});
		}
	})
};
