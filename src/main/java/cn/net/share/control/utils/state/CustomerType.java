package cn.net.share.control.utils.state;

/**
 * Created by Administrator on 2017/7/11.
 */
public enum CustomerType {
    /**
     * {@code 1 骑行用户}.
     */
    RIDER(1);

    private final Integer value;
    public Integer value() {
        return this.value;
    }

    CustomerType(Integer value) {
        this.value = value;
    }
    @Override
    public String toString() {
        return Integer.toString(this.value);
    }
}
