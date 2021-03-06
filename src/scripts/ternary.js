import ternaryData from "./ternaryData";
import domComponents from "./domComponents";
import eventListeners from "./eventListeners";

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
    elementType: "label",
    content: ` ${inputToBe}: `,
    attributes: {
      id: `location-${inputToBe}-label`
    }
  }))
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
        content: `${place.name}-${place.id}`,
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
    const saveButton = document.getElementById("save-form-button");
    saveButton.addEventListener("click", () => {
      eventListeners.saveForm();
    })
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
        cssClass: "the-city",
        content: place.name.toUpperCase(),
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
              elementType: "div",
              attributes: {
                id: `${interest.name}-card`
              }
            }))
            document.getElementById(`${interest.name}-card`).appendChild(domComponents.createDomElement({
              elementType: "h3",
              content: interest.name,
              attributes: {
                id: `${interest.name}-poi`,
                class: interest.id,
                name: `${interest.id}-${place.id}`
              }
            }))
            document.getElementById(`${interest.name}-card`).appendChild(domComponents.createDomElement({
              elementType: "p",
              content: interest.description,
              attributes: {
                id: `${interest.name}-description`,
                name: interest.id
              }
            }))
            if (interest.cost === null) {
            document.getElementById(`${interest.name}-card`).appendChild(domComponents.createDomElement({
              elementType: "p",
              content: 0,
              attributes: {
                id: `${interest.name}-cost`
              }
            }))
          } else {
            document.getElementById(`${interest.name}-card`).appendChild(domComponents.createDomElement({
              elementType: "p",
              content: `$${interest.cost.toFixed(2)}`,
              attributes: {
                id: `${interest.name}-cost`
              }
            }))
          }
          if (interest.reviewcheck){
          document.getElementById(`${interest.name}-card`).appendChild(domComponents.createDomElement({
            elementType: "p",
            content: `Review: ${interest.review}`,
            attributes: {
              id: `${interest.name}-given-review`
            }
          }))
          }
            document.getElementById(`${interest.name}-card`).appendChild(domComponents.createDomElement({
              elementType: "button",
              content: `Edit-${interest.name}`,
              attributes: {
                id: `${interest.name}-edit-button`
              }
            }))
            document.getElementById(`${interest.name}-card`).appendChild(domComponents.createDomElement({
              elementType: "button",
              content: `DELETE-${interest.name}`,
              attributes: {
                id: `${interest.name}-delete-button`
              }
            }))
            interest.reviewcheck ?
            document.getElementById(`${interest.name}-card`).appendChild(domComponents.createDomElement({
              elementType: "button",
              content: "Edit Review",
              attributes: {
                id: `${interest.name}-review-button`
              }
            }))
            :
            document.getElementById(`${interest.name}-card`).appendChild(domComponents.createDomElement({
              elementType: "button",
              content: `Review-${interest.name}?`,
              attributes: {
                id: `${interest.name}-add-review-button`
              }
            }))
            document.getElementById(`${interest.name}-card`).appendChild(domComponents.createDomElement({
              elementType: "hr",
            }))
            const listenerForEdit = document.getElementById(`${interest.name}-edit-button`)
            listenerForEdit.addEventListener("click", () => {
              eventListeners.listenerForEdit()
            })
            const listenerForDelete = document.getElementById(`${interest.name}-delete-button`)

            listenerForDelete.addEventListener("click", () => {
              eventListeners.deleteThePoi()
            })
          }
        })
      })
    })
  })

}

}

export default ternary