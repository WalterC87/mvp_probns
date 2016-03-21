require('dotenv').load();
var restify = require('restify');
var fs = require('fs');
var models = require('./models');
var passport = require('passport');
var middleware = require('./app/middlewares/middleware');
var cors = require('cors');
var bodyParser = require('body-parser');

var jwt = require('restify-jwt');
var auth = jwt({
	secret: process.env.JWT_SECRET,
	requestProperty: 'payload'
});

var controllers = {},
	controllers_path = process.cwd() + '/app/controllers';

fs.readdirSync(controllers_path).forEach(function (file){
	if(file.indexOf('.js') != -1){
		controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
	}
})

require('./config/passport');

var server = restify.createServer();
server.use(restify.fullResponse());
server.use(cors());

restify.CORS.ALLOW_HEADERS.push('accept');
restify.CORS.ALLOW_HEADERS.push('sid');
restify.CORS.ALLOW_HEADERS.push('lang');
restify.CORS.ALLOW_HEADERS.push('origin');
restify.CORS.ALLOW_HEADERS.push('withcredentials');
restify.CORS.ALLOW_HEADERS.push('x-requested-with');

// server.use(
// 	function crossOrigin(req, res, next){
// 		res.header("Access-Control-Allow-Origin", "*");
// 		res.header("Access-Control-Allow-Headers", "X-Requested-With");
// 		return next();
// 	}
// )

// server.use(restify.urlEncodedBodyParser({ mapParams : false }));
server.use(passport.initialize());

// server.use(function (req, res,err,next){
// 	console.log(err.called);
// 	if(err.called === false){
// 		res.status(401);
// 		res.json({
// 			"type": err.called,  "message" : "No tiene autorizacion para realizar esta accion"
// 		})
// 	}
// })

//Tipo Inmueble
server.get("/tipoInmueble/get/all",controllers.tipoInmueble.getTipoInmueble);

//Opearcion Inmueble
server.get("/operacionInmueble/get/all", controllers.operacionInmueble.getOperacionesInmueble);

//Paises
server.get("/paises", controllers.pais.getPaises);
server.get("/paises/:id", controllers.pais.getPaisById);
server.post("/paises", controllers.pais.postPais);
server.put("/update/paises/:id", controllers.pais.putPais);
server.put("/del/paises/:id", controllers.pais.deletePais);

//Departamentos
server.get("/departamentos/all/:paisId", controllers.departamento.getDepartamentos);
server.get("/departamentos/:id", controllers.departamento.getDepartamentoById);
server.post("/departamentos", controllers.departamento.postDepartamento);
server.put("/update/departamentos/:id", controllers.departamento.putDepartamento);
server.put("/del/departamentos/:id", controllers.departamento.deleteDepartamento);

//Municipios
server.get("/municipios/all/:DepartamentoId", controllers.municipio.getMunicipios);
server.get("/municipios/:id", controllers.municipio.getMunicipioById);
server.post("/municipios", controllers.municipio.postMunicipio);
server.put("/update/municipios/:id", controllers.municipio.putMunicipio);
server.put("/del/municipios/:id", controllers.municipio.deleteMunicipio);


//TipoUsuario
server.get("/tiposusuario", controllers.tipoUsuario.getTiposUsuario);
server.get("/tipousuario/:id", controllers.tipoUsuario.getTipoUsuarioById);
server.post("/tipousuario", controllers.tipoUsuario.postTipoUsuario);
server.put("/tipousuario", controllers.tipoUsuario.putTipoUsuario);
server.put("/tipousuario", controllers.tipoUsuario.deleteTipoUsuario);

//Cliente
var urlencodedParser = bodyParser.urlencoded({extended: true});
server.get("/usuario/all/getClientes", controllers.usuario.getUsuarios);
server.get("/usuario/all/getVendedores/:padreId", controllers.usuario.getVendedoresByPadre);
server.get("/usuario/all/vendedores/count/:padreId",controllers.usuario.getTotalVendedoresAgencia);
server.get("/usuario/get/clienteById/:id", controllers.usuario.getUsuarioById);
server.get("/usuario/getVendedor/:padreId/:id", controllers.usuario.getVendedorById);
server.post("/usuario/post/cliente", controllers.usuario.postCliente);
server.post("/usuario/post/vendedor", controllers.usuario.postVendedor);
server.post("/auth/login",urlencodedParser, controllers.usuario.loginUser);
server.post("/usuario/upload/avatar",restify.bodyParser(), controllers.usuario.uploadAvatar);
server.put("/usuario/put/avatar/:id", controllers.usuario.putAvatar);
server.put("/usuario/verificaEmail/:id", controllers.usuario.putVerificarEmailUsuario);
server.put("/usuario/update/:id", controllers.usuario.putUsuario);
server.put("/usuario/changePassword/:id", controllers.usuario.changePassword);
server.put("/usuario/delete/:id", controllers.usuario.deleteUsuario);

//Inmuebles
server.post("/inmuebles/post/inmueble", controllers.inmueble.postInmueble);
server.post("/inmuebles/image", restify.bodyParser(), controllers.inmueble.uploadImage);
server.post("/inmuebles/delete/image", controllers.inmueble.deleteImage);
server.get("/inmuebles/get/all/:usuarioId", controllers.inmueble.getInmueblesUsuario);
server.get("/inmuebles/get/:id",middleware.trackingInmueble, controllers.inmueble.getInmuebleById);
server.get("/inmuebles/get/all/count/:usuarioId",controllers.inmueble.getTotalInmueblesUsuario);
server.put("/inmuebles/put/:id",controllers.inmueble.putInmueble);
server.put("/inmuebles/delete/:id", controllers.inmueble.deleteInmueble);

//Buscador
server.get("/buscador/get/all/:agenciaAsociadaId",controllers.buscador.getBuscadoresByAgencia);
server.get("/buscador/get/:id", controllers.buscador.getBuscadorById);
server.get("/buscador/get/inmuebles/:buscadorId", controllers.buscador.getInmueblesBuscador);
server.get("/buscador/get/all/count/:agenciaAsociadaId", controllers.buscador.getTotalBuscadoresCliente);
server.post("/buscador/post", controllers.buscador.postBuscador);
server.post("/buscador/add/inmuble/:inmuebleId", controllers.buscador.addInmuebleBuscador);
server.put("/buscador/put/:id", controllers.buscador.putBuscador);
server.put("/buscador/delete/:id", controllers.buscador.deleteBuscador);



models.sequelize.sync();

var port = process.env.PORT || 3000;

server.listen(port, function(err){
	if(err){
		console.error(err);
	}else{
		console.log('%s listening at %s', server.name, server.url);
	}
})
