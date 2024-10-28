package edu.cunoc.migrafilesapi.Services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.client.MongoCollection;
import edu.cunoc.migrafilesapi.Entities.User;
import edu.cunoc.migrafilesapi.Model.ConnectionSingleton;
import edu.cunoc.migrafilesapi.Exceptions.FormatError;
import org.apache.commons.codec.digest.DigestUtils;
import org.bson.Document;

public class UserService {

    private final MongoCollection<Document> collection;

    public UserService() {
        ConnectionSingleton connection = ConnectionSingleton.getInstance();
        collection = connection.getDatabase().getCollection("empleado");
    }

    public User findUser(String nombre, String password) throws FormatError{
        Document query = new Document("nombre", nombre).append("password", password);
        Document docs = collection.find(query).first();
        if (docs != null) {
            String jsonDoc = docs.toJson();
            ObjectMapper mapper = new ObjectMapper();
            try {
                User user = mapper.readValue(jsonDoc, User.class);;
                return user;
            } catch (JsonProcessingException e) {
                throw new FormatError(e.getMessage());
            }
        }
        return null;
    }

    public void registerUser(User user) {
        String encryptedPassword = DigestUtils.sha256Hex(user.getPassword());
        Document userDoc = new Document("nombre", user.getNombre())
                .append("username", user.getUsername())
                .append("password", encryptedPassword)
                .append("email", user.getEmail())
                .append("telefono", user.getTelefono())
                .append("cui",user.getCui())
                .append("rol", user.getRol());
        collection.insertOne(userDoc);
    }
}
