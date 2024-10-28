package edu.cunoc.migrafilesapi.Entities;

import java.util.Date;

public class SharedDoc {
    private String id;
    private String title;
    private String extension;
    private String content;
    private String type;
    private int author;
    private int shareholder;
    private Date dateShared;

    public SharedDoc() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getExtension() {
        return extension;
    }

    public void setExtension(String extension) {
        this.extension = extension;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getAuthor() {
        return author;
    }

    public void setAuthor(int author) {
        this.author = author;
    }

    public int getShareholder() {
        return shareholder;
    }

    public void setShareholder(int shareholder) {
        this.shareholder = shareholder;
    }

    public Date getDateShared() {
        return dateShared;
    }

    public void setDateShared(Date dateShared) {
        this.dateShared = dateShared;
    }
}
