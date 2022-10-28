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

    findOne(col, ...args) {
        return this.getCollection(col).findOne(args);
    }
    find(col, ...args) {
        if (!arg) return  this.getCollection(col).find().fetch();
        return this.getCollection(col).find(args).fetch();
    }
    insert(col, ...args) {
        return this.getCollection(col).insert(args)
    }
    update(col, ...args) {
        return this.getCollection(col).update(args)
    }
    upsert(col, ...args) {
        return this.getCollection(col).upsert(args)
    }
    remove(col, ...args) {
        return this.getCollection(col).remove(args)
    }
    createAtIndex(col, ...args) {
        return this.getCollection(col).createAtIndex(args)
    }
    allow(col, ...args) {
        return this.getCollection(col).allow(args)
    }
    denny(col, ...args) {
        return this.getCollection(col).deny(args)
    }

}