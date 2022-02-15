const { response } = require('express');
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt')

const crearUsuario = async (req,res = response ) => {
    // console.log(req.body);
    const {email, name, password} = req.body;
    try{

    // Verificar el email 
    const usuario = await Usuario.findOne({ email });
     if( usuario ){
         return res.status(400).json({
             ok: false,
             msg: 'El usuario ya existe con ese email'
         });
     }
     // crear usuario con el modelo
    const dbUser = new Usuario (req.body);
    //Hashear la contraseña
    const salt = bcrypt.genSaltSync();
    dbUser.password = bcrypt.hashSync(password, salt)

    //Gnerar el JWT 
     const token = await generarJWT(dbUser.id, name);
    // crear usuario de base de datos

    //Generar Respuesta Exitosa 
     await dbUser.save();

     return res.status(201).json({
         ok: true,
         uid: dbUser.id,
         name,
         email,
         token,
         msg: 'Usuario ingresado en la base de datos'
     });

    }catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
  
}

const loginUsuario = async(req,res = response ) => {

    const {email, password} = req.body;
    try{

        const dbUser = await Usuario.findOne({email});
        if(!dbUser){
            return res.status(400).json({
                ok: false,
                msg: 'El correo no existe' // credenciales no validas
            });
        }

        const validPassword = bcrypt.compareSync( password, dbUser.password)

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'El el password no es válido' // credenciales no validas
            });
        }

        //usuario y clave valida, generar jwt
        const token = await generarJWT(dbUser.id, dbUser.name);
        //respuesta del servicio
        return res.json({
            ok:true,
            uid: dbUser.id, 
            name: dbUser.name,
            email: dbUser.email,
            token,
            msg: 'Usuario encontrado'
        })

    }catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }
}

const revalidarToken = async (req,res = response) => {

    const { uid } = req;

    //leer la base obtener email 
    const dbUser = await Usuario.findById(uid);

    const token = await generarJWT(uid, dbUser.name);
    return res.json({
        ok: true,
       uid, 
       name: dbUser.name,
       email: dbUser.email,
       token
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}