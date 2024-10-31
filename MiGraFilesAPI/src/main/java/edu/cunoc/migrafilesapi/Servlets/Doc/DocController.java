package edu.cunoc.migrafilesapi.Servlets.Doc;

import edu.cunoc.migrafilesapi.Entities.Doc;
import edu.cunoc.migrafilesapi.Services.Doc.DocService;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.annotations.Pos;

import java.util.List;

@Path("/doc")
public class DocController {

    @Path("/author")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Doc> findDocsByAuthorPath(@QueryParam("id") String author, @QueryParam("path") String path) {
        DocService docService = new DocService();
        return docService.findDocsBelowPath(author, path);
    }

    @Path("/save")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response modifyContentDoc(Doc doc) {
        DocService docService = new DocService();
        docService.modifyContentDoc(doc);
        return Response.status(Response.Status.ACCEPTED).entity("{ \"message\": \"Se actualizo el archivo con exito\" }").build();
    }

    @Path("/save")
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response modifyImageDoc(Doc doc) {
        DocService docService = new DocService();
        docService.modifyImageDoc(doc);
        return Response.status(Response.Status.ACCEPTED).entity("{ \"message\": \"Se actualizo la imagen con exito\" }").build();
    }

    @Path("/deactivate")
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response deactivateDoc(Doc doc) {
        DocService docService = new DocService();
        docService.deactivateDoc(doc);
        return Response.status(Response.Status.ACCEPTED).build();
    }

    @Path("/copy")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response copyDoc(Doc doc) {
        DocService docService = new DocService();
        docService.copyDoc(doc);
        return Response.status(Response.Status.CREATED).build();
    }
}
