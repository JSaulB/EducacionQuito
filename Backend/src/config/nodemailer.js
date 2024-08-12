import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.HOST_MAILTRAP,
    port: process.env.PORT_MAILTRAP,
    auth: {
        user: process.env.USER_MAILTRAP,
        pass: process.env.PASS_MAILTRAP,
    }
});

const sendMailToUser = (userMail, token) => {
    let mailOptions = {
        from: process.env.USER_MAILTRAP,
        to: userMail,
        subject: "Verifica tu cuenta",
        html: `<p>Hola, haz clic <a href="${process.env.URL_FRONTEND}confirmar/${encodeURIComponent(token)}">aquí</a> para confirmar tu cuenta.</p>`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Correo enviado: ' + info.response);
        }
    });
};
const sendMailToUserCiudadania = (email, token) => {
    let mailOptions = {
      from: process.env.USER_MAILTRAP,
      to: email,
      subject: 'Confirmación de correo electrónico',
      html: `<p>Haz clic en el siguiente enlace para confirmar tu correo electrónico: <a href="${process.env.URL_BACKEND}ciudadania/confirmar/${encodeURIComponent(token)}">Confirmar correo</a></p>`
    };
  
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Correo enviado: ' + info.response);
      }
    });
};



// send mail to patient
const sendMailToMinisterio = async(userMail,password)=>{
    let info = await transporter.sendMail({
    from: 'admin@vet.com',
    to: userMail,
    subject: "Correo de bienvenida",
    html: `
    <h1>Sistema de gestión academico </h1>
    <hr>
    <p>Contraseña de acceso: ${password}</p>
    <a href=${process.env.URL_FRONTEND}login>Clic para iniciar sesión</a>
    <hr>
    <footer>Grandote te da la Bienvenida!</footer>
    `
    });
    console.log("Mensaje enviado satisfactoriamente: ", info.messageId);
}

const sendMailToRecoveryPassword = async(userMail, token) => {
    let info = await transporter.sendMail({
        from: 'admin@vet.com',
        to: userMail,
        subject: "Correo para reestablecer tu contraseña",
        html: `
            <h1>Sistema de gestión - Ministerio de educación</h1>
            <hr>
            <a href="${process.env.URL_FRONTEND}recuperar-password/${token}">Clic para reestablecer tu contraseña</a>
            <hr>
            <footer>¡Bienvenido!</footer>
        `
    });
    console.log("Mensaje enviado satisfactoriamente: ", info.messageId);
}

export {
    sendMailToUser,
    sendMailToUserCiudadania,
    sendMailToRecoveryPassword,
    sendMailToMinisterio
};
