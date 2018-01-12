package cn.net.share.control.service;

import cn.net.share.control.dao.ProblemRepository;
import cn.net.share.control.dao.ProblemTypeRepository;
import cn.net.share.control.domain.*;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageType;
import cn.net.share.control.dto.operationOrgDetails.OperationOrgDetailsDto;
import cn.net.share.control.utils.LogUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by zhaochuanzhi on 2017/8/1.
 */
@Service
public class ProblemService {

    private static final Logger logger = LoggerFactory.getLogger(OperationOrgService.class);

    @Autowired
    private ProblemRepository problemRepository;

    @Autowired
    private ProblemTypeRepository problemTypeRepository;

    /**
     * 分页返回问题列表
     * @param problem
     * @param page
     * @param size
     * @return
     */
    public ResponseEntity<Message> getProblemsList(Problem problem, int page, int size) {
        ExampleMatcher exampleMatcher = ExampleMatcher.matching().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING).withIgnoreNullValues();
        Page<Problem> problems = problemRepository.findAll(Example.of(problem, exampleMatcher), new PageRequest(page - 1, size));
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, problems);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 创建一个问题
     * @param problem
     * @return
     */
    public ResponseEntity<Message> createProblem(Problem problem){
        problemRepository.save(problem);
        LogUtil.info(logger,"ProblemService:createProblem problemId = "+ problem.getId());
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }



    /**
     * 获得一个问题
     * @param problemId
     * @return
     */
    public ResponseEntity<Message> getProblem(Long problemId) {
       Problem problem = problemRepository.findOne(problemId);
        LogUtil.info(logger,"ProblemService:getProblem problemId = "+ problemId);
        return new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS, problem), HttpStatus.OK);
    }

    /**
     * 修改问题
     * @param problem
     * @return
     */
    public ResponseEntity<Message> updateProblem(Problem problem) {
        LogUtil.info(logger,"ProblemService:updateProblem problemId = "+ problem.getId());
       problemRepository.save(problem);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /**
     * 删除问题
     * @param id
     * @return
     */
    @Transactional
    public ResponseEntity<Message> deleteProblem(Long id){
        Problem problem = problemRepository.findOne(id);
        problem.setProblemType(null);
        problemRepository.delete(id);
        LogUtil.info(logger,"The problem has been deleted, id=" + id);
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }


    /**
     * 返回全部问题类型
     * @return
     */
    public ResponseEntity<Message> getProblemTypeAllList(){
        List<ProblemType> problemTypes = problemTypeRepository.findAll();
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, problemTypes);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

}
