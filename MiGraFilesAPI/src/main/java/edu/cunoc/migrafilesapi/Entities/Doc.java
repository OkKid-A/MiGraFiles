package edu.cunoc.migrafilesapi.Entities;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.deser.std.DateDeserializers;
import org.bson.types.ObjectId;

import java.util.Date;

public class Doc {
    @JsonDeserialize(using = ObjectIdDeserializer.class)
    private ObjectId _id;
    private String $oid;
    private String title;
    private String content;
    private String extension;
    private String author;
    private String type;
    private String url;
    private String[] paths;
    private boolean active;
    private String image;
    private String shareholder;
    @JsonDeserialize(using = CustomDateDeserializer.class)
    private Date dateShared;
    private String sharedUrl;

    public Doc() {
    }

    public String get$oid() {
        return $oid;
    }

    public void set$oid(String $oid) {
        this.$oid = $oid;
    }

    public String getSharedUrl() {
        return sharedUrl;
    }

    public void setSharedUrl(String sharedUrl) {
        this.sharedUrl = sharedUrl;
    }

    public String getImage() {
        return image;
    }

    public String getShareholder() {
        return shareholder;
    }

    public void setShareholder(String shareholder) {
        this.shareholder = shareholder;
    }

    public Date getDateShared() {
        return dateShared;
    }

    public void setDateShared(Date dateShared) {
        this.dateShared = dateShared;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String[] getPaths() {
        return paths;
    }

    public void setPaths(String[] paths) {
        this.paths = paths;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public static class ObjectIdWrapper {
        @JsonProperty("$oid")
        private String oid;

        public String getOid() {
            return oid;
        }

        public void setOid(String oid) {
            this.oid = oid;
        }
    }

    public String get_id() {
        return this._id.toString();
    }

    public void set_id(ObjectId _id) {
        this._id = _id;
    }

        public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getExtension() {
        return extension;
    }

    public void setExtension(String extension) {
        this.extension = extension;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

}
