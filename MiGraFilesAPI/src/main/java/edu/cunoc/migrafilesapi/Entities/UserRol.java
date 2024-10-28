package edu.cunoc.migrafilesapi.Entities;

public enum UserRol {

    ADMIN(2),
    EMPLEADO(1),
    NOUSER(0);

    private final int nivel;

    UserRol(int nivel) {
        this.nivel = nivel;
    }

    public static UserRol getUserRol(int nivel) {
        return switch (nivel) {
            case 1 -> UserRol.ADMIN;
            case 2 -> UserRol.EMPLEADO;
            default -> UserRol.NOUSER;
        };
    }
}
