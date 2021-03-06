import ternary from "./ternary";
import ternaryData from "./ternaryData";

const eventListeners = {
saveForm () {
  console.log("saving")
  const optionContainerCityValue = document.getElementById("option-container");
  const cityIdToEditJson = optionContainerCityValue.value.split("-")[1]
  const poiToEdit = document.getElementById("location-name-input")
  const descriptionToEdit = document.getElementById("location-desription-input")
  const costToEdit = document.getElementById("location-cost-input")

  const objectForJson = {
    placeId: parseInt(cityIdToEditJson),
    name: poiToEdit.value,
    description: descriptionToEdit.value,
    cost: parseInt(costToEdit.value),
    review: "",
    reviewcheck: false
  }
  ternaryData.connectToData({
    "dataSet" : "interests",
    "fetchType" : "POST",
    "dataBaseObject" : objectForJson
  })
},
listenerForEdit () {
  const targetPoi = event.target.innerText.split("-")[1]
  console.log(event)
  console.log(targetPoi)
// ================================================================================
// GET NAME FROM ELEMENT FOR ID TO PASS THROUGH
// ================================================================================
  const descriptionToEdit = document.getElementById(`${targetPoi}-description`)
  const newDescription=document.createElement("input")
  newDescription.value = descriptionToEdit.textContent
  newDescription.id = `${targetPoi}-description`
  descriptionToEdit.replaceWith(newDescription)

  const costToEdit= document.getElementById(`${targetPoi}-cost`)
  const newCost= document.createElement("input")
  newCost.value = costToEdit.textContent
  newCost.id = `${targetPoi}-cost`
  costToEdit.replaceWith(newCost)

  let goodByeSearchResults = document.getElementById(`${targetPoi}-delete-button`);
  goodByeSearchResults.parentNode.removeChild(goodByeSearchResults);

  const EditButtonToSave= document.getElementById(`${targetPoi}-edit-button`)
  const newButton= document.createElement("button")
  newButton.setAttribute("type", "button")
  newButton.id = `save-${targetPoi.split(" ")[0]}`
  newButton.textContent = "Save"
  EditButtonToSave.replaceWith(newButton)

  const saveTheEdits = document.getElementById(`save-${targetPoi.split(" ")[0]}`);
  saveTheEdits.addEventListener("click", this.saveEditFunction)
},
saveEditFunction () {
  const neededCalls =event.target.parentElement.id.split("-")[0]
  const neededNumbers = event.target.parentNode.firstChild.attributes.name.value.split("-")
  // console.log(neededNumbers);
const targetLocation = document.getElementById(`${neededCalls}-poi`)
const targetDescription = document.getElementById(`${neededCalls}-description`)
const targetCost = document.getElementById(`${neededCalls}-cost`)
const finalCost = targetCost.value[0] === "$" ? targetCost.value.slice(1) : targetCost.value
 const packageToSend = {
   "placeId": parseInt(neededNumbers[1]),
  "name": neededCalls,
  "description": targetDescription.value,
  "cost": parseInt(finalCost),
  "review": "",
  "reviewcheck": true,
}

  ternaryData.connectToData({
    "putId" : neededNumbers[0],
    "dataSet" : "interests",
    "fetchType" : "PUT",
    "dataBaseObject" : packageToSend
  })
  .then( () => {
    $("#output").empty()
    ternary.buildForm()
  })
},
deleteThePoi () {
  if (confirm("Do you want to delete")) {
    const neededNumbers = event.target.parentNode.firstChild.attributes.name.value.split("-")
    console.log("o")

    ternaryData.connectToData({
      "deleteId" : neededNumbers[0],
      "dataSet" : "interests",
      "fetchType" : "DELETE",
      "dataBaseObject" : {
        "userId": sessionStorage.getItem("userId")
      }
    })
    .then(() => {
      $("#output").empty()
      ternary.buildForm()
    })
  }
}

}
export default eventListeners