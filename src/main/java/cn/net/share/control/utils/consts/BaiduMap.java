package cn.net.share.control.utils.consts;

public enum BaiduMap {
    /**
     * 百度开发者秘钥
     */
    AK("584cqWoEbTyVH9gjxjbojF5Xi9Wt2NMc"),
    /**
     * gps坐标类型
     */
    GPS_COORD("1"),
    /**
     * 百度坐标类型
     */
    BAIDU_COORD("5");

    private final String value;

    BaiduMap(String value) {
        this.value = value;
    }

    public String value() {
        return this.value;
    }
}
