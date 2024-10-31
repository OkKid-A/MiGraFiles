package edu.cunoc.migrafilesapi.Servlets.Doc;

import edu.cunoc.migrafilesapi.Entities.Doc;
import edu.cunoc.migrafilesapi.Services.Doc.SharedDocService;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/shared")
public class SharedController {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Doc> getSharedDocsByShareholder(@QueryParam("shareholder") String shareholder) {
        SharedDocService sharedDocService = new SharedDocService();
        return sharedDocService.getSharedDocsByUser(shareholder);
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addSharedDoc(Doc sharedDoc) {
        SharedDocService sharedDocService = new SharedDocService();
        sharedDocService.putSharedDoc(sharedDoc);
        return Response.ok().build();
    }
}
