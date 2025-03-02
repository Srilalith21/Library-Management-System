const table_data_div = document.getElementById("table-data")
const table_body = document.getElementById("t-body")
const searchBtn = document.getElementById("searchBookButton")

let values = [
  "book_id",
  "book_name",
  "book_author",
  "book_genere",
  "book_price",
  "book_publish_year",
];

let books_data = []

function getDataFromDB(){
  let temp = JSON.parse(localStorage.getItem("books"))
  if(temp != null){
    for(let i=0; i<temp.length; i++){
      books_data.push(temp[i])
    }
  }
}

function displayData(){
  if (books_data.length > 0) {
    let trow,tdata,tbutton

    for(let i=0; i<books_data.length; i++){
      trow = document.createElement("tr")
      for(let j=0; j<values.length; j++){
        tdata = document.createElement("td")
        tdata.innerHTML = books_data[i][values[j]]
        trow.appendChild(tdata)
      }
      tdata = document.createElement("td")
      tbutton = document.createElement("button")
      tbutton.innerHTML = "Delete"
      tbutton.setAttribute("name",books_data[i].book_id)
      tbutton.setAttribute("onclick","buttonClick(this.name)")
      tdata.appendChild(tbutton)
      trow.appendChild(tdata)
      table_body.appendChild(trow)
    }
    table_data_div.appendChild(table_body)
  }
}

function findBook(id){
  let i = 0,j = books_data.length-1
  while(i <= j){
    if(books_data[i].book_id == id){
      return i
    }else if(books_data[j].book_id == id){
      return j
    }
    i++,j--
  }
  return -1
}

function buttonClick(id){
  let index = findBook(id)
  if(index >= 0){
    let i = index;
    while(i < books_data.length-1){
      books_data[i] = books_data[i+1]
      i++
    }
    books_data.pop();
    localStorage.setItem("books",JSON.stringify(books_data))
  }
  location.reload() 
}

searchBtn.addEventListener("click",()=>{
  const convertToLower =  (value) => value.toLowerCase()
  const searchValue = document.getElementById("bookSearch").value
  let flag = false

  if(searchValue == "" || books_data == "") {location.reload(); return}


  let booksRelated = []
  
  
  for(let i=0; i<books_data.length; i++){
    for(let j=0; j<4; j++){
      let temp = books_data[i][values[j]]
      if(convertToLower(searchValue) === convertToLower(temp)){
        booksRelated.push(books_data[i])
        flag = true
      }
    }
  }
  
  if(!flag) return
  
  table_body.innerHTML = ""
  
  let trTag,tdTag,tdButton
  for(let i=0; i<booksRelated.length; i++){
    trTag = document.createElement("tr")
    tdButton = document.createElement("button")
    tdButton.innerHTML = "Delete"
    tdButton.setAttribute("name",booksRelated[i].book_id)
    tdButton.setAttribute("onclick","buttonClick(this.name)")
    for(let j=0; j<values.length; j++){
      tdTag = document.createElement("td")
      let temp =  booksRelated[i][values[j]]
      tdTag.innerHTML = temp
      trTag.appendChild(tdTag)
    }
    tdTag = document.createElement("td")
    tdTag.appendChild(tdButton)
    trTag.appendChild(tdTag)
    table_body.appendChild(trTag)
  }

})


// Used For Displaying Books List in page
getDataFromDB();
displayData();