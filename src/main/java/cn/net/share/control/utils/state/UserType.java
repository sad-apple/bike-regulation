package cn.net.share.control.utils.state;


public enum UserType {

    /**
     * {@code 0 超级管理员}.
     */
    SUPER_ADMIN(0L),

    /**
     * {@code 1 一级管理员}.
     */
    FIRST_ADMIN(1L),

    /**
     * {@code 2 普通用户}.
     */
    ORDINARY_USER(2L),

    /**
     * {@code 3 骑行用户}.
     */
    RIDER_USER(3L),

    /**
     * {@code 4 单车车主}.
     */
    BIKE_OWNER(4L),

    /**
     * {@code 5 运营组织}.
     */
    OPERATION_ORG_USER(5L),

    /**
     *{@code 6 监管机构}
     */
    REGULATOR_ORG_USER(6L);

    private final Long value;

    public Long value() {
        return this.value;
    }

    UserType(Long value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return Long.toString(this.value);
    }

}
