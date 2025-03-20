package com._axis.server.model;

public class Response {

    private int status;
    private String msg;
    private Object object;

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getObject() {
        return object;
    }

    public void setObject(Object object) {
        this.object = object;
    }

    @Override
    public String toString() {
        return "Respose{" +
                "status=" + status +
                ", msg='" + msg + '\'' +
                ", object=" + object +
                '}';
    }
}
