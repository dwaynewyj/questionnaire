import { Option } from '../questionnaire/questionnaire.interface';

export interface QuestionnaireNested {
    resourceType: string;
    id: string;
    text: {
        status: string;
        div: string;
    };
    url: string;
    identifier: {
        system: string;
        value: string;
    }[];
    status: string;
    subjectType: string[];
    date: string;
    code: {
        system: string;
        code: string;
        display: string;
    }[];
    item: QuestionNested[];
}

export interface QuestionNested {
    linkId: string;
    text: string;
    type: string;
    option?: Option[];
    item?: QuestionNested[];
}
