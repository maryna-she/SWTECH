package com.shopproject.products;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
class ProductDataInitializer implements CommandLineRunner {
    private final ProductsRepository repository;

    ProductDataInitializer(ProductsRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {
        if (repository.count() > 0) {
            return;
        }

        repository.saveAll(List.of(
                new ProductEntity(null, "Alpine Trail Backpack", "Light 38-liter backpack for day hikes and weekend routes.", BigDecimal.valueOf(129), 18),
                new ProductEntity(null, "Summit Shell Jacket", "Breathable weather layer for wind, rain, and changing elevation.", BigDecimal.valueOf(189), 12),
                new ProductEntity(null, "Basecamp Two-Person Tent", "Durable tent with fast setup for weekends outside.", BigDecimal.valueOf(249), 9),
                new ProductEntity(null, "Orbit Camp Lantern", "Compact lantern with warm light and USB-C charging.", BigDecimal.valueOf(49), 34),
                new ProductEntity(null, "Coastline Softboard", "Forgiving board for small waves and confident sessions.", BigDecimal.valueOf(399), 7),
                new ProductEntity(null, "Reef 3/2 Wetsuit", "Flexible wetsuit for cool mornings by the water.", BigDecimal.valueOf(159), 15)
        ));
    }
}
