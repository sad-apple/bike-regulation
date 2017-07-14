package cn.net.share.control.utils;

import org.slf4j.Logger;

/**
 * Created by Administrator on 2017/7/8.
 */
public class LogUtil {
    public static void info(Logger logger, String message){
        System.out.println(message);
        logger.info(message);
    }

    public static void error(Logger logger, String message){
        System.out.println(message);
        logger.error(message);
    }
}
