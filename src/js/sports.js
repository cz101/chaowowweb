function teamstatus()

{


    fetch("https://api-football-beta.p.rapidapi.com/leagues?team=1&name=Serie%20A&season=2020", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "eac4153b3emshf51d6a08d9e8e1fp1140dfjsnee14f7b1cc99",
            "x-rapidapi-host": "api-football-beta.p.rapidapi.com"
        }
    })
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.error(err);
    });

}