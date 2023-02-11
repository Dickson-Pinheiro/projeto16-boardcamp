import { db } from "../database/database.js"
import dayjs from "dayjs"

export const customersController = {
    async createCustomer(req, res){
        const {name, phone, cpf, birthday} = req.body
        
        const dateBirthday = dayjs(new Date(birthday)).format("YYYY-MM-DD");
    
        try {
            const queryVerifyCpf = 'select * from customers where cpf=$1;'

            const customer = await db.query(queryVerifyCpf, [cpf])

            if(customer.rows[0]){
                return res.status(409).send()
            }

            const query = "insert into customers (name, phone, cpf, birthday) values ($1, $2, $3, $4);" 
            await db.query(query, [name, phone, cpf, dateBirthday])
            return res.status(201).send()
        } catch (error) {
            console.log(error)
            return res.status(500).send()
        }
    },

    async updateCustomer(req, res){
        const {name, phone, cpf, birthday} = req.body
        const {id} = req.params

        const dateBirthday = dayjs(new Date(birthday)).format("YYYY-MM-DD");

        try {



            const query = "select * from customers where id=$1;"
            const customer = await db.query(query, [id])

            if(!customer.rows[0]){
                return res.status(404).send({message: "user not found"})
            }

            if(!(cpf === customer.rows[0].cpf)){

                const queryVerifyCpf = 'select * from customers where cpf=$1;'
                const customerCpf = await db.query(queryVerifyCpf, [cpf])
                if(customerCpf.rows[0]){
                    return res.status(409).send()
                }
            }

            const queryUpdate = "update customers set name=$1, phone=$2, cpf=$3, birthday=$4 where id=$5;"
            await db.query(queryUpdate, [name, phone, cpf, dateBirthday, id])
            return res.status(200).send()
        } catch (error) {
            console.log(error)
            return res.status(500).send()
        }      
    },

    async getCustomerById(req, res){
        const {id} = req.params

        try {
            const query = "select * from customers where id=$1;"
        const customer = await db.query(query, [id])
        if(!customer.rows[0]){
           return res.status(404).send({message: "user not found"})
        }
        return res.send(customer.rows)
        } catch (error) {
            console.log(error)
            return res.status(500).send()
        }
    },

    async getCustomers(req, res){
        try {
            const query = "select * from customers order by id;"
            const customers = await db.query(query)
            const customerData = customers.rows.map(c => {return {...c, birthday: dayjs(c.birthday).format("YYYY-MM-DD")}} )
            return res.send(customerData)
        } catch (error) {
            console.log(error)
            return res.status(500).send()
        }
        
    }

}