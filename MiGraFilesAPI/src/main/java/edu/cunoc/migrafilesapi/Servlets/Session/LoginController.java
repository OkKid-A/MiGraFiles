package edu.cunoc.migrafilesapi.Servlets.Session;

import edu.cunoc.migrafilesapi.Entities.User;
import edu.cunoc.migrafilesapi.Exceptions.NoEncontradoException;
import edu.cunoc.migrafilesapi.Services.UserService;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/login")
public class LoginController {

    @Path("/{username}/{password}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public User login(@PathParam("username") String username, @PathParam("password") String password){
        if (username != null && password != null){
            UserService Uservice =  new UserService();
                return Uservice.findUser(username,password);
        } else{
            throw new NoEncontradoException("No se recibieron datos");
        }    }
}
