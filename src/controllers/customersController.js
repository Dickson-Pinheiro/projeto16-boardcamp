const customers = []

export const customersController = {
    createCustomer(req, res){
        const {name, phone, cpf, birthday} = req.body
        const customer = {}
        Object.assign(customer, {name, phone, cpf, birthday})
        customers.push(consumer)
        /* insert into customers (name, phine, cpf, birthday) values (?, ?, ?, ?); */
        return res.status(201).send({message: "created"})
    },

    updateCustomer(req, res){
        const {name, phone, cpf, birthday} = req.body
        const {id} = req.params

        const customer = customers.find(cust => cust.id === id)

        if(!customer){
            return res.status(404).send({message: "user not found"})
        }
        /*update consumers set name=?, phone=?, cpf=?, birthday=? where id=?; */        
        Object.assign(customer, {name, phone, cpf, birthday})
        res.status(200).send()
    },

    getCustomerById(req, res){
        const {id} = req.params
        /*select * from consumers where id=?; */
        const customer = customers.find(customer => customer.id === id)
        if(!customer){
            res.status(404).send({message: "user not found"})
        }
        res.send(customer)
    },

    getCustomers(req, res){
        /*select * from customers*/
        res.send(customers)
    }

}