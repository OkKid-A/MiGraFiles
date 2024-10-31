package edu.cunoc.migrafilesapi.Services.Doc;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import edu.cunoc.migrafilesapi.Entities.Doc;
import edu.cunoc.migrafilesapi.Exceptions.FormatError;
import edu.cunoc.migrafilesapi.Exceptions.NoEncontradoException;
import edu.cunoc.migrafilesapi.Model.ConnectionSingleton;
import org.bson.Document;

import java.util.ArrayList;
import java.util.List;

public class SharedDocService {
    private final MongoCollection<Document> collection;

    public SharedDocService(){
        ConnectionSingleton cs = ConnectionSingleton.getInstance();
        collection = cs.getDatabase().getCollection("doc");
    }

    public List<Doc> getSharedDocsByUser(String shareholder){
        Iterable<Document> sharedocs = collection.find(new Document("shareholder", shareholder));
        List<Doc> sharedDocs = new ArrayList<>();
        for (Document sharedoc : sharedocs) {
            String jsonDoc = sharedoc.toJson();
            ObjectMapper mapper = new ObjectMapper();
            try {
                Doc foundDoc = mapper.readValue(jsonDoc, Doc.class);
                sharedDocs.add(foundDoc);
            } catch (JsonProcessingException e) {
                System.out.println("Failure while reading shared docs");
                e.printStackTrace();
                throw new FormatError(e.getMessage());
            }
        }
        return sharedDocs;
    }

    public void putSharedDoc(Doc sharedDoc){
            Document insert = new Document()
                    .append("title", sharedDoc.getTitle())
                    .append("content", sharedDoc.getContent())
                    .append("extension", sharedDoc.getExtension())
                    .append("author", sharedDoc.getAuthor())
                    .append("type", sharedDoc.getType())
                    .append("sharedUrl","shared")
                    .append("shareholder", sharedDoc.getShareholder())
                    .append("dateShared", sharedDoc.getDateShared());
            collection.insertOne(insert);
        }
}
