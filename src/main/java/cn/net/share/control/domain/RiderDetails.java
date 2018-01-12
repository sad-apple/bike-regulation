package cn.net.share.control.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

/**
 * Created by Administrator on 2017/7/10.
 */
@Data
@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class RiderDetails {

    @Id
    @GeneratedValue
    private Long id;

    private String idCardNumber;

    private String name;

    private String phoneNum;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "riderDetails")
    @JsonIgnore
    private List<Bike> bikes; //车主拥有的车辆

    public RiderDetails() {}

}
