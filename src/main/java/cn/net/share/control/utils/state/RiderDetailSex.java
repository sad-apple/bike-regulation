package cn.net.share.control.utils.state;

/**
 * Created by Administrator on 2017/7/11.
 */
public enum RiderDetailSex {
    /**
     * {@code 0 男}.
     */
    MALE(0),

    /**
     * {@code 1 女}.
     */
    FEMALE(1);

    private final Integer value;
    public Integer value() {
        return this.value;
    }

    RiderDetailSex(Integer value) {
        this.value = value;
    }
    @Override
    public String toString() {
        return Integer.toString(this.value);
    }
}
