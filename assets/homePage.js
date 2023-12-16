const btnCalcualte = document.getElementById('calc-age')
const inputDate= document.getElementById('date-input')
const yearOutput= document.getElementById("your-age")
const monthsOutput= document.getElementById("your-month")
const dayOutput= document.getElementById("your-Day")
const errorText=document.getElementById("error-text")
const closeButton = document.getElementById("close-button")
const notificationOutput=document.getElementById("notification")

closeButton.addEventListener('click',function(){
  hideNotification()
  resetAge()
})

btnCalcualte.addEventListener('click',function(){
  // Parse the birthdate string to a Date object
   const birthDate = new Date(inputDate.value);
  // Get the current date
   const currentDate = new Date();

  if(inputDate.value === ''){
    changeClassToError()
    showNotification('Please choose the Date!!')
    
  }else{
    hideNotification()
   
   switch (true) {
    case currentDate.getFullYear() < birthDate.getFullYear():
      changeClassToError()
      resetAge()
      showNotification("Check your year, please.")
      break;
    case currentDate.getFullYear() === birthDate.getFullYear() && currentDate.getMonth() < birthDate.getMonth():
      changeClassToError()
      resetAge()
      showNotification("Check your month, please.")

      break;
    case currentDate.getFullYear() === birthDate.getFullYear() && currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate():
      changeClassToError()
      resetAge()
      showNotification("Check your day, please.")
    

      break;

    case currentDate.getFullYear() > birthDate.getFullYear() && currentDate.getMonth() === birthDate.getMonth() &&  currentDate.getDate() < birthDate.getDate():
      changeClassToApprove()
      
      showNotification("Still you have "+Math.abs(calculateAge(currentDate, birthDate).ageDays)+" to complete your "+calculateAge(currentDate, birthDate).ageYears+" year")
      
      
  
      break;
    default:
      const ageDetails = calculateAge(currentDate, birthDate);
      
      displayAge(ageDetails)
      console.log(":)")
      break;
   

  }
}

  
})
function changeClassToApprove(){
    // Remove the original class
    notificationOutput.classList.remove('error-container');

    // Add the new class
    notificationOutput.classList.add('approve');
}
function changeClassToError(){
    // Remove the original class
    notificationOutput.classList.remove('approve');

    // Add the new class
    notificationOutput.classList.add('error-container');
}

function calculateAge(currentDate, birthDate) {
  const ageYears = currentDate.getFullYear() - birthDate.getFullYear();
  const ageMonths = currentDate.getMonth() - birthDate.getMonth();
  const ageDays = currentDate.getDate() - birthDate.getDate();

  return { ageYears, ageMonths, ageDays };
}
function displayAge(ageDetails) {
  yearOutput.innerHTML = ageDetails.ageYears;
  monthsOutput.innerHTML = ageDetails.ageMonths;
  dayOutput.innerHTML = ageDetails.ageDays;
}
function resetAge(){
  
  yearOutput.innerHTML = '--'
  monthsOutput.innerHTML = '--'
  dayOutput.innerHTML = '--'
}

function showNotification(message) {
  notificationOutput.style.display = 'block';
  errorText.innerHTML = message;
}

function hideNotification() {
  notificationOutput.style.display = 'none';
  errorText.innerHTML = '';
}
