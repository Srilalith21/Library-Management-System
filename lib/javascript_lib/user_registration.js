const convertToLower = (requiredData) => requiredData.toLowerCase();
const submitButton = document.getElementById("submit");
const values = ["username", "email", "password", "mobilenumber", "DOB"];

let user_ID = 5454;
let userdata = []; // This is the user data fetched from the database

const checkDuplicates = (user_email, index) =>
  convertToLower(userdata[index].email) == user_email;

gerDataFromDB();

function gerDataFromDB() {
  const data = JSON.parse(localStorage.getItem("userData"));
  const usrIDdata = localStorage.getItem("userID_count");
  if (data != null && usrIDdata != null) {
    user_ID = parseInt(usrIDdata);
    let i = 0;
    while (i < data.length) {
      userdata.push(data[i]);
      i++;
    }
  }
}
const checkData = () => {
  let i = 0,
    j;
  while (i < userdata.length) {
    if (
      checkDuplicates(
        convertToLower(document.getElementById(values[1]).value),
        i
      )
    ) {
      alert("Email Already exist");
      return false;
    }

    for (j = 0; j < values.length; j++) {
      if (
        document.getElementById(values[j]).value == "" ||
        (i == 3 && isNaN(parseInt(document.getElementById(values[i]).value)))
      )
        return false;
    }
    i++;
  }
  return true;
};

submitButton.addEventListener("click", () => {
  if (checkData()) {
    let localdata = {
      userID: "#usr_" + ++user_ID,
      username: document.getElementById(values[0]).value,
      email: document.getElementById(values[1]).value,
      password: document.getElementById(values[2]).value,
      mobilenumber: document.getElementById(values[3]).value,
      DOB: document.getElementById(values[4]).value,
    };
    userdata.push({ ...localdata });
    localStorage.setItem("userData", JSON.stringify(userdata));
    localStorage.setItem("userID_count", JSON.stringify(user_ID));
    alert("Registered Successfully");
    location.href = "./user_login.html";
  }
});
