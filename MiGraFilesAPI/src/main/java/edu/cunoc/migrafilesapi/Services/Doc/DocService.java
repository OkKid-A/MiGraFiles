package edu.cunoc.migrafilesapi.Services.Doc;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.model.Filters;
import edu.cunoc.migrafilesapi.Model.ConnectionSingleton;
import org.bson.Document;

public class DocService {

    private final MongoCollection<Document> collection;

    public DocService(){
        ConnectionSingleton connection = ConnectionSingleton.getInstance();
        collection = connection.getDatabase().getCollection("doc");
    }

    public FindIterable<Document> findDocsByUser(int cui){
        return collection.find(new Document("author", cui));
    }

    public MongoCursor<Document> findDocsBelowPath(int cui, String path){
        return collection.find(Filters.regex("path", "^"+path+"[^/]+$")).iterator();
    }
}
