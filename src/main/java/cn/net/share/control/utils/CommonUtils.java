package cn.net.share.control.utils;

public class CommonUtils {
    /**
     * sql语句like查询值构造
     * @param param
     * @return
     */
    public static String likePartten(String param){
        return "%" + param + "%";
    }

    /**
     * 获取文件后缀名(包含.)
     * @param fileName
     * @return
     */
    public static String getFileSuffix(String fileName){
        return fileName.substring(fileName.lastIndexOf("."));
    }
}
