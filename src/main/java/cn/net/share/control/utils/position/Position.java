package cn.net.share.control.utils.position;

public enum Position {

    AN_HUI(12),

    HE_FEI(87);

    private final Integer value;

    public Integer value() {
        return this.value;
    }

    Position(Integer value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return Integer.toString(this.value);
    }

}
