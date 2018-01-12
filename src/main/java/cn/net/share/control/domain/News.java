package cn.net.share.control.domain;

import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * Created by LEO on 16/9/29.
 */
@Data
@Entity
@EntityListeners(AuditingEntityListener.class)
public class News implements Serializable {

    private static final long serialVersionUID = 6317260524358639251L;
    @Id
    @GeneratedValue
    private Long id;

    private String title;

    @Column(length = 100000)
    private String content;

    @CreatedDate
    private Date createDate;

    @CreatedBy
    private String author;

    @Column(length = 10000)
    private String imgUrls;

    private String newsType;//消息类型 1：优惠；2：公告

    private Long pageView; // 浏览量

    public News() {
    }

    public News(Long id, String title, Date createDate, String newsType, String author, Long pageView, String imgUrls) {
        this.id = id;
        this.title = title;
        this.createDate = createDate;
        this.newsType = newsType;
        this.author = author;
        this.pageView = pageView;
        this.imgUrls = imgUrls;
    }
    public News(News news) {
        this.title = news.getTitle();
        this.newsType = news.getNewsType();
        this.imgUrls = news.getImgUrls();
        this.content = news.getContent();
    }
}
