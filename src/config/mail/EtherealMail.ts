import nodemailer from 'nodemailer'
import handlebarsMailTemplate from './HandlebarsMailTemplate'


interface ITemplateVariable {
    [key : string]: string | number
}

interface IParserMailTemplate {
    Templatefile : string;
    variables : ITemplateVariable
}

interface IMailContact {
    name: string;
    email: string;
}

interface IsendMail {
    to: IMailContact;
    from?:IMailContact;
    subject: string;
    templateData: IParserMailTemplate;

}


export default class EtherealMail {

    static async sendMail({ to, from, subject, templateData}: IsendMail ): Promise<void>{
        const account = await nodemailer.createTestAccount()
        const mailTemplate = new handlebarsMailTemplate()
        const transporter = nodemailer.createTransport({

            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
            
        })
        const message = await transporter.sendMail({
            from:{
                name: from?.name || 'Equipe APItask LTDA',
                address: from?.email || 'equipeTaskApi@apitasks.com.br'
            },
            to:{
                name: to.name,
                address: to.email
            },
            subject,
            html: await mailTemplate.parse(templateData)
        })

        console.log('Message Sent %s', message.messageId);
        console.log('Preview URL %s', nodemailer.getTestMessageUrl(message));
    }
}