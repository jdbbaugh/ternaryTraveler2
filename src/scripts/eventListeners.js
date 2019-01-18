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
  console.log(targetPoi)
  const descriptionToEdit = document.getElementById(`${targetPoi}-description`)
  const newDescription=document.createElement("input")
  newDescription.setAttribute("placeholder", descriptionToEdit.textContent)
  descriptionToEdit.replaceWith(newDescription)

  const costToEdit= document.getElementById(`${targetPoi}-cost`)
  const newCost= document.createElement("input")
  newCost.setAttribute("placeholder", costToEdit.textContent)
  costToEdit.replaceWith(newCost)

}

}
export default eventListeners