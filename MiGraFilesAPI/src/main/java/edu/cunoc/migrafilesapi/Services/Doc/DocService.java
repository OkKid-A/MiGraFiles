package edu.cunoc.migrafilesapi.Services.Doc;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.model.Filters;
import edu.cunoc.migrafilesapi.Entities.Doc;
import edu.cunoc.migrafilesapi.Entities.DocType;
import edu.cunoc.migrafilesapi.Entities.User;
import edu.cunoc.migrafilesapi.Entities.UserRole;
import edu.cunoc.migrafilesapi.Exceptions.FormatError;
import edu.cunoc.migrafilesapi.Model.ConnectionSingleton;
import org.bson.Document;

import java.util.ArrayList;
import java.util.List;

public class DocService {

    private final MongoCollection<Document> collection;

    public DocService(){
        ConnectionSingleton connection = ConnectionSingleton.getInstance();
        collection = connection.getDatabase().getCollection("doc");
    }

    public FindIterable<Document> findDocsByUser(String cui){
        return collection.find(new Document("author", cui));
    }

    public List<Doc> findDocsBelowPath(String cui, String path){
        Document initDocs = findDocByAuthorAndPath(cui, path);
            List<Doc> docs = new ArrayList<>();
            if (initDocs != null) {
                List<String> children = initDocs.getList("paths", String.class);
                if (children!=null||!children.isEmpty()) {
                    for (String child : children) {
                        Document childDoc = findDocByAuthorAndPath(cui, path + "/" + child);
                        String jsonDoc = childDoc.toJson();
                        ObjectMapper mapper = new ObjectMapper();
                        try {
                            Doc finDoc = mapper.readValue(jsonDoc, Doc.class);
                            if (finDoc.isActive()) {
                                docs.add(finDoc);
                            }
                        } catch (JsonProcessingException e) {
                            System.out.println("Failure while reading child: " + child + " of: " + cui);
                            e.printStackTrace();
                            throw new FormatError(e.getMessage());
                        }
                    }
                }
            }
            return docs;

    }

    public Document findDocByAuthorAndPath(String author, String path){
        return collection.find(new Document("author",author).append("url",path)).first();

    }

    public void modifyContentDoc(Doc doc){
        Document query = new Document("author", doc.getAuthor()).append("url", doc.getUrl());
        collection.updateOne(query, new Document("$set", new Document("content", doc.getContent())));
    }

    public void modifyImageDoc(Doc doc){
        Document query = new Document("author", doc.getAuthor()).append("url", doc.getUrl());
        collection.updateOne(query, new Document("$set", new Document("image", doc.getImage())));
    }

    public void deactivateDoc(Doc doc){
        if (doc.getType().equals(DocType.DOC.toString())) {
            Document query = new Document("author", doc.getAuthor()).append("url", doc.getUrl());
            collection.updateOne(query, new Document("$set", new Document("active", false)));
        } else {
            Document filters = new Document("url",new Document("$regex","^"+doc.getUrl()));
            Document update = new Document("$set", new Document("active", false));
            collection.updateMany(filters, update);
        }
    }

    public void copyDoc(Doc doc){
        if (doc.getType().equals(DocType.DOC.toString())) {
            Document query = new Document("author", doc.getAuthor()).append("url", doc.getUrl());
            Document found = collection.find(query).first();
            found.remove("_id");
            String og = doc.getUrl();
            found.put("url", og.replace(doc.getTitle(),"copy_"+doc.getTitle()));
            found.put("title", "copy_"+doc.getTitle());
            collection.insertOne(found);
        } else {

            Document filters = new Document("url",new Document("$regex","^"+doc.getUrl()));
            FindIterable<Document> docs = collection.find(filters);
            String og = doc.getUrl();
            for (Document founDoc : docs) {
                if (founDoc.getString("url").equals(doc.getUrl())) {
                    founDoc.remove("_id");
                    founDoc.put("url", og.replace(doc.getTitle(),"copy_"+doc.getTitle()));
                    founDoc.put("title", "copy_"+doc.getTitle());
                    collection.insertOne(founDoc);
                }  else {
                    founDoc.remove("_id");
                    founDoc.put("url", founDoc.getString("url").replace(doc.getTitle(),"copy_"+doc.getTitle()));
                    collection.insertOne(founDoc);
                }
            }
        }
        String parent = doc.getUrl().split("/"+doc.getTitle())[0];
        Document filter = new Document("url", parent).append("author", doc.getAuthor());
        Document update = new Document("$push",new Document("paths","copy_"+doc.getTitle()));
        collection.updateOne(filter,update);
    }

}
