// Name : Goh Pin Pin Isaac
// Class: DCITP/FT/1A/08
// Adm : P2317623
/* 
A movie review application.

========= Format ========
1) Header
2) MovieList
3) Functions
    1) Option1 (Displaying Movies)
        1) Rating
        2) Running Time 
        3) Release Date
        4) Others
    2) Option2 (Adding Movie) - Mostly Validation
        1) Name
        2) GenreNum
        3) ReleaseDate
        4) Running time
        5) Getting Genre - String
    3) Option3 (Adding Rating)
        1) Displaying Movie Names
        2) Validating selectMovie
        3) Adding Rating
    4) Option4 (Latest 3 ReleaseDate)
        1) Temporary MovieList
        2) Sorting By Date
        3) Display TOP 3
    5) Option5 (Filter By Genre)
        1) Validating Genre
        2) Finding Movie Names with selected Genre
        3) Displaying Names
    6) Option6 (addSynopsis)
        1) Display Movie Names
        2) Validating selectMovie
        3) Changing/Adding synopsis to Selected Movie
    7) Option7 (Display Movie Synopsis)
        1) Display Movie Names
        2) Validating selectMovie
        3) Display logo
        4) Display synopsis
        5) Display Bottom
    8) Option8 (View History)    
        1) No History
        2) Display Header
        3) Highest len in history option * "="
        4) Display History Options
        5) Exit History
        6) Clear History
        7) Not selectable Option
        8) Invalid Option
        9) switch
            1) Displaying All Movies
            2) Displaying upcoming Movies
            3) Displaying Selected Genre
                1) Displaying the Names
            4) Displaying Synopsis
                1) Displaying logo
                2) Displaying Synopsis
                3) Displaying Bottom
    9) Option9 (Terminating Program)
    
4) Username
5) Display Choices
6) Validation of Input
    1) In Option Range
    2) A number
7) Switch (Run correct function)
========= Format =========
*/
var input = require("readline-sync");   // import input
var movie = require("./movieClass.js"); // import Class (Movie)
let Movie = movie.Movie;

var user, choices, option;
const HEADER = "Welcome to Silver Vintage Movie Review Program";
console.log(HEADER);// ================== Displaying Header ================== 

MovieList = [
    new Movie("Black Panther: Wakanda Forever 2022","Adventure,Action,Drama,Fantasy,Sci-Fi,Thriller",161,"11 Nov 2022",[9, 42],"Queen Ramonda, Shuri, M'Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T'Challa's death. As the Wakandans strive to embrace their next chapter, the heroes must band together with Nakia and Everett Ross to forge a new path for their beloved kingdom."),
    new Movie("Avatar: The Way of Water","Adventure,Sci-Fi",192,"16 Dec 2022",[4, 15],"Jake Sully and Ney'tiri have formed a family and are doing everything to stay together. However, they must leave their home and explore the regions of Pandora. When an ancient threat resurfaces, Jake must fight a difficult war against the humans."),
    new Movie("Fast X","Action,Crime,Mystery,Thriller",43,"19 May 2023",[28, 60],"Over many missions and against impossible odds, Dom Toretto and his family have outsmarted and outdriven every foe in their path. Now, they must confront the most lethal opponent they've ever faced. Fueled by revenge, a terrifying threat emerges from the shadows of the past to shatter Dom's world and destroy everything -- and everyone -- he loves."),
    new Movie("Ant-Man and the Wasp: Quantumania","Action,Adventure",120,"16 Feb 2023",[18, 80],"Ant-Man and the Wasp find themselves exploring the Quantum Realm, interacting with strange new creatures and embarking on an adventure that pushes them beyond the limits of what they thought was possible."),
    new Movie("M3Gan","Horror,Mystery,Thriller",102,"5 Jan 2023",[20, 70],"M3GAN is a marvel of artificial intelligence, a lifelike doll that's programmed to be a child's greatest companion and a parent's greatest ally. Designed by Gemma, a brilliant roboticist, M3GAN can listen, watch and learn as it plays the role of friend and teacher, playmate and protector. When Gemma becomes the unexpected caretaker of her 8-year-old niece, she decides to give the girl an M3GAN prototype, a decision that leads to unimaginable consequences.")
]

// ================== Option1 (Display) ==================
function displayMovies(){
    for (var movie of MovieList){
        for (var property in movie){   
            switch(property){
                // ======== (Synopsis) ======== 
                case "Synopsis":
                    break;
                // ======== (Rating) ======== 
                case "Rating":
                    numVotes = movie[property][0];
                    VoteSum = movie[property][1];
                    if (numVotes===0){
                        console.log(`${property}\t\t: 0 (0 voters)`);
                    } else{
                        rate = Math.round(VoteSum/numVotes*10)/10;
                        console.log(`${property}\t\t: ${rate} (${numVotes} voters)`);
                    }
                    break;
                // ======== (Running Time) ======== 
                case "Running_time":
                    numHours = Math.floor(movie[property]/60); //Number of Hours
                    numMin = movie[property]%60;               //Number of Minutes
                    if (numHours===0){                                      //If no Hours then only print Minutes only
                        console.log(`Running Time\t: ${numMin}m`);
                    } else if (numMin===0){                                 //If no Minutes then only print Hours only
                        console.log(`Running Time\t: ${numHours}h`);
                    } else{
                        console.log(`Running Time\t: ${numHours}h ${numMin}m`);
                    }
                    break;
                // ======== (Release Date) ======== 
                case "Release_date":
                    console.log(`Release Date\t: ${movie[property]}`);
                    break;
                // ======== (Other Properties) ========
                default:
                    console.log(`${property}\t\t: ${movie[property]}`);
                    break;
            }
        }
        console.log("");
    }
}
// ================== Option2 (Add Movie) ==================
var name,genreNum,release_date,running_time;
var tempSet = new Set();
for (var eachMovie of MovieList){
    for (var eachGenre of eachMovie.Genre.split(",")){
        tempSet.add(eachGenre);
    }
}
var genres = Array.from(tempSet);
genres.sort();
const DATES = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
const numDATES = [31,28,31,30,31,30,31,31,30,31,30,31];
function addMovie(){
    // ================== NAME ==================
    do{
        var sameName = false;
        name = input.question("\n\tPlease enter Movie's name: ");
        if (name === ""){
            console.log("\tPlease enter a movie name!");
            sameName = true;
        } else{
            for (var movie of MovieList){
                if (name.toUpperCase() === movie["Name"].toUpperCase()){
                    console.log("\tPlease enter a unique movie name!");
                    sameName = true;
                }
            }
        }
    } while (sameName);
    // ================== GENRE NUM ==================
    do{
        var correctGenre = true;
        console.log("\n\tPlease enter Movie's genre(s): ");
        for (var count in genres){
            console.log(`\t${count-(-1)}) ${genres[count]}`);
        }
        genreNum = input.question("\t>>").split(",");
        for (var num of genreNum){
            if (isNaN(num) || num.includes(".") || num<1 || num>genres.length){
                correctGenre = false;
            }
        }
        if (!correctGenre){
            console.log("\tPlease enter valid genre option(s)!");
        }
    } while (!correctGenre);
    // ================== RELEASE DATE ==================
    do{
        var correctReleaseDate = true;
        release_date = input.question("\n\tPlease enter Movie's release date: ");
        var splitDate = release_date.split(" ");
        var index = DATES.indexOf(splitDate[1]);
        if (!((Number.isInteger(Number(splitDate[0])) && Number.isInteger(Number(splitDate[2]))) && (DATES.includes(splitDate[1].toLowerCase())))){
            console.log("\tPlease enter valid date!");
            correctReleaseDate = false;
        } else if (Number(splitDate[0]<0 || Number(splitDate[0]>numDATES[index]))){
            console.log("\tPlease enter valid day! (Out of Range)");
            correctReleaseDate = false;
        }
    } while(!correctReleaseDate);
    // ================== RUNNING TIME ==================
    do{
        var correctRunningTime = true;
        running_time = input.question("\n\tPlease enter Movie's running time (mins): ");
        if (isNaN(running_time) || running_time.includes(".") || running_time===""){
            console.log("\tPlease enter valid running time!");
            correctRunningTime = false;
        }
    } while(!correctRunningTime);
    // ================== Getting Genre ==================
    var genre = "";
    for (var itemindex in genreNum){
        genreNum[itemindex] = Number(genreNum[itemindex]);
    }
    genreNum.sort();
    for (var count in genreNum){
        var genreIndex = genreNum[count];
        if (Number(count) === genreNum.length-1){ // hit the last index, dont end on a ,
            genre += genres[genreIndex-1];
        } else{ 
            if (!(genreNum.slice(Number(count)+1).includes(genreIndex))){ // if it includes multiple of the same genre
                genre += genres[genreIndex-1] + ",";
            }
        }
    }
    MovieList.push(new Movie(name,genre,running_time,release_date));
    activity.push(`Added Movie (${name})`);
}
// ================== Option3 (Add Rating) ==================
function addRating(){
    do{
        var correctSelect = true;
        // ================== Display Movie Names ==================
        console.log("\n\tSelect the movie to add a rating:")
        for (var movieIndex in MovieList){
            movieName = MovieList[movieIndex].Name;
            console.log(`\t${movieIndex-(-1)}) ${movieName}`);
        }
        console.log(`\t${movieIndex-(-2)}) Go Back to Main Menu`);
        // ================== Validating  selectMovie ==================
        selectMovie = input.question("\t>> ");
        if ((isNaN(selectMovie) || selectMovie.includes(".") || selectMovie.includes(" ") || selectMovie==="") || (selectMovie<1 || selectMovie>MovieList.length+1)){
            console.log(`\tEnter a valid number (1 - ${MovieList.length+1})`);
            correctSelect = false;
        }
    } while (!correctSelect);
    // ================== Giving rating to Selected Movie ==================
    if (selectMovie != (MovieList.length+1).toString()){
        movieSelected = MovieList[Number(selectMovie)-1].Name;
        // ================== Validating  rateMovie ==================
        do{
            var correctMovie = true;
            rateMovie = input.question(`\n\tEnter your rating for "${movieSelected}" (1 to 5 inclusive): `) 
            if ((isNaN(rateMovie) || rateMovie==="") || (rateMovie<1 || rateMovie>5)){
                console.log("\n\tEnter a valid rating!");
                correctMovie = false;
            } else if (!(rateMovie.length === 1 || rateMovie.length === 3)){        // for floating numbers (1dp)
                console.log("\n\tEnter a valid rating!");
                correctMovie = false;
            }
        } while (!correctMovie);
        // ================== adding rating ==================
        MovieList[Number(selectMovie)-1].Rating[0]++;
        MovieList[Number(selectMovie)-1].Rating[1] += Number(rateMovie);
        activity.push(`Added Rating (${movieSelected} | ${rateMovie})`);
    }
    
}
// ================== Option4 (Latest 3 Release Date) ==================
function latestMovie3(){
    // ================== Temporary MovieList ==================
    tempMovieList = [];
    for (var movie of MovieList){
        if (new Date().valueOf() > new Date(movie.Release_date).valueOf()){ // if release date passed today
            tempMovieList.push(movie);
        }
    }
    // ================== Sorting By Date ==================
    for (var movieNum=0; movieNum<tempMovieList.length-1; movieNum++){
        for (var count=0; count<tempMovieList.length-Number(movieNum)-1; count++){
            var date = new Date(tempMovieList[count].Release_date).valueOf();
            var nextDate = new Date(tempMovieList[count+1].Release_date).valueOf();
            if (date < nextDate){
                var temp = tempMovieList[count];
                tempMovieList[count] = tempMovieList[count+1];
                tempMovieList[count+1] = temp;
            }
        }
    }
    // ================== Display TOP 3 ==================
    console.log("\n\tThe latest 3 movies are:");
    for (var count=0;count<3;count++){
        console.log(`\t${count+1}) ${tempMovieList[count].Release_date}\t- ${tempMovieList[count].Name}`);
    }
}
// ================== Option5 (Filter By Genre) ==================
function filterByGenre(){
    // ================== Validating Genre ==================
    do{
        var correctGenre = true;
        console.log("\n\tPlease select a genre: ");
        for (var count in genres){
            console.log(`\t${count-(-1)}) ${genres[count]}`);
        }
        genreNum = input.question("\t>>");
        if (isNaN(genreNum) || genreNum.includes(".") || (genreNum<1 || genreNum>genres.length)){
            console.log("\tPlease enter a valid genre input!");
            correctGenre = false;
        }
    } while (!correctGenre);
    // ================== getting movie names with selected Genre ==================
    var nameList = [];
    for (var movie of MovieList){
        if (movie.Genre.includes(genres[genreNum-1])){
            nameList.push(movie.Name);
        }
    }
    // ================== Displaying the Names ==================
    console.log(`\n\tYou have selected "${genres[genreNum-1]}" genre`);
    for (var name in nameList){
        console.log(`\t${name-(-1)}) ${nameList[name]}`)
    }
    activity.push(`Filtered By Genre (${genres[genreNum-1]})`,3);
}
// ================== Option6 (addSynopsis) ==================
function addSynopsis(){
    do{
        var correctSelect = true;
        // ================== Display Movie Names ==================
        console.log("\n\tSelect the movie to add a synopsis:")
        for (var movieIndex in MovieList){
            movieName = MovieList[movieIndex].Name;
            console.log(`\t${movieIndex-(-1)}) ${movieName}`);
        }
        console.log(`\t${movieIndex-(-2)}) Go Back to Main Menu`);
        // ================== Validating  selectMovie ==================
        selectMovie = input.question("\t>> ");
        if ((isNaN(selectMovie) || selectMovie.includes(".") || selectMovie.includes(" ") || selectMovie==="") || (selectMovie<1 || selectMovie>MovieList.length+1)){
            console.log(`\tEnter a valid number (1 - ${MovieList.length+1})`);
            correctSelect = false;
        }
    } while (!correctSelect);
    // ================== Changing/Adding synopsis to Selected Movie ==================
    if (selectMovie != (MovieList.length+1).toString()){
        movieSelected = MovieList[Number(selectMovie)-1].Name;
        newSynopsis = input.question(`\n\tEnter the synopsis for "${movieSelected}":\n\n\t>>`);
        MovieList[Number(selectMovie)-1].Synopsis = newSynopsis;
        activity.push(`Added Synopsis (${name})`);
    }
}
// ================== Option7 (Display Movie Synopsis) ==================
function displayMovieSynopsis(){
    do{
        var correctSelect = true;
        // ================== Display Movie Names ==================
        console.log("\n\tSelect the movie to see it's synopsis:")
        for (var movieIndex in MovieList){
            movieName = MovieList[movieIndex].Name;
            console.log(`\t${movieIndex-(-1)}) ${movieName}`);
        }
        console.log(`\t${movieIndex-(-2)}) Go Back to Main Menu`);
        // ================== Validating  selectMovie ==================
        selectMovie = input.question("\t>> ");
        if ((isNaN(selectMovie) || selectMovie.includes(".") || selectMovie.includes(" ") || selectMovie==="") || (selectMovie<1 || selectMovie>MovieList.length+1)){
            console.log(`\tEnter a valid number (1 - ${MovieList.length+1})`);
            correctSelect = false;
        }
    } while (!correctSelect);
    // ================== Display logo ==================
    if (selectMovie != (MovieList.length+1).toString()){
        console.log("\n                       _oo0oo_                           ");
        console.log("                      o8888888o                          ");
        console.log('                      88" . "88                          ');
        console.log("                     (|  -_-  |)                         ");
        console.log("                     0\\   =   /0                        ");
        console.log("                   ___/` --- '\\___                    \n");
        console.log("         Welcome to PinPin's Movie Directory           \n");
        console.log(`Movie:  ${MovieList[selectMovie-1].Name}                 `);
        console.log("=======================================================  ");
        // ================== Display synopsis ==================
        if (MovieList[selectMovie-1].Synopsis!=""){
            var text = "    ";
            var count = text.length;
            for (var letterIndex in MovieList[selectMovie-1].Synopsis){
                letter = MovieList[selectMovie-1].Synopsis[letterIndex]
                nextLetter = MovieList[selectMovie-1].Synopsis[letterIndex-(-1)]
                if (count===54 && letter!=" "){
                    text += "-\n";
                    count-=54;
                } else if (count===55){
                    text += "\n";
                    count-=55;
                }
                text += letter;
                count++;
            }
            console.log(text);
        } else{     // if no synopsis
            console.log("                 No Current Synopsis")
        }
        // ================== Display Bottom ==================
        console.log("=======================================================");
        console.log("              Hope the synopsis helped!               ");
        console.log("                   ***THANK YOU***                    ");

        activity.push(`Displayed Synopsis (${MovieList[selectMovie-1].Name})`,4);
    }
}
// ================== Option8 (View History) ==================
function viewHistory(){
    if (Object.keys(history).length === 0){
        console.log("\n\t🕜 History\n\t====================\n\t\tNo History😈");
        return 0
    }
    do{
        correctHistory = true;
        console.log("\n\t🕜 History");
        var valueLengthList = [];
        for (var key in history){
            valueTotal = history[key][0].length + history[key][1].length + history[key][2].length;
            valueLengthList.push(valueTotal);
        }
        console.log("\t"+"=".repeat(Math.max.apply(null, valueLengthList)+22));
        for (var key in history){
            value = history[key];
            console.log(`\t\t${key}) ${value[0]} - ${value[1]}\t - ${value[2]}`);
        }
        historyOption = input.question("\n\t\tSelect a SELECTABLE option (X - Exit | C - Clear): ");
        if (historyOption.toUpperCase() === "X"){
            break;
        } else if (historyOption.toUpperCase() === "C"){
            history = {};
            console.log("\n\t\t🕜 History Has Been Cleared");
            break;
        } else if (Object.keys(history).includes(historyOption) && history[historyOption].includes("Not Selectable")){
            console.log("\t\tPlease enter a SELECTABLE option.");
            correctHistory = false;
        } else if (!(Object.keys(history).includes(historyOption)) || isNaN(historyOption)){  //check if its valid input (range & format check)
            console.log("\t\tPlease enter a valid option.");
            correctHistory = false;
        }
    } while(!correctHistory);
    if (historyOption.toUpperCase() != "C" && historyOption.toUpperCase() != "X"){
        historyOptionValue = history[historyOption][3];
        switch(historyOptionValue){
            case 1:
                // ================== Displaying All Movies ==================
                displayMovies();
                break;
            case 2:
                // ================== Display upcoming Movies ==================
                latestMovie3();
                break;
            case 3:
                // ================== Displaying Selected Genre ==================
                var nameList = [];
                genre = history[historyOption][2].slice(history[historyOption][2].indexOf("(")+1, history[historyOption][2].indexOf(")")); 
                for (var movie of MovieList){
                    if (movie.Genre.includes(genre)){
                        nameList.push(movie.Name);
                    }
                }
                // ================== Displaying the Names ==================
                console.log(`\n\tYou have selected "${genre}" genre`);
                for (var name in nameList){
                    console.log(`\t${name-(-1)}) ${nameList[name]}`)
                }
                break;
            case 4:
                // ================== Display synopsis ==================
                movieNameHistory = history[historyOption][2].slice(history[historyOption][2].indexOf("(")+1, history[historyOption][2].indexOf(")"));
                for (var movieHistory of MovieList){
                    if (movieHistory.Name === movieNameHistory){
                        movieSynopsisHistory = movieHistory.Synopsis;
                    }
                }
                // ================== Displaying logo ==================
                console.log("\n                       _oo0oo_                           ");
                console.log("                      o8888888o                          ");
                console.log('                      88" . "88                          ');
                console.log("                     (|  -_-  |)                         ");
                console.log("                     0\\   =   /0                        ");
                console.log("                   ___/` --- '\\___                    \n");
                console.log("         Welcome to PinPin's Movie Directory           \n");
                console.log(`Movie:  ${movieNameHistory}                              `);
                console.log("=======================================================  ");
                // ================== Displaying synopsis ==================
                if (movieSynopsisHistory!=""){
                    var text = "    ";
                    var count = text.length;
                    for (var letterIndex in movieSynopsisHistory){
                        letter = movieSynopsisHistory[letterIndex]
                        nextLetter = movieSynopsisHistory[letterIndex-(-1)]
                        if (count===54 && letter!=" "){
                            text += "-\n";
                            count-=54;
                        } else if (count===55){
                            text += "\n";
                            count-=55;
                        }
                        text += letter;
                        count++;
                    }
                    console.log(text);
                } else{     // if no synopsis
                    console.log("                 No Current Synopsis")
                }
                // ================== Display Bottom ==================
                console.log("=======================================================");
                console.log("              Hope the synopsis helped!               ");
                console.log("                   ***THANK YOU***                    ");
                break;
        }        
    }
}
// ================== Option9 (Exiting) ==================
function exit(){
    isExit = false; // to exit the while loop
    console.log("Thank you & goodbye!");
}



do{
    var correcctName = true;
    user = input.question("Please enter your name: ");      // Get Name
    if (user === ""){
        console.log("You didnt Enter a name\n");
        correcctName = false;
    }
}while(!correcctName);
choices = ["Display All Movies",
            "Add Movie",
            "Add Rating",
            "Latest 3 Release Date",
            "Filter by Genre",
            "Add Synopsis",
            "Display Movie Synopsis",
            "View History",
            "Exit"
];
var isExit = true; //check if it needs to exit
var options = ["1","2","3","4","5","6","7","8","9"];
var history = new Object();
while (isExit){
    var activity = [new Date().toDateString()];
    // ================== validation ==================
    do{
        console.log(`\nHi ${user}, please select your choice:`);
        for (var index in choices){                         //display the options
            console.log(`\t${index-(-1)}. ${choices[index]}`);  //index-(-1) makes num 1 but index+1 will make it a sting (01)
        }
        option = input.question("\t>> ");                   //get option input
        if (!(options.includes(option)) || isNaN(option)){  //check if its valid input (range & format check)
            console.log("Please enter a valid input.");
        }
    } while(!(options.includes(option)));

    // ================== options ==================
    switch(option){
        case "1":
            activity.push("Selectable    ","Displayed All Movies",1);
            displayMovies();
            break;
        case "2":
            activity.push("Not Selectable");
            addMovie();
            break;
        case "3":
            activity.push("Not Selectable");
            addRating();
            break;
        case "4":
            activity.push("Selectable    ","Latest 3 Upcoming Movies",2);
            latestMovie3();
            break;
        case "5":
            activity.push("Selectable    ");
            filterByGenre();
            break;
        case "6":
            activity.push("Not Selectable");
            addSynopsis();
            break;
        case "7":
            activity.push("Selectable    ");
            displayMovieSynopsis();
            break;
        case "8":
            viewHistory();
            break;
        case "9":
            exit();
            break;
    }
    if (option != "8" || option != "9"){
        if (activity.length > 2){
            history[(Object.keys(history).length+1).toString()] = activity;
        }
    }
}
