import { connect } from "mongoose";
import { IChatroom, IMessage, IUser, User, Chatroom, Message } from './schemas';
import * as faker from 'faker';

const default_users: IUser[] = Array.from({ length: 10 }, () => {
    const firstname = faker.name.firstName();
    const lastname = faker.name.lastName();
    return {
        name: `${firstname} ${lastname}`,
        username: faker.internet.userName(firstname, lastname)
    };
});

const default_chatrooms: IChatroom[] = Array.from({ length: 3 }, () => {
    const name = `${faker.company.bsAdjective()} ${faker.company.bsNoun()}`
        .split(' ')
        .map(w => `${w[0].toUpperCase()}${w.substr(1)}`)
        .join(' ');

    return {
        name,
        user_createdby: null
    };
});

const default_messages: IMessage[] = Array.from({ length: 180 }, () => {
    const content = faker.lorem.sentences(faker.random.number({ min: 0, max: 5 }))
        || faker.lorem.words(1);

    return {
        content,
        user_sentby: null,
        chatroom_sentto: null
    };
});

const initializeDb = async function () {
    await connect("mongodb://localhost:27017/talkieio", { useNewUrlParser: true, useUnifiedTopology: true });

    await User.collection.insertMany(default_users);
    const users = await User.find({});

    await Chatroom.collection.insertMany(
        default_chatrooms.map((c): IChatroom => ({
            ...c,
            user_createdby: faker.random.arrayElement(users).id
        }))
    );
    const chatrooms = await Chatroom.find({});

    await Message.collection.insertMany(
        default_messages.map((m): IMessage => ({
            ...m,
            user_sentby: faker.random.arrayElement(users).id,
            chatroom_sentto: faker.random.arrayElement(chatrooms).id
        }))
    );

    process.exit(0);
};

initializeDb();
