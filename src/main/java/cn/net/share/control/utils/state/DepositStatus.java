package cn.net.share.control.utils.state;

/**
 * Created by lihao on 2017/8/16.
 */
public enum DepositStatus {
    /**
     * {@code 0 已付款}.
     */
    HadPay(0),

    /**
     * {@code 1 已退款}.
     */

    HadRefund(1);


    private final Integer value;

    public Integer value() {
        return this.value;
    }

    DepositStatus(Integer value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return Integer.toString(this.value);
    }
}
