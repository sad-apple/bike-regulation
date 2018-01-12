package cn.net.share.control.utils.state;

/**
 * Created by zhangshiping on 2017/7/19.
 */
public enum FileOfType {
    /**
     * {@code 1 单车图片}.
     */
    BIKEIMAGE(1L);

    private final Long value;
    public Long value() {
        return this.value;
    }

    FileOfType(Long value) {
        this.value = value;
    }
    @Override
    public String toString() {
        return Long.toString(this.value);
    }
}
