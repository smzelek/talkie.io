import { connect } from "mongoose";
import { internet, name, company, random, lorem } from 'faker';
import { db } from '..';

const default_users: db.user.Schema[] = Array.from({ length: 10 }, () => {
    const firstname = name.firstName();
    const lastname = name.lastName();
    return {
        name: `${firstname} ${lastname}`,
        username: internet.userName(firstname, lastname).toLowerCase()
    };
});

const default_chatrooms: db.chatroom.Schema[] = Array.from({ length: 3 }, () => {
    const name = `${company.bsAdjective()} ${company.bsNoun()}`
        .split(' ')
        .map(w => `${w[0].toUpperCase()}${w.substr(1)}`)
        .join(' ');

    return {
        name,
        user_createdby: null
    };
});

const default_messages: db.message.Schema[] = Array.from({ length: 180 }, () => {
    const content = lorem.sentences(random.number({ min: 0, max: 5 }))
        || lorem.words(1);

    return {
        content,
        user_sentby: null,
        chatroom_sentto: null
    };
});

const initializeDb = async function () {
    await connect("mongodb://mongodb:27017/talkieio", { useNewUrlParser: true, useUnifiedTopology: true });

    await db.user.model.collection.insertMany(default_users);
    const users = await db.user.model.find({});

    await db.chatroom.model.collection.insertMany(
        default_chatrooms.map((c): db.chatroom.Schema => ({
            ...c,
            user_createdby: random.arrayElement(users)._id
        }))
    );
    const chatrooms = await db.chatroom.model.find({});

    await db.message.model.collection.insertMany(
        default_messages.map((m): db.message.Schema => ({
            ...m,
            user_sentby: random.arrayElement(users)._id,
            chatroom_sentto: random.arrayElement(chatrooms)._id
        }))
    );

    process.exit(0);
};

initializeDb();
