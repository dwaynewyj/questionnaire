export interface Questionnaire {
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
    item: Question[];
}

export interface Question {
    linkId: string;
    text: string;
    type: string;
    option?: Option[];
    item?: Question[];
}

export interface Option {
    valueCoding: {
        system: string;
        code: string;
        display: string;
    };
}
