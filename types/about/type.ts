type infoCategory = {
    이름: string;
    출생: string;
    최종학력: string;
    경력사항: string;
    Tel: string;
    Email: string;
    블로그: string;
    깃허브: string;
    노션: string;
    [key: string]: string;
};

type skillCategory = {
    [key: string]: Array<string>;
};

export type { infoCategory, skillCategory };
