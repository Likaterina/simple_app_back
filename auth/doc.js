let some = [{id: 1, phone: '(123) 456 789'}, {id: 2, phone: '(123) 456 789'}, {id: 3, phone: '(123) 456 789'}]

const new1 = some.map(user => user.phone.trim().split('').splice(1))

new1.map(el => {
    el.splice(3, 2, "-")
    el.splice(7, 1, "-")})

console.log(new1)

