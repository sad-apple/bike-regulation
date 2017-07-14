package cn.net.share.control;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * spring boot项目入口类
 */
@SpringBootApplication
@EnableJpaAuditing
@EnableFeignClients
public class BikeRegulationApplication {
	private static final Logger logger = LoggerFactory.getLogger(BikeRegulationApplication.class);

	public static void main(String[] args) {
		logger.info("Start BikeRegulationApplication");
		SpringApplication.run(BikeRegulationApplication.class, args);
	}
}
