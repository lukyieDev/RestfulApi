import Handlebars from "handlebars";

interface ITemplateVariable {
    [key : string]: string | number
}

interface IParserMailTemplate {
    template : string;
    variables : ITemplateVariable
}

export default class handlebarsMailTemplate {
    public async parse({template, variables}: IParserMailTemplate ) : Promise<string>{
        const parseTemplate = Handlebars.compile(template);

        return parseTemplate(variables)
    }
}