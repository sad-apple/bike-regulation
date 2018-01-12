package cn.net.share.control.controller;

import cn.net.share.control.domain.News;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;


/**
 * Created by LEO on 16/9/29.
 */
@RestController
@RequestMapping("news")
public class NewsController {

    @Autowired
    private NewsService newsService;

    /**
     * 获取活动列表
     * @param page
     * @param size
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getNewslist(Integer page, Integer size, News news){
        return newsService.getNewslist(page, size, news);
    }

    /**
     * 发布活动
     * @param news
     * @return
     */
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Message> publishNews(@RequestBody News news){
        return newsService.publishNews(news);
    }

    /**
     * 获取活动内容
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Map getNewsContent(@PathVariable Long id){
        return newsService.getNewsContent(id);
    }

    /**
     * 活动修改
     * @param news
     * @return
     */
    @RequestMapping(value = "/activities", method = RequestMethod.PUT)
    public ResponseEntity<Message> newsModify(@RequestBody News news){
        return newsService.newsModify(news);
    }

    /**
     * 活动删除
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Message> deleteNews(@PathVariable Long id){
        return newsService.deleteNews(id);
    }
}
