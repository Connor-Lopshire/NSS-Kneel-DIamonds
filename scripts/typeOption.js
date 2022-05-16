import { getTypes, setType } from "./database.js";
const types = getTypes()

export const typeOptions = () => {
    let html = "<ul>"

    // Use .map() for converting objects to <li> elements
    const listItemsArray = types.map(
        (type) => {
            return `<li>
            <input type="radio" name="type" value="${type.id}" /> ${type.type}
        </li>`
    })
    
        
        
        // Join all of the strings in the array into a single string
    html += listItemsArray.join("")

    html += "</ul>"
    return html
}
document.addEventListener(
    "change",
    (event) => {
        if (event.target.name === "type") {
            setType(parseInt(event.target.value))
        
        }
    }
)