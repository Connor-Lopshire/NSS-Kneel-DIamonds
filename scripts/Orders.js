import { getCustomOrders, addCustomOrder, getMetals, getStyles, getSizes, getTypes } from "./database.js"
const totalPrice = (order) => {
    const metals = getMetals()
    const styles = getStyles()
    const sizes = getSizes()
    const types = getTypes()
    let totalCost = 0;
    const chosenMetal = metals.find((metal) => {
        if (metal.id === order.metalId) {
            totalCost += metal.price
        }
    }
    )

    const chosenStyle = styles.find((style) => {
        if (style.id === order.syleId) {
            totalCost += style.price
        }
    }
    )
    const chosenSize = sizes.find((size) => {
        if (size.id === order.sizeId) {
            totalCost += size.price
        }
    }
    )
    const chosenType = types.find((type) => {
        if (type.id === order.typeId) {
            totalCost = totalCost * type.priceFactor
        }
    }
    )
    return totalCost
}




const buildOrderListItem = (order, costString) => {

    return `<li>
            Order #${order.id} cost ${costString}
            </li>`
}
export const Orders = () => {
    /*
    Can you explain why the state variable has to be inside
    the component function for Orders, but not the others?
    */
    const orders = getCustomOrders()
    const listItems = orders.map((order) => {
        let newOrder = totalPrice(order)
        const costString = newOrder.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
        })
        return buildOrderListItem(order, costString)
    })
    let html = "<ul>"
    html += listItems.join("")
    html += "</ul>"

    return html
}

document.addEventListener(
    "click",
    (clickEvent) => {
        const itemClicked = clickEvent.target
        if (itemClicked.id === "orderButton") {
            addCustomOrder()

        }
    }
)