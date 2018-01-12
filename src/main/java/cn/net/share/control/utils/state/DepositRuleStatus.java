package cn.net.share.control.utils.state;

/**
 * Created by lihao on 2017/8/1.
 */
public enum DepositRuleStatus {
    /**
     * {@code 0 需要押金}.
     */
    NeedDeposit(0),

    /**
     * {@code 1 不需要押金}.
     */

    NotNeedDeposit(1),

    /**
     * {@code 2 对公付款}.
     */
    PayPublic(2),

    /**
     * {@code 3 不对公付款}.
     */
    NotPayPublic(3),
    /**
     * {@code 4 是法人}.
     */
    IsRepresent(4),

    /**
     * {@code 5 不是法人}.
     */
    NotRepresent(5);


    private final Integer value;

    public Integer value() {
        return this.value;
    }

    DepositRuleStatus(Integer value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return Integer.toString(this.value);
    }
}
