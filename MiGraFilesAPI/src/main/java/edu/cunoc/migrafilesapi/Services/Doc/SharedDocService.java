package edu.cunoc.migrafilesapi.Services.Doc;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import edu.cunoc.migrafilesapi.Model.ConnectionSingleton;
import org.bson.Document;

public class SharedDocService {
    private final MongoCollection<Document> collection;

    public SharedDocService(){
        ConnectionSingleton cs = ConnectionSingleton.getInstance();
        collection = cs.getDatabase().getCollection("sharedDoc");
    }

    public FindIterable<Document> getSharedDocsByUser(int cui){
        return collection.find(new Document("shareholder", cui));
    }


}
