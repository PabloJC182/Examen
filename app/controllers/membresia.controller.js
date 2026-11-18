const db = require("../models");
const Membresia = db.membresia;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.nombre) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const membresia = {
    carnet: req.body.carnet,
    nombre: req.body.nombre,
    anio: req.body.anio,
    mes: req.body.mes,
    monto: req.body.monto,
    descuento: req.body.descuento,
    fechaPago: req.body.fechaPago
  };

  Membresia.create(membresia)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Client."
      });
    });
};

exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

  Membresia.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving clients."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.carnet;

  Membresia.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Cliente with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Membresia.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cliente was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Client with id=${id}. Maybe Client was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Client with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Membresia.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Client was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Client with id=${id}. El cliente no fue encontrado!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Membresia.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Clients were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all clients."
      });
    });
};

exports.findAllStatus = (req, res) => {
  Membresia.findAll({ where: { status: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Client."
      });
    });
};