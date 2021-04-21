const getTotalQty = (items) =>  items.reduce((acc, val) => acc + val.qty, 0)

const getTotalPrice = (items) => items.reduce((acc,val)=> acc + (val.price.mrp)*val.qty, 0)

export {getTotalQty, getTotalPrice}