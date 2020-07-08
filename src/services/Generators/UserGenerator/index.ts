import { SAUser } from '../../../types/types';

//generates a random SA User
const userGenerator = async () => {
    const url = 'https://randomuser.me/api/';
    const response = await fetch(url);
    const json = await response?.json();

    const user = json.results[0];

    console.log(user.location.street);

    const avatar = user.picture.thumbnail;
    const id = user.login.uuid;
    const name = user.login.username;
    const title = `${user.location.street.name} ${user.location.city}`;
    const profile = 'https://forums.somethingawful.com';
    const regDate = new Date(user.registered.date).toLocaleString('default', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    const generatedUser: SAUser = {
        avatar,
        id,
        name,
        title,
        profile,
        regDate,
    };

    return generatedUser;
};

export default userGenerator;
