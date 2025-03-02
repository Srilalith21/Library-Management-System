const page = document.getElementById("absPage")
const content = document.getElementById("main-content") 

const booksData = []
let purchaseData = {
  userID: null,
  booksPurchased: null
}

getBooksData()
getPurchaseData()

function getBooksData(){
  let temp = JSON.parse(localStorage.getItem("books"))
  if(temp != null){
    for(let i=0; i<temp.length; i++){
      booksData.push(temp[i])
    }
  }
}

function findUser(id,arr){  
  arr.forEach(element => {
    if(element.userID == id){
      purchaseData= element
      return
    }
  });
}

function getPurchaseData(){
  let tempData = JSON.parse(localStorage.getItem("purchaseData"))
  if(tempData == null) return false
  findUser(JSON.parse(sessionStorage.getItem("user_ID")),tempData)
  return true
}
getPurchaseData()

let val = null
function findBooks(){
  let returnValue = []
  let count = 0
  if(booksData != "" && purchaseData.booksPurchased != null){
    booksData.sort()
    val = Array.from(new Set(purchaseData.booksPurchased.sort()))
    for(let i=0; i<booksData.length; i++){
      if(booksData[i].book_id == val[count]){
        returnValue.push(booksData[i])
        count++
      }
    }
  }
  return returnValue
}

function displayBooksData(){
  if(purchaseData != ""){
    let data = findBooks()
    let contentDiv,leftContentDiv,rightContentDiv,h2Tag,pTag
    for(let i=0; i<data.length; i++){
      pTag = document.createElement("p")
      pTag.innerHTML = "View"
      pTag.setAttribute("name",val[i])
      pTag.setAttribute("onclick","viewClick(this.getAttribute('name'))")
      h2Tag = document.createElement("h2")
      h2Tag.innerHTML =  data[i].book_name
      contentDiv = document.createElement("div")
      contentDiv.setAttribute("class","content")
      leftContentDiv = document.createElement("div")
      leftContentDiv.appendChild(h2Tag)
      leftContentDiv.setAttribute("class","leftcontent")
      rightContentDiv = document.createElement("div")
      rightContentDiv.setAttribute("class","rightcontent")
      rightContentDiv.appendChild(pTag)
      contentDiv.appendChild(leftContentDiv)
      contentDiv.appendChild(rightContentDiv)
      content.appendChild(contentDiv)
    }
  }
}

displayBooksData()

function findBooksById(id){
  const ids = ["id","name","author","genere","price","publishyear"]
  const values = ["book_id","book_name","book_author","book_genere","book_price","book_publish_year"]
  booksData.forEach(element => {
    if(element.book_id == id){
      for(let i=0; i<ids.length; i++){
        document.getElementById(ids[i]).innerHTML = ids[i] + " : " + element[values[i]]
      }
      return
    }
  });
}

let boolData = true
function viewClick(value){
  if(boolData){
    page.style.zIndex = "99"
    boolData = false
    findBooksById(value)
  }else{
    page.style.zIndex = "-99"
    boolData = true
  }
}
