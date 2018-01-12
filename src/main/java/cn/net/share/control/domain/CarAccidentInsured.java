package cn.net.share.control.domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

/**
 * Created by lihao on 2017/8/26.
 */
@Data
@Entity
public class CarAccidentInsured {

    @Id
    @GeneratedValue
    private Long id;

    private String platNumber;

    private String phone;

    private String ownerName;

    private String accidentType;

    private String operationType;

    private Date dateTime;

    private String insuredStatus;

    private String insuredType;

    private String insuranceCompany;

    public CarAccidentInsured() {}
}
