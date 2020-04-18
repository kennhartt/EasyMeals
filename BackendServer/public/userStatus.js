var status = false
// Get current status of the website
// Determine if website is being used by a user/guest
function getUserStatus () {
  if (localStorage.getItem('userInfo') != null) {
    status = true
    return status
  } else {
    status = false
    return status
  }
}

// remove "Logged In" status
function processLogOut () {
  localStorage.removeItem('userInfo')
}
