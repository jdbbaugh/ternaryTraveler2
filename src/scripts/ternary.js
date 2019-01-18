import ternaryData from "./ternaryData";
import domComponents from "./domComponents";

const ternary = {

buildForm () {
  const targetContainer = document.getElementById("output");
  targetContainer.appendChild(domComponents.createDomElement({
    elementType: "form",
    attributes: {
      id: "form-container",
      class: "form-container"
    }
  }))

const inputBuilder = ["name", "desription", "cost"]

inputBuilder.forEach(inputToBe => {
  document.getElementById("form-container").appendChild(domComponents.createDomElement({
    elementType: "input",
    attributes: {
      id: `location-${inputToBe}-input`,
      placeholder: inputToBe
    }
  }))
})
document.getElementById("form-container").appendChild(domComponents.createDomElement({
  elementType: "select",
  attributes: {
    id: "option-container"
  }
}))

  ternaryData.connectToData({
    "dataSet" : "places",
    "fetchType" : "GET",
    "dataBaseObject" : "",
    "embedItem" : "?_embed=places"
  })
  .then(places =>{
    places.forEach(place => {
      document.getElementById("option-container").appendChild(domComponents.createDomElement({
        elementType: "option",
        content: place.name,
        attributes: {
          id: `city-${place.id}`
        }
      }))
    })
    document.getElementById("form-container").appendChild(domComponents.createDomElement({
      elementType: "button",
      content: "Save",
      attributes: {
        id: "save-form-button",
      }
    }))
  })
  this.buildLocationDisplay()
},
buildLocationDisplay () {
  const targetContainer = document.getElementById("output");
  targetContainer.appendChild(domComponents.createDomElement({
    elementType: "section",
    attributes: {
      id: "location-container"
    }
  }))
  const locationContainer = document.getElementById("location-container")
  ternaryData.connectToData({
    "dataSet" : "places",
    "fetchType" : "GET",
    "dataBaseObject" : "",
    "embedItem" : "?_embed=places"
  })
  .then(places => {
    places.forEach(place => {
      document.getElementById("location-container").appendChild(domComponents.createDomElement({
        elementType: "div",
        attributes: {
          class: "location-card",
          id: `${place.name}-card`
        }
      }))
      document.getElementById(`${place.name}-card`).appendChild(domComponents.createDomElement({
        elementType: "h2",
        content: place.name,
      }))
      ternaryData.connectToData({
        "dataSet" : "interests",
        "fetchType" : "GET",
        "dataBaseObject" : "",
        "embedItem" : "?_embed=interests"
      })
      .then(interests => {
        interests.forEach(interest => {
          if (interest.placeId === place.id) {
            document.getElementById(`${place.name}-card`).appendChild(domComponents.createDomElement({
              elementType: "p",
              content: interest.name,
              attributes: {
                id: `${place.name}-poi`
              }
            }))
            document.getElementById(`${place.name}-card`).appendChild(domComponents.createDomElement({
              elementType: "p",
              content: interest.description,
              attributes: {
                id: `${place.name}-description`
              }
            }))
            document.getElementById(`${place.name}-card`).appendChild(domComponents.createDomElement({
              elementType: "p",
              content: `$${interest.cost.toFixed(2)}`,
              attributes: {
                id: `${place.name}-cost`
              }
            }))
          }
        })
      })
    })
  })

}

}

export default ternary