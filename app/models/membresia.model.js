module.exports = (sequelize, Sequelize) => {
  const Membresia = sequelize.define("membresia", {
    carnet: {
      type: Sequelize.STRING,
    },
    nombre: {
      type: Sequelize.STRING
    },
    anio: {
      type: Sequelize.DOUBLE
    },
    mes: {
      type: Sequelize.DOUBLE
    },
    monto: {
      type: Sequelize.DOUBLE
    },
    descuento: {
      type: Sequelize.DOUBLE
    },
    fechaPago: {
      type: Sequelize.DATE
    }
  });
  return Membresia;
};