function readxml() {

    var key = "qG4h3DZZk8h8kOq8GmtJQ"; // api key from good read
		var secret = "rKQ5xgr45GbQY0mHJkbMXlpxgCOqRMQLBxQOs7EX0w";  // secrete key from goodread
		var  useraccount = "chaowow";
		var url = "https://www.goodreads.com/book/author/show/18541?format=xml&key=" + key;


      fetch("../goodreads.xml")
            .then(res => res.text())
            .then(function(data) {
                   var data = JSON.parse(body);
                      data.forEach((book) => {
                          const books = document.createElement('div');
                          const h1 = document.createElement('h1');
                          h1.textContent = books.title;
                          container.appendChild(books);
                          card.appendChild(h1);
                          })
          
              })
            .then(console.log)
            .catch(console.error);
}  


function displayreviews(xml) {

    var  sourcedoc, user = "",  bookreviewtable = " " ;
    var  bookname = " " , bookauth = " " , imgurl = "  ", userreview = " ", rating  = " ";
   
   
    txt =  "test data : " + " | " + " " + "<br>";
   
    x = xml.getElementsByTagName("review");
    //console.log( x);
   
    bookreviewtable +=  "</td><td>"+ "Bookname" + "</td><td> " +  " " +  "</td><td> "+ "AVG rating" +  "</td><td>"+ "Author" +"</td><td>"+ "Reader" ; 
   
    for (i = 0; i< x.length; i++) {
     
         if ( (x[i].children[1].children[2].childNodes[0].nodeValue) !==null) { user = x[i].children[1].children[2].childNodes[0].nodeValue;}
         if ( (x[i].children[2].children[5].childNodes[0].nodeValue) !==null) { bookname = x[i].children[2].children[5].childNodes[0].nodeValue;}
         if ( (x[i].children[2].children[8].childNodes[0].nodeValue) !==null) { imgurl = x[i].children[2].children[8].childNodes[0].nodeValue;}
         if ( (x[i].children[2].children[18].childNodes[0].nodeValue) !==null) { rating = x[i].children[2].children[18].childNodes[0].nodeValue;}
         if ( (x[i].children[2].children[20].children[0].children[1].childNodes[0].nodeValue) !==null) { bookauth = x[i].children[2].children[20].children[0].children[1].childNodes[0].nodeValue;}
   
         bookreviewtable += "<tr><td>" + bookname + "</td><td>" + "<img src="+imgurl+">" +"</td><td>" +  rating + "</td><td>" + bookauth + "</td><td>" + user ;
      }
      document.getElementById("review").innerHTML = bookreviewtable;
}


function checknyt () {


    var  bookstringfic    =  "../nytbestfic.json" ; 
    var  bookstringnofic  =  "../nytbestnofic.json" ; 

    var bf = "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=S9hKHIMwAXB9fbmHNuOIcA6Hb6Appc4N";
    var bnf ="https://api.nytimes.com/svc/books/v3/lists/current/hardcover-nonfiction.json?api-key=S9hKHIMwAXB9fbmHNuOIcA6Hb6Appc4N";
   
    /* parsing the file */
       fetch(bf)
       .then(response => { 
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                  return response.json().then(data => {
                        processfilefic( data);
                      });
            }
            else {
                  return response.text().then(text => {
                    console.log("sry.....we are trying...");
                  });
                }
            })
             //.catch(err => { console.log ("There is error to prorcess the file");});
           
       fetch(bnf)
             .then(response => { return response.json(); })
             .then(data => {   //console.log(data);
                              processfile(data);
       })
             //.catch(err => { console.log ("There is error to prorcess the file");});
   
}

function processfilefic(info) {

      var bookauthor  = "nobody" , bookrank = " ",bookweeks= "", bookimg = "" ; 
      var mybooks = [] , nyttable = " ";
    
    
      nyttable +=  "</td><td>"+ "Books"  +  "</td><td> "+ "Author" +  "</td><td>"+ "Ranking" +"</td><td>"+ " Weeks" ; 
    
      console.log(info);
      
       for (var key in info )
        {
           console.log ("key is :" + key + "  = " + info[key]);
            if (key === "results")
             {
                   mybooks = info[key].books ;
                  for (i = 0 ; i < mybooks.length ; i++)
                    {  
    
                      if(mybooks[i].author !==null){ bookauthor  = mybooks[i].author; }
                      if(mybooks[i].rank !==null){ bookrank  = mybooks[i].rank; }
                      if(mybooks[i].book_image!==null){ bookimg  = mybooks[i].book_image; }
                      if(mybooks[i].weeks_on_list !==null){ bookweeks  = mybooks[i].weeks_on_list; }
                       console.log ("the book is  " +    bookimg + "  by "      +  bookauthor + " it is ranking at  " + bookrank + "  and it has been  " + bookweeks + " weeks  on the board ");
                    //  nyttable  +=  "<tr><td>" + "<img src="+bookimg+">" +"</td><td>" +  bookauthor + "</td><td>" + bookrank + "</td><td>" + bookweeks  ;
                   //   nyttable  +=  "<tr><td>" + bookimg + "</td><td>" +  bookauthor + "</td><td>" + bookrank + "</td><td>" + bookweeks  ;
                        nyttable  +=  "<tr><td>" + "<img src="+bookimg+" width=" + "100" +">" +"</td><td>" +  bookauthor + "</td><td>" + bookrank + "</td><td>" + bookweeks  ;

                    }
    
               }
        }
        
     /*display the table */
           document.getElementById("nytfic").innerHTML = nyttable;
    
  }


function processfile(info) {

    var bookauthor  = "nobody" , bookrank = " ",bookweeks= "", bookimg = "" ; 
    var mybooks = [] , nyttable = " ";
  
  
    nyttable +=  "</td><td>"+ "Books"  +  "</td><td> "+ "Author" +  "</td><td>"+ "Ranking" +"</td><td>"+ " Weeks" ; 
  
    console.log(info);
    
     for (var key in info )
      {
         console.log ("key is :" + key + "  = " + info[key]);
          if (key === "results")
           {
                 mybooks = info[key].books ;
                for (i = 0 ; i < mybooks.length ; i++)
                  {  
  
                    if(mybooks[i].author !==null){ bookauthor  = mybooks[i].author; }
                    if(mybooks[i].rank !==null){ bookrank  = mybooks[i].rank; }
                    if(mybooks[i].book_image!==null){ bookimg  = mybooks[i].book_image; }
                    if(mybooks[i].weeks_on_list !==null){ bookweeks  = mybooks[i].weeks_on_list; }
                     console.log ("the book is  " +    bookimg + "  by "      +  bookauthor + " it is ranking at  " + bookrank + "  and it has been  " + bookweeks + " weeks  on the board ");
                     nyttable  +=  "<tr><td>" + "<img src="+bookimg+" width=" + "100" +">" +"</td><td>" +  bookauthor + "</td><td>" + bookrank + "</td><td>" + bookweeks  ;
                    //nyttable  +=  "<tr><td>" + bookimg + "</td><td>" +  bookauthor + "</td><td>" + bookrank + "</td><td>" + bookweeks  ;
  
                  }
  
            
  
             }
      }
      
   /*display the table */
         document.getElementById("nytnonfic").innerHTML = nyttable;
  
}
 
function goodsreadfetch(xml) {

      var x, i, xmlDoc, txt,table ="" , booktable = "";
      var authorinfo ="" ; 
      var  gauthor = " " , ggender =" ", gworkcount=" ", ghometown=' ',gbooks , gpubyears ="Unknown", gimage =" ", gdesc ="Not at this time"; 
     
      txt = "";
      //console.log(xml);
     
   
      authorinfo   = xml.getElementsByTagName ("about")[0].innerHTML;
      authorinfo = authorinfo.trim().replace(/^(\/\/\s*)?<!\[CDATA\[|(\/\/\s*)?\]\]>$/g, '')
      // console.log ("the about value is " + authorinfo);
      document.getElementById("authorinfo").innerHTML = authorinfo;
    
      
      if (xml.getElementsByTagName("name")[0].innerHTML !==null){ gauthor = xml.getElementsByTagName("name")[0].innerHTML;}
      if (xml.getElementsByTagName("gender")[0].innerHTML !==null){ ggender = xml.getElementsByTagName("gender")[0].innerHTML;}
      if (xml.getElementsByTagName("works_count")[0].innerHTML !== null){ gworkcount = xml.getElementsByTagName("works_count")[0].innerHTML; }
      if (xml.getElementsByTagName("hometown")[0].innerHTML !==null) { ghometown = xml.getElementsByTagName("hometown")[0].innerHTML; }
    
      ggender = "Male";
    
      table += "</td><td>"+ "Author" + "</td><td>"+ "Gender" + "</td><td>" + "Totoal works" + "</td><td>"+ "Hometown"; 
      table +=  "<tr><td>" + gauthor +  "</td><td>" + ggender +  "</td><td>" + gworkcount + "</td><td>" + ghometown;
    
    
      document.getElementById("first").innerHTML = table;
    
      booktable  += "</td><td> "+ "Titles" + "</td><td>" + "Year" +  "</td><td>" + " " +  "</td><td>" + " Description ";
    
      x = xml.getElementsByTagName("book");
      //console.log( x);
    
    
      for (i = 0; i< x.length; i++) {
        
         txt += x[i].childNodes[11].childNodes[0].nodeValue + " <br>";
    
         if ( x[i].childNodes[33].childNodes.length !== 0)
         {gpubyears = x[i].childNodes[33].childNodes[0].nodeValue; }
         if ( x[i].childNodes[15].childNodes.length !== 0)
         {gimage = x[i].childNodes[15].childNodes[0].nodeValue; }
         
         if ( x[i].children[20].innerHTML !== 0)
         { gdesc = x[i].children[20].innerHTML; }
         
         gbooks =   x[i].childNodes[11].childNodes[0].nodeValue;
         booktable += "<tr><td>" + gbooks + "</td><td>" + gpubyears + "</td><td>" + "<img src=" + gimage +">" + "</td><td>" + gdesc  + " <br>";
        // booktable += "<tr><td>" + gbooks + "</td><td>" + gpubyears + "</td><td>" +  gimage  + "</td><td>" + gdesc  + " <br>";

         gpubyears = "unknown";
         gimage =" ";
         gdesc ="Not at this time";
      
      }
       //document.getElementById("demo").innerHTML = txt;
       document.getElementById("Authorworks").innerHTML = booktable;
    
}

function fetchgoodreadxml(){
      fetch("../gauthors.xml")
        .then(res => res.text())
        .then(res => (new window.DOMParser()).parseFromString(res, "text/xml")                      
        )
        .then(data => {  //console.log(data);
                          //display(data);
                          // console.log("the elm data is " + data.getElementsByTagName("original_title")[0].childNodes[0].nodeValue);
                           goodsreadfetch(data);   
                          //document.getElementById("demo").innerHTML =  data.getElementsByTagName("GoodreadsResponse")[0].childNodes[0].nodeValue;
                        });
      
}    

