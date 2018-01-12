package cn.net.share.control.service;

import cn.net.share.control.config.FileUploadProperties;
import cn.net.share.control.dao.BikeRepository;
import cn.net.share.control.dao.BikeTypeRepository;
import cn.net.share.control.domain.Bike;
import cn.net.share.control.domain.BikeType;
import cn.net.share.control.domain.SysUser;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageInfo;
import cn.net.share.control.dto.message.MessageType;
import cn.net.share.control.utils.LogUtil;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.Date;

@Service
public class BikeService {
    private static final Logger logger = LoggerFactory.getLogger(FileService.class);

    @Autowired
    private BikeRepository bikeRepository;

    @Autowired
    private BikeTypeRepository bikeTypeRepository;

    @Autowired
    private FileUploadProperties fileUploadProperties;

    /**
     * 分页返回单车列表
     *
     * @param
     * @param page
     * @param size
     * @param
     * @return
     */
    public ResponseEntity<Message> findByBikePage(int page, int size, String plateNumber, String name) {
        Pageable pageable = new PageRequest(page - 1, size, new Sort(Sort.Direction.DESC, "createTime"));
        if (plateNumber == null) {
            plateNumber = "";
        }
        if (name == null || name.equals("全部")) {
            name = "";
        }
        Page<Bike> bikes = bikeRepository.findConditon(name, plateNumber, pageable);
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, bikes);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }


    /**
     * 返回一个单车
     *
     * @param id
     * @return
     */
    public ResponseEntity<Message> getBike(String id) {
        Bike bike = bikeRepository.findOne(id);
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS, bike);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 创建单车
     *
     * @param bike
     * @param sysUser
     * @return
     */
    public ResponseEntity<Message> createBike(Bike bike, SysUser sysUser) {
        bikeRepository.save(bike);
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 读取Excel文件
     *
     * @param fileName
     * @return
     */
    public ResponseEntity<Message> readExcel(String fileName) {
        Workbook workbook = null;
        String path = fileUploadProperties.getExcelFilePath() + fileName;    //  得到文件地址+文件名
        LogUtil.info(logger,"path:" + path);
        try {
            workbook = WorkbookFactory.create(new File(path));
            LogUtil.info(logger,"workbook:" + workbook);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_ERROR, MessageInfo.ERROR_ON_READEXCEL), HttpStatus.OK);
        } catch (InvalidFormatException e) {
            e.printStackTrace();
            return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_ERROR, MessageInfo.ERROR_ON_READEXCEL), HttpStatus.OK);
        }
        Sheet mySheet = workbook.getSheetAt(0);         //  得到Excel表格
        importBikes(mySheet);
        try {
            workbook.close();   // 关闭资源
        } catch (IOException e) {
            e.printStackTrace();
        }

        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS), HttpStatus.OK);
    }

    /**
     * 将读取的数据导入数据库
     * @param sheet
     */
    public void importBikes(Sheet sheet) {
        Date date = null;
        for (int i = 1; i < sheet.getLastRowNum() + 1; i++) {
            String plateNumber = String.valueOf(((new Double(sheet.getRow(i).getCell(1).getNumericCellValue())).intValue()));
            BikeType bikeType = bikeTypeRepository.findBikeTypeByName(sheet.getRow(i).getCell(2).getStringCellValue());
            String simCode = String.valueOf(((new Double(sheet.getRow(i).getCell(3).getNumericCellValue())).intValue()));
            date = DateUtil.getJavaDate(sheet.getRow(i).getCell(4).getNumericCellValue());
            String remark = sheet.getRow(i).getCell(5) + "";
            bikeRepository.save(new Bike(plateNumber, bikeType, simCode, date, remark));
        }
    }

    /**
     * 更新单车
     *
     * @param bike
     * @return
     */
    public ResponseEntity<Message> updateBike(Bike bike) {
        bikeRepository.save(bike);
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

    /**
     * 删除单车
     *
     * @param id
     * @return
     */
    public ResponseEntity<Message> deleteBike(String id) {
        bikeRepository.delete(id);
        Message message = new Message(MessageType.MSG_TYPE_SUCCESS);
        return new ResponseEntity<Message>(message, HttpStatus.OK);
    }

}
