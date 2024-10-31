package edu.cunoc.migrafilesapi.Services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.client.MongoDatabase;
import edu.cunoc.migrafilesapi.Entities.User;
import edu.cunoc.migrafilesapi.Entities.UserRole;
import edu.cunoc.migrafilesapi.Model.ConnectionSingleton;
import edu.cunoc.migrafilesapi.Exceptions.FormatError;
import org.apache.commons.codec.digest.DigestUtils;
import org.bson.Document;

public class UserService {


    public UserService() {
    }

    public boolean checkUser(String shareholder){
        Document query = new Document("username", shareholder);
        MongoDatabase database = ConnectionSingleton.getInstance().getDatabase();
        Document doc = database.getCollection("empleado").find(query).first();
        return doc != null;
    }

    public User findUser(String nombre, String password) throws FormatError{
        Document query = new Document("username", nombre).append("password", password);
        MongoDatabase database = ConnectionSingleton.getInstance().getDatabase();
        Document docs = database.getCollection("empleado").find(query).first();
        if (docs != null) {
            String jsonDoc = docs.toJson();
            ObjectMapper mapper = new ObjectMapper();
            try {
                User user = mapper.readValue(jsonDoc, User.class);
                user.setRol(UserRole.getUserRol(Integer.parseInt(user.getRol())).toString());
                return user;
            } catch (JsonProcessingException e) {
                e.printStackTrace();
                throw new FormatError(e.getMessage());
            }
        }
        return new User();
    }

    public void registerUser(User user) {
        String encryptedPassword = DigestUtils.sha256Hex(user.getPassword());
        Document userDoc = new Document("nombre", user.getNombre())
                .append("username", user.getUsername())
                .append("password", encryptedPassword)
                .append("email", user.getEmail())
                .append("telefono", user.getTelefono())
                .append("cui",user.get_id())
                .append("rol", user.getRol());
        ConnectionSingleton.getInstance().getDatabase().getCollection("empleado").insertOne(userDoc);
    }
}
