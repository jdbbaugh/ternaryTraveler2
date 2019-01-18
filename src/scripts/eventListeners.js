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


}

}
export default eventListeners