package cn.net.share.control.service;

import cn.net.share.control.dao.*;
import cn.net.share.control.domain.*;
import cn.net.share.control.dto.bikeDemoData.BikeAdSuperviseDto;
import cn.net.share.control.dto.bikeDemoData.taxSuperviseDto;
import cn.net.share.control.dto.riderorder.BikeDispatchDto;
import cn.net.share.control.dto.riderorder.BikeQualityDto;
import cn.net.share.control.dto.riderorder.BikeQuantityDto;
import cn.net.share.control.dto.message.Message;
import cn.net.share.control.dto.message.MessageType;
import cn.net.share.control.dto.riderorder.RiderOrderDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.util.*;

/**
 * Created by zhangshiping on 2017/8/18.
 */
@Service
public class DemonstrateService {
    @Autowired
    private RedisRepository redisRepository;
    @Autowired
    private BikeRepository bikeRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private RiderDetailsRepository riderDetailsRepository;
    @Autowired
    private SysUserRepository sysUserRepository;
    @Autowired
    private TaxSuperviseReportRepository taxSuperviseReportRepository;
    @Autowired
    private BikeParkService bikeParkService;
    @Autowired
    private BikeParkRepository bikeParkRepository;
    @Autowired
    private CityPositionRepository cityPositionRepository;

    @Autowired
    private BikeAdvertisementRepository bikeAdvertisementRepository;

    @Autowired
    private BikeDispatcherRepository bikeDispatcherRepository;

    /**
     * 定时添加历史订单信息
     */
//    @Scheduled(fixedDelay = 3*1000)
//    @Async
    public void RefreshRunResultDtos() {
        //历史订单新增
        List<RiderOrderDto> riderOrderDtos = new ArrayList<>();
        if ((List<RiderOrderDto>) redisRepository.get("runResult") != null){
            riderOrderDtos.addAll((List<RiderOrderDto>) redisRepository.get("runResult"));
        }
        int num = (int)(Math.random()*2+1);
        List<Bike> bikeList = bikeRepository.getBikesRandom(num);
        List<Customer> customerList = customerRepository.getCustomerRandom(num);
//        List<Long> ids = (List<Long>) redisRepository.get("sysUserIds");
        List<SysUser> sysUserList = sysUserRepository.getSysUserRandom(num);
        for (int i = 0; i < bikeList.size(); i ++) {
            //历史订单统计
            Date rideTime = new Date(((new Date()).getTime() - (long)(Math.random()+3) * 1000));
            Long runT = (long)(Math.random()*24+1)*5 * 60 * 1000;//5*60*1000--24*5*60*1000
            Long h = runT/60/1000/60;
            Long min = (runT-h*3600*1000)/60000;
            String runTime = "";
            if (h != 0){
                runTime = h + "小时" + min+ "分";
            }else {
                runTime = min+ "分";
            }
            int isFined = 0;
            if (i == (int)(Math.random()*30)){
                isFined = 1;
            }
            Long fineNum =0L;
            if (isFined == 1){
                fineNum = (new Long[]{5L, 10L, 15L, 20L})[(int) (Math.random()*4)];
            }
//            String operationOrg = (new String[]{"A公司", "B公司", "C公司"})[(int)(Math.random()*3)];
            String operationOrg = bikeList.get(i).getType().getName();
            double actPrice = 1.5;
            if ("A公司".equals(operationOrg)){
                actPrice = 1;
            }else if ("B公司".equals(operationOrg)){
                actPrice = 1.3;
            }
            Long price = 1L;
            double expectIncome = price * (long)Math.ceil(runT / (60 * 1000 * 60f));
            double actualityIncome = actPrice * (long)Math.ceil(runT / (60 * 1000 * 60f));
            Long margin = (long)(Math.abs((actualityIncome - expectIncome) / actualityIncome * 100));
            RiderDetails riderDetails = riderDetailsRepository.getRider(customerList.get(i).getCustomerDetailsId());
            String idCardNumber = riderDetails == null ? "" : riderDetails.getIdCardNumber();
//            SysUser sysUser = sysUserRepository.getSysUserByCustomer(customerList.get(i).getAdminId());
            //用户名
            String name = sysUserList.get(i).getFullName();

            String phone = sysUserList.get(i).getPhone();

//            ids.add(sysUserList.get(i).getId());

            RiderOrderDto riderOrderDto = new RiderOrderDto(bikeList.get(i), name, phone, operationOrg, price, expectIncome, actualityIncome, margin,
                    idCardNumber, rideTime, runTime, isFined, fineNum);
            riderOrderDtos.add(riderOrderDto);
        }
        //订单排序
        Collections.sort(riderOrderDtos, new Comparator<RiderOrderDto>() {//历史订单统计
            @Override
            public int compare(RiderOrderDto r1, RiderOrderDto r2) {
                Date time1 = r1.getRideTime();
                Date time2 = r2.getRideTime();
                return (time1.before(time2)) ? 1 : ((time1 == time2) ? 0 : -1);
            }
        });
        //满10条信息删除,保留10条
        if (riderOrderDtos.size() > 10){
            int count = 0;
            Iterator<RiderOrderDto> runResultIter = riderOrderDtos.iterator();
//            Iterator<Long> idsIter = ids.iterator();
            while (runResultIter.hasNext()) {
                RiderOrderDto riderOrderDto = runResultIter.next();
                count ++;
                if (count > 10){
                    runResultIter.remove();
                }
            }
//            while (idsIter.hasNext()){
//                Long id = idsIter.next();
//                count ++;
//                if (count > 10){
//                    idsIter.remove();
//                }
//            }
        }
        redisRepository.save("runResult", riderOrderDtos);
//        redisRepository.save("sysUserIds", ids);
    }

    /**
     * 获取单车质量统计数据
     */
//    @Scheduled(fixedDelay = 3*1000)
//    @Async
    public void RefreshBikeQualityDtos() {
        List<BikeQualityDto> bikeQualityDtos = new ArrayList<>();
        int number = 10;
        List<Bike> bikeList = bikeRepository.getBikesRandom(number);
        for (int i = 0; i < bikeList.size(); i ++) {
            //运营方
            String operationOrg = bikeList.get(i).getType().getName();
            //质量标准
            String qualityStandard = "欧盟标准";
            if ("A公司".equals(operationOrg)){
                qualityStandard = "国家标准";
            }else if ("B公司".equals(operationOrg)){
                qualityStandard = "美国标准";
            }
            //制造商
            String manufacturer = "A";
            if ("A公司".equals(operationOrg)){
                manufacturer = "B";
            }else if ("B公司".equals(operationOrg)){
                manufacturer = "C";
            }
            //入网资格证
            String certificate = "QG07266J";
            //入网时间
            Calendar c = Calendar.getInstance();
            c.add(Calendar.DATE, -17);
            Date accessTime = c.getTime();
            //骑行次数
            int rideNumber = (int)(Math.random()*20);
            //故障次数
            int failureNumber = 0;
            int num = (int)(Math.random()*10);
            if (num == 1){
                failureNumber = (int) (Math.random()*15);
            }else {
                failureNumber = (int) (Math.random()*3);
            }
            //骑行时间
            DecimalFormat df = new DecimalFormat("#.##");
            String rideAllTime = "";
            double rideOneTime = rideNumber * (Math.random()*2.0+0.5);//运行多少小时
            rideOneTime = Double.parseDouble(df.format(rideOneTime));
            rideAllTime = rideOneTime + "小时";
            //骑行路程
            double distance = rideOneTime * (Math.random()*15.0);//单车15公里/小时
            distance = Double.parseDouble(df.format(distance));
            //是否召回
            int isRecall = 0;
            if (failureNumber > 10){//故障超过10次召回
                isRecall = 1;
            }
            BikeQualityDto bikeQualityDto = new BikeQualityDto(bikeList.get(i), qualityStandard,
                    manufacturer, certificate, accessTime, failureNumber, rideNumber, rideAllTime, distance, isRecall);
            bikeQualityDtos.add(bikeQualityDto);
        }
        redisRepository.save("bikeQuality", bikeQualityDtos);

    }

    /**
     * 单车数量刷新
     */
//    @Scheduled(fixedDelay = 2*1000)
//    @Async
    public void RefreshDtos() {
        RefreshBikeQuantityDtos();
        RefreshBikeDispatchDtos();
    }

    /**
     * 车辆调度刷新
     */
    public void RefreshBikeDispatchDtos(){
        List<BikeDispatchDto> bikeDispatchDtos = new ArrayList<>();
        List<BikeDispatchDto> bikeDispatchDtoList = (List<BikeDispatchDto>) redisRepository.get("bikeDispatch");
        if (bikeDispatchDtoList != null){
            bikeDispatchDtos.addAll(bikeDispatchDtoList);
        }
        int num = 1;
        List<BikeDispatcher> bikeDispatcherList = bikeDispatcherRepository.getRandomNumber(num);
        for (BikeDispatcher bikeDispatcher : bikeDispatcherList){
            String bikeId = bikeDispatcher.getPlateNumber();//单车编号

            String[]areas = {"瑶海区", "蜀山区", "包河区", "庐阳区"};
            String area = "";//投放区域
            area = areas[(int)(Math.random()*4)];

            String operationOrg = bikeDispatcher.getOperationOrgName();//运营方

            Calendar c = Calendar.getInstance();
            c.add(Calendar.DATE, -17);
            Date productionTime = c.getTime();//出厂时间

            String dispatcher = "xxx";//调度员

            int dispatchNum = (int) ((Math.random()+1)*10);//调度次数

            int noDispatchNum = (int) ((Math.random()+1)*5);//未调度次数

            DecimalFormat df = new DecimalFormat("#.##");
            String parkingTime = "";//停车时长
            double rideOneTime = Math.random()*2.0+0.5;//运行多少小时
            rideOneTime = Double.parseDouble(df.format(rideOneTime));
            parkingTime = rideOneTime + "小时";

            String startAddress = area;//始发地

            String endAddress = areas[(int)(Math.random()*3)];//目的地

            String[] dispatchStatuses = {"未调度", "已调度", "正在调度"};
            String dispatchStatus = dispatchStatuses[(int)(Math.random()*3)];//调度情况

            BikeDispatchDto bikeDispatchDto = new BikeDispatchDto(bikeId, area, operationOrg, productionTime, dispatcher, dispatchNum, noDispatchNum, parkingTime, startAddress, endAddress,dispatchStatus);
            bikeDispatchDtos.add(bikeDispatchDto);
        }

        if (bikeDispatchDtos.size() > 0 && bikeDispatchDtos != null) {
            bikeDispatchDtos.remove(0);
        }
        redisRepository.save("bikeDispatch", bikeDispatchDtos);
    }

    /**
     * 单车数量刷新
     */
    public void RefreshBikeQuantityDtos(){
        List<BikeQuantityDto> bikeQuantityDtos = new ArrayList<>();
        List<BikeQuantityDto> bikeQuantityDtoList = (List<BikeQuantityDto>) redisRepository.get("bikeQuantity");
        if (bikeQuantityDtoList != null){
            bikeQuantityDtos.addAll(bikeQuantityDtoList);
        }
        int num = 2;
        List<Bike> bikeList = bikeRepository.getBikesRandom(num);
        int count = 0;
        if (redisRepository.get("count") != null){
            count = (int) redisRepository.get("count");
        }
        for (Bike bike : bikeList){
            count = ++num;
            String bikeId = bike.getPlateNumber();//单车编号

            String[]areas = {"瑶海区", "蜀山区", "包河区", "庐阳区"};
            String area = "";//投放区域
            int size = 1;
            if (count >= 10){
                count = 0;
                size = (int) (Math.random()*4);
            }
            area = areas[size];

            String operationOrg = bike.getType().getName();//运营方

            String manufacturer = "A";//制造商（A，B，C单车制造商）
            if ("A公司".equals(operationOrg)){
                manufacturer = "B";
            }else if ("B公司".equals(operationOrg)){
                manufacturer = "C";
            }

            String certificate = "QG07266J";//入网资格证

            Calendar c = Calendar.getInstance();
            c.add(Calendar.DATE, -17);
            Date accessTime = c.getTime();//投放时间

            Long bikeNum = 76000L;//区域实投车辆
            if ("A公司".equals(operationOrg)){
                bikeNum = 65000L;
            }else if ("B公司".equals(operationOrg)){
                bikeNum = 45000L;
            }

            Long bikeNumStandard = 89000L;//区域可投车辆

            Long bikeNumDeviation = Math.abs(bikeNumStandard - bikeNum);//投放数量差

            BikeQuantityDto bikeQuantityDto = new BikeQuantityDto(bikeId, area, operationOrg, manufacturer, accessTime, certificate, bikeNum, bikeNumStandard, bikeNumDeviation);
            bikeQuantityDtos.add(0,bikeQuantityDto);
        }
        //满10条信息删除到保留10条
        if (bikeQuantityDtos.size() > 10){
            int cou = 0;
            Iterator<BikeQuantityDto> bikeQuantityDtoIterator = bikeQuantityDtos.iterator();
            while (bikeQuantityDtoIterator.hasNext()) {
                BikeQuantityDto bikeQuantityDto = bikeQuantityDtoIterator.next();
                cou ++;
                if (cou > 10){
                    bikeQuantityDtoIterator.remove();
                }
            }
        }
        redisRepository.save("bikeQuantity", bikeQuantityDtos);
        redisRepository.save("count", count);
    }


    /**
     * 获取单车质量统计
     * @return
     */
    public ResponseEntity<Message> getBikeQuality() {
        List<BikeQualityDto> bikeQualityDtos = (List<BikeQualityDto>)redisRepository.get("bikeQuality");
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, bikeQualityDtos), HttpStatus.OK);
    }

    /**
     * 获取单车数量统计
     * @return
     */
    public ResponseEntity<Message> getBikeQuantity() {
        List<BikeQuantityDto> bikeQuantityDtos = (List<BikeQuantityDto>)redisRepository.get("bikeQuantity");
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, bikeQuantityDtos), HttpStatus.OK);
    }

    /**
     * 获取历史订单结果
     * @return
     */
    public ResponseEntity<Message> getRunResult() {
        List<RiderOrderDto> riderOrderDtos = (List<RiderOrderDto>)redisRepository.get("runResult");
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, riderOrderDtos), HttpStatus.OK);
    }

    /**
     * 获取单车税务数据
     */
    public ResponseEntity<Message> getTaxSupervise() {
        List<taxSuperviseDto> taxSuperviseDto = (List<cn.net.share.control.dto.bikeDemoData.taxSuperviseDto>)redisRepository.get("taxSuperviseDto");
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, taxSuperviseDto), HttpStatus.OK);
    }

    /**
     * 获取车身广告数据
     * @return
     */
    public ResponseEntity<Message> getBikeAdList() {
        List<BikeAdSuperviseDto> bikeAdSuperviseDto = (List<BikeAdSuperviseDto>) redisRepository.get("bikeAdvertisementDto");
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, bikeAdSuperviseDto), HttpStatus.OK);
    }

    /**
     * 刷新单车税务数据
     */
//    @Scheduled(fixedDelay = 1*1000)
//    @Async
    public void RefreshTaxDtos() {
        List<taxSuperviseDto> listDtos = new ArrayList<>();
        List<taxSuperviseDto> taxDtoList = (List<taxSuperviseDto>) redisRepository.get("taxSuperviseDto");
        if (taxDtoList != null){
            listDtos.addAll(taxDtoList);
        }
        List<TaxSuperviseReport> taxList = taxSuperviseReportRepository.getRandomData(1);
        for (TaxSuperviseReport item : taxList) {

            String distance = Long.toString(Math.round(Math.random() * 1500 + 500));
            String currentEarn = Long.toString(Math.round(Math.random() * 5 + 1));
            String totalEarn = Long.toString(Math.round(Math.random() * 3000 + 1000));
            String payTax = Long.toString(Math.round(Math.random() * 500 + 200));

            taxSuperviseDto taxSuperviseDto = new taxSuperviseDto(item, distance, currentEarn, totalEarn, payTax);
            listDtos.add(taxSuperviseDto);
        }

        if (listDtos != null && listDtos.size() > 0) {
            listDtos.remove(0);
        }

        redisRepository.save("taxSuperviseDto", listDtos);
    }

    /**
     * 获取动态的车身广告随机数据
     */
//    @Scheduled(fixedDelay = 2*1000)
//    @Async
    public void getBikeAdDtoList() {
        List<BikeAdSuperviseDto> listDto = new ArrayList<>();
        List<BikeAdSuperviseDto> bikeAdDtoList = (List<BikeAdSuperviseDto>) redisRepository.get("bikeAdvertisementDto");

        if (bikeAdDtoList != null) {
            listDto.addAll(bikeAdDtoList);
        }

        List<BikeAdvertisement> bikeAdvertisementsList =  bikeAdvertisementRepository.getRandomData(1);

        String [] adOwners = new String[]{"甲公司","乙公司","丙公司"};
        String[] adContents = new String[]{"甲公司广告内容","乙公司广告内容","丙公司广告内容"};
        String[] bikeOperationOrgs = new String[]{"A公司","B公司", "C公司", "D公司", "E公司"};
        String[] regions = new String[]{"蜀山区","包河区", "瑶海区", "庐阳区", "经开区", "高新区", "政务区"};

        for (int i = 0; i < bikeAdvertisementsList.size(); i++ ) {
            int index = (int)Math.round(Math.random()*2);
            int operationIndex = (int)Math.round(Math.random()*4);
            int regionIndex = (int)Math.round(Math.random()*6);
            String adContent = adContents[index];
            String adOwner = adOwners[index];
            String operationOrgName = bikeOperationOrgs[operationIndex];
            String region = regions[regionIndex];
            BikeAdSuperviseDto bikeAdSuperviseDto = new BikeAdSuperviseDto(bikeAdvertisementsList.get(i), adContent, adOwner, operationOrgName, region);
            listDto.add(bikeAdSuperviseDto);
        }

        if (listDto != null && listDto.size() > 0) {
            listDto.remove(0);
        }

        redisRepository.save("bikeAdvertisementDto", listDto);

    }


    public ResponseEntity<Message> getBikeDispatch() {
        List<BikeDispatchDto> bikeDispatchDtos= (List<BikeDispatchDto>)redisRepository.get("bikeDispatch");
        return new ResponseEntity<Message>(new Message(MessageType.MSG_TYPE_SUCCESS, bikeDispatchDtos), HttpStatus.OK);
    }
}
