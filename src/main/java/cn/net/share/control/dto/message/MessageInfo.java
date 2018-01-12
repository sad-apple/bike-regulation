package cn.net.share.control.dto.message;

public class MessageInfo {
    public static final String SERVER_INNER_ERROR = "服务器内部错误";
    public static final String CANNOT_MODIFY_BUILTINROLE = "内建角色不能修改";
    public static final String CANNOT_DELETE_BUILTINROLE = "内建角色不能删除";
    public static final String CANNOT_MODIFY_BUILTINUSER = "内建用户不能修改";
    public static final String CANNOT_DELETE_BUILTINUSER = "内建用户不能删除";
    public static final String WRONG_OLD_PASSWORD = "原密码输入错误";
    public static final String ONLY_RIDER_CAN_UPGRADE = "只有骑行用户升级为车主！";
    public static final String ROLE_ALREADY_EXIST = "角色名已经存在";
    public static final String CANNOT_REMOVE_ADMIN = "管理员角色不可删除";
    public static final String CANNOT_MODIFY_ADMIN = "管理员信息不能修改";
    public static final String USERNAME_ALREADY_EXIST = "用户名已存在";
    public static final String IDCARDNUMBER_ALREADY_EXIST = "身份证号已存在";
    public static final String CUSTOMER_NOT_EXIST = "该客户不存在";
    public static final String ERROR_PERMISSION_DENIED = "客户权限不足，不能成为分组所有者";
    public static final String USER_ISNOT_CUSTOMER = "该系统用户不是客户";
    public static final String NOT_NEED_DEPOSITAMOUNT = "不需要押金不需要填写金额";
    public static final String ERROR_ON_READEXCEL = "Excel文件读取失败";
    public static final String SEX_MEN = "男";
    public static final String SEX_WOMEN = "女";
    public static final String DETERMINE = "确定";
    public static final String CANCLE = "取消";


    public static String exceptionInfo(Exception e){
        if (e.getMessage() != null)
            return SERVER_INNER_ERROR + ":" + e.getMessage();
        else
            return SERVER_INNER_ERROR + ":" + e.toString();
    }
}
