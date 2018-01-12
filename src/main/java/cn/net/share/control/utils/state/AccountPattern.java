package cn.net.share.control.utils.state;

/**
 * Created by lihao on 2017/8/5.
 */
public enum AccountPattern {
    /**
     * {@code 1 按小时计费}.
     */
    HOURS_ACCOUNT(1L),

    /**
     * {@code 2 按行驶次数计费}.
     */
    TIMES_FREE(2L),

    /**
     * {@code 3 按行驶路程计费}.
     */
    DISTANCE_ACCOUNT(3L);

    private final Long value;

    public Long value() {
        return this.value;
    }

    AccountPattern(Long value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return Long.toString(this.value);
    }

}
