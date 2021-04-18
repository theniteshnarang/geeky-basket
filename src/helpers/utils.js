const getTotalQty = (items) =>  items.reduce((acc, val) => acc + val.qty, 0)

const getTotalPrice = (items) => items.reduce((acc,val)=> acc + (val.price - val.discount[0])*val.qty, 0)

export {getTotalQty, getTotalPrice}