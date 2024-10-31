package edu.cunoc.migrafilesapi.Services.Doc;

import com.mongodb.client.MongoCollection;
import edu.cunoc.migrafilesapi.Entities.Doc;
import edu.cunoc.migrafilesapi.Exceptions.NoEncontradoException;
import edu.cunoc.migrafilesapi.Model.ConnectionSingleton;
import org.bson.Document;

import java.util.ArrayList;
import java.util.List;

public class LocalDocService {

    private final MongoCollection<Document> collection;

    public LocalDocService(){
        ConnectionSingleton connection = ConnectionSingleton.getInstance();
        collection = connection.getDatabase().getCollection("doc");
    }

    public void saveTextLocalFile(Doc localDoc, boolean dir) throws NoEncontradoException {
        Document filter = new Document("url", localDoc.getUrl()+"/"+localDoc.getTitle()).append("author", localDoc.getAuthor());
        Document doc = collection.find(filter).first();
        if (doc == null){
            filter = new Document("url", localDoc.getUrl()).append("author", localDoc.getAuthor());
            Document update = new Document("$push",new Document("paths",localDoc.getTitle()));
            Document insert = new Document()
                    .append("title", localDoc.getTitle())
                    .append("content", localDoc.getContent())
                    .append("extension", localDoc.getExtension())
                    .append("author", localDoc.getAuthor())
                    .append("type", localDoc.getType())
                    .append("url",localDoc.getUrl()+"/"+localDoc.getTitle());
            if (dir){
                List<String> paths = new ArrayList<>();
                insert.append("paths",paths);
            }
            collection.insertOne(insert);
            collection.updateOne(filter,update);
        } else {
            throw  new NoEncontradoException("Ya existe un archivo con ese nombre");
        }

    }

    public void saveImageLocalFile(Doc localImage) throws NoEncontradoException {
        Document filter = new Document("url", localImage.getUrl()+"/"+localImage.getTitle()).append("author", localImage.getAuthor());
        Document doc = collection.find(filter).first();
        if (doc == null){
            filter = new Document("url", localImage.getUrl()).append("author", localImage.getAuthor());
            Document update = new Document("$push",new Document("paths",localImage.getTitle()));
            Document insert = new Document()
                    .append("title", localImage.getTitle())
                    .append("image", localImage.getImage())
                    .append("extension", localImage.getExtension())
                    .append("author", localImage.getAuthor())
                    .append("type", localImage.getType())
                    .append("url",localImage.getUrl()+"/"+localImage.getTitle());
            collection.insertOne(insert);
            collection.updateOne(filter,update);
        } else {
            throw  new NoEncontradoException("Ya existe un archivo con ese nombre");
        }

    }
}
