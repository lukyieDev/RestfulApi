import { getCustomRepository } from 'typeorm';
import appError from '../../../shared/errors/appError';
import CustomerRepository from '../typeorm/repositories/CustomersRepository';
import Customer from '../typeorm/entities/Customer';

interface IRequest {
    id: string;
    name:string;
    email:string;
}


class UpdateCustomerService {
    public async execute({id, name, email}: IRequest): Promise<Customer> {
        const customerRepository = getCustomRepository(CustomerRepository)

        const customer = await customerRepository.findById(id)

        if(!customer){
            throw new appError('customer Not Found.')
        }

        const customerExist = await customerRepository.findByEmail(email)

        if(customerExist && customer.email != email){
            throw new appError('Email Already Registered')
        }

        customer.email = email
        customer.name = name

        await customerRepository.save(customer)

        return customer
    }
}

export default UpdateCustomerService;
