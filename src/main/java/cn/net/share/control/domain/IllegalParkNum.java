package cn.net.share.control.domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Created by wangbiao on 2017/7/19.
 * 每个禁停区停放的单车数量
 */

@Data
@Entity
public class IllegalParkNum {

    @Id
    @GeneratedValue
    private Long id;

    private Long illegalAreaId; // 禁停区id

    private Long parkNum; // 禁停区单车停放数量

}