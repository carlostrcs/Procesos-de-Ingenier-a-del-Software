const nodemailer = require('nodemailer');
const url = "http://localhost:3000/"; // Cambia esta URL a la de tu despliegue
const transporter = nodemailer.createTransport({
  service: 'procesos',
  auth: {
    user: 'alguienanonimo2000@gmail.com',
    pass: 'gcrj nuoa amen adzu'
  }
});

module.exports.enviarEmail = async function (direccion, key, men) {
  const result = await transporter.sendMail({
    from: 'alguienanonimo2000@gmail.com',
    to: direccion,
    subject: men,
    text: 'Pulsa aquí para confirmar cuenta',
    html: '<p>Bienvenido a Sistema</p><p><a href="' + url + 'confirmarUsuario/' + direccion + '/' + key + '">Pulsa aquí para confirmar cuenta</a></p>'
  });
}
