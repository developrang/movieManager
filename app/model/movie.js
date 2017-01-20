// JavaScript Document
function Movie(slots){
	this.movieId = slots.movieId;
	this.title = slots.title;
	this.releaseDate = slots.releaseDate;
}

Movie.instances = {};

Movie.add = function(slots){
	var movie = new Movie(slots);
	Movie.instances[slots.movieId] = movie; 
	alert('Movie '+ slots.movieId +' Added Successfully');
}

Movie.update = function(slots){
	var movie = Movie.instances[slots.movieId];
	movie.title == slots.title ? '' : movie.title = slots.title;
	movie.releaseDate == slots.releaseDate ? '' : movie.releaseDate = slots.releaseDate;
	alert('Movie '+ slots.movieId +' Updated Successfully');
}

Movie.destroy = function(movieId){
	if(Movie.instances[movieId]){
		if(confirm('Do you really want to delete the Movie?')){
			delete Movie.instances.movieId;
		}
		alert('Movie '+ movieId +' Deleted Successfully');
	} else{
		alert("There is no movie with Movie ID " + movieId + " in the database.");	
	}
}

Movie.convertRow2Obj = function(movieRow){
	var movie = new Movie(movieRow);
	return movie;	
}

Movie.loadAll = function(){		
	var key='', keys=[], movieString='', movies = {};
	try{
		if(localStorage['movies']){
			movieString = localStorage['movies'];	
		}
	} catch(e){
		alert("Error while loading movies from Local Storage\n" + e);
	} 
	
	if(movieString){
		movies = JSON.parse(movieString);
		keys = Object.keys(movies);
		for(var i = 0; i < keys.length; i++){
			key = keys[i];
			Movie.instances[key] = Movie.convertRow2Obj(movies[key]);	
		}	
	}		
}

Movie.saveAll = function(){
	var movieString = '', error = false, nmrOfMovies = Object.keys(Movie.instances).length; 
	try{
		movieString = JSON.stringify(Movie.instances);
		localStorage['movies'] = movieString;	
	} catch(e){
		alert('Error when writing to the Local Storage \n' + e);
		error = true;
	}		
	if(!error){alert( nmrOfMovies + " saved to Local Storage!");}
}
