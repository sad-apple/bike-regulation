package cn.net.share.control.dao;

import cn.net.share.control.domain.Bike;
import cn.net.share.control.domain.File;
import cn.net.share.control.domain.FileType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by zhangshiping on 2017/7/17.
 */
public interface FileRepository extends JpaRepository<File,Long> {
    List<File> findByFileType(FileType one);

    @Query("select t1 from File t1,FileType t2 where t1.fileType = t2.id and t2.name like CONCAT('%',?1,'%') and t1.businessName like CONCAT('%',?2,'%')")
    Page<File> findConditon(String name, String businessName, Pageable pageable);
}
