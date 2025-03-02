const totalbooks = document.getElementById("total-books")
const totalgenere= document.getElementById("total-genere")
const totalauthors = document.getElementById("total-authors")
const totalrequests = document.getElementById("total-requests")
const tbody = document.getElementById("table-body")

//_________________________________________________
let adminMessages = []
let totAuthors = 0,totGeneres=0,totRequest=0,totBooks=0

function deleteAllUserData(){
  if(confirm("Are you sure")){
    localStorage.removeItem("userData")
    localStorage.removeItem("purchaseData")
  }
}

function computeAllTheData(){
  let data = JSON.parse(localStorage.getItem("books"))
  if(data != null){
    data.sort()
    findTotal = () => {
      let author = [],genere = []
      for (let i = 0; i < data.length; i++) {
        author.push(data[i].book_author)
        genere.push(data[i].book_genere)
      }
      let total = []
      total.push(author)
      total.push(genere)
      return total
    }
    return findTotal()
  }
  return []
}
function setTotalData(){
  let dataOfTotal = computeAllTheData()
  if(dataOfTotal != ""){
    let t = [...new Set(dataOfTotal[0])]
    totBooks = dataOfTotal[0].length
    totAuthors = t.length
    t = [...new Set(dataOfTotal[1])]
    totGeneres = t.length
  }
}
function displayTotalData(){
  setTotalData()
  totalbooks.innerHTML = "Books : " + totBooks
  totalauthors.innerHTML = "Authors : " + totAuthors
  totalgenere.innerHTML = "Generes : " + totGeneres
  totalrequests.innerHTML = "Requests : " + messagesData.length
}
//__________________________________________________

//-----------------------------------------------------------------
// This part belongs to the messages/Requests section
let messagesData = []

function getAdminMessages(){
  let tempData = JSON.parse(localStorage.getItem("adminMessage"))
  if(tempData != null){
    for(let i=0; i<tempData.length; i++){
      messagesData.push(tempData[i])
    }
    return true
  }
  return false
}
function displayAdminMessages(){
  if(getAdminMessages()){
    const arr = ["user_id","msg"]
    const btArr = ["Reject","Reply"]
    let trTag,tdTag,buttonTag
    messagesData.forEach(element => {
      trTag = document.createElement("tr")
      for(let i=0; i<arr.length+1; i++){
        if(i == 2){
          tdTag = document.createElement("td")
          btArr.forEach(array => {
            buttonTag = document.createElement("button")
            buttonTag.innerHTML = array
            buttonTag.setAttribute("name",element[arr[0]])
            buttonTag.setAttribute("onclick","adminActionTrigger(this.name,this.innerHTML)")
            tdTag.appendChild(buttonTag)
            trTag.appendChild(tdTag)
          })
        }else{
          tdTag = document.createElement("td")
          tdTag.innerHTML = element[arr[i]]
          trTag.appendChild(tdTag)
        }
      }
      tbody.appendChild(trTag)
    });
  }
}
//-----------------------------------------------------------------

function deleteIndex(index){
  if((index == 0 && messagesData.length == 1) || index == messagesData.length-1) {messagesData.pop()}
  else{
    for(let i=index; i<messagesData.length-1; i++){
      messagesData[i] = messagesData[i+1]
    }
    messagesData.pop();
  }
  localStorage.setItem("adminMessage",JSON.stringify(messagesData))
  location.reload()
}

let adminReplyMessage = []

function getReplyMessages(){
  let temp = localStorage.getItem("adminReplyMessages")
  if(temp != null){
    for(let i=0; i<temp.length; i++){
      adminReplyMessage.push(temp[i])
    }
  }
}

function adminActionTrigger(uid,butonInnerHtml){
  const index = messagesData.findIndex(item => item.user_id === uid)
  if(butonInnerHtml === "Reject"){
    deleteIndex(index)
  }else{
    const replyMessage = prompt("Enter your message : ")
    if(replyMessage != ""){
      let locData  = {
        user_id: uid,
        replyMessage: replyMessage 
      }
      if(locData.replyMessage == null) return
      adminReplyMessage.push(locData)
      localStorage.setItem("adminReplyMessages",JSON.stringify(adminReplyMessage))
      deleteIndex(index)
    }
  }
}


displayAdminMessages()
displayTotalData()
