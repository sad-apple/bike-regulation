package cn.net.share.control.controller;

import cn.net.share.control.domain.Problem;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.ProblemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by zhaochuanzhi on 2017/8/1.
 */
@RestController
@RequestMapping("problems")
public class ProblemController {

    @Autowired
    private ProblemService problemService;


    /**
     * 分页返回问题列表
     * @param page
     * @param size
     * @param problem
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getOperationOrgList(int page, int size, Problem problem){
        return problemService.getProblemsList(problem, page, size);
    }

    /**
     * 创建一个问题
     * @param problem
     * @return
     */
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Message> createProblem(@RequestBody Problem problem){
        return problemService.createProblem(problem);
    }

    /**
     * 获得一个问题
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Message> getProblem(@PathVariable Long id){
        return problemService.getProblem(id);
    }

    /**
     * 修改问题
     * @param problem
     * @return
     */
    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Message> updateProblem(@RequestBody Problem problem){
        return problemService.updateProblem(problem);
    }

    /**
     * 删除问题
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Message> deleteProblem(@PathVariable Long id){
        return problemService.deleteProblem(id);
    }

    /**
     * 返回所有问题类型
     * @return
     */
    @RequestMapping(value = "/collection" , method = RequestMethod.GET)
    public ResponseEntity<Message> getProblemTypeAllList(){
        return problemService.getProblemTypeAllList();
    }


}
