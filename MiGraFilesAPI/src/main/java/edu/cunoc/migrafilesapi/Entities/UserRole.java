package edu.cunoc.migrafilesapi.Entities;

public enum UserRole {

    ADMIN(2),
    EMPLEADO(1),
    NOUSER(0);

    private final int nivel;

    UserRole(int nivel) {
        this.nivel = nivel;
    }

    public static UserRole getUserRol(int nivel) {
        return switch (nivel) {
            case 1 -> UserRole.EMPLEADO;
            case 2 -> UserRole.ADMIN;
            default -> UserRole.NOUSER;
        };
    }
}
