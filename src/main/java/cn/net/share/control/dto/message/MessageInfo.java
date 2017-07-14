package cn.net.share.control.dto.message;

public class MessageInfo {
    public static final String SERVER_INNER_ERROR = "服务器内部错误";
    public static final String CANNOT_MODIFY_BUILTINROLE = "内建角色不能修改";
    public static final String CANNOT_DELETE_BUILTINROLE = "内建角色不能删除";
    public static final String CANNOT_MODIFY_BUILTINUSER = "内建用户不能修改";
    public static final String CANNOT_DELETE_BUILTINUSER = "内建用户不能删除";
    public static final String ROLE_ALREADY_EXIST = "角色名已经存在";
    public static final String CANNOT_REMOVE_ADMIN = "管理员角色不可删除";
    public static final String CANNOT_MODIFY_ADMIN = "管理员信息不能修改";
    public static final String USERNAME_ALREADY_EXIST = "用户名已存在";
    public static final String WRONG_OLD_PASSWORD = "原密码错误";

    public static String exceptionInfo(Exception e){
        if (e.getMessage() != null)
            return SERVER_INNER_ERROR + ":" + e.getMessage();
        else
            return SERVER_INNER_ERROR + ":" + e.toString();
    }
}
