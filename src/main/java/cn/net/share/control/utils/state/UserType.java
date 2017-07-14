package cn.net.share.control.utils.state;

public enum UserType {
    /**
     * {@code 0 超级管理员}.
     */
    SUPER_ADMIN(0),

    /**
     * {@code 1 一级管理员}.
     */
    FIRST_ADMIN(1),

    /**
     * {@code 2 普通用户}.
     */
    ORDINARY_USER(2);


    private final Integer value;
    public Integer value() {
        return this.value;
    }

    UserType(Integer value) {
        this.value = value;
    }
    @Override
    public String toString() {
        return Integer.toString(this.value);
    }
}
