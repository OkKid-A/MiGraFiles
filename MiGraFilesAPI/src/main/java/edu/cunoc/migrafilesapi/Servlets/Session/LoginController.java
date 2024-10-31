package edu.cunoc.migrafilesapi.Servlets.Session;

import edu.cunoc.migrafilesapi.Entities.User;
import edu.cunoc.migrafilesapi.Exceptions.NoEncontradoException;
import edu.cunoc.migrafilesapi.Services.UserService;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/login")
public class LoginController {

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(User user) throws NoEncontradoException {
        if (user.getUsername() != null && user.getPassword()!= null){
            UserService Uservice =  new UserService();
            User useresponse = Uservice.findUser(user.getUsername(), user.getPassword());
                return Response.status(Response.Status.OK).entity(useresponse).build();
        } else{
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUser(@QueryParam("shareholder") String shareholder){
        UserService Uservice =  new UserService();
        boolean found = Uservice.checkUser(shareholder);
        if (found){
            return Response.status(Response.Status.OK).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }
}
