package cn.net.share.control.controller;

import cn.net.share.control.domain.File;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;

/**
 * Created by zhangshiping on 2017/7/17.
 */
@RestController
@RequestMapping("files")
public class FileController {
    @Autowired
    FileService fileService;

    /**
     * 分页返回骑行用户列表
     * @param page
     * @param size
     * @return
     */
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> getRiderList(int page, int size,String name,String businessName){
        return fileService.getFileList(page, size, name, businessName);
    }

    /**
     * 加载图片
     * @return
     */
    @RequestMapping(value = "/bike-image", method = RequestMethod.GET)
    public ResponseEntity<Message> getPhotos(){
        return fileService.findBikeImage();
    }

    /**
     * 获得文件类型
     * @return
     */
    @RequestMapping(value = "/file-type", method = RequestMethod.GET)
    public ResponseEntity<Message> findFileTypes(){
        return fileService.findFileTypes();
    }

    /**
     * 保存文件
     * @param file
     * @return
     */
    @RequestMapping(value = "/upload-image", method = RequestMethod.POST)
    public ResponseEntity<Message> uploadPhoto(@RequestBody File file){
        return fileService.uploadPhoto(file);
    }

    /**
     * 修改文件
     * @param file
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Message> updateFile(@RequestBody File file, @PathVariable String id){
        return fileService.updateFile(file, id);
    }
    /**
     * 上传文件
     * @param filename
     * @param file
     * @return
     */
    @RequestMapping(value = "/import-file", method = RequestMethod.POST)
    public ResponseEntity<Message> importFile(String filename, MultipartFile file) {
        return fileService.fileUpload(filename, file);
    }

    /**
     * 上传Excel文件
     * @param filename
     * @param file
     * @return
     */
    @RequestMapping(value = "/import-excel", method = RequestMethod.POST)
    public ResponseEntity<Message> importExcelFile(String filename, MultipartFile file) {
        return fileService.fileExcelUpload(filename, file);
    }

    /**
     * 获取文件保存地址
     * @return
     */
    @RequestMapping(value = "/file-path", method = RequestMethod.GET)
    public ResponseEntity<Message> getFilePath() {
        return fileService.getFilePath();
    }

    /**
     * 删除文件
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Message> deleteFile(@PathVariable  String id){
        return fileService.deleteFile(id);
    }

    /**
     * 展示图片
     * @param response
     * @param fileId
     * @return
     */
    @RequestMapping(value = "/file/{fileId}", method = RequestMethod.GET)
    public ResponseEntity<Message> getImageContent(HttpServletResponse response, @PathVariable Long fileId) {
        return fileService.getImageContent(response, fileId);
    }

    /**
     * 活动图片上传
     * @param file
     * @return
     */
    @RequestMapping(value = "/import-newsimage", method = RequestMethod.POST)
    public ResponseEntity<Message> importNewsImage(MultipartFile file) {
        return fileService.fileNewsImage(file);
    }
}
