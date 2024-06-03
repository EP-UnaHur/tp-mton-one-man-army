'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Materia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Materia.belongsTo(models.Carreras, {
        as: 'carrera',
        foreignKey: 'carrera_id'
      })
      Materia.hasMany(models.Cursos, {
        as: 'cursos',
        foreignKey: 'materia_id'
      })
    }
  }
  Materia.init({
    nombre: DataTypes.STRING,
    cuatrimestral: DataTypes.TINYINT,
    anio: DataTypes.INTEGER,
    carreraId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Materia',
  });
  return Materia;
};