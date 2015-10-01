var uuid = require("uuid");
var db = require("../app").bucket;
var config = require("../config");
var N1qlQuery = require('couchbase').N1qlQuery;

function RecordModel() { };

/*
 * Delete a document from Couchbase Server by document id
 */
RecordModel.delete = function(documentId, callback) {
    db.remove(documentId, function(error, result) {
        if(error) {
            callback(error, null);
            return;
        }
        callback(null, {message: "success", data: result});
    });
};

/*
 * Save a document.  If a document id is not provided an insert will happen, otherwise update.  Thus an upsert.
 */
RecordModel.save = function(data, callback) {
    var jsonObject = {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email
    }
    // If the document id doesn't exist create a unique id for inserting
    var documentId = data.document_id ? data.document_id : uuid.v4();
    db.upsert(documentId, jsonObject, function(error, result) {
        if(error) {
            callback(error, null);
            return;
        }
        callback(null, {message: "success", data: result});
    });
}

/*
 * Get a particular document from Couchbase Server using a parameterized N1QL query
 */
RecordModel.getByDocumentId = function(documentId, callback) {
    var statement = "SELECT firstname, lastname, email " +
                    "FROM `" + config.couchbase.bucket + "` AS users " +
                    "WHERE META(users).id = $1";
    var query = N1qlQuery.fromString(statement);
    db.query(query, [documentId], function(error, result) {
        if(error) {
            return callback(error, null);
        }
        callback(null, result);
    });
};

/*
 * Get all documents from Couchbase Server using N1QL
 */
RecordModel.getAll = function(callback) {
    var statement = "SELECT META(users).id, firstname, lastname, email " +
                    "FROM `" + config.couchbase.bucket + "` AS users";
    var query = N1qlQuery.fromString(statement).consistency(N1qlQuery.Consistency.REQUEST_PLUS);
    db.query(query, function(error, result) {
        if(error) {
            return callback(error, null);
        }
        callback(null, result);
    });
};

module.exports = RecordModel;
