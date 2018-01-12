package cn.net.share.control.dao;

import cn.net.share.control.domain.VoiceCommand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * Created by wangbiao on 2017/8/26.
 * 语音指令 Repository
 */

public interface VoiceCommandRepository extends JpaRepository<VoiceCommand, Long> {

    // 获取最新一条语音指令
    @Query(nativeQuery = true, value = "select id, word, executed, min_confidence from voice_command where executed = 0 order by id desc limit 1")
    VoiceCommand getLastData();

}