package cn.net.share.control.service;


import cn.net.share.control.dao.NewsRepository;
import cn.net.share.control.domain.News;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageType;
import com.google.common.collect.Maps;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import java.util.Map;

/**
 * Created by LEO on 16/9/29.
 */
@Service
public class NewsService {

    @Autowired
    private NewsRepository newsRepository;
    @Autowired
    private NewsAsyncService newsAsyncService;

    /**
     * 获取活动列表
     * @param page
     * @param size
     * @param news
     * @return
     */
    public ResponseEntity<Message> getNewslist(Integer page, Integer size, News news) {
        Pageable pageable = new PageRequest(page - 1, size, new Sort(Sort.Direction.DESC, "id"));
        if (news.getNewsType() == null || "0".equals(news.getNewsType())) {
            Page<News> newsPage = newsRepository.findAllWithoutContent(news.getTitle(), pageable);
            return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, newsPage), HttpStatus.OK);
        }
        Page<News> newsPage = newsRepository.findAllByNewsType(news.getTitle(), news.getNewsType(), pageable);

        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, newsPage);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 发布活动
     * @param news
     * @return
     */
    public ResponseEntity<Message> publishNews(News news) {
        news.setPageView(0L);
        newsRepository.save(news);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS),HttpStatus.OK);
    }

    /**
     * 获取活动内容
     * @param id
     * @return
     */
    public Map getNewsContent(Long id) {
        Map map = Maps.newHashMap();
        News news = newsRepository.findOne(id);
        newsAsyncService.updatePageView(news);
        map.put("content", news.getContent());
        return map;
    }

    /**
     * 活动删除
     * @param id
     * @return
     */
    public ResponseEntity<Message> deleteNews(Long id) {
        newsRepository.delete(id);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS),HttpStatus.OK);
    }

    /**
     * 活动修改
     * @param news
     * @return
     */
    public ResponseEntity<Message> newsModify(News news) {
        News newsEntity = newsRepository.findOne(news.getId());
        newsEntity.setContent(news.getContent());
        newsEntity.setTitle(news.getTitle());
        newsEntity.setNewsType(news.getNewsType());
        newsEntity.setImgUrls(news.getImgUrls());
        newsEntity.setContent(news.getContent());
        newsRepository.save(newsEntity);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS),HttpStatus.OK);
    }
}
