module.exports = function (sequelize, DataTypes){
	var Agenda = sequelize.define('Agenda', {
		fechaCita: {
			type: DataTypes.DATE,
			allowNull: true,
			validate: {
				isDate: true
			}
		},
		status: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},{
		classMethods:{
			associate: function(models){
					Agenda.belongsTo(models.Usuario, {foreignKey: {allowNull: false}});
					Agenda.belongsTo(models.Buscador, {foreignKey: {allowNull: false}});
					Agenda.belongsTo(models.Inmueble, {foreignKey: {allowNull: false}});
					Agenda.belongsTo(models.estadoCita, {foreignKey: {allowNull: false}});
			}
		},
		freezeTableName: true,
		tableName: 'agenda'
	})

	return Agenda;
}
