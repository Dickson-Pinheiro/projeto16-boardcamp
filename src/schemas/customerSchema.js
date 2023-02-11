import joiBase from "joi";
import joiDate from "@joi/date";

const joi = joiBase.extend(joiDate);

export const customerSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().min(10).max(11).required(),
    cpf: joi.string().length(11).pattern(/[0-9]{10}/).required(),
    birthday: joi.date().format("YYYY-MM-DD").required()
})