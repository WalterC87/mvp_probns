probnsApp.controller('propertyController', function($scope,$http,$location,
											   	     $window,propertyService,
											   	     ShareData,blockUI,Notification, authService){

	var service = propertyService;
	var factory = ShareData;
	var _userId = authService.getUserLogged();
	$scope._newInmueble = {
		descripcion: "",
		precioPropiedad: 0,
		direccionCorta: "",
		direccion: "",
		latitud: "",
		longitud: "",
		extensionPropiedad: null,
		areaConstruccion: null,
		anioConstruccion: null,
		observaciones: "",
		totalComision: 0,
		comisionCompartida: 0,
		DepartamentoId: 0,
		estadoInmuebleId: 1,
		tipoInmuebleId: 0,
		operacionInmuebleId: 0,
		PaiId: 0,
		MunicipioId: 0,
		userId: 0,
		imagenesInmueble: "",
		amenitiesInmueble: "",
		userId: _userId ,
		imagenPrincipal: ""
	};
	$scope.showInfo = function(){
		console.log($scope._newInmueble)
		// console.log('hola'); return false;
		// console.log($window.location.href = '#app.propiedades');
		//console.log('hola');
		//$window.location = '#/app/propiedades';
		// $location.url('#/app/propiedades');
	}

	$scope.guardarPropiedad = function(){
		$scope.ListImagenes = JSON.parse(String($scope._newInmueble.imagenesInmueble));
		$scope._newInmueble.imagenPrincipal = $scope.ListImagenes[0].img_url

		service.guardarPropiedad($scope._newInmueble).then(
			function (data){
				if(data.type == false){
					Notification.error(data.message);
					return false;
				}else{
					Notification.success(data.message);
					setTimeout(function(){
						$window.location = '#/app/propiedades';
					}, 1500);
				}
			}
		)
	}

	$scope.$on('setTipoInmueble', function (event, data){
		$scope._newInmueble.tipoInmuebleId = data;
	})

	$scope.$on('setOperacionInmueble', function (event, data){		
		$scope._newInmueble.operacionInmuebleId = data;
	})

	$scope.$on('setPais', function (event, data){		
		$scope._newInmueble.PaiId = data;
	})

	$scope.$on('setDepartamento', function (event, data){		
		$scope._newInmueble.DepartamentoId = data;
	})

	$scope.$on('setMunicipio', function (event, data){		
		$scope._newInmueble.MunicipioId = data;
	})

	$scope.$on('setPrecioPropiedad', function (event, data){		
		$scope._newInmueble.precioPropiedad = data;
	})

	$scope.$on('setTotalComision', function (event, data){		
		$scope._newInmueble.totalComision = data;
	})

	$scope.$on('setComisionCompartida', function (event, data){		
		$scope._newInmueble.comisionCompartida = data;
	})

	$scope.$on('setDireccionCorta', function (event, data){		
		$scope._newInmueble.direccionCorta = data;
	})

	$scope.$on('setDireccion', function (event, data){		
		$scope._newInmueble.direccion = data;
	})

	$scope.$on('setAmenitiesInmueble', function (event, data){
		$scope._newInmueble.amenitiesInmueble = JSON.stringify(data);
	})

	$scope.$on('setExtensionPropiedad', function (event, data){
		$scope._newInmueble.extensionPropiedad = data;
	})

	$scope.$on('setAreaConstruccion', function (event, data){
		$scope._newInmueble.areaConstruccion = data;
	})

	$scope.$on('setAnioConstruccion', function (event, data){
		$scope._newInmueble.anioConstruccion = data;
	})

	$scope.$on('setImagenesInmueble', function (event, data){
		$scope._newInmueble.imagenesInmueble = JSON.stringify(data);
	})

	$scope.$on('setDescripcion', function (event, data){
		$scope.$broadcast('setInmueblePreview', $scope._newInmueble);
		$scope._newInmueble.descripcion = data;
	})

	$scope.$on('setObservaciones', function (event, data){
		$scope._newInmueble.observaciones = data;
	})

})