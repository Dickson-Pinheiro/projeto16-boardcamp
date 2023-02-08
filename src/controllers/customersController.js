import { db } from "../database/database"

export const customersController = {
    async createCustomer(req, res){
        const {name, phone, cpf, birthday} = req.body
        const customer = {}
        Object.assign(customer, {name, phone, cpf, birthday})
        customers.push(consumer)
        
        try {
            const query = "insert into customers (name, phone, cpf, birthday) values ($1, $2, $3, $4);" 
            await db.query(query, [name, phone, cpf, birthday])
            return res.status(201).send({message: "created"})
        } catch (error) {
            console.log(error)
            return res.status(500).send()
        }
    },

    async updateCustomer(req, res){
        const {name, phone, cpf, birthday} = req.body
        const {id} = req.params

        try {
            const query = "select * from customers where id=$1;"
            const customer = await db.query(query, [id])

            if(!customer.rows[0]){
                return res.status(404).send({message: "user not found"})
            }

            const queryUpdate = "update consumers set name=$1, phone=$2, cpf=$3, birthday=$4 where id=$5;"
            await db.query(queryUpdate, [name, phone, cpf, birthday, id])
            return res.status(200).send()
        } catch (error) {
            console.log(error)
            return res.status(500).send()
        }      
    },

    async getCustomerById(req, res){
        const {id} = req.params

        try {
            const query = "select * from consumers where id=$1;"
        const customer = await db.query(query, [id])
        if(!customer.rows[0]){
           return res.status(404).send({message: "user not found"})
        }
        return res.send(customer)
        } catch (error) {
            console.log(error)
            return res.status(500).send()
        }
    },

    async getCustomers(req, res){
        try {
            const query = "select * from customers;"
            const customers = await db.query(query)
            return res.send(customers.rows)
        } catch (error) {
            console.log(error)
            return res.status(500).send()
        }
        
    }

}