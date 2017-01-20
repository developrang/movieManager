// JavaScript Document
mm.view.createMovie = {
	setupUserInterface : function(){
		var commit = document.forms['movie'].commit;
		Movie.loadAll();
		commit.addEventListener('click', mm.view.createMovie.handleSubmitEvent);
		window.addEventListener('beforeunload', function(){
			Movie.saleAll()
		});
	},
	handleSubmitEvent : function(e){
		console.log(Movie.instances);
		e.preventDefault();
		var formEl = document.forms['movie'];
		var mId = formEl.movieId.value.trim();
		var mTitle = formEl.movieTitle.value.trim();
		var mRelease = formEl.movieRelease.value.trim();
		if(!mId || !mTitle || !mRelease){
			alert("Fill in all the details");
			return false;
		}
		var slots = {movieId:mId, title:mTitle, releaseDate:mRelease};
		Movie.add(slots);
		formEl.reset();
	}	
}