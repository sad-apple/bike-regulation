package cn.net.share.control.dao;


import cn.net.share.control.domain.News;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * Created by LEO on 16/9/29.
 */
public interface NewsRepository extends JpaRepository<News, Long> {

    @Query(value = "select new News (n.id, n.title, n.createDate, n.newsType, n.author, n.pageView, n.imgUrls) from News n " +
            "where 1=1 and n.title like CONCAT('%',?1,'%') and n.newsType = ?2")
    Page<News> findAllByNewsType(String title, String newsType, Pageable pageable);

    @Query(value = "select new News (n.id, n.title, n.createDate, n.newsType, n.author, n.pageView, n.imgUrls) from News n where 1=1 and n.title like CONCAT('%',?1,'%')")
    Page<News> findAllWithoutContent(String title, Pageable pageable);
}
