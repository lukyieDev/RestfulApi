import Customer from "../typeorm/entities/Customer";
import { getCustomRepository } from "typeorm";
import CustomerRepository from "../typeorm/repositories/CustomersRepository";
import appError from "../../../shared/errors/appError";

interface IRequest {
    id:string;
}


class DeleteCustomerService{
    public async execute({id}: IRequest): Promise<void>{
        const customerRepository = getCustomRepository(CustomerRepository)
        const customer = await customerRepository.findById(id)

        if(!customer){
            throw new appError('Customer Does Not Exist')
        }

        await customerRepository.remove(customer)
    }
}

export default DeleteCustomerService