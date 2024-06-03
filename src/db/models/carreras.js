'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carreras extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Carreras.hasMany(models.Materia, {
        as: 'materias',
        foreignKey: 'carrera_id'
      })
    }
  }
  Carreras.init({
    nombre: DataTypes.STRING,
    grado: DataTypes.STRING,
    universidad: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Carreras',
  });
  return Carreras;
};