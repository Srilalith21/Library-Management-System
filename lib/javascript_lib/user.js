const searchBook = document.getElementById("searchBookInput")
const selectElement = document.getElementById("select-tag")
const booksDisplayDiv = document.getElementById("books-div")
const searchButton = document.getElementById("search-book")
const topBook = document.getElementById("top-book")
const topBookPrice = document.getElementById("price")

let books_data = [];
let generes_data = [];



//----------------------------------
// Testing for responsive website
// function checkWidth(){ 
//   if(window.innerWidth <= 1000 || screen.width <= 1000){
//     let a = document.getElementById("nav")
//     const val = a.querySelectorAll("p")
//     console.log(val[2]);
//   }
// }
// checkWidth()

function verification(innerValue){
  if(sessionStorage.getItem("user_ID") != null){
    if(innerValue =="MyPurchases") location.href = "./user_myPurchases.html"
    else {location.href = "./user_contact_form.html"}
  }else{
    alert("Login Required...!")
  }
}


function getBooksDataFromDB(){
  let temp = JSON.parse(localStorage.getItem("books"))
  if(temp != null){
    for(let i=0; i<temp.length; i++){
      books_data.push(temp[i])
    }
  }
}

//---------------------
// This part is for displaying the geners available in DB.
let tempGenereData = []
function getAllGenere(){
  for(let i=0; i<books_data.length; i++){
    tempGenereData.push(books_data[i].book_genere)
  }
  findUniqueGenere()
}
function findUniqueGenere(){
  // Finds and removes all the duplicats.
  tempGenereData.sort()
  for(let i=0; i<tempGenereData.length; i++){
    if(tempGenereData[i] != tempGenereData[i+1]) generes_data.push(tempGenereData[i])
  }
}
function displayGenere(){
  let i=0,selectOptionTag
  while(i < generes_data.length){
    selectOptionTag = document.createElement("option")
    selectOptionTag.innerHTML = generes_data[i]
    selectOptionTag.setAttribute("value","")
    selectElement.appendChild(selectOptionTag)
    i++
  }
}
//---------------------

function mergeGenereDataWithBook(genere){
  let mergedData = []
  let i = 0 
  if(genere == "All"){
    for(let i=0; i<books_data.length; i++){
      let temp = {
        "book_name" : books_data[i].book_name,
        "book_genere" : books_data[i].book_genere
      }
      mergedData.push({...temp})
    }
    return mergedData
  }
  while(i < books_data.length){
    if(books_data[i].book_genere == genere){
      let temp = {
        "book_name" : books_data[i].book_name,
        "book_genere" : books_data[i].book_genere
      }
      mergedData.push({...temp})
    }
    i++
  }
  return mergedData;
}

// This function displays the books according to the requirments
function displayAllBooks(genere_value){
  
  if(books_data.length == 0){
    let h2 = document.createElement("h2")
    h2.innerHTML = "Temproraily Out Of Stock"
    booksDisplayDiv.appendChild(h2)
    topBook.innerHTML = "Temproraily Out Of Stock"
    return
  }

  booksDisplayDiv.innerHTML = ""

  let cardDiv,upperDiv,lowerDiv,h4Tag,ptag,button
  if(genere_value == null){
    books_data.forEach(element => {
      cardDiv = document.createElement("div")
      upperDiv = document.createElement("div")
      h4Tag = document.createElement("h4")
      h4Tag.innerHTML = element.book_name
      upperDiv.appendChild(h4Tag)

      lowerDiv = document.createElement("div")
      ptag = document.createElement("p")
      ptag.innerHTML = "Author : " + element.book_author
      lowerDiv.appendChild(ptag)
      ptag = document.createElement("p")
      ptag.innerHTML = "Price : " + element.book_price
      lowerDiv.appendChild(ptag)
      button = document.createElement("button")
      button.setAttribute("name",element.book_id)
      button.setAttribute("onclick","callClick(this.name)")
      button.innerHTML = "Buy"
      lowerDiv.appendChild(button)      

      cardDiv.setAttribute("class","book-card")
      upperDiv.setAttribute("class","upper")
      lowerDiv.setAttribute("class","lower")
      cardDiv.appendChild(upperDiv)
      cardDiv.appendChild(lowerDiv)
      booksDisplayDiv.appendChild(cardDiv)
    })
  }else{
    booksDisplayDiv.innerHTML = ""
    let data = mergeGenereDataWithBook(selectElement.options[selectElement.selectedIndex].text)
    let cardDiv
    data.forEach(element => {
      cardDiv = document.createElement("div")
      upperDiv = document.createElement("div")
      h4Tag = document.createElement("h4")
      h4Tag.innerHTML = element.book_name
      upperDiv.appendChild(h4Tag)

      lowerDiv = document.createElement("div")
      ptag = document.createElement("p")
      ptag.innerHTML = "Author : " + element.book_author
      lowerDiv.appendChild(ptag)
      ptag = document.createElement("p")
      ptag.innerHTML = "Price : " + element.book_price
      lowerDiv.appendChild(ptag)
      button = document.createElement("button")
      button.setAttribute("name",element.book_id)
      button.setAttribute("onclick","callClick(this.name)")
      button.innerHTML = "Buy"
      lowerDiv.appendChild(button)      

      cardDiv.setAttribute("class","book-card")
      upperDiv.setAttribute("class","upper")
      lowerDiv.setAttribute("class","lower")
      cardDiv.appendChild(upperDiv)
      cardDiv.appendChild(lowerDiv)
      booksDisplayDiv.appendChild(cardDiv)
    })
  }
  
//___________________________________________________________________________________
// This small block of code displays top book Randomly...using Math.random function 
while(true){
  if(books_data.length == 1){
    topBook.innerHTML = books_data[0].book_name
    break
  }else{
    let mthvalue = Math.floor(Math.random()*10)
    if(mthvalue <= books_data.length && mthvalue > 1){
      topBook.innerHTML = books_data[mthvalue].book_name
      topBookPrice.innerHTML = "Price : " + books_data[mthvalue].book_price
      break
    }
  }
}
//__________________________________________________________________________________
}

//__________________________________________________________________________________
// Purchase process
//This part is used for storing the user's books purchases

let USERID = null
let allPurchaseData = []
let index = null
let data = {
  userID:null,
  booksPurchased:[]
}

function checkLoginStatus(){
  let temp = JSON.parse(sessionStorage.getItem("user_ID"))
  if(temp != null){
    USERID = temp
    data.userID = temp
    return true
  }else{
    alert("Login Required..!")
    return false
  }
}

function getPurchaseData(){
  let tempData = JSON.parse(localStorage.getItem("purchaseData"))
  if(!tempData){
    localStorage.setItem("purchaseData","[]")
  }else{
    for(let i=0; i<tempData.length; i++){
      if(tempData[i].userID == USERID){
        index = i
        data.booksPurchased = tempData[i].booksPurchased
      }
      allPurchaseData.push(tempData[i])
    }
  }
}
function callClick(bookId){
  if(checkLoginStatus()){
    getPurchaseData()
    if(index == null){
      // Assume that this user new to purchasing the books..!
      data.booksPurchased.push(bookId)
      allPurchaseData.push({...data})
    }else{
      data.booksPurchased[data.booksPurchased.length] = bookId
      allPurchaseData[index] = data
    }
  }
  postIntoDB()
}

function postIntoDB(){
  if(data.userID == null) return
  localStorage.setItem("purchaseData",JSON.stringify(allPurchaseData))
  alert("Purchase Successfull..!")
  location.reload()
}

//____________________________________________________________________________________

selectElement.addEventListener("change",() => {
  displayAllBooks(selectElement.options[selectElement.selectedIndex].text,null);
})

searchButton.onclick = () =>{
  if(searchBook.value == ""){
    location.reload()
    return
  }
  let convertToLower = (val) => val.toLowerCase()
  let cardDiv,upperDiv,lowerDiv,h4Tag,ptag,button
  let i = 0,j=books_data.length-1
  while(i <= j){
    if(
      convertToLower(books_data[i].book_name) == convertToLower(searchBook.value)||
      convertToLower(books_data[j].book_name) == convertToLower(searchBook.value)
    ){
      let val = (convertToLower(books_data[i].book_name) == convertToLower(searchBook.value) ? i:j)
      booksDisplayDiv.innerHTML = ""
      cardDiv = document.createElement("div")
      upperDiv = document.createElement("div")
      h4Tag = document.createElement("h4")
      h4Tag.innerHTML = books_data[val].book_name
      upperDiv.appendChild(h4Tag)

      lowerDiv = document.createElement("div")
      ptag = document.createElement("p")
      ptag.innerHTML = "Author : " + books_data[val].book_author
      lowerDiv.appendChild(ptag)
      ptag = document.createElement("p")
      ptag.innerHTML = "Price : " + books_data[val].book_price
      lowerDiv.appendChild(ptag)
      button = document.createElement("button")
      button.setAttribute("name",books_data[val].book_id)
      button.setAttribute("onclick","callClick(this.name)")
      button.innerHTML = "Buy"
      lowerDiv.appendChild(button)      

      cardDiv.setAttribute("class","book-card")
      upperDiv.setAttribute("class","upper")
      lowerDiv.setAttribute("class","lower")
      cardDiv.appendChild(upperDiv)
      cardDiv.appendChild(lowerDiv)
      booksDisplayDiv.appendChild(cardDiv)
      break
    }
    i++,j--
  }
}

document.getElementById("logout").addEventListener("click",() => {
  sessionStorage.removeItem("user_ID")
  location.href = "./user_login.html"
})


getBooksDataFromDB()
getAllGenere()
displayGenere()
displayAllBooks(null,null)