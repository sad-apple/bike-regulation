package cn.net.share.control.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

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

//    private int sex;//0：男；1：女
}
