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
  newDescription.setAttribute("placeholder", descriptionToEdit.textContent)
  newDescription.id = `${targetPoi}-description`
  descriptionToEdit.replaceWith(newDescription)

  const costToEdit= document.getElementById(`${targetPoi}-cost`)
  const newCost= document.createElement("input")
  newCost.setAttribute("placeholder", costToEdit.textContent)
  newCost.id = `${targetPoi}-cost`
  costToEdit.replaceWith(newCost)

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
  console.log("yeh")

  ternaryData.connectToData({
    "putId" : 2,
    "dataSet" : "events",
    "fetchType" : "PUT",
    "dataBaseObject" : {
      "id" : 2,
      "userId": 1,
      "eventName": "another toga party",
      "eventDate": "2-15",
      "eventTime": "3:00pm",
      "eventLocation": "Vegas"
    }
  })
}

}
export default eventListeners