import appError from "../../../shared/errors/appError";
import Customer from "../typeorm/entities/Customer";
import CustomerRepository from "../typeorm/repositories/CustomersRepository";
import { getCustomRepository } from 'typeorm';

interface IRequest {
    id: string;
}

class ShowCustomerService {
    public async execute({id}:IRequest):Promise<Customer>{

        const customerRepository = getCustomRepository(CustomerRepository);
        const customer = await customerRepository.findById(id)
        
        if(!customer){
            throw new appError('This User Not Exist')
        }

        return customer
    }
}

export default ShowCustomerService;