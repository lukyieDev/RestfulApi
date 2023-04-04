import Handlebars from "handlebars";
import fs from 'fs'

interface ITemplateVariable {
    [key : string]: string | number
}

interface IParserMailTemplate {
    Templatefile : string;
    variables : ITemplateVariable
}

export default class handlebarsMailTemplate {
    public async parse({Templatefile, variables}: IParserMailTemplate ) : Promise<string>{

        const templateFileContent = await fs.promises.readFile(Templatefile,{
            encoding: 'utf-8',
        })
        const parseTemplate = Handlebars.compile(templateFileContent);

        return parseTemplate(variables)
    }
}