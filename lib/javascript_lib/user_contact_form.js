const tableTag = document.getElementById("adminMessage")
const tableData = document.getElementById("adminMessageBody")
const userMessage = document.getElementById("userMessage")
const submiMessageButton = document.getElementById("submitMessageToAdmin")

let userId
let msgData = []

// Get message from DB
function geetMsgData(){
  let temp = JSON.parse(localStorage.getItem("adminMessage"))
  let temp1 = sessionStorage.getItem("user_ID")
  if(temp != null && temp1 != null){
    userId = temp1
    let i=0
    while(i < temp.length){
      msgData.push(temp[i])
      i++
    }
  }
}

// This function is to check weather the user has sent any message to the admin
function checkSentStatus(user__id){
  geetMsgData()
  msgData.sort()
  let low = 0,high = msgData.length,mid
  for(let i=0; i<msgData.length/2; i++){
    mid = Math.round(high/2)
    if(msgData[i].user_id == user__id) return true
    else if(msgData[mid] > user__id) high = mid
    else if(msgData[mid] < user__id) low = mid
  }
  return false
}
// Message to admin area/part
submiMessageButton.onclick = () => {
  let message = userMessage.value 
  let userid = JSON.parse(sessionStorage.getItem("user_ID"))
  if(message != "" && userid != null){
    let data = {
      "user_id" : userid,
      "msg" :message
    }
    if(checkSentStatus(userid)) {
      alert("cannot send multiple messsages of same account") 
      return
    }
    msgData.push({...data})
    localStorage.setItem("adminMessage",JSON.stringify(msgData))
    alert("Submitted Successfully")
  }
  else{
    if(message != null) {alert("Unable to send empty messages")}
    else if(userid != null) {alert("Login Reqiuired")}
  }
}

// This part is used to fetch the message data from the database and display if its replyed from the admin
let adminReplyMessage = []
let index
function getReplyMessages(){
  let temp = JSON.parse(localStorage.getItem("adminReplyMessages"))
  let temp1 = JSON.parse(sessionStorage.getItem("user_ID"))
  if(temp != null && sessionStorage.getItem("user_ID") != null){
    for(let i=0; i<temp.length; i++){
      if(temp[i].user_id == temp1) {
        adminReplyMessage.push(temp[i]); 
        index = i
        return true
      }
    }
  }
  return false
}

function displayMessages(){
  if(!getReplyMessages()) return

  let trTag,tdTag,buttonTag
  trTag = document.createElement("tr")
  for(let i=1; i<=2; i++){
    if(i == 1){
      tdTag = document.createElement("td")
      tdTag.innerHTML = adminReplyMessage[0].replyMessage
      trTag.appendChild(tdTag)
    }else{
      tdTag = document.createElement("td")
      buttonTag = document.createElement("button")
      buttonTag.setAttribute("onclick","deleteReplyMessages()")
      buttonTag.innerHTML = "Delete"
      tdTag.appendChild(buttonTag)
      trTag.appendChild(tdTag)
    }
  }
  tableData.appendChild(trTag)
}

function deleteReplyMessages(){
  let temp = JSON.parse(localStorage.getItem("adminReplyMessages"))
  if(index == 0 && temp.length == 1){
    temp.pop()
  }else{
    for(let i=index; i<temp.length-1; i++){
      temp[i] = temp[i+1]
    }
    temp.pop()
  }
  localStorage.setItem("adminReplyMessages",JSON.stringify(temp))
  location.reload()
}

displayMessages()
