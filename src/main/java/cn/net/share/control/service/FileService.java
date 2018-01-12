package cn.net.share.control.service;

import cn.net.share.control.config.FileUploadProperties;
import cn.net.share.control.dao.FileRepository;
import cn.net.share.control.dao.FileTypeRepository;
import cn.net.share.control.domain.File;
import cn.net.share.control.domain.FileType;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageType;
import cn.net.share.control.utils.CommonUtils;
import cn.net.share.control.utils.LogUtil;
import cn.net.share.control.utils.state.FileOfType;
import com.google.common.collect.Maps;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Created by zhangshiping on 2017/7/17.
 */
@Service
public class FileService {
    private static final Logger logger = LoggerFactory.getLogger(FileService.class);

    @Autowired
    private FileRepository fileRepository;
    @Autowired
    private FileTypeRepository fileTypeRepository;
    @Autowired
    private FileUploadProperties fileUploadProperties;

    /**
     * 获取文件列表
     *
     * @param page
     * @param size
     * @return
     */
    public ResponseEntity<Message> getFileList(int page, int size, String name, String businessName) {
        LogUtil.info(logger, "FileService:getFileList, name= " + name);

        if (businessName == null)
            businessName = "";

        if (name == null || name.equals("全部"))
            name = "";

        Pageable pageable = new PageRequest(page - 1, size, new Sort(Sort.Direction.DESC, "createTime"));
        Page<File> files = fileRepository.findConditon(name, businessName, pageable);

        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, files), HttpStatus.OK);
    }

    /**
     * 查询所有的图片
     *
     * @return
     */
    public ResponseEntity<Message> findBikeImage() {
        LogUtil.info(logger, "FileService:findBikeImage ");

        List<File> files = fileRepository.findByFileType(fileTypeRepository.findOne(FileOfType.BIKEIMAGE.value()));
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, files), HttpStatus.OK);
    }

    /**
     * 保存图片
     *
     * @param file
     * @return
     */
    public ResponseEntity<Message> uploadPhoto(File file) {
        LogUtil.info(logger, "FileService:uploadPhoto ");

        fileRepository.save(file);

        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /**
     * 上传图片
     * @param fileName
     * @param multipartFile
     * @return
     */
    public ResponseEntity<Message> fileUpload(String fileName, MultipartFile multipartFile) {
        LogUtil.info(logger, "FileService:fileUpload, fileName = " + fileName);

        String name = "";
        if (StringUtils.isNotEmpty(fileName)) {
            name = fileName;
        } else {
            name = UUID.randomUUID().toString() + CommonUtils.getFileSuffix(multipartFile.getOriginalFilename());
        }
        try {
            FileUtils.writeByteArrayToFile(new java.io.File(fileUploadProperties.getFilePath() + name), multipartFile.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }

        return new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS, (Object) name), HttpStatus.OK);
    }

    /**
     * 上传Excel文件
     * @param filename
     * @param file
     * @return
     */
    public ResponseEntity<Message> fileExcelUpload(String filename, MultipartFile file) {
        LogUtil.info(logger, "FileService:fileUpload, fileName = " + filename);

        String name = "";
        if (StringUtils.isNotEmpty(filename)) {
            name = filename;
        } else {
            name = UUID.randomUUID().toString() + CommonUtils.getFileSuffix(file.getOriginalFilename());
        }
        try {
            FileUtils.writeByteArrayToFile(new java.io.File(fileUploadProperties.getExcelFilePath()+ name), file.getBytes());
            LogUtil.info(logger, "path = " + (fileUploadProperties.getExcelFilePath() + name));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS, (Object) name), HttpStatus.OK);
    }

    /**
     * 获得文件类型
     *
     * @return
     */
    public ResponseEntity<Message> findFileTypes() {
        LogUtil.info(logger, "FileService:findFileTypes");

        List<FileType> fileTypes = fileTypeRepository.findAll();

        return new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS, fileTypes), HttpStatus.OK);
    }

    /**
     * 获取文件地址
     *
     * @return
     */
    public ResponseEntity<Message> getFilePath() {
        LogUtil.info(logger, "FileService:getFilePath ");

        String filePath = fileUploadProperties.getFilePath();
        return new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS, (Object) filePath), HttpStatus.OK);
    }

    /**
     * 修改文件
     * @param file
     * @param id
     * @return
     */
    public ResponseEntity<Message> updateFile(File file, String id) {
        LogUtil.info(logger, "FileService:updateFile, id = " + id);

        File fileOld = fileRepository.findOne(Long.valueOf(id));

        if (file.getName() != null) {
            fileOld.setName(file.getName());
        }
        fileOld.setBusinessName(file.getBusinessName());
        fileOld.setFileType(file.getFileType());
        fileOld.setRemark(file.getRemark());

        fileRepository.save(fileOld);

        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /**
     * 文件删除
     * @param id
     * @return
     */
    public ResponseEntity<Message> deleteFile(String id) {
        LogUtil.info(logger, "FileService:deleteFile, id = " + id);

        File file = fileRepository.getOne(Long.valueOf(id));

        fileRepository.delete(file);

        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /**
     * 图片展示
     * @param response
     * @param fileId
     * @return
     */
    public ResponseEntity<Message> getImageContent(HttpServletResponse response, Long fileId) {
        LogUtil.info(logger, "FileService:getImageContent, fileId = " + fileId);

        String fileName = fileRepository.findOne(fileId).getName();
        try {
            FileInputStream fileIS = new FileInputStream(fileUploadProperties.getFilePath() + fileName);
            byte data[] = new byte[fileIS.available()];
            fileIS.read(data);  //读数据
            response.setContentType("image/*"); //设置返回的文件类型
            OutputStream outStream = response.getOutputStream(); //得到向客户端输出二进制数据的对象
            outStream.write(data);  //输出数据
            outStream.flush();
            outStream.close();
            fileIS.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return new ResponseEntity(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /**
     * 活动图片上传
     * @param multipartFile
     * @return
     */
    public ResponseEntity<Message> fileNewsImage(MultipartFile multipartFile) {
        LogUtil.info(logger, "FileService:fileNewsImage, filename = " + multipartFile.getOriginalFilename());
        if (null != multipartFile && !multipartFile.isEmpty()) {
            String fileName = multipartFile.getOriginalFilename();
            try {
                FileUtils.writeByteArrayToFile(new java.io.File(fileUploadProperties.getNewsFilePath() + fileName), multipartFile.getBytes());
                Map map = Maps.newHashMap();
                map.put("url", fileUploadProperties.getRequestNewsFilePath() + fileName);
                return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, map), HttpStatus.OK);
            } catch (Exception e) {
                return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_ERROR, "文件上传失败"), HttpStatus.OK);
            }
        }
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_ERROR, "文件为空,上传失败"), HttpStatus.OK);
    }

}
