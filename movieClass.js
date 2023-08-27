// ================== Classes ================== 
class Movie{
    constructor(name,genre,running_time,release_date,rating=[0,0],synopsis=""){
        this.Name = name;
        this.Genre = genre;
        this.Running_time = running_time;
        this.Release_date = release_date;
        this.Rating = rating;
        this.Synopsis = synopsis
    }
    displayMovieDetails(){
        return [this.Name,this.Genre,this.Running_time,this.Release_date,this.Rating,this.Synopsis];
    }
}

module.exports = {
    Movie: Movie
}