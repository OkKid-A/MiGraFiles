package edu.cunoc.migrafilesapi.Servlets.Doc;

import edu.cunoc.migrafilesapi.Entities.Doc;
import edu.cunoc.migrafilesapi.Exceptions.NoEncontradoException;
import edu.cunoc.migrafilesapi.Services.Doc.LocalDocService;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/local")
public class LocalController {

    @Path("/text")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response saveText(Doc textDoc) {
        try {
            LocalDocService localDocService = new LocalDocService();
            localDocService.saveTextLocalFile(textDoc,false);
            return Response.status(Response.Status.CREATED).entity("{ \"message\": \"Se ingreso el archivo de texto con exito\" }").build();
        } catch (Exception e){
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @Path("/dir")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response saveDir(Doc textDoc) {
        try {
            LocalDocService localDocService = new LocalDocService();
            localDocService.saveTextLocalFile(textDoc,true);
            return Response.status(Response.Status.CREATED).entity("{ \"message\": \"Se ingreso el folder con exito\" }").build();
        } catch (Exception e){
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @Path("/image")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response saveImage(Doc textDoc) {
        try {
            LocalDocService localDocService = new LocalDocService();
            localDocService.saveImageLocalFile(textDoc);
            return Response.status(Response.Status.CREATED).entity("{ \"message\": \"Se ingreso la imagen con exito\" }").build();
        } catch (Exception e){
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }
}
