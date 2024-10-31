package edu.cunoc.migrafilesapi.Model;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

public class ConnectionSingleton {
    private static ConnectionSingleton instance;
    private MongoDatabase database;
    private MongoClient mongoClient;

    private ConnectionSingleton(){
        this.mongoClient = MongoClients.create("mongodb://localhost:27018");
        this.database = mongoClient.getDatabase("MiGraFiles");
    }

    public static synchronized ConnectionSingleton getInstance() {
        if (instance == null) {
            instance = new ConnectionSingleton();
        }
        return instance;
    }

    public MongoDatabase getDatabase() {
        return database;
    }

    public void close(){
        if (mongoClient != null) {
            mongoClient.close();
        }
    }
}
