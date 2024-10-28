package edu.cunoc.migrafilesapi.Entities;

public enum DocType {

    DIR(2),
    DOC(1),
    ERROR(0);

    private final int tipo;

    DocType(int tipo) {
        this.tipo = tipo;
    }

    public static DocType getDocType(int nivel) {
        return switch (nivel) {
            case 2 -> DocType.DIR;
            case 1 -> DocType.DOC;
            default -> DocType.ERROR;
        };
    }
}
