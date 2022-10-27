import { Meteor } from 'meteor/meteor'
import { MongoInternals, Mongo } from 'meteor/mongo'
import { Accounts } from 'meteor/accounts-base'

export class DB {
    constructor(mongoUrl) {
        if (mongoUrl) this.driver = new MongoInternals.RemoteCollectionDriver(mongoUrl)
        else this.driver = null;
    }

    getCollection(col) {
        let nameCollection = this.driver ? Mongo.Collection.get(col, { _driver: this.driver }) : Mongo.Collection.get(col)
        if (col === "users") {
            return Meteor.users;
        } else {
            if (!nameCollection) nameCollection = this.driver ? new Mongo.Collection(col, { _driver: this.driver }) : new Mongo.Collection(col)
        }
        return nameCollection;
    }

    insert(row, col) {
        let aCol = this.getCollection(col);
        let aId = aCol.insert(row)
        return aCol.findOne(aId)
    }

    find(opt, col) {
        let aCol = this.getCollection(col);
        return aCol.find(opt).fetch();
    }

    createUser(user) {
        const userId = Accounts.createUser(user)
        const stampedToken = Accounts._generateStampedLoginToken();
        Accounts._insertLoginToken(userId, stampedToken);
        return stampedToken;
    }

    login({ username, email, password }) {
        const user = username ? Accounts.findUserByUsername(username) : Accounts.findUserByEmail(email)
        const { userId } = Accounts._checkPassword(user, password);
        const stampedToken = Accounts._generateStampedLoginToken();
        clearAllLoginTokens(userId);
        Accounts._insertLoginToken(userId, stampedToken);
        return stampedToken;
    }

    logout(userId) {
        clearAllLoginTokens(userId)
        return { token: null };
    }

}


const clearAllLoginTokens = (userId) => {
    Meteor.users.update(userId, {
        $set: {
            'services.resume.loginTokens': []
        }
    });
};


