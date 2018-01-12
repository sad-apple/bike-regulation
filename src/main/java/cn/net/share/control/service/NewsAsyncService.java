package cn.net.share.control.service;

import cn.net.share.control.dao.NewsRepository;
import cn.net.share.control.domain.News;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 * Created by LEO on 16/10/14.
 */
@Service
public class NewsAsyncService {
    @Autowired
    private NewsRepository newsRepository;
    /**
     * 更新活动的浏览量
     * @param news
     */
    @Async
    public void updatePageView(News news){
        if(news == null){
            return;
        }
        news.setPageView(news.getPageView()+1);
        newsRepository.save(news);
    }

}
