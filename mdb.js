import { Meteor } from 'meteor/meteor'
import { MongoInternals, Mongo } from 'meteor/mongo'

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

}