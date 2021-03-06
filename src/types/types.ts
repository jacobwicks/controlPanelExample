export interface Creds {
    username: string;
    password: string;
}

export interface KeyStringInterface {
    [key: string]: any;
}

export interface SAUser {
    avatar?: string;
    id: number;
    name: string;
    title?: string;
    profile: string;
    regDate: string;
}

export const dummySAUser: SAUser = {
    avatar: 'https://fi.somethingawful.com/safs/titles/58/73/00226364.0001.jpg',
    id: 226364,
    name: 'Patient Zero Cool',
    profile:
        'https://forums.somethingawful.com/member.php?action=getinfo&userid=226364',
    regDate: 'Apr 24, 2020',
    title: '',
};

export interface Post {
    //the name of the user that wrote the post
    author: SAUser;

    //the body of the post, without other quoted posts inside it
    body: string;

    //the date the post was made
    date: Date;

    //the unique postId number
    id: number;

    //the img.src property
    image?: string;

    //link to the post
    link: string;
}

export interface Instruction extends Post {
    //the instruction that the bot received
    instruction: string;

    //the link to the post that had the instruction
    link: string;
}

export * from './Actions';
export * from './Albums';
export * from './Apis';
export * from './Bot';
export * from './Events';
export * from './Instructions';
export * from './Login';
export * from './Threads';
