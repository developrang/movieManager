mm.view.deleteMovie = {
	setupUserInterface : function(){
		
		var formEl = document.forms['movie'],
			deleteButton = formEl.commit,
			selectMovieEl = formEl.selectMovie;
		var key = '', keys = [], movie = null, optionEl = null;
		Movie.loadAll();	
		keys = Object.keys(Movie.instances);
		for(var i = 0; i < keys.length; i++){
			key = keys[i];
			movie = Movie.instances[key];
			optionEl = document.createElement('option');
			optionEl.text = movie.title;
			optionEl.value = movie.movieId;
			selectMovieEl.add(optionEl, null);	
		}
		
		/*selectMovieEl.addEventListener('change', function(){			
			var movie = null, key = selectMovieEl.value;
			var movie = Movie.instances[key];			
			if(key){
				formEl.movieId.value = movie.movieId;
				formEl.movieTitle.value = movie.title;
				formEl.movieRelease.value = movie.releaseDate; 	
			}
		});*/
		
		deleteButton.addEventListener('click', mm.view.deleteMovie.handleDeleteEvent);
		
		window.addEventListener('beforeunload', function(){
			Movie.saveAll();	
		});
	},
	handleDeleteEvent : function(){
		//e.preventDefault();
		var formEl = document.forms['movie'],
		selectMovieEl = formEl.selectMovie;		
		var movieId = selectMovieEl.value;						
		Movie.destroy(movieId);				
		formEl.reset();
	}	
	
};
